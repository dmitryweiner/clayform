// Сообщения ядра и воркера пользователю — кодом и параметрами, а не фразой.
// Ядро не знает языка (и воркер тоже: язык может смениться посреди задачи),
// текст из кода делает интерфейс (`tm` в src/i18n). Каждый код обязан быть
// ключом словаря — это проверяет tsc в самом `tm`.

export type MessageCode =
  // схема разъёма формы (mold/analyze)
  | 'mold.whyHandle'
  | 'mold.whySpout'
  | 'mold.whyWider'
  | 'mold.dropout'
  | 'mold.wideBase'
  | 'mold.narrowBase'
  | 'mold.markBase'
  | 'mold.undercutsAngular'
  | 'mold.undercutsRadial'
  | 'press.undercut'
  // клеймо на дне (mark)
  | 'mark.tooLong'
  | 'mark.noRoom'
  // проверка меша перед выгрузкой (validate)
  | 'mesh.nonFinite'
  | 'mesh.badIndices'
  | 'mesh.empty'
  | 'mesh.flat'
  | 'mesh.open'
  | 'mesh.inverted'
  | 'mesh.degenerate'
  // этапы задач воркера
  | 'progress.loading'
  | 'progress.vessel'
  | 'progress.lid'
  | 'progress.checkMeshes'
  | 'progress.slump'
  | 'progress.punch'
  | 'progress.analyze'
  | 'progress.master'
  | 'progress.block'
  | 'progress.part';

export interface Message {
  code: MessageCode;
  params?: Readonly<Record<string, string | number>>;
}
