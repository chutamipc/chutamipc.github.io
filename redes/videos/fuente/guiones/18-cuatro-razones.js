//== guion
montar(16);
musica(['intro', 'alegre', 'alegre', 'alegre', 'alegre', 'alegre', 'alegre', 'final'], { prog: 0, tono: -3 });

// ---- 0. titulo (0 - 1.5)
const e0 = esc('e0', 'azul'); escena(e0, 0, 1.5); fondoRayos(e0, 0, 1.5, 510, 1050, .25); suelo(e0);
tx(e0, 't0', '<span class="placa">4 razones</span> para confiarnos tu PC', 300, 118); texto('#t0', .05);
pjc(e0, 'c0'); cara('c0', 0, { ojos: 'feliz', boca: 'feliz' }); saluda('c0', .2, 'bi', 4);

// ---- cuatro razones de 2.75 s: numero, titulo y una accion con la mascota
function razon(i, t0, fondo, titulo, prep) {
  const e = esc('z' + i, fondo), t1 = t0 + 2.75, c = 'cz' + i;
  escena(e, t0, t1); cortina(t0, i % 2 ? '#FF8A00' : '#0E1A33'); fondoRayas(e, t0, t1); suelo(e);
  $(e).insertAdjacentHTML('beforeend', `<div class="insignia" id="zi${i}">${i}</div>`);
  TL.from('#zi' + i, { scale: 0, rotation: -180, duration: .4, ease: 'back.out(2)' }, t0 + .12); S('pop', t0 + .12, 1.2);
  tx(e, 'zt' + i, titulo, 510, 104); texto('#zt' + i, t0 + .3, { st: .06 });
  pjc(e, c, { w: 560, cx: 390 }); cara(c, t0, { ojos: 'normal', boca: 'feliz' });
  prep(e, c, t0, t1);
}
razon(1, 1.5, 'claro', 'Diagnóstico <span class="placa v">gratis</span>', (e, c, t0) => {
  haz(e, 'hz1', 130, 1030, 520, 360, t0 + .5, t0 + 2.3, 3); TL.to(`#${c} .pupila`, { y: 12, duration: .6, ease: 'sine.inOut', yoyo: true, repeat: 2 }, t0 + .5);
  const et = etiqueta(e, 'et1', '$0', 720, 1100, 'v gr', 8); golpe(et, t0 + 1.2, { de: 3, f: 14 }); chispas(t0 + 1.5, 800, 1140, 8);
  cara(c, t0 + 1.5, { ojos: 'feliz' }); salta(c, t0 + 1.55, 90, .4);
});
razon(2, 4.25, 'azul', 'Reporte del <span class="placa">antes y después</span>', (e, c, t0) => {
  const d = obj(e, 'documento', 'dc2', 700, 1010, 250, 'z-index:12'); gsap.set(d, { rotation: 6 });
  TL.from(d, { x: 500, rotation: 60, duration: .45, ease: 'back.out(1.5)' }, t0 + .6); S('zip', t0 + .6, 1.1);
  mira(c, t0 + .8, 16, 4); cara(c, t0 + .8, { boca: 'o' });
  const ok = etiqueta(e, 'ok2', 'CHU-0001', 690, 1340, 'n', -5); pop(ok, t0 + 1.4);
  cara(c, t0 + 1.7, { ojos: 'feliz', boca: 'feliz' }); salta(c, t0 + 1.75, 90, .4);
});
razon(3, 7.0, 'naranja', 'Garantía de <span class="placa">7 días</span>', (e, c, t0) => {
  const s = obj(e, 'escudo', 'es3', 690, 1040, 250, 'z-index:12'); golpe(s, t0 + .6, { de: 4, f: 26 }); onda(t0 + .86, 815, 1180, { r: 7, color: '#1FBF75' });
  mira(c, t0 + .9, 16, 0); cara(c, t0 + 1.0, { ojos: 'feliz' }); salta(c, t0 + 1.1, 100, .4);
  sub(e, 'sb3', 'En el trabajo de software', 1296); entra('#sb3', t0 + 1.3);
});
razon(4, 9.75, 'claro', 'Nada se borra <span class="placa">sin tu permiso</span>', (e, c, t0) => {
  obj(e, 'carpeta', 'cp4', 690, 1170, 240, 'z-index:11'); TL.from('#cp4', { scale: 0, duration: .3, ease: 'back.out(2)' }, t0 + .45);
  const k = obj(e, 'candado', 'cn4', 745, 1040, 130, 'z-index:12');
  TL.from(k, { y: -900, duration: .4, ease: 'bounce.out' }, t0 + .8); S('clic', t0 + 1.05, 1.6); S('paso', t0 + 1.05, 1); chispas(t0 + 1.1, 810, 1160, 8);
  mira(c, t0 + .9, 16, 6); cara(c, t0 + 1.2, { ojos: 'feliz' }); salta(c, t0 + 1.3, 90, .4);
});

// ---- cierre
cierre({ t0: 12.5, t1: 16, titulo: '¿Empezamos? <span class="placa">Escríbenos</span>' });
zoomCorte(12.5, '#z4', '#fin');
