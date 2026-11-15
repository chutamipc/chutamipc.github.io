//== guion
montar(18);
musica(['lento', 'lento', 'suave', 'subida', 'subida', 'alegre', 'alegre', 'alegre', 'final'], { prog: 0, tono: -1 });

// ---- 1. ya no da mas (0 - 4)
const e1 = esc('e1', 'claro'); escena(e1, 0, 4); fondoRayas(e1, 0, 4); suelo(e1);
tx(e1, 't1', '¿Tu PC ya <span class="placa r">no da más</span>?', 290, 124); texto('#t1', .05);
pjc(e1, 'c1'); accesorio('c1', 'telarana'); accesorio('c1', 'venda'); cara('c1', 0, { ojos: 'x', boca: 'onda', gota: true });
[['Virus', 'r', 110, 930, -12], ['Lentísima', 'am', 600, 890, 9], ['Errores', 'g', 110, 1190, 6], ['Se cuelga', '', 610, 1170, -7]].forEach((b, i) => {
  const q = etiqueta(e1, 'pe' + i, b[0], b[2], b[3], b[1] + ' gr', b[4]); pop(q, .5 + i * .3);
  TL.to(q, { rotation: b[4] + 6, duration: .12, yoyo: true, repeat: 13, ease: 'sine.inOut' }, .9 + i * .3);
});
tiembla('c1', .3, 3.2, 3); S('desinfla', 2.2, .9);
cara('c1', 2.4, { ojos: 'linea', boca: 'triste', cejas: 14 }); llora('c1', 2.6, 4);
sub(e1, 's1', 'Virus, errores, lentitud… todo junto', 1296); entra('#s1', 2.3);

// ---- 2. primero el respaldo (4 - 6)
const e2 = esc('e2', 'azul'); escena(e2, 4, 6); cortina(4.0); fondoRayas(e2, 4, 6); suelo(e2);
tx(e2, 't2', 'Primero <span class="placa v">respaldamos</span> tus archivos', 290, 108); texto('#t2', 4.1, { st: .05 });
pjc(e2, 'c2', { w: 520, cx: 300 }); cara('c2', 4, { ojos: 'normal', boca: 'o' }); mira('c2', 4.2, 16, -6);
const cd = obj(e2, 'candado', 'cd', 650, 1090, 260, 'z-index:12');
[0, 1, 2, 3].forEach(i => {
  const f = obj(e2, 'carpeta', 'f' + i, 240, 1010, 150, 'z-index:11'); gsap.set(f, { autoAlpha: 0 }); const t = 4.5 + i * .28;
  TL.set(f, { autoAlpha: 1 }, t).to(f, { x: 440, duration: .5, ease: 'none' }, t).to(f, { y: -260, duration: .25, ease: 'power2.out' }, t).to(f, { y: 150, duration: .25, ease: 'power2.in' }, t + .25).to(f, { autoAlpha: 0, scale: .4, duration: .08 }, t + .46);
  S('burbuja', t, 1); S('bien', t + .48, .6); TL.to(cd, { scale: 1.1, duration: .07, yoyo: true, repeat: 1 }, t + .48);
});
sub(e2, 's2', 'Hasta 50 GB incluidos', 1306); entra('#s2', 4.9);

// ---- 3. el lavado: Windows limpio, desde cero (6 - 10)
const e3 = esc('e3', 'cielo'); escena(e3, 6, 10); zoomCorte(6.0, e2, e3);
tx(e3, 't3', 'Windows <span class="placa">limpio</span> desde cero', 290, 112); texto('#t3', 6.1, { st: .05 });
$(e3).insertAdjacentHTML('beforeend', '<div class="tambor" id="tb"></div>');
pjc(e3, 'c3', { w: 470, cx: 510, piso: 1180 }); sinSombra('c3', 6, .01);
gsap.set('#c3-w', { transformOrigin: '50% 50%' }); TL.to('#c3-w', { rotation: 360 * 5, duration: 3.6, ease: 'power2.inOut' }, 6.2);
cara('c3', 6, { ojos: 'espiral', boca: 'o' }); espirales('c3', 6, 10);
burbujas(e3, 6.2, 9.8, 180, 760, 1250, 36);
S('aspira', 6.2, .8); S('aspira', 7.4, .8); S('aspira', 8.6, .7); sacudir(6.4, 7, 3.2); S('timbre', 9.8, 1);

// ---- 4. como nueva (10 - 12.5)
const e4 = esc('e4', 'naranja'); escena(e4, 10, 12.5); destello(10.0, '#fff', .35); fondoRayos(e4, 10, 12.5, 510, 1100); suelo(e4);
tx(e4, 't4', '¡Como <span class="placa">NUEVA</span>!', 290, 150); golpe('#t4', 10.05);
pjc(e4, 'c4'); cara('c4', 10, { ojos: 'feliz', boca: 'feliz' }); salta('c4', 10.3, 150, .5); S('fanfarria', 10.1, .9);
chispas(10.3, 300, 950, 8); chispas(10.5, 720, 1000, 8, { son: false }); chispas(10.7, 510, 1300, 8, { son: false });
tags(e4, 'tg4', [['Con tus archivos de vuelta'], [['Garantía de 7 días', 'v']]], 640, 10.9, { st: .4 });
[0, 1, 2].forEach(i => {
  const f = obj(e4, 'carpeta', 'g' + i, 1100, 700, 150, 'z-index:11'); const t = 11.0 + i * .25;
  TL.to(f, { x: -660, y: 330, rotation: -200, duration: .45, ease: 'power1.in' }, t).to(f, { autoAlpha: 0, scale: .3, duration: .08 }, t + .42); S('burbuja', t + .42, 1);
});
salta('c4', 11.8, 100, .4);

// ---- 5. precio (12.5 - 14.5) y cierre
cortina(12.5, '#0E1A33');
escenaPrecio({ id: 'e5', t0: 12.5, t1: 14.5, nombre: 'Chuta Completo', valor: '$20', nota: 'Precio de lanzamiento · <s>normal $25</s>', tags: [['Entrega en 24 a 48 horas']] });
cierre({ t0: 14.5, t1: 18, titulo: 'Diagnóstico <span class="placa">GRATIS</span>' });
zoomCorte(14.5, '#e5', '#fin');
