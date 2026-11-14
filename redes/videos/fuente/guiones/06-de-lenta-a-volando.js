//== css
.estela{position:absolute;left:-190px;height:10px;border-radius:5px;background:#fff;opacity:.8}
//== html
<section class="e azul" id="e1">
  <div class="tx borde" id="t1" style="top:290px;font-size:124px">¿Tu laptop anda <span class="nar">ASÍ</span> de lenta?</div>
</section>
<section class="e naranja" id="e2">
  <div class="abs" style="left:0;right:60px;top:292px;text-align:center;z-index:20"><span class="chip" id="ch2">Chuta Express</span></div>
  <div class="tx" id="t2" style="top:376px;font-size:120px">¡A ponerla a punto!</div>
  <div class="sub caja" id="s2" style="top:1300px;z-index:30"><b>Sin formatear.</b> Por remoto.</div>
</section>
<section class="e cielo" id="e3">
  <div class="tx borde" id="t3" style="top:290px;font-size:128px">¡De lenta a <span class="placa">VOLANDO</span>!</div>
</section>
<section class="e azul" id="e4"></section>
//== guion
montar(16);
musica(['lento', 'lento', 'alegre', 'subida', 'alegre', 'alegre', 'alegre', 'final']);

// ---- 1. gancho: la laptop caracol (0 - 3.5)
escena('#e1', 0, 3.5); fondoRayas('#e1', 0, 3.5); suelo('#e1');
texto('#t1', .1);
pjc('#e1', 'c1', { cx: 230 }); accesorio('c1', 'caracol');
cara('c1', 0, { ojos: 'linea', boca: 'onda', gota: true }); gotea('c1', 0, 2.1);
camina('c1', 0, 2.2, 280, { pasos: 4, alto: 12, giro: 2, son: false });
S('ronquido', .3, .8); S('ronquido', 1.15, .8);
signo('#e1', 'z', 470, 700, .35, { tam: 100 }); signo('#e1', 'Z', 600, 690, .95, { tam: 150 });
const car = obj('#e1', 'caracolito', 'car', -420, 1212, 300, 'z-index:12');
$('#car').insertAdjacentHTML('beforeend', '<i class="estela" style="top:60px;width:190px"></i><i class="estela" style="top:120px;width:140px;left:-170px"></i><i class="estela" style="top:180px;width:210px;left:-240px"></i>');
TL.to(car, { x: 1800, duration: 1.05, ease: 'power1.in' }, 1.4); S('fiu', 1.45, 1.2);
polvo(1.95, 300, PISO, 6); polvo(2.2, 680, PISO, 6);
cara('c1', 1.55, { ojos: 'normal', boca: 'linea', cejas: -10 });
mira('c1', 1.55, -18, 4, .1); TL.to('#c1 .pupila', { x: 18, y: 2, duration: .8, ease: 'power1.in' }, 1.7);
cara('c1', 2.25, { boca: 'o' });
const g1 = globo('#e1', 'g1', '¡¿Hasta el caracol<br>me gana?!', 150, 400, 720, { cola: 330 });
sale('#t1', 2.25); dice(g1, 2.4, { origen: '50% 100%' });
cara('c1', 2.9, { boca: 'triste', cejas: 14 }); llora('c1', 2.9, 3.5); S('desinfla', 2.45, .9);

// ---- 2. Chuta Express: la llave la pone a punto (3.5 - 6.5)
escena('#e2', 3.5, 6.5); zoomCorte(3.5, '#e1', '#e2'); fondoRayos('#e2', 3.5, 6.5, 510, 1100); suelo('#e2');
pop('#ch2', 3.6); texto('#t2', 3.7);
pjc('#e2', 'c2'); gsap.set('#c2 .llave', { visibility: 'hidden' });
cara('c2', 3.5, { ojos: 'normal', boca: 'linea', gota: true });
const ll = obj('#e2', 'llave', 'll', 743, 660, 150, 'z-index:14');
gsap.set(ll, { transformOrigin: '50% 95%', rotation: 12 });
TL.from(ll, { y: -800, duration: .32, ease: 'power2.out' }, 3.62);
[['Archivos basura', '', -820, -8], ['Programas que sobran', 'am', 820, 10], ['Arranque lento', 'g', -820, 6], ['Virus', 'r', 820, -12]].forEach((b, i) => {
  const t = 4.0 + i * .5;
  TL.to(ll, { rotation: -62, duration: .13, ease: 'power3.in' }, t - .13).to(ll, { rotation: 12, duration: .3, ease: 'back.out(2)' }, t + .02);
  S('golpe', t, .7); S('clic', t, 1.3); chispas(t, 530, 850, 6, { son: false, radio: .6 });
  agacha('c2', t, .08, .86); levanta('c2', t + .1, .25);
  cara('c2', t, { ojos: 'x' }); cara('c2', t + .24, { ojos: 'normal' });
  const e = etiqueta('#e2', 'ba' + i, b[0], 0, 1010, b[1] + ' gr', b[3]);
  gsap.set(e, { autoAlpha: 0, left: 510, xPercent: -50 }); TL.set(e, { autoAlpha: 1 }, t);
  arco(e, t, { x: b[2], alto: 330, y: 160, d: .95, rot: b[2] > 0 ? 160 : -160 }); S('zip', t + .05, .7);
});
TL.to(ll, { y: -1200, rotation: 400, duration: .4, ease: 'power2.in' }, 5.85);
cara('c2', 6.0, { ojos: 'feliz', boca: 'feliz', gota: false }); salta('c2', 6.0, 130, .42); chispas(6.0, 510, 1050, 12);
entra('#s2', 5.55);

// ---- 3. cuenta regresiva y despegue (6.5 - 10.5)
escena('#e3', 6.5, 10.5); cortina(6.5); const su3 = suelo('#e3');
const c3 = pjc('#e3', 'c3');
cara('c3', 6.5, { ojos: 'normal', boca: 'dientes', cejas: -12 });
cuenta('#e3', 6.5, ['3', '2', '1'], 280);
agacha('c3', 6.6, 1.3, .8); tiembla('c3', 7.2, 8.0, 7);
fuego('c3', 7.5, 10.5); TL.from('#c3 .fuego', { opacity: 0, duration: .3 }, 7.5);
S('cohete', 7.95, 1); sacudir(8.0, 44, .7); destello(8.0, '#fff', .3);
levanta('c3', 8.0, .2); cara('c3', 8.0, { ojos: 'feliz', boca: 'feliz', cejas: 0 });
TL.to(c3, { y: -230, duration: .45, ease: 'power3.out' }, 8.0); sinSombra('c3', 8.0);
TL.to(su3, { y: 1500, duration: .5, ease: 'power2.in' }, 8.0);
polvo(8.0, 360, PISO, 10); polvo(8.05, 660, PISO, 10);
nubes('#e3', 8.1, 10.5, { n: 10 }); lineasVel('#e3', 8.0, 10.5, { n: 36 });
bambolea('c3', 8.5, 10.5, 5, .5); flota(c3, 8.5, 10.5, 30, .5);
texto('#t3', 8.5);
camara(8.3, { scale: 1.06, duration: 2.2, ease: 'sine.inOut' });

// ---- 4. precio (10.5 - 12.5)
escena('#e4', 10.5, 12.5); TL.set('#zoom', { scale: 1 }, 10.5); cortina(10.5, '#0E1A33'); fondoPuntos('#e4', 10.5, 12.5);
const pr = precio('#e4', 'pr', { nombre: 'Chuta Express', valor: '$10', nota: 'Precio de lanzamiento · <s>normal $12</s>', y: 290 });
golpe(pr, 10.65); S('moneda', 10.95); confeti(10.95, 510, 600, 30);
pjc('#e4', 'c4', { w: 430, cx: 510, piso: 1470 }); cara('c4', 10.5, { ojos: 'feliz', boca: 'feliz' });
TL.from('#c4-w', { y: 700, duration: .4, ease: 'back.out(1.6)' }, 11.0); salta('c4', 11.5, 90, .4); salta('c4', 12.0, 90, .4);
['Sin formatear', 'Por remoto', 'Reporte antes y después'].forEach((x, i) => {
  const e = etiqueta('#e4', 'ch' + i, x, 0, [900, 900, 1010][i], (i === 2 ? 'n' : '') + ' gr', i % 2 ? 3 : -3);
  gsap.set(e, { left: [300, 730, 510][i], xPercent: -50 }); pop(e, 11.2 + i * .22);
});

// ---- 5. cierre (12.5 - 16)
cierre({ t0: 12.5, t1: 16, titulo: 'El diagnóstico es <span class="placa">GRATIS</span>' });
zoomCorte(12.5, '#e4', '#fin');
