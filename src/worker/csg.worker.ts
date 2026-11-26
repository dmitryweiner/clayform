// Весь CSG приложения. Главный поток сюда только шлёт состояние и получает
// готовые меши: WASM-модуль manifold (~2 МБ) в главный поток не попадает
// вовсе, и вкладка не замирает даже на экспорте изделия с ручкой в 384
// сегмента. Оснастку (формы, ванночки, отминку) строит cast-builder по
// выгруженному STL — здесь только само изделие.
//
// Внутри — ровно те же вызовы ядра, что раньше стояли в main.ts. Никакого
// DOM и никакого Three.js: воркер видит только чистую геометрию. Очередь,
// ответы и время задачи — китовые (`serveJobs`); мост к manifold — тоже
// (`maker-kit/csg/manifold`).

import type { CsgApi } from 'maker-kit/csg/manifold';
import { initCSG } from 'maker-kit/csg/manifold';
import type { SurfaceMesh } from 'maker-kit/3d/mesh';
import { mergeMeshes } from '../geo/surface';
import { placeInRow, LID_BESIDE_GAP_MM } from '../geo/layout';
import { buildProfile } from '../geo/profiles';
import type { LidFit } from '../geo/lid';
import { lidFit, lidSeat, buildLidMesh } from '../geo/lid';
import { buildPrintableVessel } from '../geo/assemble';
import { validateMesh, assessExport } from 'maker-kit/3d/validate';
import type { AppState } from '../state/schema';
import { sanitizeState, toBuildParams, effectiveSpout, lidRelief } from '../state/schema';
import type { MarkRaster } from '../geo/mark';
import { sanitizeMarkRaster } from '../geo/mark';
import type { TextRaster } from 'maker-kit/core/raster';
import { isTextRaster } from 'maker-kit/core/raster';
import type { Message } from '../geo/message';
import type { JobProgress } from 'maker-kit/core/progress';
import { serveJobs } from 'maker-kit/worker/serve';
import type { CsgJob, JobPart } from './protocol';
import { isCsgJob } from './protocol';

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

serveJobs<CsgJob, JobPart[]>({
  isJob: isCsgJob,
  async handle(job, progress) {
    if (!loaded) progress({ step: 0, total: 1, label: { code: 'progress.loading' } });
    const parts = run(await ready, progress, job);
    // Буферы переносим, а не копируем: на 384 сегментах это десятки мегабайт.
    return { result: parts, transfer: transferable(parts) };
  },
});

/**
 * Растр строки клейма текущей задачи. Задачи идут строго по одной, поэтому
 * он живёт здесь, а не тянется параметром через каждую сборку.
 */
let markStrip: MarkRaster | null = null;
/** Растр текста на боку текущей задачи — по той же причине. */
let sideText: TextRaster | null = null;

function run(csg: CsgApi, report: Report, job: CsgJob): JobPart[] {
  // Граница воркера — такая же внешняя граница, как файл пресета или UI.
  const state = sanitizeState(job.state);
  markStrip = sanitizeMarkRaster(job.markStrip);
  sideText = isTextRaster(job.sideText) ? job.sideText : null;
  if (job.kind === 'vessel-preview') {
    return [vesselPart(csg, report, state, job.segments)];
  }
  if (job.kind === 'export') {
    return vesselParts(csg, report, state, state.resolution);
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
 * стенку. Ровно это уходит в STL — и ровно это показывает превью, когда
 * пользователь остановился. Сплошной мастер для оснастки cast-builder
 * заливает из него сам.
 */
function printableVessel(csg: CsgApi, state: AppState, segments: number, fine = false): SurfaceMesh {
  const fit = fitOf(state);
  return buildPrintableVessel(
    csg,
    { ...toBuildParams(state, segments, { markStrip, sideText }), decalFine: fine },
    state.hollow,
    state.handle,
    effectiveSpout(state),
    fit ? lidSeat(fit) : undefined,
  ).mesh;
}

/**
 * Точная сборка изделия для превью. Меш не проверяем: превью проверит себя
 * само в главном потоке — ему к вердикту нужны ещё и свесы с
 * предупреждениями, а меш к тому времени уже там. Крышки здесь нет вовсе:
 * она тело вращения, и главный поток строит её сам, не дожидаясь воркера.
 */
function vesselPart(csg: CsgApi, report: Report, state: AppState, segments: number): JobPart {
  const progress = new Progress(report, 1);
  progress.next({ code: 'progress.vessel' });
  return part(state.family, '', printableVessel(csg, state, segments), []);
}

/**
 * Что уходит в STL: само изделие и, если она есть, крышка — в печатном
 * положении, юбкой вниз на столе, отдельным файлом или «рядом» одним.
 * Меши проверяем: от вердикта зависит, выпускать ли файл.
 */
function vesselParts(csg: CsgApi, report: Report, state: AppState, segments: number): JobPart[] {
  const fit = fitOf(state);
  const progress = new Progress(report, fit ? 3 : 2);
  progress.next({ code: 'progress.vessel' });

  // экспорт — тела надписей мелким шагом
  const meshes: { id: string; mesh: SurfaceMesh }[] = [{ id: state.family, mesh: printableVessel(csg, state, segments, true) }];
  if (fit) {
    progress.next({ code: 'progress.lid' });
    const lid = buildLidMesh(fit, state.lid, segments, { relief: lidRelief(state) });
    if (state.lidBeside) {
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
  return meshes.map((item) => part(item.id, sizeNote(item.mesh), item.mesh, assessExport(validateMesh(item.mesh), true).blockers));
}

function part(id: string, note: string, mesh: SurfaceMesh, blockers: Message[]): JobPart {
  return {
    id,
    note,
    positions: mesh.positions,
    indices: mesh.indices,
    normals: mesh.normals,
    blockers,
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

/** Куда задача сообщает ход работ (`serveJobs` шлёт это главному потоку). */
type Report = (progress: JobProgress) => void;

/**
 * Этапы задачи: шкала считает их, подпись говорит, какой идёт сейчас.
 * Этапы идут строго по порядку, поэтому номер считает сам счётчик.
 */
class Progress {
  private step = 0;

  constructor(
    private readonly report: Report,
    private readonly total: number,
  ) {}

  next(label: Message): void {
    this.report({ step: this.step++, total: this.total, label });
  }
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
