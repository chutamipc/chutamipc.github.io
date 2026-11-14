//== guion
montar(16);
musica(['lento', 'lento', 'alegre', 'alegre', 'alegre', 'alegre', 'alegre', 'final'], { prog: 2 });
const VENT = (id, pct, color) => `<div class="barra"><b id="${id}b" style="width:${pct}%;background:${color}"></b></div><div class="pct"><span id="${id}n">${pct}</span>% lleno</div>`;

// ---- 1. el disco se llena y la laptop engorda (0 - 4)
const e1 = esc('e1', 'naranja'); escena(e1, 0, 4); fondoRayas(e1, 0, 4); suelo(e1);
tx(e1, 't1', '¿Disco <span class="placa r">LLENO</span> otra vez?', 290, 124); texto('#t1', .05);
ventana(e1, 'v1', 'Disco local (C:)', VENT('v1', 62, '#1768F8'), 150, 566, 720);
TL.from('#v1', { y: -60, opacity: 0, duration: .3, ease: 'back.out(2)' }, .3);
TL.to('#v1b', { width: '99%', duration: 2.2, ease: 'none' }, .5); TL.to('#v1b', { backgroundColor: '#FF4D4D', duration: .4 }, 1.9);
contador('#v1n', .5, 62, 99, 2.2, 'none');
pjc(e1, 'c1'); gsap.set('#c1-w', { transformOrigin: '50% 100%' });
cara('c1', 0, { ojos: 'normal', boca: 'linea' }); mira('c1', 0, 0, -16, .1);
[.5, .95, 1.4, 1.85, 2.3].forEach((t, i) => {
  const c = obj(e1, i % 2 ? 'caja' : 'carpeta', 'ca' + i, 410 + (i % 3 - 1) * 90, -260, 190, 'z-index:11');
  TL.to(c, { y: 1180, rotation: R(-60, 60), duration: .42, ease: 'power2.in' }, t).to(c, { scale: .2, autoAlpha: 0, duration: .1 }, t + .4);
  S('burbuja', t + .4, 1.2);
  TL.to('#c1-w', { scaleX: 1 + .08 * (i + 1), scaleY: 1 + .012 * (i + 1), duration: .3, ease: 'elastic.out(1.2,.4)' }, t + .42);
});
cara('c1', 1.4, { boca: 'o', cejas: -8 }); cara('c1', 1.9, { boca: 'onda', gota: true, cejas: 12 }); mira('c1', 1.9, 0, 0);
const f1 = franja(e1, 'f1', '¡DISCO LLENO!', 1262, 'r', -4); golpe(f1, 2.55, { f: 34 }); S('error', 2.8, 1.2); S('error', 3.35, 1);
cara('c1', 2.8, { ojos: 'espiral' }); espirales('c1', 2.8, 4); tiembla('c1', 2.8, 4.0, 7);
parpadeo(2.82, 'rgba(255,40,40,.35)', .4); parpadeo(3.35, 'rgba(255,40,40,.3)', .4);

// ---- 2. a dieta: caminadora y basura que sale volando (4 - 10)
const e2 = esc('e2', 'azul'); escena(e2, 4, 10); cortina(4.0); fondoRayos(e2, 4, 10, 510, 1100);
$(e2).insertAdjacentHTML('beforeend', '<div class="cinta" id="ci" style="top:1408px;left:70px;right:130px;height:74px;border-radius:37px;border:9px solid #0E1A33"></div>');
TL.fromTo('#ci', { backgroundPosition: '0px 0px' }, { backgroundPosition: '-1440px 0px', duration: 3.6, ease: 'none' }, 4.5);
tx(e2, 't2', '¡A <span class="placa">DIETA</span>!', 290, 150); golpe('#t2', 4.05);
ventana(e2, 'v2', 'Disco local (C:) · ejemplo', VENT('v2', 99, '#FF4D4D'), 150, 566, 720);
TL.to('#v2b', { width: '58%', duration: 3.1, ease: 'power1.inOut' }, 4.8); contador('#v2n', 4.8, 99, 58, 3.1, 'power1.inOut');
TL.to('#v2b', { backgroundColor: '#1FBF75', duration: .5 }, 6.6);
pjc(e2, 'c2'); accesorio('c2', 'cintillo'); gsap.set('#c2-w', { transformOrigin: '50% 100%', scaleX: 1.4, scaleY: 1.06 });
cara('c2', 4, { ojos: 'normal', boca: 'dientes', cejas: -12, gota: true }); gotea('c2', 4.5, 8.0);
camina('c2', 4.5, 8.1, 0, { pasos: 12, alto: 50, giro: 5 });
[['Temporales', ''], ['Actualizaciones viejas', 'am'], ['Cachés', 'g'], ['Programas sin usar', 'n']].forEach((b, i) => {
  const t = 4.9 + i * .78, e = etiqueta(e2, 'ba' + i, b[0], 0, 1040, b[1] + ' gr', R(-8, 8));
  gsap.set(e, { autoAlpha: 0, left: 510, xPercent: -50 }); TL.set(e, { autoAlpha: 1 }, t);
  arco(e, t, { x: i % 2 ? 900 : -900, alto: 300, y: 200, d: .9, rot: i % 2 ? 200 : -200 }); S('zip', t, .9);
  TL.to('#c2-w', { scaleX: 1.4 - .1 * (i + 1), scaleY: 1.06 - .015 * (i + 1), duration: .35, ease: 'back.out(3)' }, t + .05);
});
cara('c2', 8.1, { ojos: 'feliz', boca: 'feliz', gota: false, cejas: 0 }); salta('c2', 8.15, 150, .5); confeti(8.2, 510, 900, 36); S('fanfarria', 8.15, .9);
sale('#t2', 7.9); tx(e2, 't3', 'Tus archivos <span class="placa v">no se tocan</span>', 290, 116); texto('#t3', 8.1);
sub(e2, 's2', 'Nada personal se borra sin tu permiso', 1296); entra('#s2', 8.6);

// ---- 3. precio (10 - 12.5) y cierre
cortina(10.0);
escenaPrecio({ id: 'e3', t0: 10, t1: 12.5, nombre: 'Disco a Dieta', valor: '$12', nota: 'Precio de lanzamiento · <s>normal $15</s>', tags: [['Sin formatear'], [['Reporte de GB recuperados', 'n']]] });
cierre({ t0: 12.5, t1: 16, titulo: 'Diagnóstico <span class="placa">GRATIS</span>' });
zoomCorte(12.5, '#e3', '#fin');
