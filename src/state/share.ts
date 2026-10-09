// Состояние в ссылке: #s=<base64url от JSON>. Ссылку мог править человек,
// поэтому декодирование всегда проходит через sanitizeState и никогда не
// бросает — в худшем случае откроется состояние по умолчанию.

import type { AppState } from './schema';
import { sanitizeState } from './schema';
import { encodeBase64, decodeBase64 } from '../geo/bytes';

export function b64urlEncode(text: string): string {
  return encodeBase64(new TextEncoder().encode(text), 'url');
}

/** Бросает на нечитаемом токене — decodeStateToken это и ловит. */
export function b64urlDecode(token: string): string {
  const bytes = decodeBase64(token, 'url');
  if (!bytes) throw new Error('токен не base64url');
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

export function encodeStateToken(state: AppState): string {
  return b64urlEncode(JSON.stringify(state));
}

/** null — токен нечитаем; иначе всегда валидное состояние. */
export function decodeStateToken(token: string): AppState | null {
  try {
    return sanitizeState(JSON.parse(b64urlDecode(token)));
  } catch {
    return null;
  }
}

/** Достаёт токен из строки вида «#s=…» (или полного хэша URL). */
export function tokenFromHash(hash: string): string | null {
  const match = hash.match(/#s=([A-Za-z0-9\-_]+)/);
  return match ? match[1] : null;
}
