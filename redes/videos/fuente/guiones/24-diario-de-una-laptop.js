//== voz
!voz=es_MX-claude-high vel=1.0 pausa=0.18 inicio=0.35
@diario
Querido diario: || Querido diario. | pausa=0.35
@lenta
hoy me demoré cinco minutos en abrir un solo archivo. | pausa=0.3
@grito
Mi dueño me gritó: ¡Chuta, mi PC! | pausa=0.35
@vieja
Dice que ya estoy vieja.
Que me va a cambiar por otra. | pausa=0.45
@verdad
Pero yo no estoy vieja. | pausa=0.25
Estoy llena de basura,
de programas que nadie usa,
y sin actualizar. | pausa=0.4
@cuidado
Solo necesito que me cuiden. | pausa=0.5
@express
Y hoy me hicieron un Chuta Express.
Me limpiaron, me ordenaron
y me pusieron al día.
Sin formatearme. | pausa=0.4
@nueva
Ahora mi dueño dice que parezco nueva. | pausa=0.45
@cta
Si tu compu también te está pidiendo ayuda,
comenta CHUTA || comenta chuta
y la revisamos gratis. | pausa=0.3
//== css
.e.cuaderno{background:repeating-linear-gradient(#FFF8E7 0 116px,#BFD0F5 116px 122px);color:var(--mar)}
.e.cuaderno::before{content:"";position:absolute;left:96px;top:0;bottom:0;width:8px;background:#FF8FA3}
.e.cuaderno .suelo{background:rgba(14,26,51,.08);border-top-color:rgba(14,26,51,.14)}
.e.cuaderno .tx.borde{-webkit-text-stroke:0}
.letra{visibility:hidden}
//== guion
montar(durVoz());
subtitulos();
const tL = M('lenta'), tG = M('grito'), tV = M('vieja'), tR = M('verdad'), tK = M('cuidado'), tE = M('express'), tN = M('nueva'), tC = M('cta'), tF = VOZ.dur;
musicaPorTiempos([[0, 'suave'], [tL, 'lento'], [tG, 'tension'], [tR, 'suave'], [tE, 'subida'], [tE + 2, 'alegre']], { prog: 3, tono: 1 });

// ---- 1. querido diario
const e1 = esc('e1', 'cuaderno'); escena(e1, 0, tL - .1); suelo(e1);
tx(e1, 't1', 'Querido <span class="placa">diario</span>:', 330, 130); texto('#t1', fr(0).t0, { st: .25 });
pjc(e1, 'c1'); cara('c1', 0, { ojos: 'normal', boca: 'linea' }); mira('c1', .1, -8, -14, .1); bocaVoz('c1', 0, 0, { fin: 'linea' });
const d1 = obj(e1, 'documento', 'dc1', 720, 580, 190, 'z-index:9'); gsap.set(d1, { rotation: 10 }); TL.from(d1, { y: -800, rotation: -40, duration: .5, ease: 'bounce.out' }, .15); S('paso', .5, 1);

// ---- 2. cinco minutos para abrir un archivo
const e2 = esc('e2', 'azul'); escena(e2, tL - .1, tG - .1); cortina(tL - .1); fondoRayas(e2, tL - .1, tG); suelo(e2);
ventana(e2, 'v2', 'Abriendo archivo…', '<div class="barra"><b id="v2b" style="width:4%;background:#1768F8"></b></div><div class="pct"><span id="v2n">4</span>%</div>', 150, 320, 720);
TL.from('#v2', { scale: 0, duration: .3, ease: 'back.out(1.8)' }, tL); TL.to('#v2b', { width: '23%', duration: tG - tL - .3, ease: 'none' }, tL + .1); contador('#v2n', tL + .1, 4, 23, tG - tL - .3, 'none');
obj(e2, 'reloj', 'rl2', 705, 610, 220, 'z-index:9'); TL.from('#rl2', { scale: 0, duration: .3, ease: 'back.out(2)' }, tL + .3);
TL.to('#rl2 .minuto', { rotation: 360 * 5, svgOrigin: '150 150', duration: tG - tL - .2, ease: 'none' }, tL); TL.to('#rl2 .hora', { rotation: 150, svgOrigin: '150 150', duration: tG - tL - .2, ease: 'none' }, tL);
for (let t = tL + .4, k = 0; t < tG - .3; t += .5, k++) S(k % 2 ? 'toc' : 'tic', t, .7);
pjc(e2, 'c2'); accesorio('c2', 'caracol'); cara('c2', tL, { ojos: 'normal', cejas: 12, gota: true }); gotea('c2', tL, tG); bocaVoz('c2', 1, 1, { fin: 'onda' });

// ---- 3. ¡Chuta, mi PC!
const e3 = esc('e3', 'alarma'); escena(e3, tG - .1, tV - .1); destello(tG - .1, '#FF4D4D', .3); fondoRayos(e3, tG - .1, tV, 510, 1050, .3); suelo(e3);
pjc(e3, 'c3'); cara('c3', tG, { ojos: 'normal', cejas: 12, gota: true }); bocaVoz('c3', 2, 2, { fin: 'triste' });
const tg = fr(2).palabras[4][1];
const g3 = globo(e3, 'g3', '¡CHUTA,<br>MI PC!', 220, 330, 660, { cls: 'grito arriba', tam: 124, cola: 500 });
TL.from(g3, { scale: 0, rotation: -12, transformOrigin: '80% 0%', duration: .3, ease: 'back.out(2.4)' }, tg); S('golpe', tg, 1); sacudir(tg, 34, .5); S('alarma', tg + .05, 1);
cara('c3', tg, { ojos: 'x' }); tiembla('c3', tg, tV - .1, 8); cara('c3', tg + .7, { ojos: 'normal' });

// ---- 4. dice que ya estoy vieja, que me va a cambiar
const e4 = esc('e4', 'claro'); escena(e4, tV - .1, tR - .1); cortina(tV - .1, '#0E1A33'); fondoRayas(e4, tV - .1, tR); suelo(e4);
pjc(e4, 'c4', { cx: 390, w: 640 }); cara('c4', tV, { ojos: 'normal', cejas: 14 }); bocaVoz('c4', 3, 4, { fin: 'triste' }); llora('c4', fr(4).t0 + .2, tR - .1);
const ev = etiqueta(e4, 'ev4', '¿Vieja yo?', 0, 560, 'r gr', -6); gsap.set(ev, { left: 400, xPercent: -50 }); golpe(ev, fr(3).palabras[4][1] - .2, { de: 3, f: 12 });
const cj = obj(e4, 'caja', 'cj4', 715, 1190, 235, 'z-index:9'); TL.from(cj, { x: 500, duration: .45, ease: 'back.out(1.4)' }, fr(4).t0 + .3); S('zip', fr(4).t0 + .3, 1);
const en = etiqueta(e4, 'en4', 'LA NUEVA', 0, 1120, 'am', 6); gsap.set(en, { left: 832, xPercent: -50 }); pop(en, fr(4).t0 + .7);
mira('c4', fr(4).t0 + .5, 16, 6);

// ---- 5. no estoy vieja: basura, programas que nadie usa y sin actualizar
const e5 = esc('e5', 'azul'); escena(e5, tR - .1, tK - .1); zoomCorte(tR - .1, e4, e5); fondoRayos(e5, tR - .1, tK, 510, 1100); suelo(e5);
tx(e5, 't5', 'No estoy <span class="nar">vieja</span>', 300, 124); texto('#t5', tR); sale('#t5', fr(6).t0 - .12);
pjc(e5, 'c5'); accesorio('c5', 'telarana'); gsap.set('#c5 .a-tela', { opacity: 0 }); cara('c5', tR, { ojos: 'normal', cejas: -12 }); bocaVoz('c5', 5, 8, { fin: 'linea' });
tx(e5, 't5b', 'Llena de <span class="placa">basura</span>', 300, 118); texto('#t5b', fr(6).t0); sale('#t5b', fr(7).t0 - .12);
for (let k = 0; k < 7; k++) {
  const f = obj(e5, k % 2 ? 'caja' : 'carpeta', 'bs' + k, R(60, 800), -260, R(130, 190), 'z-index:11'), t = fr(6).t0 + .1 + k * .17;
  TL.to(f, { y: R(1390, 1500), rotation: R(-80, 80), duration: .5, ease: 'bounce.out' }, t); S('paso', t + .2, .9);
}
cara('c5', fr(6).t0, { cejas: 10, gota: true });
tx(e5, 't5c', 'Programas que <span class="placa">nadie usa</span>', 300, 108); texto('#t5c', fr(7).t0); sale('#t5c', fr(8).t0 - .12);
['#FF4D4D', '#FFD23F', '#1FBF75', '#6FB2FF', '#FF8A00', '#fff'].forEach((c, k) => {
  const a = document.createElement('div'); a.className = 'app'; Object.assign(a.style, { left: 170 + (k % 3) * 270 + 'px', top: 560 + Math.floor(k / 3) * 150 + 'px', background: c }); $(e5).appendChild(a);
  const t = fr(7).t0 + .1 + k * .16; TL.from(a, { scale: 0, rotation: -90, duration: .3, ease: 'back.out(2.5)' }, t); S('pop', t, 1); TL.to(a, { scale: 0, opacity: 0, duration: .2 }, fr(8).t0 - .15 + k * .02);
});
tx(e5, 't5d', '…y sin <span class="placa r">actualizar</span>', 300, 118); texto('#t5d', fr(8).t0);
TL.to('#c5 .a-tela', { opacity: 1, duration: .3 }, fr(8).t0); polvo(fr(8).t0 + .1, 300, 950, 5); polvo(fr(8).t0 + .3, 720, 950, 5);

// ---- 6. solo necesito que me cuiden
const e6 = esc('e6', 'claro'); escena(e6, tK - .1, tE - .1); cortina(tK - .1, '#FF8FA3'); fondoRayas(e6, tK - .1, tE); suelo(e6);
pjc(e6, 'c6'); cara('c6', tK, { ojos: 'normal', cejas: 16 }); bocaVoz('c6', 9, 9, { fin: 'triste' }); mira('c6', tK, 0, -10, .1);
[0, 1, 2, 3, 4].forEach(k => {
  const h = obj(e6, 'corazon', 'hz' + k, 180 + k * 150, 860 - (k % 2) * 60, 110, 'z-index:12'); gsap.set(h, { autoAlpha: 0, scale: .3 }); const t = tK + .2 + k * .22;
  TL.set(h, { autoAlpha: 1 }, t).to(h, { y: -420, scale: 1, rotation: R(-20, 20), duration: 1.3, ease: 'power1.out' }, t).to(h, { autoAlpha: 0, duration: .3 }, t + 1.0); S('burbuja', t, .8);
});
empuje(tK - .1, tE - .1, 1, 1.08);

// ---- 7. hoy me hicieron un Chuta Express
const e7 = esc('e7', 'naranja'); escena(e7, tE - .1, tN - .1); TL.set('#zoom', { scale: 1 }, tE - .1); cortina(tE - .1); fondoRayos(e7, tE - .1, tN, 510, 1100); suelo(e7);
chip(e7, 'ch7', 'Chuta Express', 292); pop('#ch7', fr(10).palabras[5][1] - .1);
pjc(e7, 'c7'); gsap.set('#c7 .llave', { visibility: 'hidden' }); cara('c7', tE, { ojos: 'normal' }); bocaVoz('c7', 10, 13, { fin: 'feliz' });
const ll = obj(e7, 'llave', 'll7', 743, 660, 150, 'z-index:14'); gsap.set(ll, { transformOrigin: '50% 95%', rotation: 12 }); TL.from(ll, { y: -800, duration: .32, ease: 'power2.out' }, fr(10).palabras[5][1]);
[[fr(11).palabras[1][1], 'Basura', '', -820, -8], [fr(11).palabras[3][1], 'Programas que sobran', 'am', 820, 10], [fr(12).t0 + .5, 'Arranque lento', 'g', -820, 6]].forEach(([t, txt, cls, dx, rot], i) => {
  TL.to(ll, { rotation: -62, duration: .13, ease: 'power3.in' }, t - .13).to(ll, { rotation: 12, duration: .3, ease: 'back.out(2)' }, t + .02);
  S('golpe', t, .6); S('clic', t, 1.2); chispas(t, 530, 850, 6, { son: false, radio: .6 });
  agacha('c7', t, .08, .86); levanta('c7', t + .1, .25); cara('c7', t, { ojos: 'x' }); cara('c7', t + .24, { ojos: 'normal' });
  const e = etiqueta(e7, 'bx' + i, txt, 0, 1010, cls + ' gr', rot); gsap.set(e, { autoAlpha: 0, left: 510, xPercent: -50 }); TL.set(e, { autoAlpha: 1 }, t);
  arco(e, t, { x: dx, alto: 330, y: 160, d: .95, rot: dx > 0 ? 160 : -160 }); S('zip', t + .05, .6);
});
TL.to(ll, { y: -1200, rotation: 400, duration: .4, ease: 'power2.in' }, fr(13).t0 - .25);
tags(e7, 'tg7', [['Sin formatear']], 420, fr(13).t0); cara('c7', fr(13).t0, { ojos: 'feliz' }); salta('c7', fr(13).t0 + .1, 110, .42); chispas(fr(13).t0 + .1, 510, 1050, 12);

// ---- 8. ahora parezco nueva
const e8 = esc('e8', 'cielo'); escena(e8, tN - .1, tC - .1); destello(tN - .1, '#fff', .35); fondoRayos(e8, tN - .1, tC, 510, 1050); suelo(e8);
tx(e8, 't8', '¡Como <span class="placa">NUEVA</span>!', 290, 120); golpe('#t8', fr(14).palabras[5][1] - .25);
pjc(e8, 'c8'); accesorio('c8', 'corona'); cara('c8', tN, { ojos: 'feliz' }); bocaVoz('c8', 14, 14, { fin: 'feliz' });
TL.from('#c8 .a-corona', { y: -800, duration: .6, ease: 'bounce.out' }, tN + .1); S('fanfarria', tN, .9); confeti(tN + .3, 510, 900, 40);
chispas(tN + .5, 300, 950, 8); chispas(tN + 1.1, 720, 1000, 8, { son: false }); salta('c8', fr(14).palabras[5][1], 120, .45);

// ---- 9. comenta CHUTA y cierre
escenaComenta({ id: 'e9', t0: tC - .1, t1: tF, iPregunta: 15, iComenta: 16, iGratis: 17, palGratis: 3, titulo: '¿La tuya pide <span class="placa">ayuda</span>?' });
cierre({ t0: tF, t1: window.__dur, titulo: 'Comenta <span class="placa">CHUTA</span>', sub: 'o escríbenos por WhatsApp · Cuenca' });
zoomCorte(tF, '#e9', '#fin');
