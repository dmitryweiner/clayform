// Сообщения ядра и воркера пользователю — кодом и параметрами, а не фразой
// (`Message` кита, `maker-kit/core/message`). Ядро не знает языка (и воркер
// тоже: язык может смениться посреди задачи), текст из кода делает интерфейс
// (`tm` в src/i18n). Каждый код обязан быть ключом словаря — это проверяет
// tsc в самом `tm`.

import type { Message as KitMessage } from 'maker-kit/core/message';
import type { KitKey } from 'maker-kit/i18n/index';

export type MessageCode =
  // клеймо на дне (mark)
  | 'mark.tooLong'
  | 'mark.noRoom'
  // вогнутое дно (concave)
  | 'concave.tooDeep'
  | 'concave.noRoom'
  // этапы задач воркера
  | 'progress.loading'
  | 'progress.vessel'
  | 'progress.lid'
  | 'progress.checkMeshes';

/** Свои коды и китовые: сито экспорта говорит `kit.mesh.*`. */
export type Message = KitMessage<MessageCode | KitKey>;
