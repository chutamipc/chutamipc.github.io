// Motor de los videos animados: linea de tiempo (GSAP), personaje, objetos y efectos.
// Cada video arma su guion sobre TL; el grabador llama a window.__seek(t) cuadro por cuadro.
gsap.registerPlugin(MotionPathPlugin, CustomEase, CustomWiggle, CustomBounce, DrawSVGPlugin);
const TL = gsap.timeline({ paused: true });
window.__sonidos = []; window.__cortes = []; window.__dur = 0;
window.__seek = t => { TL.time(t, false); };
let _semilla = 20261113;
function rnd() { _semilla = _semilla + 0x6D2B79F5 | 0; let t = Math.imul(_semilla ^ _semilla >>> 15, 1 | _semilla); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
const R = (a, b) => a + (b - a) * rnd();
const S = (nombre, t, g = 1) => window.__sonidos.push([nombre, Math.round(t * 1000) / 1000, g]);
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const O = '#141C2F', IMG = '../../redes';
const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';
const WA = `<svg viewBox="0 0 24 24"><path d="${WA_PATH}"/></svg>`;
const CHECK = '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>';
const NUM = '096 252 9610';

// ---------------------------------------------------------------- estructura
function montar(dur) {
  window.__dur = dur;
  const esc = $('#esc');
  esc.insertAdjacentHTML('beforeend', `<div id="fx"></div><div id="capa"></div><div class="sello"><img src="${IMG}/mascota.png" alt=""><span>Chuta, Mi PC!</span></div>`);
  TL.set({}, {}, dur);        // la linea de tiempo dura exactamente lo que el video
}
function escena(sel, t0, t1) {
  gsap.set(sel, { autoAlpha: 0 });
  TL.set(sel, { autoAlpha: 1 }, t0);
  if (t1 != null && t1 < window.__dur) TL.set(sel, { autoAlpha: 0 }, t1);
}
// ---------------------------------------------------------------- transiciones
function cortina(t, color = '#FF8A00') {
  const c = document.createElement('i');
  Object.assign(c.style, { position: 'absolute', top: '-12%', left: '0', width: '190%', height: '124%', background: color, boxShadow: '90px 0 0 #fff,-90px 0 0 #0E1A33', zIndex: 75 });
  $('#capa').appendChild(c);
  gsap.set(c, { xPercent: -160, skewX: -12 });
  TL.to(c, { xPercent: 110, duration: .5, ease: 'power3.inOut' }, t - .25);
  S('soplo', t - .22); window.__cortes.push(t);
}
function destello(t, color = '#fff', d = .32) {
  const c = document.createElement('i');
  Object.assign(c.style, { position: 'absolute', inset: '0', background: color, zIndex: 76 });
  $('#capa').appendChild(c);
  gsap.set(c, { autoAlpha: 0 });
  TL.to(c, { autoAlpha: 1, duration: d * .3, ease: 'power2.in' }, t - d * .3).to(c, { autoAlpha: 0, duration: d * .7, ease: 'power2.out' }, t);
  window.__cortes.push(t);
}
function zoomCorte(t, sale, entra) {       // la escena que sale se acerca de golpe y la que entra cae desde lejos
  if (sale) TL.to(sale, { scale: 1.9, duration: .22, ease: 'power3.in' }, t - .22);
  if (entra) TL.from(entra, { scale: .55, duration: .38, ease: 'back.out(1.6)' }, t);
  destello(t, '#fff', .26); S('soplo', t - .2);
}
function sacudir(t, f = 24, d = .45) {
  const k = [], n = Math.max(3, Math.round(d / .045));
  for (let i = 0; i < n; i++) { const a = f * (1 - i / n); k.push({ x: R(-a, a), y: R(-a, a), rotation: R(-a, a) * .035, duration: d / (n + 1) }); }
  k.push({ x: 0, y: 0, rotation: 0, duration: d / (n + 1) });
  TL.to('#cam', { keyframes: k, ease: 'none' }, t);
}
function camara(t, o) { TL.to('#zoom', Object.assign({ duration: 1, ease: 'power2.inOut' }, o), t); }

// ---------------------------------------------------------------- textos
function partir(sel) {
  $$(sel).forEach(el => {
    if (el.dataset.partido) return; el.dataset.partido = 1;
    const rec = n => [...n.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const f = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(p => { if (!p) return; if (/^\s+$/.test(p)) f.appendChild(document.createTextNode(' ')); else { const s = document.createElement('span'); s.className = 'w'; s.textContent = p; f.appendChild(s); } });
        n.replaceChild(f, c);
      } else if (c.nodeType === 1 && c.tagName !== 'BR') { if (c.classList.contains('placa') || c.classList.contains('chip') || c.classList.contains('nw')) c.classList.add('w'); else rec(c); }
    });
    rec(el);
  });
  return $$(sel + ' .w');
}
function texto(sel, t, o = {}) {            // las palabras entran saltando una tras otra
  const ws = partir(sel), st = o.st ?? .07;
  TL.from(ws, { y: o.y ?? 90, opacity: 0, scale: o.scale ?? .4, rotation: o.rot ?? -8, duration: o.d ?? .36, ease: 'back.out(2.6)', stagger: st }, t);
  if (o.son !== false) ws.forEach((w, i) => { if (i % 2 === 0) S('pop', t + i * st, .55); });
  return t + ws.length * st + .3;
}
function golpe(sel, t, o = {}) {            // cae de golpe desde la camara y sacude
  TL.from(sel, { scale: o.de ?? 3.2, opacity: 0, rotation: o.rot ?? 0, duration: .26, ease: 'power4.in' }, t);
  TL.to(sel, { keyframes: [{ scale: .9, duration: .07 }, { scale: 1.06, duration: .09 }, { scale: 1, duration: .1 }] }, t + .26);
  if (o.sacude !== false) sacudir(t + .26, o.f ?? 26, .4);
  S('golpe', t + .24, o.g ?? 1);
}
function entra(sel, t, o = {}) { TL.from(sel, Object.assign({ y: 160, opacity: 0, duration: .45, ease: 'back.out(1.8)' }, o), t); }
function sale(sel, t, o = {}) { TL.to(sel, Object.assign({ y: -140, opacity: 0, duration: .28, ease: 'power2.in' }, o), t); }
function pop(sel, t, o = {}) { TL.from(sel, Object.assign({ scale: 0, opacity: 0, duration: .42, ease: 'back.out(2.4)' }, o), t); if (o.son !== false) S('pop', t); }
function late(sel, t0, t1, amp = 1.07) { const n = Math.max(1, Math.round((t1 - t0) / .5)); TL.to(sel, { scale: amp, duration: .25, ease: 'sine.inOut', yoyo: true, repeat: n * 2 - 1 }, t0); }
function flota(sel, t0, t1, dy = 22, per = 1) { const n = Math.max(1, Math.round((t1 - t0) / per)); TL.to(sel, { y: `-=${dy}`, duration: per / 2, ease: 'sine.inOut', yoyo: true, repeat: n * 2 - 1 }, t0); }
function gira(sel, t0, t1, vueltas = 1) { TL.to(sel, { rotation: `+=${360 * vueltas}`, duration: t1 - t0, ease: 'none' }, t0); }
function contador(sel, t, de, a, d = 1, ease = 'power1.inOut') { gsap.set(sel, { textContent: de }); TL.to(sel, { textContent: a, duration: d, ease, snap: { textContent: 1 } }, t); }
function estampa(sel, t, o = {}) {          // sello de goma: MITO, GRATIS...
  gsap.set(sel, { rotation: o.rot ?? -12 });
  TL.from(sel, { scale: 4, opacity: 0, duration: .22, ease: 'power4.in' }, t);
  TL.to(sel, { keyframes: [{ scale: .88, duration: .06 }, { scale: 1.05, duration: .08 }, { scale: 1, duration: .08 }] }, t + .22);
  sacudir(t + .22, 30, .42); S('golpe', t + .2, 1.1);
}

// ---------------------------------------------------------------- fondos
function fondoRayas(esc, t0, t1) { const d = document.createElement('div'); d.className = 'rayas'; $(esc).prepend(d); TL.fromTo(d, { x: 0 }, { x: 154.5 * Math.ceil((t1 - t0) / 1.2), duration: t1 - t0, ease: 'none' }, t0); }
function fondoRayos(esc, t0, t1, x = 540, y = 900, vueltas = .12) { const d = document.createElement('div'); d.className = 'rayos'; d.style.left = x + 'px'; d.style.top = y + 'px'; $(esc).prepend(d); TL.fromTo(d, { rotation: 0 }, { rotation: 360 * vueltas * (t1 - t0), duration: t1 - t0, ease: 'none' }, t0); return d; }
function fondoPuntos(esc, t0, t1) { const d = document.createElement('div'); d.className = 'puntos'; $(esc).prepend(d); TL.fromTo(d, { x: 0, y: 0 }, { x: -90 * Math.ceil((t1 - t0)), y: 90 * Math.ceil((t1 - t0)), duration: t1 - t0, ease: 'none' }, t0); }
function fondoFormas(esc, t0, t1, n = 7) {
  for (let i = 0; i < n; i++) { const d = document.createElement('div'); d.className = 'forma'; const s = R(140, 420); Object.assign(d.style, { width: s + 'px', height: s + 'px', left: R(-100, 980) + 'px', top: R(100, 1700) + 'px' }); $(esc).prepend(d);
    TL.fromTo(d, { x: 0, y: 0 }, { x: R(-160, 160), y: R(-220, 220), duration: t1 - t0, ease: 'sine.inOut' }, t0); }
}
function suelo(esc) { const d = document.createElement('div'); d.className = 'suelo'; $(esc).prepend(d); return d; }
function nubes(esc, t0, t1, o = {}) {      // nubes que bajan (el personaje sube) o cruzan
  const n = o.n ?? 9;
  for (let i = 0; i < n; i++) { const d = document.createElement('div'); d.className = 'nube'; const w = R(220, 460); Object.assign(d.style, { width: w + 'px', height: w * .3 + 'px', left: R(-150, 900) + 'px', top: '-300px', opacity: R(.35, .9) }); $(esc).appendChild(d);
    const ini = t0 + R(0, t1 - t0 - .6), dur = R(.7, 1.4); TL.fromTo(d, { y: 0 }, { y: 2600, duration: dur, ease: 'none' }, ini); }
}
function lineasVel(esc, t0, t1, o = {}) {  // lineas de velocidad verticales
  const n = o.n ?? 26;
  for (let i = 0; i < n; i++) { const d = document.createElement('div'); d.className = 'linea-v'; const h = R(160, 520); Object.assign(d.style, { height: h + 'px', left: R(20, 1050) + 'px', top: -h - 50 + 'px', opacity: R(.25, .8), width: R(6, 14) + 'px' }); $(esc).appendChild(d);
    const ini = t0 + R(0, Math.max(.1, t1 - t0 - .35)); TL.fromTo(d, { y: 0 }, { y: 2600, duration: R(.28, .5), ease: 'none' }, ini); }
}

// ---------------------------------------------------------------- particulas
function confeti(t, x, y, n = 44, o = {}) {
  const cols = o.cols || ['#FF8A00', '#fff', '#FFD23F', '#0E1A33', '#6FB2FF'];
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i'); p.className = 'conf'; const s = R(16, 38);
    Object.assign(p.style, { left: x + 'px', top: y + 'px', width: s + 'px', height: s * R(.4, 1) + 'px', background: cols[i % cols.length], borderRadius: rnd() < .3 ? '50%' : '5px' });
    $('#fx').appendChild(p); gsap.set(p, { autoAlpha: 0 });
    const ang = R(-Math.PI * .95, -Math.PI * .05), vel = R(380, 1050) * (o.fuerza ?? 1), dx = Math.cos(ang) * vel, dy = Math.sin(ang) * vel, d = R(1.0, 1.7);
    TL.set(p, { autoAlpha: 1 }, t).to(p, { x: dx, rotation: R(-900, 900), duration: d, ease: 'power1.out' }, t)
      .to(p, { y: dy, duration: d * .42, ease: 'power2.out' }, t).to(p, { y: dy + R(700, 1300), duration: d * .58, ease: 'power2.in' }, t + d * .42)
      .to(p, { autoAlpha: 0, duration: .2 }, t + d - .2);
  }
  S('confeti', t);
}
const ESTRELLA = 'M12 0c.8 7.5 4.5 11.2 12 12-7.5.8-11.2 4.5-12 12-.8-7.5-4.5-11.2-12-12 7.5-.8 11.2-4.5 12-12z';
function chispas(t, x, y, n = 10, o = {}) {
  for (let i = 0; i < n; i++) {
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); p.setAttribute('viewBox', '0 0 24 24'); p.setAttribute('class', 'chis');
    p.innerHTML = `<path d="${ESTRELLA}" fill="${(o.cols || ['#FFD23F', '#fff', '#FF8A00'])[i % 3]}"/>`;
    const s = R(40, 110) * (o.esc ?? 1); Object.assign(p.style, { left: x - s / 2 + 'px', top: y - s / 2 + 'px', width: s + 'px', height: s + 'px' });
    $('#fx').appendChild(p); gsap.set(p, { autoAlpha: 0, scale: 0 });
    const ang = R(0, Math.PI * 2), dist = R(120, 420) * (o.radio ?? 1), d = R(.5, .9);
    TL.set(p, { autoAlpha: 1 }, t).to(p, { x: Math.cos(ang) * dist, y: Math.sin(ang) * dist, scale: 1, rotation: R(-180, 180), duration: d, ease: 'power3.out' }, t).to(p, { scale: 0, autoAlpha: 0, duration: .25, ease: 'power2.in' }, t + d - .1);
  }
  if (o.son !== false) S('magia', t);
}
function polvo(t, x, y, n = 7) {
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i'); p.className = 'polvo'; const s = R(40, 110);
    Object.assign(p.style, { left: x - s / 2 + 'px', top: y - s / 2 + 'px', width: s + 'px', height: s + 'px' }); $('#fx').appendChild(p); gsap.set(p, { autoAlpha: 0, scale: .3 });
    const dx = R(-260, 260), d = R(.45, .8);
    TL.set(p, { autoAlpha: .8 }, t).to(p, { x: dx, y: R(-110, -10), scale: R(1, 1.8), autoAlpha: 0, duration: d, ease: 'power2.out' }, t);
  }
}

// ---------------------------------------------------------------- personaje
function espiral(cx, cy, vueltas = 2.6, r = 40) { let d = ''; for (let i = 0; i <= 60; i++) { const a = i / 60 * vueltas * Math.PI * 2, rr = r * i / 60; d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rr).toFixed(1) + ' ' + (cy + Math.sin(a) * rr).toFixed(1); } return d; }
function chuti(id) {
  let teclas = '';
  for (let r = 0; r < 3; r++) {
    const y = 402 + r * 28, xl = 152 - r * 18, xr = 548 + r * 18, n = 11, w = (xr - xl) / n;
    for (let k = 0; k < n; k++) {
      if (r === 2 && k >= 3 && k <= 7) { if (k === 3) teclas += `<rect x="${(xl + 3 * w + 3).toFixed(1)}" y="${y}" width="${(5 * w - 6).toFixed(1)}" height="20" rx="6"/>`; continue; }
      teclas += `<rect x="${(xl + k * w + 3).toFixed(1)}" y="${y}" width="${(w - 6).toFixed(1)}" height="20" rx="6"/>`;
    }
  }
  const ojo = (cx, cls) => `<g class="ojo ${cls}"><ellipse cx="${cx}" cy="196" rx="46" ry="58" fill="#fff" stroke="${O}" stroke-width="9"/><g class="pupila"><circle cx="${cx}" cy="203" r="27" fill="${O}"/><circle cx="${cx - 10}" cy="192" r="9.5" fill="#fff"/></g></g>`;
  const llama = (x, s) => `<g transform="translate(${x} 552) scale(${s})"><path d="M-46 0 Q-56 86 0 190 Q56 86 46 0 Z" fill="#FF8A00" stroke="${O}" stroke-width="9" stroke-linejoin="round"/><path d="M-22 0 Q-26 56 0 112 Q26 56 22 0 Z" fill="#FFD23F"/></g>`;
  return `<svg class="chuti" id="${id}" viewBox="0 0 700 640" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="${id}-gp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4BA6FF"/><stop offset="1" stop-color="#1D62F0"/></linearGradient>
  <clipPath id="${id}-cp"><rect x="162" y="84" width="376" height="262" rx="16"/></clipPath></defs>
  <ellipse class="sombra" cx="350" cy="604" rx="290" ry="26" fill="rgba(8,16,36,.3)"/>
  <g class="todo">
    <g class="acc-atras"></g>
    <g class="fuego" visibility="hidden">${llama(230, .8)}${llama(350, 1.1)}${llama(470, .8)}</g>
    <g class="brazo bi"><path d="M146 268 Q84 276 68 216" fill="none" stroke="${O}" stroke-width="26" stroke-linecap="round"/>
      <g class="mano"><rect x="42" y="92" width="36" height="84" rx="18" fill="#fff" stroke="${O}" stroke-width="9" transform="rotate(-10 60 170)"/><circle cx="66" cy="186" r="46" fill="#fff" stroke="${O}" stroke-width="10"/><path d="M38 180 Q66 170 94 180 M40 202 Q66 192 92 202" fill="none" stroke="${O}" stroke-width="5" stroke-linecap="round"/></g></g>
    <g class="brazo bd"><path d="M554 268 Q616 276 632 216" fill="none" stroke="${O}" stroke-width="26" stroke-linecap="round"/>
      <g class="llave" transform="rotate(14 634 186)"><rect x="619" y="76" width="30" height="130" rx="10" fill="#AEB6C2" stroke="${O}" stroke-width="9"/><path d="M600 28 A40 40 0 1 0 668 28 L652 40 A19 19 0 1 1 616 40 Z" fill="#AEB6C2" stroke="${O}" stroke-width="9" stroke-linejoin="round"/></g>
      <g class="mano"><circle cx="634" cy="186" r="46" fill="#fff" stroke="${O}" stroke-width="10"/><path d="M606 180 Q634 170 662 180 M608 202 Q634 192 660 202" fill="none" stroke="${O}" stroke-width="5" stroke-linecap="round"/></g></g>
    <g class="base"><path d="M128 388 L572 388 L656 520 L656 536 Q656 558 634 558 L66 558 Q44 558 44 536 L44 520 Z" fill="#C9CED8" stroke="${O}" stroke-width="13" stroke-linejoin="round"/>
      <path d="M48 522 L652 522" stroke="${O}" stroke-width="7" opacity=".55"/><g fill="#2B3550">${teclas}</g><path d="M296 486 L404 486 L412 512 L288 512 Z" fill="#AEB6C2" stroke="${O}" stroke-width="5" stroke-linejoin="round"/></g>
    <g class="tapa"><rect x="130" y="52" width="440" height="342" rx="34" fill="#BCC3CF" stroke="${O}" stroke-width="13"/>
      <rect class="vidrio" x="162" y="84" width="376" height="262" rx="16" fill="url(#${id}-gp)" stroke="${O}" stroke-width="9"/>
      <circle cx="350" cy="68" r="6" fill="${O}"/>
      <g clip-path="url(#${id}-cp)"><path d="M186 84 L286 84 L226 346 L162 346 L162 110 Z" fill="#fff" opacity=".11"/>
        <g class="cara">
          <g class="mejillas"><ellipse cx="226" cy="264" rx="30" ry="18" fill="#FF8FA3" opacity=".9"/><ellipse cx="474" cy="264" rx="30" ry="18" fill="#FF8FA3" opacity=".9"/></g>
          <g class="cejas"><path class="ceja ci" d="M238 144 Q280 112 322 118" fill="none" stroke="${O}" stroke-width="12" stroke-linecap="round"/><path class="ceja cd" d="M462 144 Q420 112 378 118" fill="none" stroke="${O}" stroke-width="12" stroke-linecap="round"/></g>
          <g class="ojos o-normal">${ojo(284, 'oi')}${ojo(416, 'od')}</g>
          <g class="ojos o-feliz" visibility="hidden"><path d="M240 214 Q284 154 328 214 M372 214 Q416 154 460 214" fill="none" stroke="${O}" stroke-width="14" stroke-linecap="round"/></g>
          <g class="ojos o-linea" visibility="hidden"><path d="M242 204 L326 204 M374 204 L458 204" fill="none" stroke="${O}" stroke-width="14" stroke-linecap="round"/></g>
          <g class="ojos o-x" visibility="hidden"><path d="M250 166 L318 232 M318 166 L250 232 M382 166 L450 232 M450 166 L382 232" fill="none" stroke="${O}" stroke-width="15" stroke-linecap="round"/></g>
          <g class="ojos o-espiral" visibility="hidden"><path class="esp e1" d="${espiral(284, 198)}" fill="none" stroke="${O}" stroke-width="9" stroke-linecap="round"/><path class="esp e2" d="${espiral(416, 198)}" fill="none" stroke="${O}" stroke-width="9" stroke-linecap="round"/></g>
          <g class="boca b-dientes"><path d="M268 270 Q350 256 432 270 Q438 310 350 326 Q262 310 268 270 Z" fill="#fff" stroke="${O}" stroke-width="9" stroke-linejoin="round"/><path d="M301 264 L303 316 M334 261 L335 324 M366 261 L365 324 M399 264 L397 316 M272 292 Q350 304 428 292" fill="none" stroke="${O}" stroke-width="5"/></g>
          <g class="boca b-feliz" visibility="hidden"><path d="M272 262 L428 262 Q424 340 350 342 Q276 340 272 262 Z" fill="${O}" stroke="${O}" stroke-width="9" stroke-linejoin="round"/><path d="M304 318 Q350 290 396 318 Q376 338 350 338 Q324 338 304 318 Z" fill="#FF6B81"/><path d="M286 268 L414 268 L410 286 L290 286 Z" fill="#fff"/></g>
          <g class="boca b-o" visibility="hidden"><ellipse cx="350" cy="296" rx="32" ry="40" fill="${O}"/><ellipse cx="350" cy="312" rx="18" ry="16" fill="#FF6B81"/></g>
          <g class="boca b-triste" visibility="hidden"><path d="M288 318 Q350 270 412 318" fill="none" stroke="${O}" stroke-width="13" stroke-linecap="round"/></g>
          <g class="boca b-linea" visibility="hidden"><path d="M300 296 L400 296" fill="none" stroke="${O}" stroke-width="13" stroke-linecap="round"/></g>
          <g class="boca b-onda" visibility="hidden"><path d="M276 298 Q294 276 312 298 T348 298 T384 298 T420 298" fill="none" stroke="${O}" stroke-width="12" stroke-linecap="round"/></g>
          <g class="lagrimas" visibility="hidden"><rect class="lg1" x="262" y="246" width="44" height="110" rx="20" fill="#CFEBFF" stroke="${O}" stroke-width="6"/><rect class="lg2" x="394" y="246" width="44" height="110" rx="20" fill="#CFEBFF" stroke="${O}" stroke-width="6"/></g>
          <path class="gota" visibility="hidden" d="M506 104 Q528 140 506 156 Q484 140 506 104 Z" fill="#E4F4FF" stroke="${O}" stroke-width="6" stroke-linejoin="round"/>
        </g>
        <g class="pant-azul" visibility="hidden"><rect x="162" y="84" width="376" height="262" fill="#1259E6"/><text x="200" y="210" font-family="Baloo 2" font-weight="800" font-size="130" fill="#fff">:(</text><rect x="200" y="250" width="250" height="14" rx="7" fill="#fff" opacity=".85"/><rect x="200" y="280" width="180" height="14" rx="7" fill="#fff" opacity=".6"/></g>
        <g class="pant-negra" visibility="hidden"><rect x="162" y="84" width="376" height="262" fill="#10151F"/></g>
      </g>
    </g>
    <g class="acc"></g>
  </g></svg>`;
}
// expresion: cara('c1', t, {ojos:'normal|feliz|linea|x|espiral', boca:'dientes|feliz|o|triste|linea|onda', gota:bool, cejas:angulo})
function cara(id, t, o = {}) {
  const b = '#' + id;
  if (o.ojos) { TL.set($$(`${b} .ojos`), { visibility: 'hidden' }, t).set(`${b} .o-${o.ojos}`, { visibility: 'visible' }, t); }
  if (o.boca) { TL.set($$(`${b} .boca`), { visibility: 'hidden' }, t).set(`${b} .b-${o.boca}`, { visibility: 'visible' }, t); }
  if (o.gota != null) TL.set(`${b} .gota`, { visibility: o.gota ? 'visible' : 'hidden' }, t);
  if (o.cejas != null) { TL.to(`${b} .ci`, { rotation: o.cejas, svgOrigin: '280 128', duration: .15 }, t).to(`${b} .cd`, { rotation: -o.cejas, svgOrigin: '420 128', duration: .15 }, t); }
  if (o.pantalla) { TL.set([`${b} .pant-azul`, `${b} .pant-negra`], { visibility: 'hidden' }, t); if (o.pantalla !== 'normal') TL.set(`${b} .pant-${o.pantalla}`, { visibility: 'visible' }, t); TL.set(`${b} .cara`, { visibility: o.pantalla === 'normal' ? 'visible' : 'hidden' }, t); }
}
function parpadea(id, tiempos) { tiempos.forEach(t => TL.to(`#${id} .o-normal .ojo`, { scaleY: .08, transformOrigin: '50% 50%', duration: .07, yoyo: true, repeat: 1, ease: 'power1.inOut' }, t)); }
function mira(id, t, dx, dy, d = .25) { TL.to(`#${id} .pupila`, { x: dx, y: dy, duration: d, ease: 'power2.out' }, t); }
function salta(id, t, h = 170, d = .6) {     // salto con estirar y aplastar
  const q = `#${id} .todo`, sh = `#${id} .sombra`, org = { svgOrigin: '350 560' };
  TL.to(q, { scaleY: .86, scaleX: 1.1, duration: .1, ease: 'power1.out', ...org }, t)
    .to(q, { y: -h, scaleY: 1.08, scaleX: .95, duration: d * .42, ease: 'power2.out', ...org }, t + .1)
    .to(q, { y: 0, scaleY: 1, scaleX: 1, duration: d * .36, ease: 'power2.in', ...org }, t + .1 + d * .42)
    .to(q, { keyframes: [{ scaleY: .84, scaleX: 1.12, duration: .07 }, { scaleY: 1.05, scaleX: .97, duration: .1 }, { scaleY: 1, scaleX: 1, duration: .1 }], ...org }, t + .1 + d * .78);
  TL.to(sh, { scaleX: .6, opacity: .5, svgOrigin: '350 604', duration: d * .42, ease: 'power2.out' }, t + .1).to(sh, { scaleX: 1, opacity: 1, svgOrigin: '350 604', duration: d * .36, ease: 'power2.in' }, t + .1 + d * .42);
  S('boing', t + .08, .8); return t + .1 + d * .78;
}
function respira(id, t0, t1) { const n = Math.max(1, Math.round((t1 - t0) / .9)); TL.to(`#${id} .todo`, { scaleY: 1.025, scaleX: .99, svgOrigin: '350 560', duration: .45, ease: 'sine.inOut', yoyo: true, repeat: n * 2 - 1 }, t0); }
function tiembla(id, t0, t1, f = 9) { const n = Math.round((t1 - t0) / .05), k = []; for (let i = 0; i < n; i++) k.push({ x: R(-f, f), y: R(-f * .5, f * .5), rotation: R(-f, f) * .12, duration: .05 }); k.push({ x: 0, y: 0, rotation: 0, duration: .05 }); TL.to(`#${id} .tapa`, { keyframes: k, ease: 'none', svgOrigin: '350 390' }, t0); }
function saluda(id, t, lado = 'bi', n = 3, ang = 26) { const or = lado === 'bi' ? '146 268' : '554 268', s = lado === 'bi' ? 1 : -1; TL.to(`#${id} .${lado}`, { rotation: s * ang, svgOrigin: or, duration: .16, ease: 'sine.inOut', yoyo: true, repeat: n * 2 - 1 }, t); }
function brazos(id, t, ang, d = .25) { TL.to(`#${id} .bi`, { rotation: ang, svgOrigin: '146 268', duration: d, ease: 'back.out(2)' }, t).to(`#${id} .bd`, { rotation: -ang, svgOrigin: '554 268', duration: d, ease: 'back.out(2)' }, t); }
function fuego(id, t0, t1) { TL.set(`#${id} .fuego`, { visibility: 'visible' }, t0); if (t1) TL.set(`#${id} .fuego`, { visibility: 'hidden' }, t1); const n = Math.round(((t1 || window.__dur) - t0) / .08); TL.fromTo(`#${id} .fuego`, { scaleY: .8, svgOrigin: '350 552' }, { scaleY: 1.25, svgOrigin: '350 552', duration: .08, yoyo: true, repeat: n, ease: 'none' }, t0); }
function espirales(id, t0, t1) { TL.to(`#${id} .e1`, { rotation: 360 * (t1 - t0) * 1.2, svgOrigin: '284 198', duration: t1 - t0, ease: 'none' }, t0).to(`#${id} .e2`, { rotation: -360 * (t1 - t0) * 1.2, svgOrigin: '416 198', duration: t1 - t0, ease: 'none' }, t0); }
function gotea(id, t0, t1) { const n = Math.max(1, Math.round((t1 - t0) / .7)); TL.fromTo(`#${id} .gota`, { y: -6, opacity: 1 }, { y: 44, opacity: 0, duration: .7, ease: 'power1.in', repeat: n - 1 }, t0); }
function pj(sel, id, x, y, w) { const d = document.createElement('div'); d.className = 'pj'; d.id = id + '-w'; Object.assign(d.style, { left: x + 'px', top: y + 'px', width: w + 'px' }); d.innerHTML = chuti(id); $(sel).appendChild(d); return '#' + id + '-w'; }

// ---------------------------------------------------------------- objetos (SVG)
const OBJ = {
  caracol: `<svg viewBox="0 0 300 300"><circle cx="150" cy="150" r="132" fill="#C97A2B" stroke="${O}" stroke-width="13"/><path d="${espiral(150, 150, 2.4, 104)}" fill="none" stroke="${O}" stroke-width="13" stroke-linecap="round"/><circle cx="104" cy="92" r="22" fill="#fff" opacity=".28"/></svg>`,
  basurero: `<svg viewBox="0 0 300 380"><path d="M40 110 L260 110 L236 358 Q234 372 218 372 L82 372 Q66 372 64 358 Z" fill="#9AA3B2" stroke="${O}" stroke-width="13" stroke-linejoin="round"/><path d="M110 160 L118 320 M150 160 L150 320 M190 160 L182 320" stroke="${O}" stroke-width="11" stroke-linecap="round"/><g class="tapa-b"><rect x="18" y="66" width="264" height="44" rx="16" fill="#BCC3CF" stroke="${O}" stroke-width="13"/><rect x="116" y="30" width="68" height="40" rx="14" fill="#BCC3CF" stroke="${O}" stroke-width="13"/></g></svg>`,
  virus: `<svg viewBox="0 0 240 240"><g stroke="${O}" stroke-width="10" stroke-linecap="round"><path d="M120 22 L120 54 M120 186 L120 218 M22 120 L54 120 M186 120 L218 120 M50 50 L74 74 M166 166 L190 190 M190 50 L166 74 M50 190 L74 166"/></g><g fill="#FF4D4D" stroke="${O}" stroke-width="8"><circle cx="120" cy="16" r="13"/><circle cx="120" cy="224" r="13"/><circle cx="16" cy="120" r="13"/><circle cx="224" cy="120" r="13"/><circle cx="46" cy="46" r="13"/><circle cx="194" cy="194" r="13"/><circle cx="194" cy="46" r="13"/><circle cx="46" cy="194" r="13"/></g><circle cx="120" cy="120" r="76" fill="#FF4D4D" stroke="${O}" stroke-width="11"/><path d="M78 92 L108 106 M162 92 L132 106" stroke="${O}" stroke-width="9" stroke-linecap="round"/><circle cx="98" cy="118" r="11" fill="${O}"/><circle cx="142" cy="118" r="11" fill="${O}"/><path d="M92 156 Q120 136 148 156" fill="none" stroke="${O}" stroke-width="9" stroke-linecap="round"/></svg>`,
  salvavidas: `<svg viewBox="0 0 300 300"><circle cx="150" cy="150" r="118" fill="#fff" stroke="${O}" stroke-width="13"/><g fill="#FF4D4D"><path d="M150 32 A118 118 0 0 1 233.4 66.6 L191.7 108.3 A59 59 0 0 0 150 91 Z"/><path d="M268 150 A118 118 0 0 1 233.4 233.4 L191.7 191.7 A59 59 0 0 0 209 150 Z"/><path d="M150 268 A118 118 0 0 1 66.6 233.4 L108.3 191.7 A59 59 0 0 0 150 209 Z"/><path d="M32 150 A118 118 0 0 1 66.6 66.6 L108.3 108.3 A59 59 0 0 0 91 150 Z"/></g><circle cx="150" cy="150" r="118" fill="none" stroke="${O}" stroke-width="13"/><circle cx="150" cy="150" r="59" fill="none" stroke="${O}" stroke-width="13"/></svg>`,
  escudo: `<svg viewBox="0 0 300 340"><path d="M150 18 L276 62 L276 160 Q276 270 150 322 Q24 270 24 160 L24 62 Z" fill="#1FBF75" stroke="${O}" stroke-width="14" stroke-linejoin="round"/><path d="M92 168 L134 210 L212 122" fill="none" stroke="#fff" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  carpeta: `<svg viewBox="0 0 240 200"><path d="M14 44 Q14 26 32 26 L92 26 L114 50 L208 50 Q226 50 226 68 L226 166 Q226 184 208 184 L32 184 Q14 184 14 166 Z" fill="#FFD23F" stroke="${O}" stroke-width="12" stroke-linejoin="round"/><path d="M14 84 L226 84" stroke="${O}" stroke-width="9" opacity=".5"/></svg>`,
  caja: `<svg viewBox="0 0 220 200"><rect x="14" y="40" width="192" height="146" rx="14" fill="#C9A26B" stroke="${O}" stroke-width="12"/><path d="M14 80 L206 80 M110 40 L110 80" stroke="${O}" stroke-width="10"/></svg>`,
  reloj: `<svg viewBox="0 0 300 300"><circle cx="150" cy="150" r="130" fill="#fff" stroke="${O}" stroke-width="14"/><g stroke="${O}" stroke-width="10" stroke-linecap="round"><path d="M150 36 L150 58 M150 242 L150 264 M36 150 L58 150 M242 150 L264 150"/></g><path class="hora" d="M150 150 L150 88" stroke="${O}" stroke-width="16" stroke-linecap="round"/><path class="minuto" d="M150 150 L150 54" stroke="#FF4D4D" stroke-width="11" stroke-linecap="round"/><circle cx="150" cy="150" r="13" fill="${O}"/></svg>`,
  birrete: `<svg viewBox="0 0 360 220"><path d="M180 16 L346 86 L180 156 L14 86 Z" fill="${O}" stroke="${O}" stroke-width="12" stroke-linejoin="round"/><path d="M92 124 L92 178 Q180 226 268 178 L268 124 L180 162 Z" fill="#26324F" stroke="${O}" stroke-width="12" stroke-linejoin="round"/><path d="M318 96 L318 168" stroke="#FFD23F" stroke-width="10" stroke-linecap="round"/><circle cx="318" cy="178" r="15" fill="#FFD23F" stroke="${O}" stroke-width="7"/></svg>`,
  telarana: `<svg viewBox="0 0 260 260"><g fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".85"><path d="M6 6 L250 250 M6 6 L250 90 M6 6 L90 250 M6 6 L250 6 M6 6 L6 250"/><path d="M70 6 Q66 40 92 62 Q62 62 34 70 Q14 84 6 70 M150 6 Q140 86 190 122 Q130 130 80 150 Q30 176 6 150 M230 6 Q210 130 250 190 M6 230 Q130 210 190 250"/></g></svg>`,
  disco: `<svg viewBox="0 0 320 240"><rect x="16" y="24" width="288" height="192" rx="30" fill="#BCC3CF" stroke="${O}" stroke-width="13"/><circle cx="120" cy="120" r="64" fill="#E9EDF4" stroke="${O}" stroke-width="11"/><circle cx="120" cy="120" r="14" fill="${O}"/><path d="M120 120 L212 70" stroke="${O}" stroke-width="12" stroke-linecap="round"/><circle cx="258" cy="176" r="12" fill="#1FBF75" stroke="${O}" stroke-width="6"/></svg>`,
  estetoscopio: `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></svg>`,
};
function obj(sel, tipo, id, x, y, w, extra = '') { const d = document.createElement('div'); d.className = 'obj'; d.id = id; Object.assign(d.style, { left: x + 'px', top: y + 'px', width: w + 'px' }); if (extra) d.style.cssText += extra; d.innerHTML = OBJ[tipo]; $(sel).appendChild(d); return '#' + id; }

// ---------------------------------------------------------------- cierre comun
// Tarjeta final: logo, titular y WhatsApp. opts: {t0, t1, titulo:'<html>', sub:'texto'}
function cierre(o) {
  const { t0, t1 } = o, id = o.id || 'fin';
  $('#zoom').insertAdjacentHTML('beforeend', `<section class="e azul" id="${id}">
    <img class="abs lg" src="${IMG}/logo-t.png" alt="" style="left:240px;top:250px;width:600px">
    <div class="tx tt" style="top:830px;font-size:${o.tam || 112}px">${o.titulo}</div>
    <div class="abs ww" style="left:0;right:60px;top:${o.yWa || 1160}px;text-align:center"><span class="wa">${WA}${NUM}</span></div>
    <div class="sub ss" style="top:${(o.yWa || 1160) + 190}px;font-size:46px">${o.sub || 'Escríbenos por WhatsApp · Cuenca'}</div></section>`);
  const b = '#' + id;
  escena(b, t0, t1);
  fondoRayos(b, t0, t1, 540, 560, .1);
  TL.from(`${b} .lg`, { scale: 0, rotation: -25, duration: .6, ease: 'elastic.out(1,.55)' }, t0 + .08); S('pop', t0 + .08);
  flota(`${b} .lg`, t0 + .7, t1, 18, 1);
  texto(`${b} .tt`, t0 + .35);
  TL.from(`${b} .ww`, { y: 260, opacity: 0, duration: .5, ease: 'back.out(1.7)' }, t0 + .9); S('campana', t0 + 1.0);
  late(`${b} .wa`, t0 + 1.5, t1, 1.06);
  TL.from(`${b} .ss`, { opacity: 0, y: 30, duration: .3 }, t0 + 1.35);
  confeti(t0 + .95, 540, 1150, 46);
}
