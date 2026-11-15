//== guion
truco({
  n: 4, fondo: 'claro', fondo3: 'naranja', prog: 2, tono: 1,
  gancho: '¿Se te <span class="placa r">colgó</span> un programa?', teclas: ['Ctrl', 'Shift', 'Esc'],
  que: 'Ábrelo y <span class="placa">finaliza</span> el colgado', tamQue: 104,
  cara1: { ojos: 'x', boca: 'linea' },
  accion1: (c, e) => {
    const v = ventana(e, 'v1', 'Programa', '<b>No responde</b>', 190, 1010, 640); $(v).classList.add('r'); golpe(v, .35, { f: 22 }); S('error', .6, 1.3); S('error', 1.5, 1);
    TL.to(v, { x: 8, duration: .05, yoyo: true, repeat: 9 }, 1.5);
  },
  demo: (e, t0) => {
    ventana(e, 'vt', 'Administrador de tareas', '<div class="pp" id="q0">Navegador</div><div class="pp r" id="q1">Programa · No responde</div><div class="pp" id="q2">Música</div><span class="boton" id="bt">Finalizar tarea</span>', 150, 540, 720);
    TL.from('#vt', { scale: 0, duration: .35, ease: 'back.out(1.8)' }, t0 + .15); S('pop', t0 + .15, 1.2);
    const ma = obj(e, 'mano', 'ma3', 470, 1060, 130, 'z-index:20'); gsap.set(ma, { autoAlpha: 0 });
    TL.set(ma, { autoAlpha: 1 }, t0 + .7).from(ma, { y: 400, duration: .3, ease: 'power2.out' }, t0 + .7).to(ma, { y: -24, duration: .08, yoyo: true, repeat: 1 }, t0 + 1.1);
    TL.to('#bt', { scale: .9, duration: .08, yoyo: true, repeat: 1 }, t0 + 1.1); S('clic', t0 + 1.12, 1.8);
    TL.to('#q1', { height: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0, borderWidth: 0, opacity: 0, duration: .3, ease: 'power2.in' }, t0 + 1.2); S('bien', t0 + 1.45, 1.3);
    TL.to(ma, { y: 500, duration: .3, ease: 'power2.in' }, t0 + 1.5);
    pjc(e, 'c3', { w: 400 }); cara('c3', t0, { ojos: 'normal', boca: 'linea' }); mira('c3', t0 + .3, 0, -16); cara('c3', t0 + 1.45, { ojos: 'feliz', boca: 'feliz' }); salta('c3', t0 + 1.5, 80, .4);
  },
});
