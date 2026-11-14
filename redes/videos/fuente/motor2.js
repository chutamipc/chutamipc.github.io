// Segunda parte del motor: accesorios del personaje, actuacion y piezas de escena.
const dentro = s => s.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
OBJ.caracolito = `<svg viewBox="0 0 320 230"><path d="M18 200 Q18 168 58 168 L196 168 Q226 168 228 136 L232 84 Q234 60 256 60 Q282 60 282 86 L278 158 Q274 208 222 208 L40 208 Q18 208 18 200 Z" fill="#FFC27A" stroke="${O}" stroke-width="11" stroke-linejoin="round"/><path d="M246 64 L236 22 M268 64 L286 24" stroke="${O}" stroke-width="9" stroke-linecap="round"/><circle cx="234" cy="18" r="15" fill="#fff" stroke="${O}" stroke-width="7"/><circle cx="288" cy="20" r="15" fill="#fff" stroke="${O}" stroke-width="7"/><circle cx="237" cy="18" r="6" fill="${O}"/><circle cx="291" cy="20" r="6" fill="${O}"/><path d="M246 112 Q258 124 270 112" fill="none" stroke="${O}" stroke-width="7" stroke-linecap="round"/><circle cx="122" cy="110" r="84" fill="#C97A2B" stroke="${O}" stroke-width="11"/><path d="${espiral(122, 110, 2.3, 62)}" fill="none" stroke="${O}" stroke-width="10" stroke-linecap="round"/></svg>`;
OBJ.llave = `<svg viewBox="0 0 120 300"><rect x="44" y="92" width="32" height="196" rx="12" fill="#AEB6C2" stroke="${O}" stroke-width="10"/><path d="M22 26 A46 46 0 1 0 98 26 L80 40 A22 22 0 1 1 40 40 Z" fill="#AEB6C2" stroke="${O}" stroke-width="10" stroke-linejoin="round"/></svg>`;
OBJ.aspiradora = `<svg viewBox="0 0 420 300"><path d="M20 150 Q20 96 78 96 L250 96 L250 204 L78 204 Q20 204 20 150 Z" fill="#FF8A00" stroke="${O}" stroke-width="13" stroke-linejoin="round"/><rect x="250" y="112" width="90" height="76" fill="#BCC3CF" stroke="${O}" stroke-width="13"/><path d="M340 84 L404 54 L404 246 L340 216 Z" fill="#0E1A33" stroke="${O}" stroke-width="13" stroke-linejoin="round"/><circle cx="98" cy="150" r="24" fill="#fff" stroke="${O}" stroke-width="9"/><path d="M150 126 L214 126 M150 150 L214 150 M150 174 L214 174" stroke="${O}" stroke-width="9" stroke-linecap="round"/><circle cx="70" cy="232" r="30" fill="#2B3550" stroke="${O}" stroke-width="11"/><circle cx="206" cy="232" r="30" fill="#2B3550" stroke="${O}" stroke-width="11"/></svg>`;
OBJ.casa = `<svg viewBox="0 0 400 360"><path d="M40 170 L200 36 L360 170 L360 336 Q360 348 348 348 L52 348 Q40 348 40 336 Z" fill="#fff" stroke="${O}" stroke-width="14" stroke-linejoin="round"/><path d="M14 186 L200 30 L386 186" fill="none" stroke="#FF8A00" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 186 L200 30 L386 186" fill="none" stroke="${O}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 -15)"/><rect x="160" y="226" width="80" height="122" rx="10" fill="#1768F8" stroke="${O}" stroke-width="12"/><rect x="262" y="206" width="62" height="62" rx="8" fill="#6FB2FF" stroke="${O}" stroke-width="10"/><rect x="76" y="206" width="62" height="62" rx="8" fill="#6FB2FF" stroke="${O}" stroke-width="10"/></svg>`;
OBJ.documento = `<svg viewBox="0 0 300 380"><path d="M30 20 L210 20 L270 80 L270 348 Q270 362 256 362 L44 362 Q30 362 30 348 Z" fill="#fff" stroke="${O}" stroke-width="13" stroke-linejoin="round"/><path d="M210 20 L210 80 L270 80" fill="#DCE6FF" stroke="${O}" stroke-width="13" stroke-linejoin="round"/><g stroke="#9AA9C7" stroke-width="13" stroke-linecap="round"><path d="M70 130 L230 130 M70 176 L230 176 M70 222 L230 222 M70 268 L170 268"/></g></svg>`;
OBJ.candado = `<svg viewBox="0 0 260 320"><path d="M66 150 L66 100 A64 64 0 0 1 194 100 L194 150" fill="none" stroke="${O}" stroke-width="42" stroke-linecap="round"/><path d="M66 150 L66 100 A64 64 0 0 1 194 100 L194 150" fill="none" stroke="#BCC3CF" stroke-width="20" stroke-linecap="round"/><rect x="24" y="140" width="212" height="164" rx="30" fill="#FF8A00" stroke="${O}" stroke-width="13"/><circle cx="130" cy="206" r="22" fill="${O}"/><rect x="120" y="212" width="20" height="50" rx="8" fill="${O}"/></svg>`;
OBJ.wifi = `<svg viewBox="0 0 300 240"><g fill="none" stroke-linecap="round"><path class="w3" d="M30 96 Q150 -14 270 96" stroke="#fff" stroke-width="30"/><path class="w2" d="M74 142 Q150 72 226 142" stroke="#fff" stroke-width="30"/><path class="w1" d="M116 186 Q150 156 184 186" stroke="#fff" stroke-width="30"/></g><circle cx="150" cy="216" r="18" fill="#fff"/></svg>`;
OBJ.mano = `<svg viewBox="0 0 200 240"><path d="M60 110 L60 34 Q60 12 82 12 Q104 12 104 34 L104 96 L150 106 Q184 114 180 150 L172 204 Q168 228 142 228 L84 228 Q62 228 50 208 L18 152 Q8 132 26 124 Q42 118 54 134 Z" fill="#fff" stroke="${O}" stroke-width="12" stroke-linejoin="round"/></svg>`;

// ---------------------------------------------------------------- accesorios (coordenadas del personaje, 700 x 640)
function accesorio(id, tipo) {
  const defs = {
    birrete: ['acc', `<g class="a-birrete" transform="translate(172 -98)">${dentro(OBJ.birrete)}</g>`],
    caracol: ['acc-atras', `<g class="a-caracol" transform="translate(196 -142) scale(1.03)">${dentro(OBJ.caracol)}</g>`],
    capa: ['acc-atras', `<path class="a-capa" d="M186 92 Q-40 150 -84 486 Q30 430 150 462 Q196 300 236 108 Z" fill="#FF4D4D" stroke="${O}" stroke-width="13" stroke-linejoin="round"/>`],
    termometro: ['acc', `<g class="a-termo" transform="rotate(-24 400 300)"><rect x="396" y="286" width="150" height="26" rx="13" fill="#fff" stroke="${O}" stroke-width="8"/><rect x="408" y="294" width="90" height="10" rx="5" fill="#FF4D4D"/><circle cx="548" cy="299" r="22" fill="#FF4D4D" stroke="${O}" stroke-width="8"/></g>`],
    venda: ['acc', `<g class="a-venda" transform="rotate(-32 500 90)"><rect x="436" y="62" width="138" height="50" rx="16" fill="#F7D9B5" stroke="${O}" stroke-width="8"/><rect x="484" y="62" width="42" height="50" fill="#fff" stroke="${O}" stroke-width="6"/></g>`],
    telarana: ['acc', `<g class="a-tela" transform="translate(118 40) scale(.66)">${dentro(OBJ.telarana)}</g><g class="a-tela" transform="translate(582 40) scale(-.5 .5)">${dentro(OBJ.telarana)}</g>`],
    corona: ['acc', `<path class="a-corona" d="M236 44 L220 -62 L296 -10 L350 -84 L404 -10 L480 -62 L464 44 Z" fill="#FFD23F" stroke="${O}" stroke-width="12" stroke-linejoin="round"/>`],
    cintillo: ['acc', `<g class="a-cintillo"><rect x="124" y="70" width="452" height="42" rx="8" fill="#FF4D4D" stroke="${O}" stroke-width="9"/><path d="M574 84 L644 56 L634 98 L656 128 L580 106 Z" fill="#FF4D4D" stroke="${O}" stroke-width="9" stroke-linejoin="round"/></g>`],
    antifaz: ['acc', `<path class="a-antifaz" d="M196 150 Q350 110 504 150 Q520 232 440 246 Q384 250 350 206 Q316 250 260 246 Q180 232 196 150 Z" fill="${O}" opacity=".0"/>`],
  };
  const [capa, svg] = defs[tipo];
  $(`#${id} .${capa}`).insertAdjacentHTML('beforeend', svg);
}
function llora(id, t0, t1) {
  TL.set(`#${id} .lagrimas`, { visibility: 'visible' }, t0); if (t1) TL.set(`#${id} .lagrimas`, { visibility: 'hidden' }, t1);
  const n = Math.max(1, Math.round(((t1 || window.__dur) - t0) / .24));
  TL.fromTo([`#${id} .lg1`, `#${id} .lg2`], { scaleY: .8, transformOrigin: '50% 0%' }, { scaleY: 1.1, transformOrigin: '50% 0%', duration: .12, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, t0);
}
// camina dando saltitos: mueve la caja del personaje hasta x1 (desplazamiento respecto a su sitio)
function camina(id, t0, t1, x1, o = {}) {
  const w = `#${id}-w`, n = o.pasos ?? Math.max(2, Math.round((t1 - t0) / .3)), d = (t1 - t0) / n, q = `#${id} .todo`;
  TL.to(w, { x: x1, duration: t1 - t0, ease: o.ease || 'none' }, t0);
  for (let i = 0; i < n; i++) {
    TL.to(q, { y: -(o.alto ?? 36), rotation: (i % 2 ? 1 : -1) * (o.giro ?? 3), svgOrigin: '350 560', duration: d / 2, ease: 'sine.out' }, t0 + i * d)
      .to(q, { y: 0, rotation: 0, svgOrigin: '350 560', duration: d / 2, ease: 'sine.in' }, t0 + i * d + d / 2);
    if (o.son !== false) S('paso', t0 + i * d + d, .5);
  }
}
function agacha(id, t, d = .3, f = .8) { TL.to(`#${id} .todo`, { scaleY: f, scaleX: 1 + (1 - f) * .6, svgOrigin: '350 560', duration: d, ease: 'power2.out' }, t); }
function levanta(id, t, d = .25) { TL.to(`#${id} .todo`, { scaleY: 1, scaleX: 1, svgOrigin: '350 560', duration: d, ease: 'back.out(3)' }, t); }
function inclina(id, t, ang, d = .3) { TL.to(`#${id} .todo`, { rotation: ang, svgOrigin: '350 560', duration: d, ease: 'back.out(2)' }, t); }
function bambolea(id, t0, t1, ang = 5, per = .5) { const n = Math.max(1, Math.round((t1 - t0) / per)); TL.fromTo(`#${id} .todo`, { rotation: -ang, svgOrigin: '350 400' }, { rotation: ang, svgOrigin: '350 400', duration: per / 2, ease: 'sine.inOut', yoyo: true, repeat: n * 2 - 1 }, t0); }
function tapa(id, t, ang, d = .4) { TL.to(`#${id} .tapa`, { scaleY: ang, svgOrigin: '350 392', duration: d, ease: 'power2.inOut' }, t); }   // cierra (0.06) o abre (1) la pantalla

// ---------------------------------------------------------------- piezas de escena
function globo(sel, id, html, x, y, w, o = {}) {
  const d = document.createElement('div'); d.className = 'globo' + (o.cls ? ' ' + o.cls : ''); d.id = id;
  Object.assign(d.style, { left: x + 'px', top: y + 'px', width: w + 'px' }); if (o.cola != null) d.style.setProperty('--cola', o.cola + 'px'); if (o.tam) d.style.fontSize = o.tam + 'px';
  d.innerHTML = html; $(sel).appendChild(d); return '#' + id;
}
function dice(sel, t, o = {}) {
  const or = o.origen || '30% 100%';
  TL.from(sel, { scale: 0, opacity: 0, transformOrigin: or, duration: .32, ease: 'back.out(2.2)' }, t); S('habla', t + .04, o.g ?? 1);
  if (o.fin) TL.to(sel, { scale: 0, opacity: 0, transformOrigin: or, duration: .18, ease: 'power2.in' }, o.fin);
}
function onda(t, x, y, o = {}) {
  const c = document.createElement('i'); c.className = 'onda'; Object.assign(c.style, { left: x - 100 + 'px', top: y - 100 + 'px', borderColor: o.color || '#fff' });
  $('#fx').appendChild(c); gsap.set(c, { autoAlpha: 0, scale: .2 }); const d = o.d ?? .6;
  TL.set(c, { autoAlpha: 1 }, t).to(c, { scale: o.r ?? 12, duration: d, ease: 'power2.out' }, t).to(c, { autoAlpha: 0, duration: d * .6, ease: 'power1.in' }, t + d * .4);
}
function precio(sel, id, o) {
  $(sel).insertAdjacentHTML('beforeend', `<div class="precio" id="${id}" style="top:${o.y || 560}px"><div class="precio__nom">${o.nombre}</div><div class="precio__val">${o.valor}</div><div class="precio__nota">${o.nota || ''}</div></div>`);
  return '#' + id;
}
function lista(sel, id, items, x, y, w, o = {}) {
  $(sel).insertAdjacentHTML('beforeend', `<div class="lista ${o.cls || ''}" id="${id}" style="left:${x}px;top:${y}px;width:${w}px">${items.map(i => `<div class="item"${o.tam ? ` style="font-size:${o.tam}px"` : ''}><span class="ok${o.no ? ' r' : ''}">${o.no ? EQUIS : CHECK}</span><span>${i}</span></div>`).join('')}</div>`);
  return $$(`#${id} .item`);
}
// los renglones entran desde un lado y se van marcando uno por uno
function listaAnim(id, t, o = {}) {
  const its = $$(`#${id} .item`), st = o.st ?? .45;
  its.forEach((it, i) => { TL.from(it, { x: o.x ?? -700, opacity: 0, duration: .34, ease: 'back.out(1.5)' }, t + i * st); S('zip', t + i * st, .6);
    TL.from(it.querySelector('.ok'), { scale: 0, rotation: -120, duration: .3, ease: 'back.out(3)' }, t + i * st + .22); S(o.son || 'bien', t + i * st + .24, .8); });
  return t + its.length * st;
}
function anuncio(sel, id, html, x, y, cls = '', rot = 0) {
  const d = document.createElement('div'); d.className = 'anuncio ' + cls; d.id = id; Object.assign(d.style, { left: x + 'px', top: y + 'px' }); d.innerHTML = html; $(sel).appendChild(d); gsap.set(d, { rotation: rot }); return '#' + id;
}
function etiqueta(sel, id, html, x, y, cls = '', rot = 0) {
  const d = document.createElement('div'); d.className = 'etq ' + cls; d.id = id; Object.assign(d.style, { left: x + 'px', top: y + 'px' }); d.innerHTML = html; $(sel).appendChild(d); gsap.set(d, { rotation: rot }); return '#' + id;
}
function ventana(sel, id, titulo, cuerpo, x, y, w) {
  $(sel).insertAdjacentHTML('beforeend', `<div class="vent" id="${id}" style="left:${x}px;top:${y}px;width:${w}px"><div class="vent__barra"><i></i><i></i><i></i>${titulo}</div><div class="vent__cuerpo">${cuerpo}</div></div>`); return '#' + id;
}
function signo(sel, txt, x, y, t, o = {}) {      // letras o simbolos que flotan y se desvanecen: Z, ?, !, $
  const d = document.createElement('div'); d.className = 'signo'; d.textContent = txt; Object.assign(d.style, { left: x + 'px', top: y + 'px', fontSize: (o.tam || 120) + 'px', color: o.color || '#fff' }); $(sel).appendChild(d);
  gsap.set(d, { autoAlpha: 0, scale: .3 }); const dur = o.d ?? 1.1;
  TL.set(d, { autoAlpha: 1 }, t).to(d, { x: o.dx ?? 60, y: o.dy ?? -220, scale: 1, rotation: o.rot ?? 14, duration: dur, ease: 'power1.out' }, t).to(d, { autoAlpha: 0, duration: dur * .35 }, t + dur * .65);
}
function arco(sel, t, o) {                        // vuela en arco: sube y cae
  const d = o.d || .8;
  TL.to(sel, { x: o.x, rotation: o.rot ?? 360, duration: d, ease: 'none' }, t)
    .to(sel, { y: -(o.alto ?? 300), duration: d * .45, ease: 'power2.out' }, t)
    .to(sel, { y: o.y ?? 500, duration: d * .55, ease: 'power2.in' }, t + d * .45);
  if (o.fin !== false) TL.to(sel, { autoAlpha: 0, duration: .12 }, t + d - .12);
}
function barra(sel, id, x, y, w, color) {
  $(sel).insertAdjacentHTML('beforeend', `<div class="barra abs" id="${id}" style="left:${x}px;top:${y}px;width:${w}px"><b style="width:0%${color ? ';background:' + color : ''}"></b></div>`); return `#${id} b`;
}
function haz(sel, id, x, y, w, h, t0, t1, pasadas = 2) {   // linea de escaneo que sube y baja
  $(sel).insertAdjacentHTML('beforeend', `<i class="haz" id="${id}" style="left:${x}px;top:${y}px;width:${w}px"></i>`);
  gsap.set('#' + id, { autoAlpha: 0 }); TL.set('#' + id, { autoAlpha: 1 }, t0).set('#' + id, { autoAlpha: 0 }, t1);
  TL.fromTo('#' + id, { y: 0 }, { y: h, duration: (t1 - t0) / pasadas, ease: 'sine.inOut', yoyo: true, repeat: pasadas - 1 }, t0);
  for (let i = 0; i < pasadas; i++) S('escaner', t0 + i * (t1 - t0) / pasadas, .7);
}
function numero(sel, id, txt, y, tam = 560, cls = '') { $(sel).insertAdjacentHTML('beforeend', `<div class="tx borde num ${cls}" id="${id}" style="top:${y}px;font-size:${tam}px">${txt}</div>`); gsap.set('#' + id, { autoAlpha: 0 }); return '#' + id; }
function cuenta(sel, t, nums, y = 330, paso = .5) {      // 3, 2, 1 con golpe
  nums.forEach((n, i) => { const id = 'cta' + Math.round(t * 100) + i, q = numero(sel, id, n, y), t0 = t + i * paso;
    TL.set(q, { autoAlpha: 1 }, t0).fromTo(q, { scale: 2.6, rotation: -14 }, { scale: 1, rotation: 0, duration: .2, ease: 'power3.in' }, t0).to(q, { scale: .7, autoAlpha: 0, duration: .14, ease: 'power2.in' }, t0 + paso - .16);
    S('tic', t0 + .18, 1); sacudir(t0 + .2, 12, .2); });
}
// musica del video: lista de compases de 2 s ('intro','suave','tension','alegre','final') y progresion
function musica(compases, o = {}) { window.__musica = Object.assign({ compases }, o); }

// ---------------------------------------------------------------- composicion comun
const PISO = 1420;                                    // linea del piso; el personaje se para aqui
function suelo(esc, y = PISO) { const d = document.createElement('div'); d.className = 'suelo'; d.style.top = y + 'px'; $(esc).prepend(d); return d; }
// personaje centrado y parado en el piso: pjc('#e1','c1',{w:760, cx:510, piso:1420})
function pjc(sel, id, o = {}) { const w = o.w ?? 760, cx = o.cx ?? 510, piso = o.piso ?? PISO; return pj(sel, id, cx - w / 2, piso - 558 * w / 700, w); }
function sinSombra(id, t, d = .2) { TL.to(`#${id} .sombra`, { opacity: 0, duration: d }, t); }
function franja(sel, id, html, y, cls = '', rot = -3) { $(sel).insertAdjacentHTML('beforeend', `<div class="franja ${cls}" id="${id}" style="top:${y}px">${html}</div>`); gsap.set('#' + id, { rotation: rot }); return '#' + id; }

const EQUIS = '<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>';
// atajos para crear piezas desde el guion
function esc(id, fondo) { $('#zoom').insertAdjacentHTML('beforeend', `<section class="e ${fondo}" id="${id}"></section>`); return '#' + id; }
function tx(sel, id, html, y, tam = 124, cls = 'borde') { $(sel).insertAdjacentHTML('beforeend', `<div class="tx ${cls}" id="${id}" style="top:${y}px;font-size:${tam}px">${html}</div>`); return '#' + id; }
function sub(sel, id, html, y, cls = 'caja') { $(sel).insertAdjacentHTML('beforeend', `<div class="sub ${cls}" id="${id}" style="top:${y}px;z-index:30">${html}</div>`); return '#' + id; }
function chip(sel, id, html, y, cls = '') { $(sel).insertAdjacentHTML('beforeend', `<div class="abs" style="left:0;right:60px;top:${y}px;text-align:center;z-index:20"><span class="chip ${cls}" id="${id}">${html}</span></div>`); return '#' + id; }
function tarjeta(sel, id, html, x, y, w, tam) { $(sel).insertAdjacentHTML('beforeend', `<div class="tarjeta" id="${id}" style="left:${x}px;top:${y}px;width:${w}px${tam ? ';font-size:' + tam + 'px' : ''}">${html}</div>`); return '#' + id; }
function estampaEn(sel, id, txt, x, y, cls = '', tam = 170) { $(sel).insertAdjacentHTML('beforeend', `<div class="estampa ${cls}" id="${id}" style="left:${x}px;top:${y}px;font-size:${tam}px">${txt}</div>`); return '#' + id; }
function luz(sel, x, y, r) { const d = document.createElement('div'); d.className = 'luz'; Object.assign(d.style, { left: x - r + 'px', top: y - r + 'px', width: 2 * r + 'px', height: 2 * r + 'px' }); $(sel).prepend(d); return d; }
function parpadeo(t, color = 'rgba(255,60,60,.4)', d = .3) {      // destello de color sin sonido de corte
  const c = document.createElement('i'); Object.assign(c.style, { position: 'absolute', inset: '0', background: color, zIndex: 58 }); $('#fx').appendChild(c);
  gsap.set(c, { autoAlpha: 0 }); TL.to(c, { autoAlpha: 1, duration: d * .3 }, t).to(c, { autoAlpha: 0, duration: d * .7 }, t + d * .3);
}
// filas de etiquetas centradas que aparecen una por una: tags(sel, id, [['a','b'],[['c','n']]], y, t)
function tags(sel, id, filas, y, t, o = {}) {
  $(sel).insertAdjacentHTML('beforeend', `<div class="tags" id="${id}" style="top:${y}px">${filas.map(f => `<div class="fila">${f.map(x => { const [txt, cls] = Array.isArray(x) ? x : [x, '']; return `<span class="etq gr ${cls}">${txt}</span>`; }).join('')}</div>`).join('')}</div>`);
  $$(`#${id} .etq`).forEach((e, i) => { const ti = t + i * (o.st ?? .22); gsap.set(e, { rotation: i % 2 ? 2.5 : -2.5 }); TL.from(e, { scale: 0, opacity: 0, duration: .36, ease: 'back.out(2.4)' }, ti); S('pop', ti, .8); });
}
// escena de precio completa: tarjeta que cae, etiquetas y el personaje celebrando abajo
function escenaPrecio(o) {
  const b = esc(o.id, o.fondo || 'azul'), t0 = o.t0;
  escena(b, t0, o.t1); fondoPuntos(b, t0, o.t1);
  const pr = precio(b, o.id + 'p', { nombre: o.nombre, valor: o.valor, nota: o.nota, y: 290 });
  golpe(pr, t0 + .12); S('moneda', t0 + .42); confeti(t0 + .42, 510, 600, 30);
  if (o.tags) tags(b, o.id + 't', o.tags, 290 + $(pr).offsetHeight + 46, t0 + .7);
  const c = o.id + 'c'; pjc(b, c, { w: 380, cx: 510, piso: 1500 }); cara(c, t0, { ojos: 'feliz', boca: 'feliz' });
  TL.from(`#${c}-w`, { y: 700, duration: .4, ease: 'back.out(1.6)' }, t0 + .5);
  for (let t = t0 + 1.0; t < o.t1 - .45; t += .5) salta(c, t, 90, .4);
  return b;
}
