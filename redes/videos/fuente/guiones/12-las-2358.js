//== guion
montar(16);
musica(['tension', 'tension', 'subida', 'alegre', 'alegre', 'alegre', 'alegre', 'final'], { prog: 2, tono: -2 });

// ---- 1. noche de entrega (0 - 6)
const e1 = esc('e1', 'noche'); escena(e1, 0, 6); luz(e1, 510, 1080, 780); suelo(e1);
tx(e1, 't1', 'Hora de entrega: <span class="placa r">23:59</span>', 290, 108); texto('#t1', .05);
$(e1).insertAdjacentHTML('beforeend', '<div class="reloj" id="rj" style="top:540px">23:58</div><div class="reloj" id="rj2" style="top:540px;color:#FF4D4D">23:59</div>');
gsap.set('#rj2', { autoAlpha: 0 });
for (let i = 0; i < 10; i++) { S(i % 2 ? 'toc' : 'tic', i * .5, .9); TL.to('#rj', { scale: 1.05, duration: .08, yoyo: true, repeat: 1 }, i * .5); }
pjc(e1, 'c1'); cara('c1', 0, { ojos: 'normal', boca: 'linea', gota: true, cejas: 10 }); gotea('c1', 0, 5);
[.3, .8, 1.3, 1.8, 2.3, 2.8].forEach((t, i) => mira('c1', t, i % 2 ? 16 : -16, -4, .12));
ventana(e1, 'v1', 'Subiendo deber_final.docx', '<div class="barra"><b id="v1b" style="width:40%;background:#1768F8"></b></div><div class="pct"><span id="v1n">40</span>%</div>', 150, 1215, 720);
TL.to('#v1b', { width: '99%', duration: 2.9, ease: 'power1.out' }, .3); contador('#v1n', .3, 40, 99, 2.9, 'power1.out');
mira('c1', 3.3, 0, 12, .15); cara('c1', 3.3, { boca: 'o', cejas: -6 });
sale('#t1', 3.3); tx(e1, 't1b', '¡Se quedó en <span class="placa r">99%</span>!', 290, 116); golpe('#t1b', 3.4, { f: 16 });
[3.6, 4.2, 4.8].forEach(t => { S('latido', t, 1.2); TL.to('#v1', { scale: 1.03, duration: .1, yoyo: true, repeat: 1 }, t); });
tiembla('c1', 3.6, 5.2, 5);
// las 23:59: se congela
TL.set('#rj', { autoAlpha: 0 }, 4.98); TL.set('#rj2', { autoAlpha: 1 }, 4.98);
TL.fromTo('#rj2', { scale: 1.6 }, { scale: 1, duration: .25, ease: 'back.out(2)' }, 4.98); S('alarma', 5.0, 1.2); parpadeo(5.0, 'rgba(255,60,60,.4)', .4); sacudir(5.0, 26, .35);
cara('c1', 5.25, { ojos: 'x', boca: 'linea' });
const nr = ventana(e1, 'v2', 'deber_final.docx', '<b>El programa no responde</b>', 170, 930, 680); $(nr).classList.add('r'); golpe(nr, 5.05, { f: 30 }); S('error', 5.3, 1.3);
sale('#t1b', 5.3); const f1 = franja(e1, 'f1', '¡CHUTA, MI DEBER!', 330, 'n', -4); golpe(f1, 5.4, { f: 20 });

// ---- 2. que no te pase (6 - 10.5)
const e2 = esc('e2', 'azul'); escena(e2, 6, 10.5); destello(6.0, '#fff', .35); S('rebobina', 5.8, 1.2); fondoRayos(e2, 6, 10.5, 510, 1150); suelo(e2);
tx(e2, 't2', '¡Que <span class="placa">no te pase</span>!', 290, 124); golpe('#t2', 6.1);
chip(e2, 'ch2', 'Chuta Estudiante', 566, 'n'); pop('#ch2', 7.0);
pjc(e2, 'c2', { w: 560 }); accesorio('c2', 'birrete'); cara('c2', 6, { ojos: 'normal', boca: 'feliz' });
TL.from('#c2 .a-birrete', { y: -900, rotation: -30, svgOrigin: '350 0', duration: .7, ease: 'bounce.out' }, 6.9); S('boing', 7.2, .9); S('paso', 7.42, 1);
cara('c2', 7.3, { ojos: 'feliz' }); salta('c2', 7.65, 110, .45);
tags(e2, 'tg2', [['Windows limpio y rápido'], ['Office listo', 'Zoom y Teams']], 690, 8.0, { st: .4 });
salta('c2', 9.3, 90, .4);

// ---- 3. precio (10.5 - 12.5) y cierre
cortina(10.5);
escenaPrecio({ id: 'e3', t0: 10.5, t1: 12.5, nombre: 'Chuta Estudiante', valor: '$22', nota: 'Precio de lanzamiento · <s>normal $28</s>', tags: [['Todo listo para clases']] });
cierre({ t0: 12.5, t1: 16, titulo: 'Llega tranqui a la <span class="placa">entrega</span>', tam: 100 });
zoomCorte(12.5, '#e3', '#fin');
