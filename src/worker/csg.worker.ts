// Весь CSG приложения. Главный поток сюда только шлёт состояние и получает
// готовые меши: WASM-модуль manifold (~2 МБ) в главный поток не попадает
// вовсе, и вкладка не замирает даже на экспорте ванночек в 384 сегмента.
//
// Внутри — ровно те же вызовы ядра, что раньше стояли в main.ts. Никакого
// DOM и никакого Three.js: воркер видит только чистую геометрию.

import type { CsgApi } from '../geo/csg';
import { initCSG } from '../geo/csg';
import type { SurfaceMesh } from '../geo/surface';
import type { VesselSurface } from '../geo/build';
import { vesselSurface } from '../geo/build';
import { buildProfile, profileRadius } from '../geo/profiles';
import type { LidFit } from '../geo/lid';
import { lidFit, lidSeat, lidHeightMm, buildLidMesh, buildLidSolid } from '../geo/lid';
import { buildSolidVessel, buildPrintableVessel } from '../geo/assemble';
import type { Mouth, MoldPartMesh } from '../geo/mold';
import { analyzeMold, buildMaster, buildBaths } from '../geo/mold';
import { validateMesh, assessExport } from '../geo/validate';
import type { AppState } from '../state/schema';
import { sanitizeState, toBuildParams, effectiveSpout } from '../state/schema';
import type { CsgJob, JobPart, WorkerIn, WorkerOut } from './protocol';

/**
 * WASM грузится сразу при создании воркера, а не по первой задаче: клиент
 * создаёт воркер лениво, но уже в этот момент понятно, что считать придётся.
 */
const ready = initCSG();

/** Больше трёх частей у формы не бывает — половины плюс донная плита. */
const MAX_MOLD_PARTS = 3;
/** По скольким углам обходится венчик, когда меряется устье. */
const MOUTH_SAMPLES = 64;
/**
 * Насколько литейная горловина уже юбки перевёрнутой крышки. Ставить её
 * ровно по юбке нельзя: цилиндр горловины совпал бы с цилиндром юбки, а
 * совпадающие поверхности — худший вход для булевой операции, и на месте
 * стыка остаётся рваная грань. Отступ берётся долей от радиуса, чтобы у
 * крошечной крышки горловина не съелась целиком.
 */
const LID_MOUTH_INSET_MM = 1.5;
const LID_MOUTH_INSET_MAX = 0.15;

addEventListener('message', (event) => {
  if (isJobMessage(event.data)) void handle(event.data);
});

async function handle(message: WorkerIn): Promise<void> {
  const { jobId, job } = message;
  try {
    const parts = run(await ready, jobId, job);
    // Буферы переносим, а не копируем: на 384 сегментах это десятки мегабайт.
    send({ type: 'done', jobId, parts }, transferable(parts));
  } catch (error) {
    send({ type: 'error', jobId, message: error instanceof Error ? error.message : String(error) });
  }
}

function run(csg: CsgApi, jobId: number, job: CsgJob): JobPart[] {
  // Граница воркера — такая же внешняя граница, как ссылка или UI.
  const state = sanitizeState(job.state);
  if (job.kind === 'vessel-preview') {
    return [vesselPart(csg, jobId, state, job.segments)];
  }
  if (job.kind === 'mold-preview') {
    return moldParts(csg, jobId, state, job.segments, false);
  }
  if (job.kind === 'export') {
    return state.exportMode === 'vessel'
      ? vesselParts(csg, jobId, state, state.resolution)
      : moldParts(csg, jobId, state, state.resolution, true);
  }
  throw new Error('воркер не знает такой задачи');
}

/** Посадка под крышку — если крышка включена. */
function fitOf(state: AppState): LidFit | null {
  if (!state.lid.on) return null;
  const profile = buildProfile(state.family, state.shape, state.heightMm);
  return lidFit(profile, state.heightMm, state.hollow, state.lid);
}

/**
 * Полое изделие целиком: тело, ручки, трубка носика и проход сквозь стенку.
 * Ровно это уходит в STL — и ровно это показывает превью, когда пользователь
 * остановился.
 */
function printableVessel(csg: CsgApi, state: AppState, segments: number): SurfaceMesh {
  const fit = fitOf(state);
  return buildPrintableVessel(
    csg, toBuildParams(state, segments), state.hollow, state.handle, effectiveSpout(state),
    fit ? lidSeat(fit) : undefined,
  ).mesh;
}

/**
 * Точная сборка изделия для превью. Меш не проверяем: превью проверит себя
 * само в главном потоке — ему к вердикту нужны ещё и свесы с
 * предупреждениями, а меш к тому времени уже там. Крышки здесь нет вовсе:
 * она тело вращения, и главный поток строит её сам, не дожидаясь воркера.
 */
function vesselPart(csg: CsgApi, jobId: number, state: AppState, segments: number): JobPart {
  const progress = new Progress(jobId, 1);
  progress.next('сборка изделия');
  return part(state.family, 'Изделие', '', printableVessel(csg, state, segments), []);
}

/**
 * Что уходит в STL в режиме «изделие»: само изделие и, если она есть,
 * крышка — отдельным файлом и в печатном положении, юбкой вниз на столе.
 * Меши проверяем: от вердикта зависит, выпускать ли файл.
 */
function vesselParts(csg: CsgApi, jobId: number, state: AppState, segments: number): JobPart[] {
  const fit = fitOf(state);
  const progress = new Progress(jobId, fit ? 3 : 2);
  progress.next('сборка изделия');

  const meshes: { id: string; label: string; mesh: SurfaceMesh }[] = [
    { id: state.family, label: 'Изделие', mesh: printableVessel(csg, state, segments) },
  ];
  if (fit) {
    progress.next('сборка крышки');
    meshes.push({ id: 'lid', label: 'Крышка', mesh: buildLidMesh(fit, state.lid, segments) });
  }

  progress.next('проверка мешей');
  return meshes.map((item) => part(
    item.id, item.label, sizeNote(item.mesh), item.mesh,
    assessExport(validateMesh(item.mesh), true).blocking,
  ));
}

/**
 * Предмет, вокруг которого строится оснастка. Их бывает два: само изделие и
 * его крышка — у крышки своя форма, своя схема разъёма и свои ванночки.
 */
interface MoldSubject {
  /** приставка к идентификаторам деталей; пусто — изделие */
  id: string;
  label: string;
  build(): SurfaceMesh;
  mouth: Mouth;
  hasHandle: boolean;
  hasSpout: boolean;
}

function moldSubjects(csg: CsgApi, state: AppState, segments: number): MoldSubject[] {
  const params = toBuildParams(state, segments);
  const surface = vesselSurface(params);
  const fit = fitOf(state);
  const spout = effectiveSpout(state);

  const subjects: MoldSubject[] = [{
    id: '',
    label: 'изделие',
    build: () => buildSolidVessel(csg, params, state.handle, spout),
    mouth: mouthOf(surface, fit),
    hasHandle: state.handle.on,
    hasSpout: spout.on && spout.kind === 'applied',
  }];

  if (fit) {
    subjects.push({
      id: 'lid',
      label: 'крышка',
      // Крышку кладут в форму перевёрнутой: юбка смотрит вверх, и её торец
      // становится устьем, в которое льют шликер. Купол при этом лежит в
      // гипсе целиком, а шов проходит по краю поля.
      build: () => buildLidSolid(fit, state.lid, segments, { upsideDown: true }),
      mouth: {
        zMm: lidHeightMm(fit, state.lid),
        radiusMm: Math.max(fit.plugMm * (1 - LID_MOUTH_INSET_MAX), fit.plugMm - LID_MOUTH_INSET_MM),
      },
      hasHandle: false,
      hasSpout: false,
    });
  }
  return subjects;
}

/** Мастер-позитив или ванночки — смотря что выбрано в панели экспорта. */
function moldParts(
  csg: CsgApi,
  jobId: number,
  state: AppState,
  segments: number,
  forExport: boolean,
): JobPart[] {
  const master = state.exportMode === 'master';
  const subjects = moldSubjects(csg, state, segments);
  // Пока схема не выбрана, число деталей неизвестно: берём на каждый предмет
  // наибольшее возможное. После анализа итог только уменьшается, поэтому
  // шкала может прыгнуть вперёд, но никогда не откатится назад.
  const planned = master ? 1 : MAX_MOLD_PARTS;
  const progress = new Progress(jobId, subjects.length * (2 + planned) + (forExport ? 1 : 0));

  const built: MoldPartMesh[] = [];
  for (const subject of subjects) {
    progress.next(`сборка: ${subject.label}`);
    const solid = subject.build();

    progress.next('анализ разъёма');
    const report = analyzeMold(solid, {
      hasHandle: subject.hasHandle,
      hasSpout: subject.hasSpout,
    });
    progress.total -= planned - (master ? 1 : report.parts.length);

    const options = { mouth: subject.mouth };
    if (master) {
      progress.next('мастер-позитив');
      built.push(prefixed(subject, buildMaster(csg, solid, report, state.mold, options)));
    } else {
      progress.next('гипсовый блок');
      built.push(...buildBaths(csg, solid, report, state.mold, {
        ...options,
        onPart: (index, total) => {
          // первую деталь объявил «гипсовый блок» — дальше по одной
          if (index > 0) progress.next(`деталь ${index + 1} из ${total}`);
        },
      }).map((item) => prefixed(subject, item)));
    }
  }

  const parts = built.map((item) => part(item.id, item.label, sizeNote(item.mesh), item.mesh, []));
  if (!forExport) return parts;

  progress.next('проверка мешей');
  return parts.map((item, index) => ({
    ...item,
    blocking: assessExport(validateMesh(built[index].mesh), true).blocking,
  }));
}

/**
 * Детали формы крышки помечаются, чтобы не путались с деталями формы тела:
 * половина A есть и там и там, а имена файлов должны различаться.
 */
function prefixed(subject: MoldSubject, item: MoldPartMesh): MoldPartMesh {
  if (!subject.id) return item;
  return {
    id: `${subject.id}-${item.id}`,
    label: `Крышка — ${item.label.toLowerCase()}`,
    mesh: item.mesh,
  };
}

function part(
  id: string,
  label: string,
  note: string,
  mesh: SurfaceMesh,
  blocking: string[],
): JobPart {
  return {
    id,
    label,
    note,
    positions: mesh.positions,
    indices: mesh.indices,
    normals: mesh.normals,
    blocking,
  };
}

/**
 * Габарит детали — единственное, что нужно от меша списку деталей. Своим
 * проходом по вершинам, а не полной проверкой меша: та стоит в разы дороже,
 * а для превью её вердикт всё равно не показывается.
 */
function sizeNote(mesh: SurfaceMesh): string {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < mesh.positions.length; i += 3) {
    for (let axis = 0; axis < 3; axis++) {
      const value = mesh.positions[i + axis];
      if (value < min[axis]) min[axis] = value;
      if (value > max[axis]) max[axis] = value;
    }
  }
  return `${max.map((value, axis) => Math.round(value - min[axis])).join('×')} мм`;
}

/**
 * Устье изделия для литейной горловины: венчик тела вращения плюс всё, что
 * добавили наружу рельеф и оттянутый слив. Носик сюда не входит намеренно —
 * он приставная деталь, и горловину ставят не на него.
 *
 * При крышке горловину сужаем до посадочного цилиндра. Гипс формирует
 * только наружную поверхность, а внутреннюю даёт слив шликера, поэтому
 * цилиндрическую посадку форма сама не отольёт — зато отливка выходит из неё
 * с утолщением у устья ровно по диаметру посадки, и довести полочку по
 * сырому остаётся делом ножа.
 */
function mouthOf(surface: VesselSurface, fit: LidFit | null): Mouth {
  let outward = 0;
  for (let i = 0; i < MOUTH_SAMPLES; i++) {
    const u = (2 * Math.PI * i) / MOUTH_SAMPLES;
    outward = Math.max(outward, surface.depthAt(u, 1) + surface.pullAt(u, 1));
  }
  return {
    zMm: surface.heightMm,
    radiusMm: fit ? fit.seatMm : profileRadius(surface.profile, 1) + Math.max(0, outward),
  };
}

/**
 * Этапы задачи: шкала считает их, подпись говорит, какой идёт сейчас.
 * Этапы идут строго по порядку, поэтому номер считает сам счётчик — а вот
 * общее число может уточниться по ходу, когда станет известна схема разъёма.
 */
class Progress {
  private step = 0;

  constructor(private readonly jobId: number, public total: number) {}

  next(label: string): void {
    send({ type: 'progress', jobId: this.jobId, step: this.step++, total: this.total, label });
  }
}

function send(message: WorkerOut, transfer: Transferable[] = []): void {
  postMessage(message, { transfer });
}

/** Буферы всех мешей ответа — их переносим в главный поток без копирования. */
function transferable(parts: JobPart[]): Transferable[] {
  const list: Transferable[] = [];
  for (const item of parts) {
    for (const view of [item.positions, item.indices, item.normals]) {
      // SharedArrayBuffer не переносится — но его у нас и не бывает
      if (view.buffer instanceof ArrayBuffer) list.push(view.buffer);
    }
  }
  return list;
}

/**
 * Проверяем только форму сообщения, а не список видов задач: перечислять их
 * здесь второй раз — значит однажды забыть дописать. Незнакомый вид разберёт
 * `run` и ответит ошибкой; молчать в ответ нельзя ни на что — клиент ждёт
 * ровно одного ответа на задачу и без него встанет навсегда.
 */
function isJobMessage(data: unknown): data is WorkerIn {
  if (typeof data !== 'object' || data === null) return false;
  if (!('jobId' in data) || typeof data.jobId !== 'number') return false;
  if (!('job' in data) || typeof data.job !== 'object' || data.job === null) return false;
  return 'kind' in data.job && typeof data.job.kind === 'string';
}
