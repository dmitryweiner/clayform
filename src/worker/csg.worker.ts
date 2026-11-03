// Весь CSG приложения. Главный поток сюда только шлёт состояние и получает
// готовые меши: WASM-модуль manifold (~2 МБ) в главный поток не попадает
// вовсе, и вкладка не замирает даже на экспорте изделия с ручкой в 384
// сегмента. Оснастку (формы, ванночки, отминку) строит cast-builder по
// выгруженному STL — здесь только само изделие.
//
// Внутри — ровно те же вызовы ядра, что раньше стояли в main.ts. Никакого
// DOM и никакого Three.js: воркер видит только чистую геометрию.

import type { CsgApi } from '../geo/csg';
import { initCSG } from '../geo/csg';
import type { SurfaceMesh } from '../geo/surface';
import { mergeMeshes } from '../geo/surface';
import { placeInRow, LID_BESIDE_GAP_MM } from '../geo/layout';
import { buildProfile } from '../geo/profiles';
import type { LidFit } from '../geo/lid';
import { lidFit, lidSeat, buildLidMesh, buildLidSolid } from '../geo/lid';
import { buildSolidVessel, buildPrintableVessel } from '../geo/assemble';
import { validateMesh, assessExport } from '../geo/validate';
import type { AppState } from '../state/schema';
import { sanitizeState, toBuildParams, effectiveSpout, lidRelief } from '../state/schema';
import type { MarkRaster } from '../geo/mark';
import { sanitizeMarkRaster } from '../geo/mark';
import type { Message } from '../geo/message';
import type { CsgJob, JobPart, WorkerIn, WorkerOut } from './protocol';

/**
 * WASM грузится сразу при создании воркера, а не по первой задаче: клиент
 * создаёт воркер лениво, но уже в этот момент понятно, что считать придётся.
 */
const ready = initCSG();
/**
 * Догрузился ли модуль. Первая задача ждёт WASM (полмегабайта), и на слабой
 * сети это заметная пауза — о ней говорим полосой, а не молчим.
 */
let loaded = false;
void ready.then(() => {
  loaded = true;
});

addEventListener('message', (event) => {
  if (isJobMessage(event.data)) void handle(event.data);
});

async function handle(message: WorkerIn): Promise<void> {
  const { jobId, job } = message;
  try {
    if (!loaded) send({ type: 'progress', jobId, step: 0, total: 1, label: { code: 'progress.loading' } });
    const parts = run(await ready, jobId, job);
    // Буферы переносим, а не копируем: на 384 сегментах это десятки мегабайт.
    send({ type: 'done', jobId, parts }, transferable(parts));
  } catch (error) {
    send({ type: 'error', jobId, message: error instanceof Error ? error.message : String(error) });
  }
}

/**
 * Растр строки клейма текущей задачи. Задачи идут строго по одной, поэтому
 * он живёт здесь, а не тянется параметром через каждую сборку.
 */
let markStrip: MarkRaster | null = null;

function run(csg: CsgApi, jobId: number, job: CsgJob): JobPart[] {
  // Граница воркера — такая же внешняя граница, как ссылка или UI.
  const state = sanitizeState(job.state);
  markStrip = sanitizeMarkRaster(job.markStrip);
  if (job.kind === 'vessel-preview') {
    return [vesselPart(csg, jobId, state, job.segments)];
  }
  if (job.kind === 'export') {
    return vesselParts(csg, jobId, state, state.resolution);
  }
  throw new Error('the worker does not know this job');
}

/** Посадка под крышку — если крышка включена. */
function fitOf(state: AppState): LidFit | null {
  if (!state.lid.on) return null;
  const profile = buildProfile(state.family, state.shape, state.heightMm);
  return lidFit(profile, state.heightMm, state.hollow, state.lid);
}

/**
 * Изделие целиком: тело, ручки, трубка носика — полое, с проходом сквозь
 * стенку, или сплошное, заготовкой для оснастки в cast-builder. Ровно это
 * уходит в STL — и ровно это показывает превью, когда пользователь
 * остановился.
 */
function printableVessel(csg: CsgApi, state: AppState, segments: number): SurfaceMesh {
  if (state.solid) return buildSolidVessel(csg, toBuildParams(state, segments, markStrip), state.handle, effectiveSpout(state));
  const fit = fitOf(state);
  return buildPrintableVessel(
    csg, toBuildParams(state, segments, markStrip), state.hollow, state.handle, effectiveSpout(state),
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
  progress.next({ code: 'progress.vessel' });
  return part(state.family, '', printableVessel(csg, state, segments), []);
}

/**
 * Что уходит в STL: само изделие и, если она есть, крышка — отдельным
 * файлом и в печатном положении, юбкой вниз на столе. Сплошная крышка —
 * позитив для оснастки: перевёрнутая юбкой вверх, как её кладут в форму
 * (торец юбки — устье, в него льют шликер), и всегда отдельным файлом —
 * в одном STL с изделием cast-builder принял бы их за одну модель.
 * Меши проверяем: от вердикта зависит, выпускать ли файл.
 */
function vesselParts(csg: CsgApi, jobId: number, state: AppState, segments: number): JobPart[] {
  const fit = fitOf(state);
  const progress = new Progress(jobId, fit ? 3 : 2);
  progress.next({ code: 'progress.vessel' });

  const meshes: { id: string; mesh: SurfaceMesh }[] = [
    { id: state.family, mesh: printableVessel(csg, state, segments) },
  ];
  if (fit) {
    progress.next({ code: 'progress.lid' });
    const lid = state.solid
      ? buildLidSolid(fit, state.lid, segments, { upsideDown: true, relief: lidRelief(state) })
      : buildLidMesh(fit, state.lid, segments, { relief: lidRelief(state) });
    if (state.lidBeside && !state.solid) {
      // Один файл на двоих: печатают за один заход. Две замкнутые
      // компоненты в одном меше — законный STL, проверка его принимает.
      meshes[0] = {
        id: state.family,
        mesh: mergeMeshes(placeInRow([[meshes[0].mesh], [lid]], LID_BESIDE_GAP_MM).flat()),
      };
    } else {
      meshes.push({ id: 'lid', mesh: lid });
    }
  }

  progress.next({ code: 'progress.checkMeshes' });
  return meshes.map((item) => part(
    item.id, sizeNote(item.mesh), item.mesh,
    assessExport(validateMesh(item.mesh), true).blocking,
  ));
}

function part(
  id: string,
  note: string,
  mesh: SurfaceMesh,
  blocking: Message[],
): JobPart {
  return {
    id,
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
  return max.map((value, axis) => Math.round(value - min[axis])).join('×');
}

/**
 * Этапы задачи: шкала считает их, подпись говорит, какой идёт сейчас.
 * Этапы идут строго по порядку, поэтому номер считает сам счётчик.
 */
class Progress {
  private step = 0;

  constructor(private readonly jobId: number, private readonly total: number) {}

  next(label: Message): void {
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
