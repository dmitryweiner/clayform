import { encodeBase64, decodeBase64 } from '../src/geo/bytes';

describe('base64', () => {
  it('совпадает с эталоном Node и переживает раунд-трип любой длины', () => {
    for (let n = 0; n < 40; n++) {
      const bytes = Uint8Array.from({ length: n }, (_, i) => (i * 97 + n * 13) & 255);
      const standard = encodeBase64(bytes);
      expect(standard).toBe(Buffer.from(bytes).toString('base64'));
      expect(encodeBase64(bytes, 'url')).toBe(Buffer.from(bytes).toString('base64url'));
      expect(decodeBase64(standard)).toEqual(bytes);
      expect(decodeBase64(encodeBase64(bytes, 'url'), 'url')).toEqual(bytes);
    }
  });

  it('мусор — null, а не исключение', () => {
    expect(decodeBase64('ab$d')).toBeNull();
    expect(decodeBase64('abcde')).toBeNull();
    expect(decodeBase64('-_', 'standard')).toBeNull();
  });
});
