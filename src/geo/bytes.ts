// Base64 без atob/btoa: нужен и в воркере, и в vitest, и в главном потоке,
// а ядро не должно зависеть от того, что есть в окружении. Картинки в
// состоянии (орнамент накатки, лого, картинка на боку) хранятся так.

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/** Байты → base64. */
export function encodeBase64(bytes: Uint8Array): string {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i];
    const b = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const c = i + 2 < bytes.length ? bytes[i + 2] : 0;
    const n = (a << 16) | (b << 8) | c;
    out += CHARS[(n >> 18) & 63] + CHARS[(n >> 12) & 63];
    out += i + 1 < bytes.length ? CHARS[(n >> 6) & 63] : '=';
    out += i + 2 < bytes.length ? CHARS[n & 63] : '=';
  }
  return out;
}

/** base64 → байты; null, если в строке чужие символы или длина невозможна. */
export function decodeBase64(text: string): Uint8Array | null {
  const body = text.replace(/=+$/, '');
  if (body.length % 4 === 1) return null;
  const out = new Uint8Array(Math.floor((body.length * 3) / 4));
  let bits = 0;
  let value = 0;
  let index = 0;
  for (const ch of body) {
    const digit = CHARS.indexOf(ch);
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
