//== guion
montar(16);
musica(['tension', 'tension', 'tension', 'alegre', 'alegre', 'alegre', 'alegre', 'final']);

// ---- 1. todo bien... (0 - 0.6)
const e1 = esc('e1', 'claro'); escena(e1, 0, .6); fondoRayas(e1, 0, .6); suelo(e1);
tx(e1, 't1', 'Tú, feliz, trabajando…', 290, 112);
pjc(e1, 'c1'); cara('c1', 0, { ojos: 'feliz', boca: 'feliz' });
[.05, .17, .29, .41].forEach(t => { S('tecla', t, 1.2); TL.to('#c1 .base', { y: 6, duration: .05, yoyo: true, repeat: 1 }, t); });

// ---- 2. pantallazo azul (0.6 - 2.5)
const e2 = esc('e2', 'alarma'); escena(e2, .6, 2.5); destello(.6, '#1259E6', .25); fondoRayos(e2, .6, 2.5, 510, 1050, .3); suelo(e2);
pjc(e2, 'c2'); cara('c2', .6, { pantalla: 'azul' }); tiembla('c2', .6, 2.5, 10);
S('error', .6, 1.4); S('trueno', .62, 1); sacudir(.62, 50, .6);
const f2 = franja(e2, 'f2', '¡CHUTA, MI PC!', 400, 'n', -4); golpe(f2, .75, { f: 30 }); late(f2, 1.3, 2.4, 1.05);
S('sirena', 1.1, .9); S('sirena', 1.95, .7);
sub(e2, 's2', 'Pantallazo azul… ¡justo ahora!', 1296); entra('#s2', 1.25);
[1.0, 1.5, 2.0].forEach(t => parpadeo(t, 'rgba(255,255,255,.25)', .25));

// ---- 3. lo que NO hay que hacer (2.5 - 6)
const e3 = esc('e3', 'alarma'); escena(e3, 2.5, 6); cortina(2.5, '#0E1A33'); fondoRayas(e3, 2.5, 6); suelo(e3);
tx(e3, 't3', '¿Qué <span class="placa r">NO</span> hacer?', 290, 100); texto('#t3', 2.6);
lista(e3, 'l3', ['Darle golpes', 'Prenderla y apagarla 20 veces', 'Formatear a ciegas'], 130, 446, 760, { no: true });
listaAnim('l3', 3.0, { st: .95, son: 'error' });
pjc(e3, 'c3', { w: 540 }); cara('c3', 2.5, { pantalla: 'azul' });
const ma = obj(e3, 'mano', 'ma', 800, 1040, 170, 'z-index:14'); gsap.set(ma, { rotation: -70, transformOrigin: '50% 100%', autoAlpha: 0 });
TL.set(ma, { autoAlpha: 1 }, 3.0).fromTo(ma, { x: 260, rotation: -30 }, { x: 0, rotation: -80, duration: .14, ease: 'power3.in' }, 3.12).to(ma, { x: 300, rotation: -30, duration: .3, ease: 'power2.out' }, 3.34).set(ma, { autoAlpha: 0 }, 3.64);
S('golpe', 3.26, .9); inclina('c3', 3.26, -14, .12); inclina('c3', 3.5, 0, .4); chispas(3.26, 700, 1150, 5, { son: false, radio: .5 });
[4.0, 4.15, 4.3, 4.45, 4.6, 4.75].forEach((t, i) => { cara('c3', t, { pantalla: i % 2 ? 'azul' : 'negra' }); S('clic', t, 1.2); });
cara('c3', 4.9, { pantalla: 'azul' });
tiembla('c3', 5.0, 6.0, 9);

// ---- 4. rescate (6 - 8.5)
const e4 = esc('e4', 'azul'); escena(e4, 6, 8.5); destello(6.0, '#fff', .3); fondoRayos(e4, 6, 8.5, 510, 1050); suelo(e4);
chip(e4, 'ch4', 'Chuta Rescate', 292); pop('#ch4', 6.35);
tx(e4, 't4', 'Si se puede, <span class="placa">sin formatear</span>', 384, 118); texto('#t4', 6.6);
pjc(e4, 'c4'); cara('c4', 6, { pantalla: 'azul' });
const sv = obj(e4, 'salvavidas', 'sv', 150, 730, 300, 'z-index:14'); gsap.set(sv, { rotation: -18 });
TL.from(sv, { x: 700, y: -1100, rotation: 540, scale: .5, duration: .55, ease: 'power2.in' }, 6.0); S('zip', 6.05, 1.2);
TL.to(sv, { keyframes: [{ scale: 1.2, duration: .08 }, { scale: 1, duration: .14 }] }, 6.55); S('golpe', 6.55, .8); sacudir(6.55, 22, .35); chispas(6.56, 510, 1050, 14); onda(6.56, 510, 1050, { r: 12 });
cara('c4', 6.56, { pantalla: 'normal', ojos: 'espiral', boca: 'onda' }); espirales('c4', 6.56, 7.3);
cara('c4', 7.3, { ojos: 'normal', boca: 'o' }); parpadea('c4', [7.45]); cara('c4', 7.7, { ojos: 'feliz', boca: 'feliz' }); salta('c4', 7.75, 120, .45);
TL.to(sv, { y: -130, duration: .2, ease: 'power2.out' }, 7.86).to(sv, { y: 0, duration: .2, ease: 'power2.in' }, 8.06);
sub(e4, 's4', 'Virus, Windows que no arranca, lentitud extrema', 1280); entra('#s4', 7.3);

// ---- 5. se cotiza antes (8.5 - 10.5)
const e5 = esc('e5', 'naranja'); escena(e5, 8.5, 10.5); cortina(8.5); fondoRayas(e5, 8.5, 10.5); suelo(e5);
tx(e5, 't5', 'Se cotiza <span class="placa">ANTES</span>', 300, 130); golpe('#t5', 8.55);
tx(e5, 't6', 'Si no aceptas, <span class="placa v">no pagas</span>', 600, 112); golpe('#t6', 9.25);
pjc(e5, 'c5', { w: 540 }); cara('c5', 8.5, { ojos: 'feliz', boca: 'feliz' }); saluda('c5', 8.9, 'bi', 2); salta('c5', 9.55, 100, .4);

// ---- 6. precio (10.5 - 12.5) y cierre
cortina(10.5, '#0E1A33');
escenaPrecio({ id: 'e6', t0: 10.5, t1: 12.5, nombre: 'Chuta Rescate', valor: '<small>desde</small>$20', nota: 'Precio de lanzamiento · <s>normal desde $25</s>', tags: [['Diagnóstico profundo']] });
cierre({ t0: 12.5, t1: 16, titulo: 'Que no cunda el <span class="placa">pánico</span>' });
zoomCorte(12.5, '#e6', '#fin');
