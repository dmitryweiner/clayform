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
import { profileRadius } from '../geo/profiles';
import { buildSolidVessel, buildPrintableVessel } from '../geo/assemble';
import type { Mouth } from '../geo/mold';
import { analyzeMold, buildMaster, buildBaths } from '../geo/mold';
import { validateMesh, assessExport } from '../geo/validate';
import type { AppState } from '../state/schema';
import { sanitizeState, toBuildParams } from '../state/schema';
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
    return [vesselPart(csg, jobId, state, job.segments, false)];
  }
  if (job.kind === 'mold-preview') {
    return moldParts(csg, jobId, state, job.segments, false);
  }
  if (job.kind === 'export') {
    return state.exportMode === 'vessel'
      ? [vesselPart(csg, jobId, state, state.resolution, true)]
      : moldParts(csg, jobId, state, state.resolution, true);
  }
  throw new Error('воркер не знает такой задачи');
}

/**
 * Полое изделие целиком: тело, ручки, трубка носика и проход сквозь стенку.
 * Ровно это уходит в STL — и ровно это показывает превью, когда пользователь
 * остановился. Проверяем меш только под экспорт: от вердикта зависит, выпускать
 * ли файл. Превью проверит себя само в главном потоке — ему к вердикту нужны
 * ещё и свесы с предупреждениями, а меш к тому времени уже там.
 */
function vesselPart(
  csg: CsgApi,
  jobId: number,
  state: AppState,
  segments: number,
  validate: boolean,
): JobPart {
  const progress = new Progress(jobId, validate ? 2 : 1);
  progress.at(0, 'сборка изделия');
  const built = buildPrintableVessel(
    csg, toBuildParams(state, segments), state.hollow, state.handle, state.spout,
  );
  if (!validate) return part(state.family, 'Изделие', '', built.mesh, []);

  progress.at(1, 'проверка меша');
  const blocking = assessExport(validateMesh(built.mesh), true).blocking;
  return part(state.family, 'Изделие', '', built.mesh, blocking);
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
  const tail = forExport ? 1 : 0;
  // Пока схема не выбрана, число деталей неизвестно: берём наибольшее
  // возможное. После анализа итог только уменьшается, поэтому шкала может
  // прыгнуть вперёд, но никогда не откатится назад.
  const progress = new Progress(jobId, 2 + (master ? 1 : MAX_MOLD_PARTS) + tail);

  progress.at(0, 'сборка изделия');
  const params = toBuildParams(state, segments);
  const solid = buildSolidVessel(csg, params, state.handle, state.spout);

  progress.at(1, 'анализ разъёма');
  const report = analyzeMold(solid, {
    hasHandle: state.handle.on,
    hasSpout: state.spout.on && state.spout.kind === 'applied',
  });
  progress.total = 2 + (master ? 1 : report.parts.length) + tail;

  const mouth = mouthOf(vesselSurface(params));
  let built;
  if (master) {
    progress.at(2, 'мастер-позитив');
    built = [buildMaster(csg, solid, report, state.mold, { mouth })];
  } else {
    progress.at(2, 'гипсовый блок');
    built = buildBaths(csg, solid, report, state.mold, {
      mouth,
      onPart: (index, total) => progress.at(3 + index, `деталь ${index + 1} из ${total}`),
    });
  }

  const parts = built.map((item) => part(item.id, item.label, sizeNote(item.mesh), item.mesh, []));
  if (!forExport) return parts;

  progress.at(progress.total - 1, 'проверка мешей');
  return parts.map((item, index) => ({
    ...item,
    blocking: assessExport(validateMesh(built[index].mesh), true).blocking,
  }));
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
 */
function mouthOf(surface: VesselSurface): Mouth {
  let outward = 0;
  for (let i = 0; i < MOUTH_SAMPLES; i++) {
    const u = (2 * Math.PI * i) / MOUTH_SAMPLES;
    outward = Math.max(outward, surface.depthAt(u, 1) + surface.pullAt(u, 1));
  }
  return {
    zMm: surface.heightMm,
    radiusMm: profileRadius(surface.profile, 1) + Math.max(0, outward),
  };
}

/** Этапы задачи: шкала считает их, подпись говорит, какой идёт сейчас. */
class Progress {
  constructor(private readonly jobId: number, public total: number) {}

  at(step: number, label: string): void {
    send({ type: 'progress', jobId: this.jobId, step, total: this.total, label });
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
