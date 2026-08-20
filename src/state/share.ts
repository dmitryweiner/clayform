// Состояние в ссылке: #s=<base64url от JSON>. Ссылку мог править человек,
// поэтому декодирование всегда проходит через sanitizeState и никогда не
// бросает — в худшем случае откроется состояние по умолчанию.

import type { AppState } from './schema';
import { sanitizeState } from './schema';

export function b64urlEncode(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function b64urlDecode(token: string): string {
  const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4 ? '='.repeat(4 - (base64.length % 4)) : '';
  const binary = atob(base64 + padding);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
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
