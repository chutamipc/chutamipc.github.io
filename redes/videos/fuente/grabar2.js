// Uso: node grabar2.js <video.html> <salida.mp4|-> <carpeta_muestras> [modo: todo|muestras|lista] [paso_s | t1,t2,...]
// Recorre la linea de tiempo cuadro por cuadro (30 fps) con window.__seek(t) y manda los cuadros a ffmpeg.
// Tambien guarda <nombre>.json con la duracion, los cortes y los sonidos que pide el guion.
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path'); const fs = require('fs');
(async () => {
  const [html, salida, muestras, modo = 'todo', extra] = process.argv.slice(2);
  const fps = 30;
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 })).newPage();
  const errores = []; page.on('pageerror', e => errores.push(e.message)); page.on('requestfailed', r => errores.push('fallo ' + r.url()));
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errores.push(m.type() + ': ' + m.text()); });
  await page.goto('file://' + path.resolve(html), { waitUntil: 'load' });
  await page.waitForFunction(() => window.__listo === true, null, { timeout: 30000 });
  const info = await page.evaluate(() => ({ dur: window.__dur, sonidos: window.__sonidos, cortes: window.__cortes, musica: window.__musica || null }));
  const dur = info.dur, total = Math.round(dur * fps);
  const nombre = path.basename(html, '.html');
  fs.writeFileSync(path.join(path.dirname(path.resolve(html)), nombre + '.json'), JSON.stringify(info));
  const ir = t => page.evaluate(s => window.__seek(s), t);
  if (modo === 'muestras' || modo === 'lista') {
    let tiempos = [];
    if (modo === 'lista') tiempos = extra.split(',').map(Number);
    else { const paso = parseFloat(extra || '0.5'); for (let t = paso / 2; t < dur; t += paso) tiempos.push(+t.toFixed(3)); }
    for (const t of tiempos) { await ir(t); await page.screenshot({ path: `${muestras}/${nombre}-${String(Math.round(t * 100)).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 72 }); }
    console.log(nombre, '| dur', dur, '| muestras:', tiempos.length, '| sonidos:', info.sonidos.length, '| errores:', errores.length ? errores : 'ninguno');
  } else {
    const args = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(fps), '-movflags', '+faststart', salida];
    const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
    const fin = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));
    for (let f = 0; f < total; f++) {
      await ir(f / fps);
      const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); await fin;
    console.log(nombre, '->', salida, `(${total} cuadros, ${(fs.statSync(salida).size / 1048576).toFixed(1)} MB) errores:`, errores.length ? errores : 'ninguno');
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
