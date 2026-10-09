// Base64 без atob/btoa: нужен и в воркере, и в vitest, и в главном потоке,
// а ядро не должно зависеть от того, что есть в окружении. Алфавит
// выбирается: стандартный — для картинки в состоянии, url-safe — для ссылки.

const STANDARD = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const URL_SAFE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

export type Base64Alphabet = 'standard' | 'url';

const table = (alphabet: Base64Alphabet): string => (alphabet === 'url' ? URL_SAFE : STANDARD);

/** Байты → base64. url-safe — без «=» в конце: в ссылке они лишние. */
export function encodeBase64(bytes: Uint8Array, alphabet: Base64Alphabet = 'standard'): string {
  const chars = table(alphabet);
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i];
    const b = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const c = i + 2 < bytes.length ? bytes[i + 2] : 0;
    const n = (a << 16) | (b << 8) | c;
    out += chars[(n >> 18) & 63] + chars[(n >> 12) & 63];
    out += i + 1 < bytes.length ? chars[(n >> 6) & 63] : '';
    out += i + 2 < bytes.length ? chars[n & 63] : '';
  }
  if (alphabet === 'standard') out += '='.repeat((3 - (bytes.length % 3)) % 3);
  return out;
}

/** base64 → байты; null, если в строке чужие символы или длина невозможна. */
export function decodeBase64(text: string, alphabet: Base64Alphabet = 'standard'): Uint8Array | null {
  const chars = table(alphabet);
  const body = text.replace(/=+$/, '');
  if (body.length % 4 === 1) return null;
  const out = new Uint8Array(Math.floor((body.length * 3) / 4));
  let bits = 0;
  let value = 0;
  let index = 0;
  for (const ch of body) {
    const digit = chars.indexOf(ch);
    if (digit < 0) return null;
    value = (value << 6) | digit;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out[index++] = (value >> bits) & 255;
    }
  }
  return out;
}
