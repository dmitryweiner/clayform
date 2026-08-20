// Силуэт изделия на Canvas 2D: сечение r(z) в натуральных пропорциях,
// с подписью габаритов. Мгновенная обратная связь на движение слайдера —
// быстрее, чем ждать пересборку 3D.

import type { ProfileDef } from '../geo/profiles';
import { profileRadius } from '../geo/profiles';

const FILL = 'rgba(217, 139, 95, 0.20)';
const STROKE = '#d98b5f';
const AXIS = 'rgba(164, 148, 138, 0.45)';
const LABEL = '#a4948a';

export function drawProfileGraph(canvas: HTMLCanvasElement, def: ProfileDef): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth || 276;
  const h = canvas.clientHeight || 110;
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const N = 128;
  const rs: number[] = [];
  let rMax = 0;
  for (let i = 0; i <= N; i++) {
    const r = profileRadius(def, i / N);
    rs.push(r);
    if (r > rMax) rMax = r;
  }

  const padX = 8;
  const padTop = 6;
  const padBottom = 16; // место под подпись габаритов
  const scale = Math.min(
    (w - 2 * padX) / (2 * rMax),
    (h - padTop - padBottom) / def.heightMm,
  );
  const cx = w / 2;
  const y0 = h - padBottom;

  ctx.beginPath();
  for (let i = 0; i <= N; i++) {
    const y = y0 - (i / N) * def.heightMm * scale;
    const x = cx + rs[i] * scale;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  for (let i = N; i >= 0; i--) {
    ctx.lineTo(cx - rs[i] * scale, y0 - (i / N) * def.heightMm * scale);
  }
  ctx.closePath();
  ctx.fillStyle = FILL;
  ctx.fill();
  ctx.strokeStyle = STROKE;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.strokeStyle = AXIS;
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(cx, y0);
  ctx.lineTo(cx, y0 - def.heightMm * scale);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = LABEL;
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`⌀${Math.round(rMax * 2)} × ${Math.round(def.heightMm)} мм`, cx, h - 3);
}
