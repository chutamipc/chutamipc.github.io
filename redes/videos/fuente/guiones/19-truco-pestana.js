//== guion
truco({
  n: 1, fondo: 'claro', prog: 0, tono: 0,
  gancho: '¿Cerraste una pestaña <span class="placa r">sin querer</span>?', tamGancho: 100, teclas: ['Ctrl', 'Shift', 'T'],
  que: '¡Y la pestaña <span class="placa">regresa</span>!', tamQue: 116,
  accion1: (c, e) => {
    const p = pestana(e, 'p1', 'Mi deber.docx', 300, 772, 'n');
    TL.to(p, { x: 900, y: -560, rotation: 50, scale: .6, duration: .7, ease: 'power2.in' }, .7); S('fiu', .7, 1.1);
    cara(c, .7, { boca: 'o' }); mira(c, .7, 16, -16, .3);
    signo(e, '¡NO!', 600, 860, 1.0, { tam: 150, color: '#FF4D4D' });
    cara(c, 1.5, { boca: 'triste', cejas: 14 }); llora(c, 1.5, 2.6);
  },
  demo: (e, t0) => {
    pjc(e, 'c3', { w: 600 }); cara('c3', t0, { ojos: 'feliz', boca: 'feliz' });
    const p = pestana(e, 'p3', 'Mi deber.docx', 300, 900, 'n');
    TL.from(p, { x: 900, y: -700, rotation: 60, scale: .5, duration: .5, ease: 'back.out(1.4)' }, t0 + .25); S('zip', t0 + .25, 1.2); chispas(t0 + .7, 510, 930, 12);
    salta('c3', t0 + .8, 110, .45); salta('c3', t0 + 1.5, 110, .45);
    sub(e, 's3', 'Funciona en Chrome, Edge y Firefox', 1296); entra('#s3', t0 + .9);
  },
});
