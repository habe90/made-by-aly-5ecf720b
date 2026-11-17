'use client';

import {useEffect, useRef, useState} from 'react';

// Boji originalnu fotografiju haljine u odabranu boju direktno u browseru (bez novih slika).
// Maska (bijelo = haljina) određuje šta se boji; sjene i tekstura tkanine ostaju iz originala (Lab prostor boja).

const WH = [0.95047, 1, 1.08883];
const toLin = new Float32Array(256).map((_, i) => { const c = i / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
const N = 4096;
const toSrgb = new Uint8ClampedArray(N + 1).map((_, i) => { const c = i / N; return Math.round((c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055) * 255); });
const f = t => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
const fi = t => (t > 0.206893 ? t * t * t : (t - 16 / 116) / 7.787);

function rgbToLab(r, g, b) {
  const R = toLin[r], G = toLin[g], B = toLin[b];
  const x = f((0.4124 * R + 0.3576 * G + 0.1805 * B) / WH[0]);
  const y = f(0.2126 * R + 0.7152 * G + 0.0722 * B);
  const z = f((0.0193 * R + 0.1192 * G + 0.9505 * B) / WH[2]);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}
function labToRgb(L, a, b, out, o) {
  const fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - b / 200;
  const X = fi(fx) * WH[0], Y = fi(fy), Z = fi(fz) * WH[2];
  const lin = [3.2406 * X - 1.5372 * Y - 0.4986 * Z, -0.9689 * X + 1.8758 * Y + 0.0415 * Z, 0.0557 * X - 0.204 * Y + 1.057 * Z];
  for (let k = 0; k < 3; k++) out[o + k] = toSrgb[Math.round(Math.min(1, Math.max(0, lin[k])) * N)];
}
const hexToRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));

function loadImage(src) {
  return new Promise((resolve, reject) => { const im = new Image(); im.decoding = 'async'; im.onload = () => resolve(im); im.onerror = reject; im.src = src; });
}

export default function RecolorCanvas({src, mask, hex, alt}) {
  const canvas = useRef(null);
  const data = useRef(null);
  const [ready, setReady] = useState(false);

  // Jednom: učitaj fotografiju i masku, pripremi Lab vrijednosti piksela haljine.
  useEffect(() => {
    let alive = true;
    Promise.all([loadImage(src), loadImage(mask)]).then(([img, msk]) => {
      if (!alive) return;
      const w = img.naturalWidth, h = img.naturalHeight;
      const tmp = document.createElement('canvas'); tmp.width = w; tmp.height = h;
      const ctx = tmp.getContext('2d', {willReadFrequently: true});
      ctx.drawImage(img, 0, 0); const orig = ctx.getImageData(0, 0, w, h);
      ctx.clearRect(0, 0, w, h); ctx.drawImage(msk, 0, 0, w, h); const m = ctx.getImageData(0, 0, w, h).data;
      const idx = [], alpha = [];
      for (let p = 0; p < w * h; p++) { const v = m[p * 4]; if (v > 3) { idx.push(p); alpha.push(v / 255); } }
      const n = idx.length, L = new Float32Array(n), A = new Float32Array(n), B = new Float32Array(n);
      const hist = new Uint32Array(101); const o = orig.data;
      for (let i = 0; i < n; i++) {
        const p = idx[i] * 4; const lab = rgbToLab(o[p], o[p + 1], o[p + 2]);
        L[i] = lab[0]; A[i] = lab[1]; B[i] = lab[2];
        if (alpha[i] > 0.5) hist[Math.max(0, Math.min(100, Math.round(lab[0])))]++;
      }
      let total = 0; for (const c of hist) total += c;
      let acc = 0, Lm = 50; for (let i = 0; i <= 100; i++) { acc += hist[i]; if (acc >= total / 2) { Lm = i; break; } }
      data.current = {w, h, orig, idx: Int32Array.from(idx), alpha: Float32Array.from(alpha), L, A, B, Lm};
      canvas.current.width = w; canvas.current.height = h;
      setReady(true);
    }).catch(() => {});
    return () => { alive = false; };
  }, [src, mask]);

  // Na svaku promjenu boje: ponovo oboji samo piksele haljine.
  useEffect(() => {
    const d = data.current;
    if (!ready || !d || !hex) return;
    const [Lt, at, bt] = rgbToLab(...hexToRgb(hex));
    const k = 0.55 + 0.45 * Math.min(Lt, 100 - Lt) / 50;
    const out = new ImageData(new Uint8ClampedArray(d.orig.data), d.w, d.h);
    const px = out.data, rgb = [0, 0, 0];
    for (let i = 0; i < d.idx.length; i++) {
      const L = Math.min(100, Math.max(0, Lt + (d.L[i] - d.Lm) * k));
      labToRgb(L, at + d.A[i] * 0.15, bt + d.B[i] * 0.15, rgb, 0);
      const p = d.idx[i] * 4, m = d.alpha[i];
      px[p] = px[p] * (1 - m) + rgb[0] * m;
      px[p + 1] = px[p + 1] * (1 - m) + rgb[1] * m;
      px[p + 2] = px[p + 2] * (1 - m) + rgb[2] * m;
    }
    canvas.current.getContext('2d').putImageData(out, 0, 0);
  }, [ready, hex]);

  return <>
    {!ready && <img src={src} alt={alt}/>}
    <canvas ref={canvas} role="img" aria-label={alt} style={ready ? undefined : {display: 'none'}}/>
  </>;
}
