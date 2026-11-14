//== guion
montar(16);
musica(['tension', 'tension', 'suave', 'alegre', 'alegre', 'alegre', 'alegre', 'final'], { prog: 3 });

// ---- 1. rumbo al basurero (0 - 4)
const e1 = esc('e1', 'claro'); escena(e1, 0, 4); fondoRayas(e1, 0, 4);
tx(e1, 't1', '¿Ya la ibas a <span class="placa r">BOTAR</span>?', 290, 124); texto('#t1', .05);
$(e1).insertAdjacentHTML('beforeend', '<div class="cinta" id="ci" style="top:1420px;left:-60px;right:auto;width:790px;height:84px;border-radius:0 42px 42px 0;border:9px solid #0E1A33"></div>');
TL.fromTo('#ci', { backgroundPosition: '0px 0px' }, { backgroundPosition: '720px 0px', duration: 3.0, ease: 'none' }, 0);
const ba = obj(e1, 'basurero', 'ba', 690, 1142, 330, 'z-index:12');
TL.to('#ba .tapa-b', { rotation: -34, transformOrigin: '0% 100%', duration: .25, ease: 'sine.inOut', yoyo: true, repeat: 11 }, 0);
pjc(e1, 'c1', { w: 660, cx: 170 }); cara('c1', 0, { ojos: 'normal', boca: 'triste', cejas: 14, gota: true }); llora('c1', 0, 3.0); mira('c1', 0, 16, 8, .1);
TL.to('#c1-w', { x: 290, duration: 3.0, ease: 'none' }, 0);
saluda('c1', .1, 'bi', 9, 22); saluda('c1', .18, 'bd', 9, 22); tiembla('c1', 0, 3.0, 4);
[0, .5, 1, 1.5, 2, 2.5].forEach(t => S('toc', t, .8));
signo(e1, '¡NO!', 420, 800, .45, { tam: 150, color: '#FF4D4D' }); signo(e1, '¡AUXILIO!', 330, 760, 1.5, { tam: 120, color: '#FF4D4D', dx: 30 });
const f1 = franja(e1, 'f1', '¡ALTO AHÍ!', 600, 'r', -4); golpe(f1, 2.74, { f: 40 }); S('sirena', 3.0, 1); parpadeo(3.0, 'rgba(255,60,60,.35)', .4);
cara('c1', 3.0, { boca: 'o', cejas: -12 }); inclina('c1', 3.0, 14, .25); inclina('c1', 3.5, 0, .4); mira('c1', 3.1, 0, -10);

// ---- 2. no esta vieja, esta descuidada (4 - 8)
const e2 = esc('e2', 'azul'); escena(e2, 4, 8); cortina(4.0); fondoRayos(e2, 4, 8, 510, 1100); suelo(e2);
tx(e2, 't2', 'No está <span class="nar">vieja</span>…', 290, 130); texto('#t2', 4.1);
tx(e2, 't3', '¡está <span class="placa">DESCUIDADA</span>!', 470, 118); golpe('#t3', 5.0);
pjc(e2, 'c2'); accesorio('c2', 'telarana'); cara('c2', 4, { ojos: 'linea', boca: 'triste' });
[0, 1, 2].forEach(i => {
  const m = document.createElement('i'); m.className = 'mosca'; $(e2).appendChild(m); gsap.set(m, { left: 510, top: 900 });
  TL.to(m, { motionPath: { path: [{ x: 280, y: -60 }, { x: 0, y: -170 }, { x: -280, y: -60 }, { x: 0, y: 40 }, { x: 280, y: -60 }], curviness: 1.6 }, duration: 1.0 + i * .22, repeat: 2, ease: 'none' }, 4 + i * .2);
});
polvo(4.6, 300, 1000, 4); polvo(5.5, 720, 950, 4);
cara('c2', 5.26, { ojos: 'normal', boca: 'o', cejas: -10 });
[6.2, 6.45, 6.7].forEach((t, i) => chispas(t, [330, 690, 510][i], [940, 1000, 1250][i], 7, { son: i === 0 }));
TL.to('#c2 .a-tela', { opacity: 0, duration: .3 }, 6.3); TL.to('.mosca', { autoAlpha: 0, duration: .2 }, 6.25);
cara('c2', 6.6, { ojos: 'feliz', boca: 'feliz', cejas: 0 }); salta('c2', 6.65, 140, .5);
sub(e2, 's2', 'Y eso <b>sí tiene arreglo</b>', 1296); entra('#s2', 6.5);

// ---- 3. como la dejamos (8 - 11)
const e3 = esc('e3', 'naranja'); escena(e3, 8, 11); cortina(8.0, '#0E1A33'); fondoRayas(e3, 8, 11); suelo(e3);
tx(e3, 't4', 'La dejamos:', 290, 120); texto('#t4', 8.1);
lista(e3, 'l3', ['Sin basura ni virus', 'Arranque más rápido', 'Actualizada y al día'], 130, 450, 760); listaAnim('l3', 8.5, { st: .6 });
pjc(e3, 'c3', { w: 540 }); cara('c3', 8, { ojos: 'feliz', boca: 'feliz' }); [8.75, 9.35, 9.95].forEach(t => salta('c3', t, 70, .35));

// ---- 4. primero, diagnostico gratis (11 - 12.5)
const e4 = esc('e4', 'azul'); escena(e4, 11, 12.5); zoomCorte(11.0, e3, e4); fondoPuntos(e4, 11, 12.5);
tx(e4, 't5', 'Primero, el diagnóstico:', 330, 112); texto('#t5', 11.05, { st: .05 });
const st = estampaEn(e4, 'st4', 'GRATIS', 0, 700, 'v', 200); gsap.set(st, { left: 510, xPercent: -50 }); estampa(st, 11.55, { rot: -10 }); confeti(11.8, 510, 800, 30);

// ---- 5. cierre
cierre({ t0: 12.5, t1: 16, titulo: 'Antes de botarla, <span class="placa">escríbenos</span>', tam: 96 });
zoomCorte(12.5, '#e4', '#fin');
