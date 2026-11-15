//== guion
truco({
  n: 2, fondo: 'naranja', fondo3: 'claro', prog: 1, tono: 2,
  gancho: '¿Copiaste algo y <span class="placa r">lo perdiste</span>?', teclas: ['Win', 'V'],
  que: 'Sale <span class="placa">todo</span> lo que copiaste', tamQue: 108,
  accion1: (c, e) => {
    const a = etiqueta(e, 'cp1', 'Copiado', 380, 790, 'v gr', -6), b = etiqueta(e, 'cp2', 'Copiado otra cosa', 250, 790, 'n gr', 5);
    pop(a, .45); TL.to(a, { y: -60, opacity: 0, scale: .6, duration: .3, ease: 'power2.in' }, 1.15); pop(b, 1.2); S('desinfla', 1.5, .8);
    mira(c, .5, 0, -16); cara(c, 1.3, { boca: 'o', cejas: -12 }); cara(c, 1.9, { boca: 'triste', cejas: 14 });
  },
  demo: (e, t0) => {
    ventana(e, 'vp', 'Portapapeles', '<div class="pp" id="pp0">Número de cuenta</div><div class="pp" id="pp1">Link del deber</div><div class="pp" id="pp2">Ese meme buenazo</div>', 150, 560, 720);
    TL.from('#vp', { scale: 0, duration: .35, ease: 'back.out(1.8)' }, t0 + .15); S('pop', t0 + .15, 1.2);
    [0, 1, 2].forEach(k => { TL.from('#pp' + k, { x: -500, opacity: 0, duration: .28, ease: 'back.out(1.4)' }, t0 + .5 + k * .28); S('zip', t0 + .5 + k * .28, .7); });
    pjc(e, 'c3', { w: 420 }); cara('c3', t0, { ojos: 'feliz', boca: 'feliz' }); salta('c3', t0 + 1.4, 80, .4);
    $(e).insertAdjacentHTML('beforeend', '<div class="nota" id="nt3" style="top:1010px;color:#0E1A33;font-size:36px;font-weight:600;opacity:1">La primera vez, Windows te pide activarlo</div>');
    TL.from('#nt3', { opacity: 0, y: 20, duration: .3 }, t0 + 1.3);
  },
});
