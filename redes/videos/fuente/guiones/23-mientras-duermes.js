//== voz
!voz=es_MX-claude-high vel=1.0 pausa=0.18 inicio=0.35
@noche
Son las tres de la mañana. | pausa=0.3
Tú duermes… || Tú duermes. | pausa=0.25
Pero tu laptop no. | pausa=0.35
@trabajo
Windows aprovecha la madrugada: || Güindous aprovecha la madrugada.
descarga actualizaciones,
pasa el antivirus
y se pone al día. | pausa=0.35
@bien
Eso está bien. | pausa=0.3
@problema
El problema es todo lo demás. | pausa=0.3
@apps
Programas que arrancan solos.
@basura
Archivos basura que se acumulan.
@disco
Y un disco cada vez más lleno. | pausa=0.35
@manana
Por eso amanece lenta,
y tú crees que ya está vieja. | pausa=0.4
@marca
No está vieja.
Está descuidada. | pausa=0.4
@express
Con el Chuta Express la limpiamos y la ordenamos.
Sin formatear y por remoto. | pausa=0.4
@cta
¿Quieres saber qué tiene la tuya?
Comenta CHUTA || Comenta chuta
y te hacemos el diagnóstico gratis. | pausa=0.3
//== css
.mini{font:600 44px/1.1 "Poppins",sans-serif;margin-top:12px;color:#fff}
.letra{visibility:hidden}
//== guion
montar(durVoz());
musica(['tension', 'tension', 'suave', 'suave', 'suave', 'suave', 'tension', 'tension', 'tension', 'tension', 'tension', 'lento', 'lento', 'subida', 'alegre', 'alegre', 'alegre', 'alegre', 'alegre', 'alegre', 'alegre', 'final'], { prog: 1 });
subtitulos({ omitir: [14, 15] });
const tT = M('trabajo'), tP = M('problema'), tM = M('manana'), tB = M('marca'), tE = M('express'), tC = M('cta'), tF = VOZ.dur;

// ---- 1. las tres de la mañana: tu duermes, tu laptop no
const eN = esc('eN', 'madrugada'); escena(eN, 0, tT - .12); estrellas(eN, 30, 820); suelo(eN); luz(eN, 510, 1080, 640);
obj(eN, 'ventanaLuna', 'vl', 70, 320, 300, 'z-index:3');
$(eN).insertAdjacentHTML('beforeend', '<div class="led" id="led1" style="top:410px;left:400px;right:70px;font-size:170px">03:00</div>');
golpe('#led1', .08, { f: 10, de: 2.2 }); S('bip', .35, 1.2);
pjc(eN, 'cN'); cara('cN', 0, { ojos: 'linea', boca: 'linea' }); respira('cN', 0, 3.1);
signo(eN, 'z', 130, 1180, .6, { tam: 90, dx: 40, dy: -200 }); signo(eN, 'Z', 190, 1150, 1.5, { tam: 130, dx: 50, dy: -240 }); signo(eN, 'Z', 150, 1170, 2.3, { tam: 110 });
S('ronquido', .7, .7); S('ronquido', 2.2, .7);
const t2 = fr(2).t0;
cara('cN', t2 + .25, { ojos: 'normal', boca: 'o', cejas: -12 }); S('bip', t2 + .25, 1.4); salta('cN', t2 + .3, 70, .35); parpadeo(t2 + .25, 'rgba(111,178,255,.35)', .4);
mira('cN', t2 + .8, -16, 0, .15); mira('cN', t2 + 1.05, 16, 0, .15);
vineta(eN); empuje(0, tT - .12, 1, 1.08);

// ---- 2. Windows aprovecha la madrugada: tres ventanas trabajando
const eT = esc('eT', 'madrugada'); escena(eT, tT - .12, tP - .1); estrellas(eT, 18, 320); suelo(eT); luz(eT, 510, 1230, 480); cortina(tT - .12, '#0E1A33');
pjc(eT, 'cT', { w: 400 }); cara('cT', tT, { ojos: 'normal', boca: 'linea' }); mira('cT', tT + .2, 0, -16);
const BAR = (id, txt, color) => `<div class="barra"><b id="${id}b" style="width:0%;background:${color}"></b></div><div class="mini">${txt} <span id="${id}n">0</span>%</div>`;
const en = obj(eT, 'engranaje', 'en', 440, 600, 200, 'z-index:5'); gira(en, tT, tP, 1.2); TL.from(en, { scale: 0, duration: .4, ease: 'back.out(2)' }, tT + .2); TL.to(en, { opacity: .15, duration: .3 }, fr(4).t0);
[['w1', 'Windows Update', 'Descargando…', '#6FB2FF', 50, 320, fr(4).t0], ['w2', 'Antivirus', 'Analizando archivos…', '#1FBF75', 130, 590, fr(5).t0], ['w3', 'Mantenimiento', 'Poniéndose al día…', '#FF8A00', 70, 860, fr(6).t0]].forEach(([id, tit, txt, col, x, y, t]) => {
  const q = ventanaOsc(eT, id, tit, BAR(id, txt, col), x, y, 820); aparece(q, t, { son: 'zip' });
  TL.to(`#${id}b`, { width: '100%', duration: fr(7).t0 - t - .1, ease: 'power1.inOut' }, t + .1); contador(`#${id}n`, t + .1, 0, 100, fr(7).t0 - t - .1, 'power1.inOut');
});
const cu = obj(eT, 'cursor', 'cu', 820, 1250, 70, 'z-index:30');
TL.to(cu, { x: -360, y: -800, duration: .5, ease: 'power2.inOut' }, fr(4).t0 - .3).to(cu, { x: -120, y: -540, duration: .5, ease: 'power2.inOut' }, fr(5).t0 - .3).to(cu, { x: -260, y: -290, duration: .5, ease: 'power2.inOut' }, fr(6).t0 - .3);
[fr(4).t0, fr(5).t0, fr(6).t0].forEach(t => { TL.to(cu, { scale: .8, duration: .07, yoyo: true, repeat: 1 }, t + .2); S('clic', t + .2, 1.2); });
const t7 = fr(7).t0;
TL.to(['#w1', '#w2', '#w3'], { borderColor: '#1FBF75', duration: .15 }, t7); S('bien', t7, 1.4); chispas(t7 + .1, 510, 700, 12, { son: false });
cara('cT', t7, { ojos: 'feliz', boca: 'feliz' }); salta('cT', t7 + .05, 80, .4);
vineta(eT); empuje(tT - .12, tP - .1, 1, 1.05);

// ---- 3. el problema es todo lo demas: programas, basura y disco lleno
const eP = esc('eP', 'madrugada'); escena(eP, tP - .1, tM - .1); suelo(eP); luz(eP, 510, 1100, 620);
destello(tP - .1, '#FF4D4D', .3); S('error', tP, 1.2);
pjc(eP, 'cP', { w: 640 }); gsap.set('#cP-w', { transformOrigin: '50% 100%' });
cara('cP', tP, { ojos: 'normal', boca: 'linea', cejas: 12 });
tx(eP, 'tP1', 'El <span class="placa r">problema</span>…', 300, 124); golpe('#tP1', tP - .05, { f: 18 }); sale('#tP1', M('apps') - .15);
tx(eP, 'tP2', 'Arrancan <span class="placa">solos</span>', 300, 116); texto('#tP2', M('apps')); sale('#tP2', M('basura') - .15);
['#FF4D4D', '#FFD23F', '#1FBF75', '#6FB2FF', '#FF8A00', '#fff', '#FF8FA3', '#9AA3B2'].forEach((c, k) => {
  const a = document.createElement('div'); a.className = 'app'; Object.assign(a.style, { left: 110 + (k % 4) * 205 + 'px', top: 520 + Math.floor(k / 4) * 170 + 'px', background: c }); $(eP).appendChild(a);
  const t = M('apps') + .1 + k * .2; TL.from(a, { scale: 0, rotation: -90, duration: .3, ease: 'back.out(2.5)' }, t); S('pop', t, 1);
  TL.to(a, { y: -18, duration: .22, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + .3); TL.to(a, { scale: 0, opacity: 0, duration: .2 }, M('basura') - .2 + k * .02);
});
cara('cP', M('apps') + .3, { boca: 'o' }); mira('cP', M('apps') + .3, -14, -14); mira('cP', M('apps') + 1.0, 14, -14);
tx(eP, 'tP3', 'Se llena de <span class="placa">basura</span>', 300, 112); texto('#tP3', M('basura')); sale('#tP3', M('disco') - .15);
for (let k = 0; k < 9; k++) {
  const f = obj(eP, k % 2 ? 'caja' : 'carpeta', 'bs' + k, R(60, 800), -260, R(130, 190), 'z-index:11'), t = M('basura') + .1 + k * .2;
  TL.to(f, { y: R(1390, 1500), rotation: R(-80, 80), duration: .5, ease: 'bounce.out' }, t); S('paso', t + .2, .9);
}
cara('cP', M('basura') + .3, { boca: 'onda', gota: true }); mira('cP', M('basura') + .3, 0, 12);
const wd = ventanaOsc(eP, 'wd', 'Disco local (C:)', '<div class="barra"><b id="wdb" style="width:70%;background:#FF8A00"></b></div><div class="mini"><span id="wdn">70</span>% lleno</div>', 150, 330, 720);
aparece(wd, M('disco'), { son: 'zip' });
TL.to('#wdb', { width: '98%', backgroundColor: '#FF4D4D', duration: 1.6, ease: 'power1.in' }, M('disco') + .2); contador('#wdn', M('disco') + .2, 70, 98, 1.6, 'power1.in');
TL.to('#cP-w', { scaleX: 1.3, scaleY: 1.05, duration: 1.6, ease: 'power1.in' }, M('disco') + .2);
cara('cP', M('disco') + .9, { ojos: 'espiral' }); espirales('cP', M('disco') + .9, tM); S('alarma', M('disco') + 1.75, 1); parpadeo(M('disco') + 1.75, 'rgba(255,60,60,.4)', .4);
vineta(eP); empuje(tP - .1, tM - .1, 1, 1.06);

// ---- 4. amanece lenta
const eM = esc('eM', 'amanecer'); escena(eM, tM - .1, tB - .1); TL.set('#zoom', { scale: 1 }, tM - .1); destello(tM - .1, '#FFE7B0', .4); suelo(eM);
const so = obj(eM, 'sol', 'so', 560, 400, 420, 'z-index:2'); TL.from(so, { y: 800, duration: 2.4, ease: 'power2.out' }, tM - .1); gira(so, tM, tB, .15);
$(eM).insertAdjacentHTML('beforeend', '<div class="led" id="led2" style="top:320px;left:70px;right:auto;font-size:150px;color:#0E1A33;text-shadow:none">07:00</div>');
pop('#led2', tM); S('timbre', tM, 1);
pjc(eM, 'cM', { cx: 240 }); accesorio('cM', 'caracol'); cara('cM', tM, { ojos: 'linea', boca: 'onda', gota: true });
camina('cM', tM, tB - .2, 250, { pasos: 6, alto: 12, giro: 2, son: false }); gotea('cM', tM, tB);
signo(eM, 'z', 520, 760, tM + .4, { tam: 100, color: '#0E1A33' });
const vj = etiqueta(eM, 'vj', '¿Ya está vieja?', 0, 560, 'r gr', -6); gsap.set(vj, { left: 560, xPercent: -50 }); golpe(vj, fr(13).t0 + .45, { de: 3, f: 14 });

// ---- 5. no esta vieja, esta descuidada
const eB = esc('eB', 'azul'); escena(eB, tB - .1, tE - .1); zoomCorte(tB - .1, eM, eB); fondoRayos(eB, tB - .1, tE, 510, 1100); suelo(eB);
tx(eB, 'tB1', 'No está <span class="nar">vieja</span>.', 290, 130); texto('#tB1', tB);
tx(eB, 'tB2', 'Está <span class="placa">DESCUIDADA</span>', 470, 118); golpe('#tB2', fr(15).t0 - .12);
pjc(eB, 'cB'); accesorio('cB', 'telarana'); cara('cB', tB, { ojos: 'normal', boca: 'triste', cejas: 12 }); cara('cB', fr(15).t0 + .2, { boca: 'o', cejas: -10 });

// ---- 6. Chuta Express
const eE = esc('eE', 'naranja'); escena(eE, tE - .1, tC - .1); cortina(tE - .1); fondoRayos(eE, tE - .1, tC, 510, 1100); suelo(eE);
chip(eE, 'chE', 'Chuta Express', 292); pop('#chE', tE);
pjc(eE, 'cE'); gsap.set('#cE .llave', { visibility: 'hidden' }); cara('cE', tE, { ojos: 'normal', boca: 'linea', gota: true });
const ll = obj(eE, 'llave', 'llE', 743, 660, 150, 'z-index:14'); gsap.set(ll, { transformOrigin: '50% 95%', rotation: 12 }); TL.from(ll, { y: -800, duration: .32, ease: 'power2.out' }, tE + .1);
[['Archivos basura', '', -820, -8], ['Programas que sobran', 'am', 820, 10], ['Arranque lento', 'g', -820, 6], ['Virus', 'r', 820, -12]].forEach((b, i) => {
  const t = tE + .7 + i * .6;
  TL.to(ll, { rotation: -62, duration: .13, ease: 'power3.in' }, t - .13).to(ll, { rotation: 12, duration: .3, ease: 'back.out(2)' }, t + .02);
  S('golpe', t, .6); S('clic', t, 1.2); chispas(t, 530, 850, 6, { son: false, radio: .6 });
  agacha('cE', t, .08, .86); levanta('cE', t + .1, .25); cara('cE', t, { ojos: 'x' }); cara('cE', t + .24, { ojos: 'normal' });
  const e = etiqueta(eE, 'bx' + i, b[0], 0, 1010, b[1] + ' gr', b[3]); gsap.set(e, { autoAlpha: 0, left: 510, xPercent: -50 }); TL.set(e, { autoAlpha: 1 }, t);
  arco(e, t, { x: b[2], alto: 330, y: 160, d: .95, rot: b[2] > 0 ? 160 : -160 }); S('zip', t + .05, .6);
});
TL.to(ll, { y: -1200, rotation: 400, duration: .4, ease: 'power2.in' }, tE + 3.0);
cara('cE', tE + 3.15, { ojos: 'feliz', boca: 'feliz', gota: false }); salta('cE', tE + 3.15, 130, .42); chispas(tE + 3.15, 510, 1050, 12);
tags(eE, 'tgE', [['Sin formatear', 'Por remoto']], 420, fr(17).t0, { st: fr(17).palabras[2][1] - fr(17).t0 });
salta('cE', fr(17).t0 + .3, 90, .4);

// ---- 7. comenta CHUTA
const eC = esc('eC', 'azul'); escena(eC, tC - .1, tF); cortina(tC - .1, '#0E1A33'); fondoPuntos(eC, tC - .1, tF); suelo(eC);
tx(eC, 'tC1', '¿Qué tiene la <span class="placa">tuya</span>?', 300, 124); texto('#tC1', tC);
$(eC).insertAdjacentHTML('beforeend', '<div class="caja-com" id="cc" style="top:590px"><small>Agrega un comentario…</small>' + 'CHUTA'.split('').map((l, k) => `<span class="letra" id="lt${k}">${l}</span>`).join('') + '<i id="ccu"></i></div>');
aparece('#cc', fr(18).t0 + .9); TL.to('#ccu', { opacity: 0, duration: .25, yoyo: true, repeat: 24 }, fr(18).t0 + .9);
'CHUTA'.split('').forEach((l, k) => { const t = fr(19).t0 + .2 + k * .12; TL.set('#lt' + k, { visibility: 'visible' }, t); S('tecla', t, 1.6); });
TL.to('#cc', { scale: 1.06, duration: .1, yoyo: true, repeat: 1 }, fr(19).t1 + .1); S('bien', fr(19).t1 + .1, 1.2);
const stC = estampaEn(eC, 'stC', 'GRATIS', 0, 900, 'v', 150); gsap.set(stC, { left: 510, xPercent: -50 }); estampa(stC, fr(20).palabras[5][1] - .25, { rot: -8 }); confeti(fr(20).palabras[5][1], 510, 900, 34);
pjc(eC, 'cC', { w: 400 }); cara('cC', tC, { ojos: 'normal', boca: 'feliz' }); mira('cC', tC + .2, 0, -16); cara('cC', fr(19).t1, { ojos: 'feliz' }); salta('cC', fr(19).t1 + .15, 80, .4); salta('cC', fr(20).palabras[5][1], 80, .4);

// ---- 8. cierre
cierre({ t0: tF, t1: window.__dur, titulo: 'Comenta <span class="placa">CHUTA</span>', sub: 'o escríbenos por WhatsApp · Cuenca' });
zoomCorte(tF, eC, '#fin');
