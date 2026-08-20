// История отмены/повтора.

import { History } from '../src/state/history';

describe('History', () => {
  it('в начале отменять и повторять нечего', () => {
    const history = new History({ a: 1 });
    expect(history.canUndo).toBe(false);
    expect(history.canRedo).toBe(false);
    expect(history.undo()).toBeNull();
    expect(history.redo()).toBeNull();
  });

  it('отменяет и повторяет по шагам', () => {
    const history = new History({ n: 0 });
    history.push({ n: 1 });
    history.push({ n: 2 });
    expect(history.value).toEqual({ n: 2 });
    expect(history.undo()).toEqual({ n: 1 });
    expect(history.undo()).toEqual({ n: 0 });
    expect(history.canUndo).toBe(false);
    expect(history.redo()).toEqual({ n: 1 });
    expect(history.redo()).toEqual({ n: 2 });
    expect(history.canRedo).toBe(false);
  });

  it('повторение того же состояния не засоряет историю', () => {
    const history = new History({ n: 0 });
    history.push({ n: 1 });
    history.push({ n: 1 });
    history.push({ n: 1 });
    expect(history.undo()).toEqual({ n: 0 });
    expect(history.canUndo).toBe(false);
  });

  it('сравнение по значению, а не по ссылке', () => {
    const history = new History({ shape: { d: 10 } });
    history.push({ shape: { d: 10 } });
    expect(history.canUndo).toBe(false);
  });

  it('новое действие после отмены обрубает будущее', () => {
    const history = new History({ n: 0 });
    history.push({ n: 1 });
    history.push({ n: 2 });
    history.undo();
    history.push({ n: 9 });
    expect(history.canRedo).toBe(false);
    expect(history.undo()).toEqual({ n: 1 });
  });

  it('replace меняет состояние, не создавая записи', () => {
    const history = new History({ n: 0 });
    history.push({ n: 1 });
    history.replace({ n: 5 });
    expect(history.value).toEqual({ n: 5 });
    expect(history.undo()).toEqual({ n: 0 });
  });

  it('длинная сессия не растит стек без предела', () => {
    const history = new History({ n: 0 }, 5);
    for (let i = 1; i <= 50; i++) history.push({ n: i });
    let steps = 0;
    while (history.canUndo) {
      history.undo();
      steps++;
    }
    expect(steps).toBe(5);
  });
});
