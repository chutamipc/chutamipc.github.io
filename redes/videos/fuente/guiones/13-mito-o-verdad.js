//== guion
montar(16);
musica(['intro', 'alegre', 'alegre', 'alegre', 'alegre', 'alegre', 'alegre', 'final'], { prog: 3, tono: 3 });

// ---- 0. titulo (0 - 1.5)
const e0 = esc('e0', 'azul'); escena(e0, 0, 1.5); fondoRayos(e0, 0, 1.5, 510, 700, .25); suelo(e0);
tx(e0, 't0', '¿<span class="placa r">MITO</span> o <span class="placa v">VERDAD</span>?', 300, 150); texto('#t0', .05, { st: .16, scale: 2.4, y: 0, rot: -14 });
S('fanfarria', .05, .9);
pjc(e0, 'c0'); cara('c0', 0, { ojos: 'normal', boca: 'o', cejas: -8 }); mira('c0', 0, 0, -16, .1); brazos('c0', .2, 14);

// ---- rondas de 3.5 s: frase, sello y explicacion
function ronda(i, t0, fondo, frase, verdad, expl) {
  const e = esc('r' + i, fondo), t1 = t0 + 3.5, c = 'cr' + i;
  escena(e, t0, t1); cortina(t0, verdad ? '#1FBF75' : '#FF8A00'); fondoRayas(e, t0, t1); suelo(e);
  chip(e, 'rc' + i, 'Ronda ' + i, 292); pop('#rc' + i, t0 + .15);
  const tj = tarjeta(e, 'rt' + i, frase, 110, 390, 800); TL.from(tj, { y: -500, rotation: -6, duration: .4, ease: 'back.out(1.5)' }, t0 + .12); S('zip', t0 + .12);
  pjc(e, c, { w: 600 }); cara(c, t0, { ojos: 'normal', boca: 'linea', cejas: -8 }); mira(c, t0 + .3, -10, -16); mira(c, t0 + .9, 12, -16);
  signo(e, '?', 760, 900, t0 + .5, { tam: 150, color: '#FFD23F' });
  const st = estampaEn(e, 'rs' + i, verdad ? 'VERDAD' : 'MITO', 0, 650, verdad ? 'v' : '', verdad ? 150 : 180); gsap.set(st, { left: 510, xPercent: -50, top: 390 + $(tj).offsetHeight - 14 });
  estampa(st, t0 + 1.35, { rot: verdad ? -8 : 10 });
  if (verdad) { S('fanfarria', t0 + 1.6, .9); confeti(t0 + 1.6, 510, 700, 36); cara(c, t0 + 1.58, { ojos: 'feliz', boca: 'feliz', cejas: 0 }); salta(c, t0 + 1.65, 120, .45); }
  else {
    S('error', t0 + 1.58, 1.1); cara(c, t0 + 1.58, { ojos: 'x', boca: 'o' });
    inclina(c, t0 + 1.6, -8, .1); inclina(c, t0 + 1.75, 8, .14); inclina(c, t0 + 1.92, 0, .2);
    cara(c, t0 + 2.2, { ojos: 'normal', boca: 'feliz', cejas: 0 }); mira(c, t0 + 2.2, 0, 0);
  }
  sub(e, 'rx' + i, expl, 1290); entra('#rx' + i, t0 + 1.95);
}
ronda(1, 1.5, 'naranja', '«Si está lenta, hay que formatear»', false, 'Muchas veces basta con <b>optimizarla</b>');
ronda(2, 5.0, 'claro', '«Dos antivirus protegen más»', false, 'Se estorban entre sí y la ponen <b>más lenta</b>');
ronda(3, 8.5, 'azul', '«En Chuta el diagnóstico es gratis»', true, '10 a 15 minutos, por remoto o en persona');

// ---- cierre
cierre({ t0: 12, t1: 16, titulo: 'Pide el tuyo <span class="placa">GRATIS</span>' });
zoomCorte(12, '#r3', '#fin');
