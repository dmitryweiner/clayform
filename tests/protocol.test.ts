// Граница CSG-воркера: `serveJobs` кита отвечает ошибкой на задачу, которую
// не взяла проверка, — значит, проверка должна быть настоящей.

import { isCsgJob } from '../src/worker/protocol';
import { defaultState } from '../src/state/schema';

describe('isCsgJob', () => {
  it('берёт превью и экспорт', () => {
    const state = defaultState();
    expect(isCsgJob({ kind: 'vessel-preview', state, segments: 128 })).toBe(true);
    expect(isCsgJob({ kind: 'export', state, markStrip: null })).toBe(true);
    expect(isCsgJob({ kind: 'export', state, markStrip: { w: 4, h: 2, data: 'AAAA' } })).toBe(true);
  });

  it('отвергает мусор, чужой вид задачи и превью без детализации', () => {
    const state = defaultState();
    for (const job of [
      null,
      42,
      [],
      { kind: 'export' },
      { kind: 'export', state: 'x' },
      { kind: 'mold', state },
      { kind: 'vessel-preview', state },
      { kind: 'vessel-preview', state, segments: Number.NaN },
      { kind: 'export', state, markStrip: 'png' },
    ]) {
      expect(isCsgJob(job), JSON.stringify(job)).toBe(false);
    }
  });
});
