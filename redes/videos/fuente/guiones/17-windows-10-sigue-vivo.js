//== guion
montar(14);
musica(['tension', 'tension', 'alegre', 'alegre', 'alegre', 'alegre', 'final'], { prog: 3, tono: 2 });
const EPI = '<div class="epi"><b>R.I.P.</b>Windows 10<small>2015 – 2025</small></div>';

// ---- 1. el entierro (0 - 4)
const e1 = esc('e1', 'noche'); escena(e1, 0, 4); luz(e1, 510, 1120, 740); suelo(e1);
tx(e1, 't1', '¿Te dijeron que tu Windows 10 ya <span class="placa r">murió</span>?', 290, 100); texto('#t1', .05, { st: .06 });
const lp = obj(e1, 'lapida', 'lp', 280, 860, 460, 'z-index:9'); $('#lp').insertAdjacentHTML('beforeend', EPI);
TL.from(lp, { y: 700, duration: .5, ease: 'back.out(1.3)' }, .15); S('golpe', .5, .8); polvo(.55, 350, PISO, 6); polvo(.6, 670, PISO, 6);
lluvia(e1, 0, 4, 45); S('lluvia', 0, .8);
parpadeo(1.2, 'rgba(255,255,255,.7)', .28); S('trueno', 1.2, 1.2);
sub(e1, 's1', 'Tranqui: todavía no se le acaba el camino', 1296); entra('#s1', 2.0);
[2.9, 3.3, 3.65].forEach((t, i) => { S('latido', t, 1.2 + i * .2); TL.to(lp, { keyframes: [{ x: -10 - 4 * i, rotation: -2, duration: .06 }, { x: 10 + 4 * i, rotation: 2, duration: .06 }, { x: 0, rotation: 0, duration: .06 }] }, t); polvo(t, 510, PISO, 3); });

// ---- 2. sigue viva (4 - 6.5)
const e2 = esc('e2', 'azul'); escena(e2, 4, 6.5); destello(4.0, '#fff', .3); fondoRayos(e2, 4, 6.5, 510, 1100); suelo(e2);
const lp2 = obj(e2, 'lapida', 'lp2', 280, 860, 460, 'z-index:9'); $('#lp2').insertAdjacentHTML('beforeend', EPI);
TL.to(lp2, { rotation: 28, x: 360, y: 70, transformOrigin: '50% 100%', duration: .5, ease: 'power2.out' }, 4.05);
pjc(e2, 'c2'); cara('c2', 4, { ojos: 'feliz', boca: 'feliz' });
TL.from('#c2-w', { y: 900, duration: .5, ease: 'back.out(1.6)' }, 4.05); S('boing', 4.05, 1.2); polvo(4.1, 360, PISO, 9); polvo(4.15, 660, PISO, 9);
S('fanfarria', 4.2, .9); confeti(4.35, 510, 900, 36); brazos('c2', 4.4, 18);
frase(e2, 'g2', 'c2', '¡Sigo vivita<br>y coleando!', 4.55, { dur: 1.2, y: 330, tam: 88, w: 700, x: 160, cola: 320 });

// ---- 3. hasta octubre de 2027 (6.5 - 10.5)
const e3 = esc('e3', 'naranja'); escena(e3, 6.5, 10.5); cortina(6.5, '#0E1A33'); fondoRayas(e3, 6.5, 10.5); suelo(e3);
tx(e3, 't3', 'Actualizaciones de seguridad hasta', 290, 84); texto('#t3', 6.6, { st: .05 });
tx(e3, 't4', '<span class="placa">octubre de 2027</span>', 484, 116); golpe('#t4', 7.15);
chip(e3, 'ch3', 'Programa ESU de Microsoft', 664); pop('#ch3', 7.9);
lista(e3, 'l3', ['Te ayudamos a inscribirla', 'Vemos si aguanta Windows 11'], 90, 790, 840, { cls: 'compacta', tam: 44 }); listaAnim('l3', 8.4, { st: .6 });
pjc(e3, 'c3', { w: 430 }); cara('c3', 6.5, { ojos: 'feliz', boca: 'feliz' }); salta('c3', 7.45, 80, .4); salta('c3', 9.6, 80, .4);

// ---- 4. cierre
cierre({ t0: 10.5, t1: 14, titulo: 'No la jubiles <span class="placa">todavía</span>' });
zoomCorte(10.5, e3, '#fin');
