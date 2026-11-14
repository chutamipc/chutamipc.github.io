//== guion
montar(14);
musica(['lento', 'suave', 'alegre', 'alegre', 'alegre', 'alegre', 'final'], { prog: 1, tono: 2 });

// ---- 1. la PC anda rara (0 - 2.5)
const e1 = esc('e1', 'claro'); escena(e1, 0, 2.5); fondoRayas(e1, 0, 2.5); suelo(e1);
tx(e1, 't1', '¿Tu PC anda <span class="placa">RARA</span>?', 290, 128); texto('#t1', .05);
pjc(e1, 'c1'); accesorio('c1', 'termometro'); cara('c1', 0, { ojos: 'linea', boca: 'onda', gota: true, cejas: 14 }); tiembla('c1', 0, 2.5, 4); gotea('c1', 0, 2.4);
signo(e1, '?', 250, 800, .3, { tam: 150, color: '#FF8A00', dx: -40 }); signo(e1, '?', 700, 780, .7, { tam: 190, color: '#1768F8' }); signo(e1, '?', 470, 700, 1.1, { tam: 130, color: '#FF4D4D', dx: 10 });
agacha('c1', 1.45, .12, .84); levanta('c1', 1.6, .2); S('soplo', 1.45, 1.4); sacudir(1.5, 16, .25); polvo(1.5, 510, 1150, 8);
signo(e1, '¡Achís!', 560, 980, 1.5, { tam: 100, color: '#fff', dx: 120, dy: -120 });

// ---- 2. la revisamos de arriba a abajo (2.5 - 8.5)
const e2 = esc('e2', 'azul'); escena(e2, 2.5, 8.5); zoomCorte(2.5, e1, e2); fondoRayas(e2, 2.5, 8.5); suelo(e2);
chip(e2, 'ch2', 'Diagnóstico Chuta', 292); pop('#ch2', 2.65);
lista(e2, 'l2', ['Disco', 'Batería', 'Memoria RAM', 'Errores de Windows', 'Drivers', '¿Aguanta Windows 11?'], 110, 392, 800, { cls: 'compacta' });
listaAnim('l2', 3.0, { st: .8 });
pjc(e2, 'c2', { w: 450 }); cara('c2', 2.5, { ojos: 'normal', boca: 'linea' }); mira('c2', 2.6, 0, -14, .1);
haz(e2, 'hz', 270, 1090, 480, 320, 2.9, 7.9, 5);
TL.to('#c2 .pupila', { y: 14, duration: 1, ease: 'sine.inOut', yoyo: true, repeat: 4 }, 2.9);
cara('c2', 7.9, { ojos: 'feliz', boca: 'feliz' }); salta('c2', 7.95, 90, .4); chispas(7.95, 510, 1200, 10);

// ---- 3. te decimos que tiene (8.5 - 10.5)
const e3 = esc('e3', 'naranja'); escena(e3, 8.5, 10.5); cortina(8.5); fondoRayos(e3, 8.5, 10.5, 510, 900); suelo(e3);
tx(e3, 't3', 'Te decimos qué tiene y <span class="placa">cuánto cuesta</span>', 290, 108); texto('#t3', 8.6, { st: .05 });
const st = estampaEn(e3, 'st3', 'GRATIS', 0, 690, 'v', 200); gsap.set(st, { left: 510, xPercent: -50 }); estampa(st, 9.45, { rot: -8 }); confeti(9.7, 510, 780, 30);
pjc(e3, 'c3', { w: 500 }); cara('c3', 8.5, { ojos: 'feliz', boca: 'feliz' }); salta('c3', 9.75, 90, .4);
sub(e3, 's3', '10 a 15 minutos · por remoto o en persona', 1290); entra('#s3', 9.9);

// ---- 4. cierre
cierre({ t0: 10.5, t1: 14, titulo: 'Pide el tuyo por <span class="placa">WhatsApp</span>', tam: 100 });
zoomCorte(10.5, '#e3', '#fin');
