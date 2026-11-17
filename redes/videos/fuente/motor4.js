// Cuarta parte del motor: narracion (voz + subtitulos por palabra) y recursos de escena nocturna.
// VOZ lo inyecta pagina.py cuando el guion trae un bloque "//== voz": {dur, frases:[{t0,t1,texto,palabras:[[w,t0,t1]]}], marcas:{}}
const fr = i => VOZ.frases[i];
const M = name => VOZ.marcas[name];

// subtitulos: cada frase aparece con su voz y la palabra que suena se ilumina
function subtitulos(o = {}) {
  if (!VOZ) return;
  const cont = document.createElement('div'); cont.id = 'subs'; cont.style.top = (o.y ?? 1290) + 'px'; $('#esc').appendChild(cont);
  VOZ.frases.forEach((f, i) => {
    if (o.omitir && o.omitir.includes(i)) return;       // frases que ya salen en grande en pantalla
    const d = document.createElement('div'); d.className = 'subt'; d.innerHTML = f.palabras.map(p => `<span class="sw">${p[0]}</span>`).join(' ');
    cont.appendChild(d); gsap.set(d, { autoAlpha: 0 });
    const sig = VOZ.frases[i + 1], ini = Math.max(0, f.t0 - .04), fin = Math.min(f.t1 + (o.cola ?? .5), sig ? sig.t0 - .05 : f.t1 + .6);
    TL.set(d, { autoAlpha: 1 }, ini).set(d, { autoAlpha: 0 }, fin);
    TL.fromTo(d, { scale: .86, y: 14 }, { scale: 1, y: 0, duration: .16, ease: 'back.out(2.4)' }, ini);
    [...d.querySelectorAll('.sw')].forEach((s, k) => {
      const p = f.palabras[k];
      TL.to(s, { color: '#FFD23F', scale: 1.12, duration: .07, ease: 'power2.out' }, p[1]).to(s, { color: '#fff', scale: 1, duration: .12 }, Math.max(p[2], p[1] + .14));
    });
  });
}
// el personaje mueve la boca con las frases i0..i1 (cuando es el quien habla)
function bocaVoz(id, i0, i1, o = {}) {
  for (let i = i0; i <= i1; i++) {
    const f = fr(i);
    f.palabras.forEach((p, k) => { cara(id, p[1], { boca: k % 2 ? 'feliz' : 'o' }); cara(id, (p[1] + p[2]) / 2, { boca: k % 2 ? 'o' : 'dientes' }); });
    cara(id, f.t1, { boca: o.fin || 'feliz' });
  }
}
// musica segun los tramos de la narracion: [[t0, 'suave'], [t1, 'tension'], ...]; el ultimo compas siempre cierra
function musicaPorTiempos(tramos, o) {
  const n = Math.ceil(window.__dur / 2), c = [];
  for (let b = 0; b < n; b++) { let tipo = tramos[0][1]; for (const [t, k] of tramos) if (t <= 2 * b + .9) tipo = k; c.push(tipo); }
  c[n - 1] = 'final'; musica(c, o);
}
OBJ.corazon = `<svg viewBox="0 0 200 180"><path d="M100 168 L22 90 A46 46 0 0 1 100 42 A46 46 0 0 1 178 90 Z" fill="#FF4D6D" stroke="${O}" stroke-width="12" stroke-linejoin="round"/></svg>`;
// escena final de las historias narradas: escribe CHUTA en una caja de comentario y cae el sello GRATIS
// o: {id, t0, t1, iPregunta, iComenta, iGratis, palGratis, titulo}
function escenaComenta(o) {
  const e = esc(o.id, 'azul'), fq = fr(o.iPregunta), fc = fr(o.iComenta), fg = fr(o.iGratis), tg = fg.palabras[o.palGratis][1];
  escena(e, o.t0, o.t1); cortina(o.t0, '#0E1A33'); fondoPuntos(e, o.t0, o.t1); suelo(e);
  tx(e, o.id + 't', o.titulo, 300, o.tam || 120); texto('#' + o.id + 't', o.t0 + .1);
  $(e).insertAdjacentHTML('beforeend', `<div class="caja-com" id="${o.id}c" style="top:${o.yCaja || 590}px"><small>Agrega un comentario…</small>` + 'CHUTA'.split('').map((l, k) => `<span class="letra" id="${o.id}l${k}">${l}</span>`).join('') + `<i id="${o.id}u"></i></div>`);
  aparece(`#${o.id}c`, fq.t0 + .9); TL.to(`#${o.id}u`, { opacity: 0, duration: .25, yoyo: true, repeat: 30 }, fq.t0 + .9);
  'CHUTA'.split('').forEach((l, k) => { const t = fc.t0 + .2 + k * .12; TL.set(`#${o.id}l${k}`, { visibility: 'visible' }, t); S('tecla', t, 1.6); });
  TL.to(`#${o.id}c`, { scale: 1.06, duration: .1, yoyo: true, repeat: 1 }, fc.t1 + .1); S('bien', fc.t1 + .1, 1.2);
  const st = estampaEn(e, o.id + 's', 'GRATIS', 0, (o.yCaja || 590) + 310, 'v', 150); gsap.set(st, { left: 510, xPercent: -50 }); estampa(st, tg - .25, { rot: -8 }); confeti(tg, 510, 900, 34);
  const c = o.id + 'p'; pjc(e, c, { w: 400 }); cara(c, o.t0, { ojos: 'normal', boca: 'feliz' }); mira(c, o.t0 + .2, 0, -16); cara(c, fc.t1, { ojos: 'feliz' }); salta(c, fc.t1 + .15, 80, .4); salta(c, tg, 80, .4);
  return e;
}
// duracion total del video: narracion + cierre, redondeada a compases de 2 s
function durVoz(cierre = 3.6) { return Math.ceil((VOZ.dur + cierre) / 2) * 2; }

// ---------------------------------------------------------------- escena nocturna
OBJ.ventanaLuna = `<svg viewBox="0 0 360 420"><rect x="14" y="14" width="332" height="392" rx="18" fill="#0B1E4A" stroke="#22304F" stroke-width="16"/><path d="M180 14 L180 406 M14 210 L346 210" stroke="#22304F" stroke-width="14"/><path d="M250 76 A62 62 0 1 0 292 176 A50 50 0 1 1 250 76 Z" fill="#FFE9A8"/><g fill="#fff"><circle cx="70" cy="70" r="5"/><circle cx="118" cy="150" r="4"/><circle cx="60" cy="280" r="5"/><circle cx="250" cy="300" r="4"/><circle cx="300" cy="250" r="3"/><circle cx="130" cy="340" r="4"/></g></svg>`;
OBJ.sol = `<svg viewBox="0 0 300 300"><g stroke="#FFD23F" stroke-width="18" stroke-linecap="round"><path d="M150 12 L150 48 M150 252 L150 288 M12 150 L48 150 M252 150 L288 150 M52 52 L78 78 M222 222 L248 248 M248 52 L222 78 M52 248 L78 222"/></g><circle cx="150" cy="150" r="78" fill="#FFD23F" stroke="${O}" stroke-width="12"/></svg>`;
OBJ.cursor = `<svg viewBox="0 0 100 130"><path d="M12 8 L12 104 L38 82 L56 122 L74 114 L56 74 L90 72 Z" fill="#fff" stroke="${O}" stroke-width="10" stroke-linejoin="round"/></svg>`;
OBJ.engranaje = `<svg viewBox="0 0 200 200"><path d="M100 14 L118 18 L124 42 L146 32 L162 46 L152 68 L176 76 L180 98 L158 108 L166 132 L150 148 L128 138 L120 162 L98 166 L88 142 L64 152 L48 138 L58 114 L34 106 L30 84 L54 76 L44 52 L60 36 L82 46 L88 22 Z" fill="#AEB6C2" stroke="${O}" stroke-width="11" stroke-linejoin="round"/><circle cx="104" cy="92" r="30" fill="#0E1A33"/></svg>`;
OBJ.comentario = `<svg viewBox="0 0 300 260"><path d="M36 20 L264 20 Q290 20 290 46 L290 170 Q290 196 264 196 L130 196 L70 246 L78 196 L36 196 Q10 196 10 170 L10 46 Q10 20 36 20 Z" fill="#fff" stroke="${O}" stroke-width="13" stroke-linejoin="round"/></svg>`;
function estrellas(sel, n = 26, y1 = 900) {
  for (let i = 0; i < n; i++) { const d = document.createElement('i'); d.className = 'estrella'; const s = R(4, 10); Object.assign(d.style, { left: R(20, 1060) + 'px', top: R(120, y1) + 'px', width: s + 'px', height: s + 'px' }); $(sel).prepend(d);
    TL.fromTo(d, { opacity: R(.2, .5) }, { opacity: 1, duration: R(.5, 1.2), yoyo: true, repeat: 40, ease: 'sine.inOut' }, R(0, 1)); }
}
function vineta(sel, fuerza = .6) { const d = document.createElement('div'); d.className = 'vineta'; d.style.background = `radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0) 38%, rgba(0,0,0,${fuerza}) 100%)`; $(sel).appendChild(d); return d; }
// ventana oscura tipo programa: ventanaOsc(sel, id, titulo, cuerpoHTML, x, y, w)
function ventanaOsc(sel, id, titulo, cuerpo, x, y, w) { const q = ventana(sel, id, titulo, cuerpo, x, y, w); $(q).classList.add('osc'); return q; }
function aparece(q, t, o = {}) { const { son, g, ...v } = o; TL.from(q, Object.assign({ scale: .6, opacity: 0, y: 60, duration: .34, ease: 'back.out(1.8)' }, v), t); S(son || 'pop', t, g ?? 1); }
// empuje lento de camara durante una escena (da sensacion de cine)
function empuje(t0, t1, de = 1, a = 1.07) { TL.fromTo('#zoom', { scale: de }, { scale: a, duration: t1 - t0, ease: 'none', immediateRender: false }, t0); }
