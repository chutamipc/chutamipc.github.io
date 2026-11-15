// Tercera parte del motor: teclas, lluvia, burbujas, boca que habla y la plantilla de los "Trucos Chuta".
OBJ.lapida = `<svg viewBox="0 0 360 440"><path d="M40 430 L40 170 A140 140 0 0 1 320 170 L320 430 Z" fill="#AEB6C2" stroke="${O}" stroke-width="14" stroke-linejoin="round"/><path d="M76 420 L76 176 A104 104 0 0 1 180 72" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".35"/><rect x="6" y="404" width="348" height="34" rx="12" fill="#8E97A6" stroke="${O}" stroke-width="12"/></svg>`;
OBJ.calendario = `<svg viewBox="0 0 320 340"><rect x="20" y="50" width="280" height="270" rx="34" fill="#fff" stroke="${O}" stroke-width="14"/><path d="M20 136 L20 84 Q20 50 54 50 L266 50 Q300 50 300 84 L300 136 Z" fill="#FF4D4D" stroke="${O}" stroke-width="14" stroke-linejoin="round"/><rect x="84" y="16" width="26" height="70" rx="13" fill="#BCC3CF" stroke="${O}" stroke-width="10"/><rect x="210" y="16" width="26" height="70" rx="13" fill="#BCC3CF" stroke="${O}" stroke-width="10"/></svg>`;
OBJ.nubeGris = `<svg viewBox="0 0 420 220"><path d="M90 200 Q20 200 20 142 Q20 92 76 86 Q84 20 160 20 Q222 20 244 70 Q262 54 292 58 Q340 64 342 110 Q400 114 400 156 Q400 200 340 200 Z" fill="#8792A8" stroke="${O}" stroke-width="13" stroke-linejoin="round"/></svg>`;
OBJ.audifonos = `<svg viewBox="0 0 700 300"><path d="M118 250 L118 190 A232 190 0 0 1 582 190 L582 250" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round"/><path d="M118 250 L118 190 A232 190 0 0 1 582 190 L582 250" fill="none" stroke="#FF8A00" stroke-width="18" stroke-linecap="round"/></svg>`;

// boca que "habla": alterna bocas mientras suena el balbuceo
function hablaBoca(id, t0, t1, o = {}) {
  const bocas = o.bocas || ['o', 'feliz', 'o', 'dientes'];
  let i = 0; for (let t = t0; t < t1; t += .11) { cara(id, t, { boca: bocas[i % bocas.length] }); i++; }
  cara(id, t1, { boca: o.fin || 'feliz' });
  for (let t = t0; t < t1 - .2; t += .62) S('habla', t, o.g ?? 1);
}
// dice una frase con globo y moviendo la boca
function frase(sel, id, pjId, html, t, o = {}) {
  const g = globo(sel, id, html, o.x ?? 110, o.y ?? 330, o.w ?? 800, { cola: o.cola ?? 370, tam: o.tam, cls: o.cls });
  TL.from(g, { scale: 0, opacity: 0, transformOrigin: o.origen || '50% 100%', duration: .32, ease: 'back.out(2.2)' }, t);
  hablaBoca(pjId, t, t + (o.dur ?? 1.1), { fin: o.fin });
  if (o.sale) TL.to(g, { scale: 0, opacity: 0, transformOrigin: o.origen || '50% 100%', duration: .18, ease: 'power2.in' }, o.sale);
  return g;
}
// lluvia en diagonal durante [t0, t1]
function lluvia(sel, t0, t1, n = 70) {
  for (let i = 0; i < n; i++) {
    const d = document.createElement('i'); d.className = 'gota-ll'; const h = R(70, 150), dur = R(.45, .75);
    Object.assign(d.style, { left: R(-100, 1300) + 'px', top: -h - 40 + 'px', height: h + 'px', opacity: R(.35, .85) }); $(sel).appendChild(d);
    gsap.set(d, { rotation: 8 });
    TL.fromTo(d, { x: 0, y: 0 }, { x: -300, y: 2200, duration: dur, ease: 'none', repeat: Math.max(0, Math.floor((t1 - t0) / dur) - 1) }, t0 + R(0, dur));
  }
}
// burbujas que suben
function burbujas(sel, t0, t1, x0, x1, y, n = 24, o = {}) {
  for (let i = 0; i < n; i++) {
    const d = document.createElement('i'); d.className = 'burbuja'; const s = R(26, 90);
    Object.assign(d.style, { left: R(x0, x1) + 'px', top: y + 'px', width: s + 'px', height: s + 'px', zIndex: o.z ?? 13 }); $(sel).appendChild(d);
    gsap.set(d, { autoAlpha: 0, scale: .3 }); const t = t0 + R(0, t1 - t0 - .6), dur = R(.7, 1.3);
    TL.set(d, { autoAlpha: .9 }, t).to(d, { y: -R(240, 620), x: R(-90, 90), scale: 1, duration: dur, ease: 'power1.out' }, t).to(d, { autoAlpha: 0, scale: 1.4, duration: .12 }, t + dur - .12);
    if (i % 4 === 0) S('burbuja', t + dur - .1, .6);
  }
}
// fila de teclas grandes: teclas(sel, id, ['Ctrl','Shift','T'], y) -> selectores de cada tecla
function teclas(sel, id, lista, y) {
  const WIN = '<i class="win"><b></b><b></b><b></b><b></b></i>';
  $(sel).insertAdjacentHTML('beforeend', `<div class="teclas k${lista.length}" id="${id}" style="top:${y}px">${lista.map((k, i) => (i ? '<span class="mas">+</span>' : '') + `<span class="tecla" id="${id}${i}">${k === 'Win' ? WIN + 'Win' : k}</span>`).join('')}</div>`);
  return lista.map((k, i) => `#${id}${i}`);
}
function pulsa(ks, t, o = {}) {
  ks.forEach(k => TL.to(k, { y: 18, boxShadow: '0 4px 0 #0E1A33', duration: .07, yoyo: true, repeat: 1, repeatDelay: o.pausa ?? .12 }, t));
  S('clic', t, 1.6); S('tecla', t, 1.6); if (o.sacude !== false) sacudir(t, 10, .15);
}
// pestañas de navegador
function pestana(sel, id, txt, x, y, cls = '') { $(sel).insertAdjacentHTML('beforeend', `<div class="pest ${cls}" id="${id}" style="left:${x}px;top:${y}px"><i></i>${txt}<b>×</b></div>`); return '#' + id; }

// ---------------------------------------------------------------- plantilla: Truco Chuta (12 s)
// o: {n, fondo, gancho, tamGancho, teclas:[...], que, tamQue, cara1, accion1(pj, escena), demo(escena, t0, t1), prog, tono}
function truco(o) {
  montar(12);
  musica(['intro', 'alegre', 'alegre', 'alegre', 'alegre', 'final'], { prog: o.prog ?? 0, tono: o.tono ?? 0 });
  // 1. gancho (0 - 2.6)
  const e1 = esc('e1', o.fondo || 'claro'); escena(e1, 0, 2.6); fondoRayas(e1, 0, 2.6); suelo(e1);
  chip(e1, 'ch1', 'Truco Chuta #' + o.n, 292, 'n'); pop('#ch1', .05);
  tx(e1, 't1', o.gancho, 392, o.tamGancho || 112); texto('#t1', .12);
  pjc(e1, 'c1'); cara('c1', 0, o.cara1 || { ojos: 'normal', boca: 'o', cejas: -10, gota: true });
  if (o.accion1) o.accion1('c1', e1); else { tiembla('c1', .2, 1.2, 5); signo(e1, '?', 760, 860, .5, { tam: 170, color: '#FFD23F' }); mira('c1', 1.3, 0, -14); }
  // 2. las teclas (2.6 - 6.6)
  const e2 = esc('e2', 'azul'); escena(e2, 2.6, 6.6); zoomCorte(2.6, e1, e2); fondoPuntos(e2, 2.6, 6.6); suelo(e2);
  tx(e2, 't2', 'Presiona a la vez:', 300, 108); texto('#t2', 2.7, { st: .05 });
  const ks = teclas(e2, 'tk', o.teclas, 500);
  ks.forEach((k, i) => { const t = 3.1 + i * .35; TL.from(k, { y: -500, opacity: 0, rotation: R(-20, 20), duration: .42, ease: 'bounce.out' }, t); S('paso', t + .16, 1); S('tecla', t + .16, 1.4); });
  TL.from('#tk .mas', { scale: 0, duration: .2, stagger: .35 }, 3.4);
  const tp = 3.1 + ks.length * .35 + .45;
  pulsa(ks, tp); pulsa(ks, tp + .75); chispas(tp + .05, 510, 600, 10);
  pjc(e2, 'c2', { w: 560 }); cara('c2', 2.6, { ojos: 'normal', boca: 'feliz' }); mira('c2', 2.7, 0, -16, .1);
  cara('c2', tp, { ojos: 'feliz' }); salta('c2', tp + .1, 90, .4); salta('c2', tp + .85, 90, .4);
  // 3. que pasa (6.6 - 9)
  const e3 = esc('e3', o.fondo3 || 'naranja'); escena(e3, 6.6, 9); cortina(6.6, '#0E1A33'); fondoRayas(e3, 6.6, 9); suelo(e3);
  tx(e3, 't3', o.que, 300, o.tamQue || 104); texto('#t3', 6.75, { st: .05 });
  if (o.demo) o.demo(e3, 6.9, 9); else { pjc(e3, 'c3'); cara('c3', 6.6, { ojos: 'feliz', boca: 'feliz' }); salta('c3', 7.2, 130, .45); salta('c3', 8.0, 130, .45); }
  // 4. cierre (9 - 12)
  cierre({ t0: 9, t1: 12, titulo: 'Síguenos para más <span class="placa">trucos</span>', tam: 100, sub: 'Soporte de PCs y laptops · Cuenca' });
  zoomCorte(9, e3, '#fin');
}
