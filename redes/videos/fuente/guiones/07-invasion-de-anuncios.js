//== guion
montar(14);
musica(['suave', 'tension', 'subida', 'alegre', 'alegre', 'alegre', 'final'], { prog: 1 });

// ---- 1. solo querias ver un video... y llegan los anuncios (0 - 8.5)
const e1 = esc('e1', 'claro'); escena(e1, 0, 8.5); fondoRayas(e1, 0, 8.5); suelo(e1);
tx(e1, 't1', 'Tú solo querías ver <span class="placa">UN video</span>…', 290, 116); texto('#t1', .05);
pjc(e1, 'c1'); cara('c1', 0, { ojos: 'feliz', boca: 'feliz' }); respira('c1', 0, .9);
const ADS = [['¡GANASTE!', 'am', 'un premio increíble'], ['OFERTA -90%', 'r', 'solo por hoy'], ['CLIC AQUÍ', 'v', ''], ['¡Descarga YA!', 'a', ''], ['100% GRATIS', 'b', '(mentira)'],
  ['¡¡URGENTE!!', 'r', ''], ['Tu PC tiene 5 virus', 'am', 'eso dice el anuncio'], ['Acepta las cookies', 'b', ''], ['¡Suscríbete!', 'v', ''], ['ÚLTIMA OPORTUNIDAD', 'r', ''],
  ['Gana $$$ fácil', 'am', ''], ['¡Felicidades!', 'a', 'eres el visitante 1.000.000'], ['Instalar ahora', 'v', ''], ['OFERTA', 'r', ''], ['¡Mira esto!', 'b', ''], ['Clic, clic, clic', 'am', '']];
const T = [.9, 1.5, 2.0, 2.4, 2.75, 3.05, 3.3, 3.55, 3.8, 4.0, 4.2, 4.4, 4.6, 4.8, 5.0, 5.2];
const P = [[90, 640], [520, 780], [60, 1010], [470, 1150], [250, 890], [500, 610], [40, 1240], [330, 1040], [520, 950], [130, 760], [420, 670], [80, 1120], [460, 1290], [300, 1210], [560, 1100], [220, 620]];
const ads = ADS.map((a, i) => {
  const q = anuncio(e1, 'ad' + i, a[0] + (a[2] ? `<small>${a[2]}</small>` : ''), P[i][0], P[i][1], a[1], R(-13, 13));
  const el = $(q); el.style.left = Math.min(P[i][0], 940 - el.offsetWidth) + 'px';
  TL.from(q, { scale: 0, opacity: 0, duration: .26, ease: 'back.out(2.6)' }, T[i]); S(i % 3 === 2 ? 'burbuja' : 'pop', T[i], 1.1);
  if (i >= 5) sacudir(T[i], 10, .14);
  return q;
});
cara('c1', .9, { ojos: 'normal', boca: 'linea' }); mira('c1', .9, -16, -12);
mira('c1', 1.5, 16, -6); cara('c1', 1.5, { boca: 'o', cejas: -10 });
mira('c1', 2.0, -14, 10); mira('c1', 2.4, 14, 12); cara('c1', 2.4, { gota: true });
cara('c1', 3.05, { ojos: 'espiral', boca: 'onda' }); espirales('c1', 3.05, 6.0); tiembla('c1', 3.05, 6.0, 6);
sale('#t1', 1.85); tx(e1, 't2', '¿Y te sale <span class="placa r">ESTO</span>?', 290, 132); golpe('#t2', 1.9, { f: 14 });
const f1 = franja(e1, 'f1', '¡CHUTA, MI PC!', 760, 'n'); golpe(f1, 4.2, { f: 30 }); late(f1, 4.7, 5.9, 1.05);
camara(2.0, { scale: 1.08, duration: 3.85, ease: 'none' });
[4.0, 4.5, 5.0, 5.5].forEach(t => parpadeo(t)); S('alarma', 4.0, .8); S('alarma', 5.0, .8);

// el escudo cae y barre los anuncios (6.0)
const es = obj(e1, 'escudo', 'es', 290, 770, 440, 'z-index:18'); golpe(es, 5.74, { de: 4.5, f: 46 });
camara(5.9, { scale: 1, duration: .2, ease: 'power2.out' });
onda(6.0, 510, 1010, { r: 14 }); onda(6.1, 510, 1010, { r: 10, color: '#1FBF75' }); destello(6.0, '#fff', .3); chispas(6.05, 510, 1010, 14); S('fanfarria', 6.05, .9);
ads.forEach((q, i) => {
  const el = $(q), cx = el.offsetLeft + el.offsetWidth / 2 - 510, cy = el.offsetTop + 50 - 1010, n = Math.hypot(cx, cy) || 1;
  TL.to(q, { x: cx / n * 1500, y: cy / n * 1500, rotation: R(-400, 400), duration: .55, ease: 'power2.out' }, 6.0 + i * .008).set(q, { autoAlpha: 0 }, 6.6);
});
sale(f1, 5.9, { y: 0, scale: 1.6, duration: .12 }); sale('#t2', 5.88);
cara('c1', 6.0, { ojos: 'normal', boca: 'o', gota: false, cejas: 0 }); mira('c1', 6.0, 0, 0, .1);
cara('c1', 6.55, { ojos: 'feliz', boca: 'feliz' }); salta('c1', 6.6, 130, .45);
TL.to(es, { x: 285, y: 330, scale: .46, rotation: 8, duration: .45, ease: 'back.inOut(1.4)' }, 6.75); flota(es, 7.3, 8.5, 16, .6);
chip(e1, 'ch1', 'Chuta Sin Anuncios', 292); pop('#ch1', 6.5);
tx(e1, 't3', '¡Navegador limpio y <span class="placa v">más seguro</span>!', 384, 112); texto('#t3', 6.7);

// ---- 2. precio (8.5 - 10.5) y cierre
cortina(8.5);
escenaPrecio({ id: 'e2', t0: 8.5, t1: 10.5, nombre: '<span style="font-size:70px">Chuta Sin Anuncios</span>', valor: '$3', nota: 'Por remoto, en 10 a 15 minutos', tags: [['Revisión gratis el primer mes']] });
cierre({ t0: 10.5, t1: 14, titulo: 'Navega <span class="placa">sin anuncios</span>' });
zoomCorte(10.5, '#e2', '#fin');
