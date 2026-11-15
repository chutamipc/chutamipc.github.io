//== guion
truco({
  n: 3, fondo: 'cielo', fondo3: 'azul', prog: 3, tono: -2,
  gancho: '¿Le tomas <span class="placa r">foto</span> a la pantalla?', teclas: ['Win', 'Shift', 'S'],
  que: 'Captura solo el <span class="placa">pedazo</span> que quieres', tamQue: 104,
  accion1: (c, e) => {
    cara(c, 0, { ojos: 'normal', boca: 'linea', cejas: -18 });
    [.6, 1.3].forEach(t => { parpadeo(t, 'rgba(255,255,255,.85)', .22); S('clic', t, 1.6); TL.to(`#${c} .ojo`, { scaleY: .1, transformOrigin: '50% 50%', duration: .06, yoyo: true, repeat: 1 }, t + .05); });
    signo(e, 'borrosa…', 520, 860, 1.4, { tam: 100, color: '#FFD23F', dx: 40 }); cara(c, 1.5, { boca: 'onda' });
  },
  demo: (e, t0) => {
    pjc(e, 'c3', { w: 620 }); cara('c3', t0, { ojos: 'normal', boca: 'feliz' }); mira('c3', t0 + .2, -8, -4);
    $(e).insertAdjacentHTML('beforeend', '<div class="sel" id="sl" style="left:300px;top:1000px;width:10px;height:10px"></div>');
    gsap.set('#sl', { autoAlpha: 0 }); TL.set('#sl', { autoAlpha: 1 }, t0 + .3).to('#sl', { width: 420, height: 290, duration: .7, ease: 'power2.inOut' }, t0 + .3); S('zip', t0 + .3, .9);
    parpadeo(t0 + 1.1, 'rgba(255,255,255,.85)', .25); S('clic', t0 + 1.1, 1.8); cara('c3', t0 + 1.12, { ojos: 'feliz' });
    const ok = etiqueta(e, 'ok3', '¡Copiada!', 0, 880, 'v gr', -5); gsap.set(ok, { left: 510, xPercent: -50 }); golpe(ok, t0 + 1.15, { de: 3, f: 12 }); chispas(t0 + 1.45, 510, 920, 10);
    sub(e, 's3', 'Luego pégala con Ctrl + V', 1300); entra('#s3', t0 + 1.5);
  },
});
