//== guion
montar(14);
musica(['tension', 'tension', 'alegre', 'alegre', 'alegre', 'alegre', 'final'], { prog: 2 });

// ---- 1. llueve y la compu no da mas (0 - 4)
const e1 = esc('e1', 'noche'); escena(e1, 0, 4); luz(e1, 510, 1150, 720); suelo(e1);
tx(e1, 't1', '¿Llueve y tu compu <span class="placa r">no da más</span>?', 290, 112); texto('#t1', .05);
const n1 = obj(e1, 'nubeGris', 'n1', -80, 610, 430, 'z-index:6'), n2 = obj(e1, 'nubeGris', 'n2', 640, 650, 480, 'z-index:6');
TL.to(n1, { x: 90, duration: 4, ease: 'none' }, 0); TL.to(n2, { x: -110, duration: 4, ease: 'none' }, 0);
lluvia(e1, 0, 4, 85); S('lluvia', 0, 1);
parpadeo(.9, 'rgba(255,255,255,.75)', .28); S('trueno', .9, 1.2); parpadeo(2.7, 'rgba(255,255,255,.6)', .28); S('trueno', 2.7, 1);
pjc(e1, 'c1'); cara('c1', 0, { ojos: 'linea', boca: 'triste', gota: true }); tiembla('c1', 0, 4, 3);
cara('c1', .9, { ojos: 'normal', boca: 'o', cejas: -12 }); salta('c1', .92, 70, .3); cara('c1', 1.7, { ojos: 'linea', boca: 'triste', cejas: 12 });
cara('c1', 2.7, { ojos: 'normal', boca: 'o', cejas: -12 }); cara('c1', 3.3, { ojos: 'linea', boca: 'onda', cejas: 12 });
sub(e1, 's1', 'Y salir con este aguacero… ¡ni de chiste!', 1296); entra('#s1', 1.8);

// ---- 2. te ayudamos por remoto (4 - 8.5)
const e2 = esc('e2', 'azul'); escena(e2, 4, 8.5); destello(4.0, '#fff', .3); fondoRayos(e2, 4, 8.5, 510, 1100); suelo(e2);
tx(e2, 't2', 'No salgas: te ayudamos <span class="placa">por remoto</span>', 290, 108); texto('#t2', 4.1, { st: .05 });
const ca = obj(e2, 'casa', 'ca', 40, 1072, 400, 'z-index:9'); TL.from(ca, { y: 500, duration: .4, ease: 'back.out(1.5)' }, 4.1);
pjc(e2, 'c2', { w: 480, cx: 730 }); cara('c2', 4, { ojos: 'feliz', boca: 'feliz' });
$('#c2 .acc').insertAdjacentHTML('beforeend', `<g transform="translate(0 -152)">${dentro(OBJ.audifonos)}</g><circle cx="116" cy="118" r="50" fill="#FF8A00" stroke="${O}" stroke-width="12"/><circle cx="584" cy="118" r="50" fill="#FF8A00" stroke="${O}" stroke-width="12"/>`);
TL.from('#c2-w', { x: 600, duration: .45, ease: 'back.out(1.5)' }, 4.25); saluda('c2', 4.8, 'bd', 3);
const wf = obj(e2, 'wifi', 'wf', 375, 800, 250, 'z-index:9');
['.w1', '.w2', '.w3'].forEach((w, k) => TL.fromTo('#wf ' + w, { opacity: .15 }, { opacity: 1, duration: .22, yoyo: true, repeat: 15, repeatDelay: .22, ease: 'none' }, 4.6 + k * .15));
for (let k = 0; k < 7; k++) {
  const d = document.createElement('i'); d.className = 'conf'; Object.assign(d.style, { left: '690px', top: '1150px', width: '30px', height: '30px', borderRadius: '50%', background: k % 2 ? '#fff' : '#FF8A00', zIndex: 12 }); $(e2).appendChild(d); gsap.set(d, { autoAlpha: 0 });
  const t = 5.0 + k * .32; TL.set(d, { autoAlpha: 1 }, t).to(d, { x: -440, duration: .7, ease: 'none' }, t).to(d, { y: -190, duration: .35, ease: 'power2.out' }, t).to(d, { y: 20, duration: .35, ease: 'power2.in' }, t + .35).set(d, { autoAlpha: 0 }, t + .7);
  S('bip', t, .8);
}
[5.75, 6.4, 7.05].forEach(t => TL.to(ca, { scaleY: 1.07, transformOrigin: '50% 100%', duration: .09, yoyo: true, repeat: 1 }, t));
chispas(7.3, 240, 1180, 12); S('bien', 7.3, 1.2);
sub(e2, 's2', 'Solo necesitas que prenda y tenga internet', 1296); entra('#s2', 6.3);

// ---- 3. que va por remoto (8.5 - 10.5)
const e3 = esc('e3', 'naranja'); escena(e3, 8.5, 10.5); cortina(8.5); fondoRayas(e3, 8.5, 10.5); suelo(e3);
tx(e3, 't3', 'Por remoto hacemos:', 290, 104); texto('#t3', 8.6, { st: .05 });
lista(e3, 'l3', ['Diagnóstico gratis', 'Chuta Express', 'Chuta Sin Anuncios', 'Pro Remoto (negocios)'], 130, 540, 760, { cls: 'compacta' }); listaAnim('l3', 8.85, { st: .32 });
pjc(e3, 'c3', { w: 500 }); cara('c3', 8.5, { ojos: 'feliz', boca: 'feliz' }); salta('c3', 9.95, 90, .4);

// ---- 4. cierre
cierre({ t0: 10.5, t1: 14, titulo: 'Sin salir de <span class="placa">casa</span>' });
zoomCorte(10.5, e3, '#fin');
