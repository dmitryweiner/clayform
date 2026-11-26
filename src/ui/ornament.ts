// Картинка-орнамент: файл → оттенки серого не больше 64 по длинной стороне
// (лого клейма — до 128, картинка на боку — до 256). Декодирует и честно
// усредняет импорт картинки кита (`maker-kit/ui/imageImport`): мелкий штрих
// не пропадает между выборками, а сереет. Живёт в главном потоке, потому
// что нужен DOM (декодер картинок и канвас); воркеру приходят уже байты в
// состоянии.

import { flattenGray, importImage } from 'maker-kit/ui/imageImport';
import type { RouletteImage, DecodedImage } from '../geo/roulette';
import { IMAGE_MIN_PX, IMAGE_MAX_PX, decodeImage } from '../geo/roulette';
import { encodeBase64 } from '../geo/bytes';

/**
 * Файл → орнамент. Прозрачное ложится на белое — так картинку видят в любом
 * просмотрщике; совсем узкая картинка тянется до IMAGE_MIN_PX по короткой
 * стороне.
 */
export async function imageFromFile(file: File, maxPx = IMAGE_MAX_PX): Promise<RouletteImage> {
  const picture = await importImage(file, maxPx);
  const gray = flattenGray(picture, 255);
  const w = Math.max(IMAGE_MIN_PX, picture.width);
  const h = Math.max(IMAGE_MIN_PX, picture.height);
  if (w === picture.width && h === picture.height) return { w, h, data: encodeBase64(gray), invert: false };
  // ближайший сосед: тянется только полоска в пару пикселей
  const bytes = new Uint8Array(w * h);
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      bytes[j * w + i] = gray[Math.floor((j * picture.height) / h) * picture.width + Math.floor((i * picture.width) / w)];
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
