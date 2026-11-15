//== guion
montar(16);
musica(['intro', 'alegre', 'alegre', 'alegre', 'alegre', 'alegre', 'alegre', 'final'], { prog: 1, tono: 4 });

// ---- 0. titulo (0 - 1.6)
const e0 = esc('e0', 'azul'); escena(e0, 0, 1.6); fondoRayos(e0, 0, 1.6, 510, 1050, .25); suelo(e0);
tx(e0, 't0', 'Si tu laptop <span class="placa">HABLARA</span>…', 300, 130); texto('#t0', .05);
pjc(e0, 'c0'); cara('c0', 0, { ojos: 'normal', boca: 'linea' }); parpadea('c0', [.5]); cara('c0', 1.1, { boca: 'o' }); brazos('c0', 1.1, 16);

// ---- cuatro frases de 2.7 s: la laptop las dice moviendo la boca
function dicho(i, t0, fondo, html, fin, prep) {
  const e = esc('d' + i, fondo), t1 = t0 + 2.7, c = 'cd' + i;
  escena(e, t0, t1); cortina(t0, ['#FF8A00', '#0E1A33', '#1FBF75', '#FF4D4D'][i - 1]); fondoRayas(e, t0, t1); suelo(e);
  pjc(e, c); prep(e, c, t0, t1);
  frase(e, 'g' + i, c, html, t0 + .3, { dur: 1.5, y: 320, tam: 78, fin });
}
dicho(1, 1.6, 'naranja', '¡Ya ciérrame esas<br>40 pestañas!', 'onda', (e, c, t0, t1) => {
  cara(c, t0, { ojos: 'espiral', gota: true }); espirales(c, t0, t1); tiembla(c, t0, t1, 3);
  ['Tarea', 'Video', 'Chat', 'Compras', 'Memes'].forEach((n, k) => {
    const p = pestana(e, 'pe' + k, n, 90 + k * 162, 742 + (k % 2) * 52, ['', 'n', 'v', 'r', ''][k]); gsap.set(p, { rotation: R(-9, 9) });
    TL.from(p, { y: -500, opacity: 0, duration: .3, ease: 'back.out(1.6)' }, t0 + .1 + k * .09); S('burbuja', t0 + .1 + k * .09, 1);
    TL.to(p, { y: -14, duration: .2, yoyo: true, repeat: 9, ease: 'sine.inOut' }, t0 + .6 + k * .07);
  });
});
dicho(2, 4.3, 'claro', '¡No me apagues del<br>botón, que duele!', 'linea', (e, c, t0, t1) => {
  cara(c, t0, { ojos: 'normal', cejas: -22 });
  const ma = obj(e, 'mano', 'ma2', 820, 1040, 170, 'z-index:14'); gsap.set(ma, { rotation: -80, transformOrigin: '50% 100%' });
  TL.fromTo(ma, { x: 300 }, { x: 0, duration: .14, ease: 'power3.in' }, t0 + .08).to(ma, { x: 320, duration: .3, ease: 'power2.out' }, t0 + .34);
  S('clic', t0 + .22, 1.5); S('golpe', t0 + .22, .6); cara(c, t0 + .22, { ojos: 'x' }); inclina(c, t0 + .22, -10, .1); inclina(c, t0 + .45, 0, .3); cara(c, t0 + .5, { ojos: 'normal' });
  signo(e, '¡AY!', 700, 880, t0 + .22, { tam: 130, color: '#FF4D4D' });
});
dicho(3, 7.0, 'azul', 'Tengo el disco<br>hasta el cuello…', 'onda', (e, c, t0, t1) => {
  gsap.set(`#${c}-w`, { transformOrigin: '50% 100%' }); TL.fromTo(`#${c}-w`, { scaleX: 1.34, scaleY: 1.05 }, { scaleX: 1.4, scaleY: 1.07, duration: .45, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t0);
  cara(c, t0, { ojos: 'normal', cejas: 14, gota: true }); gotea(c, t0, t1); mira(c, t0 + .2, 0, 10);
  [0, 1, 2].forEach(k => { const f = obj(e, k % 2 ? 'caja' : 'carpeta', 'fx' + k, 250 + k * 190, -240, 170, 'z-index:11'); TL.to(f, { y: 1150, rotation: R(-50, 50), duration: .4, ease: 'power2.in' }, t0 + 1.7 + k * .25).to(f, { autoAlpha: 0, scale: .3, duration: .08 }, t0 + 2.08 + k * .25); S('burbuja', t0 + 2.08 + k * .25, 1.1); });
});
dicho(4, 9.7, 'naranja', '¿Y mis actualizaciones<br>pa\' cuándo?', 'linea', (e, c, t0, t1) => {
  accesorio(c, 'telarana'); cara(c, t0, { ojos: 'normal', cejas: -14 }); mira(c, t0 + .2, 14, -8);
  saluda(c, t0 + .3, 'bd', 7, 16);
  const cl = obj(e, 'reloj', 'rl4', 730, 700, 210, 'z-index:9'); TL.to('#rl4 .minuto', { rotation: 720, svgOrigin: '150 150', duration: 2.4, ease: 'none' }, t0 + .1); TL.to('#rl4 .hora', { rotation: 60, svgOrigin: '150 150', duration: 2.4, ease: 'none' }, t0 + .1);
  [0, 1, 2, 3].forEach(k => S(k % 2 ? 'toc' : 'tic', t0 + .5 + k * .5, .8));
});

// ---- cierre
cierre({ t0: 12.4, t1: 16, titulo: 'Hazle caso a tu <span class="placa">PC</span>', tam: 108 });
zoomCorte(12.4, '#d4', '#fin');
