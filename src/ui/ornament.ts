// Картинка-орнамент: файл → оттенки серого не больше 64 по длинной стороне.
// Живёт в главном потоке, потому что нужен DOM (декодер картинок и канвас);
// воркеру приходят уже байты в состоянии.

import type { RouletteImage, DecodedImage } from '../geo/roulette';
import { IMAGE_MIN_PX, IMAGE_MAX_PX, decodeImage } from '../geo/roulette';
import { encodeBase64 } from '../geo/bytes';

/** До такого размера картинку сначала уменьшает браузер — дальше усредняем сами. */
const SOURCE_MAX_PX = 512;

/**
 * Файл → орнамент. Прозрачное ложится на белое (так картинку видят в любом
 * просмотрщике), яркость — по Rec. 601, уменьшение — честным усреднением по
 * ячейкам: мелкий штрих не пропадает между выборками, а сереет.
 */
export async function imageFromFile(file: File): Promise<RouletteImage> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, SOURCE_MAX_PX / Math.max(bitmap.width, bitmap.height));
  const sw = Math.max(1, Math.round(bitmap.width * scale));
  const sh = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('канвас недоступен');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, sw, sh);
  ctx.drawImage(bitmap, 0, 0, sw, sh);
  bitmap.close();
  const source = ctx.getImageData(0, 0, sw, sh).data;

  const long = Math.max(sw, sh);
  const target = Math.min(IMAGE_MAX_PX, long);
  const fit = (side: number): number =>
    Math.min(IMAGE_MAX_PX, Math.max(IMAGE_MIN_PX, Math.round((side / long) * target)));
  const w = fit(sw);
  const h = fit(sh);

  const bytes = new Uint8Array(w * h);
  for (let j = 0; j < h; j++) {
    const y0 = Math.floor((j * sh) / h);
    const y1 = Math.max(y0 + 1, Math.floor(((j + 1) * sh) / h));
    for (let i = 0; i < w; i++) {
      const x0 = Math.floor((i * sw) / w);
      const x1 = Math.max(x0 + 1, Math.floor(((i + 1) * sw) / w));
      let sum = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const k = (y * sw + x) * 4;
          sum += 0.299 * source[k] + 0.587 * source[k + 1] + 0.114 * source[k + 2];
        }
      }
      bytes[j * w + i] = Math.round(sum / ((y1 - y0) * (x1 - x0)));
    }
  }
  return { w, h, data: encodeBase64(bytes), invert: false };
}

/**
 * Миниатюра — то, что ляжет на стенку: с учётом инверсии, белое — глубина.
 * Пустой канвас, если картинки нет.
 */
export function drawOrnament(canvas: HTMLCanvasElement, image: RouletteImage | undefined): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const decoded: DecodedImage | null = image ? decodeImage(image) : null;
  if (!decoded) return;
  const { w, h, pixels, invert } = decoded;
  const cell = Math.min(canvas.width / w, canvas.height / h);
  const ox = (canvas.width - cell * w) / 2;
  const oy = (canvas.height - cell * h) / 2;
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const value = invert ? 255 - pixels[j * w + i] : pixels[j * w + i];
      ctx.fillStyle = `rgb(${value},${value},${value})`;
      ctx.fillRect(ox + i * cell, oy + j * cell, Math.ceil(cell), Math.ceil(cell));
    }
  }
}
