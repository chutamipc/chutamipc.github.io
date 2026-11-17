# Narracion de un video: convierte el bloque "//== voz" del guion en audio y en tiempos por frase y por palabra.
# Uso: PYTHONPATH=<voz/lib> python3 voz.py guiones/<nombre>.js   ->  audio/<nombre>-voz.wav  y  html/<nombre>-voz.json
# Formato del bloque (una frase por linea):
#   !voz=es_MX-claude-high vel=0.95 pausa=0.16 inicio=0.3     (opciones generales, opcional)
#   @marca                                                    (nombra el inicio de la frase siguiente)
#   Texto en pantalla || texto que se pronuncia | pausa=0.4 | vel=1.0
import sys, os, re, json, wave, hashlib
import numpy as np
from piper import PiperVoice, SynthesisConfig

src = sys.argv[1]; nombre = os.path.splitext(os.path.basename(src))[0]
AQUI = os.path.dirname(os.path.abspath(__file__)); MODELOS = os.path.join(AQUI, '..', 'voz', 'modelos')
t = open(src, encoding='utf-8').read()
m = re.search(r"//== voz\n(.*?)(?=\n//== |\Z)", t, re.S)
if not m: print('sin bloque voz'); sys.exit(0)
bloque = m.group(1)
sal_json, sal_wav = f'html/{nombre}-voz.json', f'audio/{nombre}-voz.wav'
huella = hashlib.sha1((bloque + open(__file__, encoding='utf-8').read()).encode()).hexdigest()
if os.path.exists(sal_json) and os.path.exists(sal_wav) and json.load(open(sal_json)).get('huella') == huella:
    print('voz sin cambios'); sys.exit(0)

gen = {'voz': 'es_MX-claude-high', 'vel': 0.95, 'pausa': 0.16, 'inicio': 0.3}
frases, marca = [], None
for linea in bloque.split('\n'):
    linea = linea.strip()
    if not linea or linea.startswith('#'): continue
    if linea.startswith('!'):
        for k, v in re.findall(r'(\w+)=(\S+)', linea): gen[k] = v if k == 'voz' else float(v)
        continue
    if linea.startswith('@'): marca = linea[1:].strip(); continue
    partes = [p.strip() for p in linea.split(' | ')]
    txt = partes[0]; op = dict(re.findall(r'(\w+)=(\S+)', ' '.join(partes[1:])))
    mostrado, _, hablado = txt.partition('||')
    frases.append({'texto': mostrado.strip(), 'dice': (hablado or mostrado).strip(), 'pausa': float(op.get('pausa', gen['pausa'])), 'vel': float(op.get('vel', gen['vel'])), 'marca': marca})
    marca = None

voz = PiperVoice.load(os.path.join(MODELOS, gen['voz'] + '.onnx'))
SR0, SR = voz.config.sample_rate, 44100

def remuestrea(x):                                   # 22050 -> 44100 por FFT
    n = len(x); X = np.fft.rfft(x); m2 = int(round(n * SR / SR0)); Y = np.zeros(m2 // 2 + 1, dtype=complex); k = min(len(X), len(Y)); Y[:k] = X[:k]
    return np.fft.irfft(Y, m2) * (m2 / n)
def recorta(x, umbral=0.012, margen=0.03):           # quita el silencio de los extremos
    idx = np.where(np.abs(x) > umbral)[0]
    if len(idx) == 0: return x
    a = max(0, idx[0] - int(margen * SR0)); b = min(len(x), idx[-1] + int(margen * SR0)); return x[a:b]
def fonemas(palabra):
    try: return max(1, sum(len(f) for f in voz.phonemize(palabra)))
    except Exception: return max(1, len(palabra))

pistas, tcur, marcas = [], gen['inicio'], {}
for f in frases:
    cfg = SynthesisConfig(length_scale=1.0 / f['vel'])
    x = np.concatenate([c.audio_float_array for c in voz.synthesize(f['dice'], syn_config=cfg)]).astype(np.float64)
    x = remuestrea(recorta(x)); r = np.sqrt(np.mean(x ** 2)) + 1e-9; x = x * (0.11 / r)          # misma sonoridad en todas las frases
    fa = int(0.006 * SR); x[:fa] *= np.linspace(0, 1, fa); x[-fa:] *= np.linspace(1, 0, fa)
    d = len(x) / SR; f['t0'] = round(tcur, 3); f['t1'] = round(tcur + d, 3)
    pal = f['texto'].split(); dic = f['dice'].split()
    pesos = [fonemas(w) + 1.5 for w in dic] if len(dic) == len(pal) else [len(re.sub(r'\W', '', w)) + 1.5 for w in pal]
    tot = sum(pesos); ac = 0; f['palabras'] = []
    for w, p in zip(pal, pesos):
        f['palabras'].append([w, round(tcur + d * ac / tot, 3), round(tcur + d * (ac + p) / tot, 3)]); ac += p
    if f['marca']: marcas[f['marca']] = f['t0']
    pistas.append((x, tcur)); tcur += d + f['pausa']
dur = tcur + 0.2
buf = np.zeros(int(dur * SR))
for x, t0 in pistas: i = int(t0 * SR); buf[i:i + len(x)] += x
pico = np.max(np.abs(buf)); buf = buf / max(1.0, pico / 0.98)
os.makedirs('audio', exist_ok=True); os.makedirs('html', exist_ok=True)
with wave.open(sal_wav, 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((buf * 32767).astype('<i2').tobytes())
json.dump({'huella': huella, 'dur': round(dur, 3), 'wav': sal_wav, 'marcas': marcas,
           'frases': [{'t0': f['t0'], 't1': f['t1'], 'texto': f['texto'], 'palabras': f['palabras'], 'marca': f['marca']} for f in frases]}, open(sal_json, 'w'), ensure_ascii=False)
print(f'voz: {len(frases)} frases, {dur:.1f} s -> {sal_wav}')
