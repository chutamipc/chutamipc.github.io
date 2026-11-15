# Musica original y efectos de cada video (120 pulsos por minuto; todo sintetizado aqui, sin material de terceros).
# Uso: python3 audio2.py html/<nombre>.json audio/<nombre>.wav
# El JSON lo escribe grabar2.js: {dur, cortes, sonidos:[[nombre, t, ganancia]], musica:{compases:[...], prog, tono}}
import json, sys, wave
import numpy as np
SR = 44100
rng = np.random.default_rng(11)

def tt(dur): return np.arange(int(dur * SR)) / SR
def midi(m): return 440.0 * 2 ** ((m - 69) / 12)
def filtro(x, pasa_altos=None, pasa_bajos=None, orden=4):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); g = np.ones_like(f)
    if pasa_altos: g *= 1 / np.sqrt(1 + (pasa_altos / np.maximum(f, 1e-3)) ** (2 * orden))
    if pasa_bajos: g *= 1 / np.sqrt(1 + (f / pasa_bajos) ** (2 * orden))
    return np.fft.irfft(X * g, len(x))
def bordes(x, ataque=0.003, salida=0.012):
    a, s = max(1, int(ataque * SR)), max(1, int(salida * SR))
    x = x.copy(); x[:a] *= np.linspace(0, 1, a); x[-s:] *= np.linspace(1, 0, s); return x
def ruido(n): return rng.standard_normal(n)
def barrido(f0, f1, dur, curva=1.0):
    t = tt(dur); f = f0 + (f1 - f0) * (t / dur) ** curva
    return np.sin(2 * np.pi * np.cumsum(f) / SR), t
def cuadrada(f, dur, arm=7):
    t = tt(dur); return sum(np.sin(2 * np.pi * (2 * k + 1) * f * t) / (2 * k + 1) for k in range(arm))
def sierra(f, dur, arm=10):
    t = tt(dur); return sum(np.sin(2 * np.pi * k * f * t) / k for k in range(1, arm))
def junta(partes, dur):
    x = np.zeros(int(dur * SR))
    for s, t0, g in partes:
        i = int(t0 * SR); n = min(len(s), len(x) - i)
        if n > 0: x[i:i + n] += g * s[:n]
    return x

# ---------- instrumentos ----------
def bombo():
    t = tt(0.32); f = 46 + 120 * np.exp(-t / 0.03)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.14)
    c = int(0.004 * SR); x[:c] += 0.35 * ruido(c) * np.linspace(1, 0, c)
    return bordes(x, 0.001, 0.02)
def palmada():
    t = tt(0.3); n = filtro(ruido(len(t)), 900, 4800)
    rafagas = sum(np.where(t >= k, np.exp(-(t - k) / 0.006), 0) for k in (0, 0.011, 0.022))
    cola = np.where(t >= 0.03, np.exp(-(t - 0.03) / 0.07), 0)
    return bordes(n * (0.55 * rafagas + 0.5 * cola), 0.0005, 0.02)
def redoble():
    t = tt(0.16); return bordes((0.8 * filtro(ruido(len(t)), 1200, 7000) + 0.5 * np.sin(2 * np.pi * 190 * t)) * np.exp(-t / 0.045), 0.0005, 0.02)
def platillo(tau=0.018, dur=0.09):
    t = tt(dur); return bordes(filtro(ruido(len(t)), 7500) * np.exp(-t / tau), 0.0005, 0.01)
def punteo(f, dur=0.9, brillo=1.0):
    t = tt(dur); x = np.zeros_like(t)
    for k in range(1, 8): x += np.sin(2 * np.pi * k * f * t) / (k ** (1.5 / brillo)) * np.exp(-t / (0.32 / k ** 0.7))
    return bordes(x, 0.002, 0.03)
def bajo(f, dur=0.22):
    t = tt(dur); x = np.sin(2 * np.pi * f * t) + 0.6 * np.sin(4 * np.pi * f * t) + 0.4 * np.sin(6 * np.pi * f * t) + 0.25 * np.sin(8 * np.pi * f * t) + 0.15 * np.sin(10 * np.pi * f * t)
    return bordes(x, 0.006, 0.03)
def tuba(f, dur=0.7):
    t = tt(dur); x = sum(np.sin(2 * np.pi * k * f * t) / k ** 1.3 for k in range(1, 7)) * (1 - np.exp(-t / 0.03)) * np.exp(-t / (dur * 0.6))
    return bordes(x, 0.01, 0.06)
def campana(f, dur=1.4, g=(1, .5, .3, .18), r=(1, 2.0, 3.01, 4.2), d=(0.55, 0.32, 0.2, 0.12)):
    t = tt(dur); return bordes(sum(a * np.sin(2 * np.pi * f * q * t) * np.exp(-t / c) for a, q, c in zip(g, r, d)), 0.002, 0.05)
def madera(f=1250, tau=0.018):
    t = tt(0.09); return bordes((np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 1.52 * t)) * np.exp(-t / tau), 0.0005, 0.01)
def metal(f, dur=0.5):
    x = filtro(sierra(f, dur, 14), None, 2200) ; t = tt(dur)
    return bordes(x * (1 - np.exp(-t / 0.02)) * np.exp(-t / (dur * 0.8)), 0.01, 0.06)

# ---------- efectos ----------
def fx_soplo(dur=0.42, lo=350, hi=6500, sube=True):
    t = tt(dur); n = filtro(ruido(len(t)), lo, hi) * np.sin(np.pi * t / dur) ** 2
    f = np.linspace(300, 1300, len(t)) if sube else np.linspace(1300, 300, len(t))
    return n * 0.9 + 0.25 * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / dur) ** 2
def fx_golpe():
    t = tt(0.5); f = 38 + 60 * np.exp(-t / 0.05)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.17)
    n = filtro(ruido(len(t)), None, 2600) * np.exp(-t / 0.035)
    return bordes(x + 0.45 * n, 0.001, 0.05)
def fx_pop():
    t = tt(0.12); f = 420 + 520 * (1 - np.exp(-t / 0.02))
    return bordes(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.035), 0.001, 0.02)
def fx_clic():
    t = tt(0.05); return bordes(np.sin(2 * np.pi * 2100 * t) * np.exp(-t / 0.007) + 0.4 * filtro(ruido(len(t)), 4000) * np.exp(-t / 0.003), 0.0005, 0.01)
def fx_bien():
    return junta([(campana(midi(88), 0.5, d=(0.22, 0.12, 0.08, 0.05)), 0, 1), (campana(midi(95), 0.6, d=(0.28, 0.14, 0.09, 0.05)), 0.075, 1)], 0.7)
def fx_campana():
    return junta([(campana(midi(84), 1.6), 0, 1), (campana(midi(91), 1.3), 0.09, 0.6)], 1.7)
def fx_caja():
    return junta([(fx_clic(), 0, 1.2)] + [(campana(midi(m), 0.7, d=(0.3, 0.16, 0.1, 0.06)), 0.03 + 0.085 * k, 1) for k, m in enumerate((96, 100))], 0.9)
def fx_barrido():
    t = tt(1.0); return filtro(ruido(len(t)), 1800) * np.sin(np.pi * t / 1.0) ** 2 + 0.2 * np.sin(2 * np.pi * np.cumsum(np.linspace(300, 1500, len(t))) / SR) * np.sin(np.pi * t) ** 2
def fx_raya():
    t = tt(0.22); return filtro(ruido(len(t)), 3000) * np.sin(np.pi * t / 0.22) ** 2
def fx_alarma():
    def tri(f, dur):
        t = tt(dur); return bordes(sum(np.sin(2 * np.pi * (2 * k + 1) * f * t) * (-1) ** k / (2 * k + 1) ** 2 for k in range(5)), 0.004, 0.03)
    return np.concatenate([tri(392, 0.17), np.zeros(int(0.03 * SR)), tri(262, 0.3)])
def fx_boing():
    t = tt(0.34); f = 170 + 420 * (t / 0.34) ** 0.6 + 26 * np.sin(2 * np.pi * 34 * t)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR); x += 0.35 * np.sin(4 * np.pi * np.cumsum(f) / SR)
    return bordes(x * np.exp(-t / 0.2), 0.004, 0.04)
def fx_paso():
    t = tt(0.1); return bordes(np.sin(2 * np.pi * (120 - 400 * t) * t) * np.exp(-t / 0.03) + 0.3 * filtro(ruido(len(t)), 500, 3000) * np.exp(-t / 0.01), 0.001, 0.02)
def fx_habla():
    notas = [72, 76, 79, 74, 81, 77, 84]; partes = []; t0 = 0
    for k in range(7):
        m = notas[int(rng.integers(0, len(notas)))]; d = 0.05 + 0.02 * rng.random()
        x = bordes(filtro(cuadrada(midi(m), d, 5), None, 3200), 0.004, 0.012); partes.append((x, t0, 1.0)); t0 += d + 0.022
    return junta(partes, t0 + 0.05)
def fx_tic(): return madera(1500, 0.02)
def fx_toc(): return madera(900, 0.024)
def fx_zip():
    x, t = barrido(280, 2600, 0.15, 1.6); return bordes(x * np.sin(np.pi * t / 0.15) ** 0.7 + 0.25 * filtro(ruido(len(t)), 2500) * (t / 0.15), 0.002, 0.02)
def fx_cae():
    x, t = barrido(1500, 260, 0.55, 0.8); return bordes(x * (1 - 0.5 * t / 0.55), 0.01, 0.05)
def fx_sube():
    x, t = barrido(260, 1500, 0.55, 1.3); return bordes(x * (0.5 + 0.5 * t / 0.55), 0.01, 0.04)
def fx_cohete(dur=2.4):
    t = tt(dur); n = ruido(len(t)); env = (1 - np.exp(-t / 0.05)) * np.exp(-np.maximum(t - 0.9, 0) / 0.7)
    grave = filtro(n, 40, 420) * 1.5; medio = filtro(n, 400, 3200) * 0.8 * (0.4 + 0.6 * np.minimum(t / 0.5, 1))
    tono, _ = barrido(60, 190, dur, 0.5)
    return bordes((grave + medio + 0.7 * tono) * env, 0.004, 0.2)
def fx_magia():
    return junta([(campana(midi(84 + 2 * k + (k // 3)), 0.5, d=(0.2, 0.1, 0.07, 0.04)), 0.036 * k, 0.9 - 0.04 * k) for k in range(9)], 1.0)
def fx_confeti():
    t = tt(0.22); p = bordes(filtro(ruido(len(t)), 700, 9000) * np.exp(-t / 0.04), 0.0005, 0.02)
    partes = [(p, 0, 1.3)] + [(campana(midi(int(rng.choice([88, 91, 93, 96, 98, 100]))), 0.45, d=(0.18, 0.1, 0.06, 0.04)), 0.05 + 0.07 * k + 0.03 * rng.random(), 0.5) for k in range(7)]
    return junta(partes, 1.1)
def fx_error():
    a = filtro(cuadrada(311, 0.3, 6), None, 2400); b = filtro(cuadrada(233, 0.3, 6), None, 2400); t = tt(0.3)
    return bordes((a + b) * np.exp(-t / 0.16), 0.004, 0.04)
def fx_sirena():
    partes = []
    for k in range(4):
        f = 880 if k % 2 == 0 else 660; x = bordes(filtro(cuadrada(f, 0.2, 5), None, 3000), 0.01, 0.02); partes.append((x, 0.2 * k, 1))
    return junta(partes, 0.85)
def fx_aspira(dur=1.3):
    t = tt(dur); n = ruido(len(t)); env = np.minimum(t / 0.15, 1) * np.minimum((dur - t) / 0.25, 1)
    return (filtro(n, 500, 5200) * 0.9 + 0.35 * filtro(sierra(150, dur, 8), None, 900)) * env
def fx_escaner(dur=0.9):
    t = tt(dur); f = 700 + 700 * np.sin(np.pi * t / dur); x = np.sin(2 * np.pi * np.cumsum(f) / SR) * (0.6 + 0.4 * np.sin(2 * np.pi * 22 * t))
    return bordes(x * np.sin(np.pi * t / dur) ** 0.5, 0.02, 0.05)
def fx_moneda():
    a = bordes(filtro(cuadrada(988, 0.09, 4), None, 5000), 0.002, 0.01); t = tt(0.5); b = filtro(cuadrada(1319, 0.5, 4), None, 5000) * np.exp(-t / 0.16)
    return junta([(a, 0, 0.8), (bordes(b, 0.002, 0.03), 0.085, 0.9)], 0.62)
def fx_desinfla():
    partes = []; t0 = 0
    for k, (m, d) in enumerate(((58, 0.26), (57, 0.26), (56, 0.26), (55, 0.75))):
        t = tt(d); f = midi(m) * (1 + 0.012 * np.sin(2 * np.pi * 6 * t) * (k == 3)) * (1 - 0.04 * (t / d) * (k == 3))
        fase = np.cumsum(f) / SR; x = sum(np.sin(2 * np.pi * h * fase) / h for h in range(1, 9))
        partes.append((bordes(filtro(x, None, 1500) * (1 - np.exp(-t / 0.02)), 0.01, 0.05), t0, 1)); t0 += d
    return junta(partes, t0 + 0.05)
def fx_latido():
    def pum(f): t = tt(0.16); return bordes(np.sin(2 * np.pi * f * t) * np.exp(-t / 0.05), 0.002, 0.03)
    return junta([(pum(62), 0, 1), (pum(52), 0.17, 0.8)], 0.4)
def fx_tecla():
    t = tt(0.04); return bordes(filtro(ruido(len(t)), 1500, 7000) * np.exp(-t / 0.006) + 0.4 * np.sin(2 * np.pi * 2600 * t) * np.exp(-t / 0.004), 0.0005, 0.008)
def fx_burbuja():
    x, t = barrido(380, 1300, 0.07, 1.0); return bordes(x * np.exp(-t / 0.05), 0.002, 0.01)
def fx_fanfarria():
    def acorde(notas, d): return sum(metal(midi(m), d) for m in notas)
    return junta([(acorde((67, 71, 74), 0.16), 0, 0.5), (acorde((67, 71, 74), 0.16), 0.17, 0.5), (acorde((72, 76, 79, 84), 0.9), 0.34, 0.5)], 1.3)
def fx_ronquido():
    t = tt(0.8); f = 62 + 40 * np.sin(np.pi * t / 0.8); x = filtro(sierra(1, 0.8, 2) * 0, None, 400)
    s = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.5 + filtro(ruido(len(t)), 100, 700) * 0.8
    return bordes(filtro(s, None, 600) * np.sin(np.pi * t / 0.8) ** 1.5, 0.03, 0.08)
def fx_chispa():
    t = tt(0.25); x = filtro(ruido(len(t)), 2500) * (np.sin(2 * np.pi * 55 * t) > 0.2) * np.exp(-t / 0.12); return bordes(x, 0.001, 0.03)
def fx_trueno():
    t = tt(1.2); return bordes(filtro(ruido(len(t)), 30, 500) * np.exp(-t / 0.4) * 2.2 + 0.6 * filtro(ruido(len(t)), 500, 4000) * np.exp(-t / 0.05), 0.002, 0.2)
def fx_rebobina():
    t = tt(0.7); f = 400 + 2200 * (t / 0.7); x = np.sin(2 * np.pi * np.cumsum(f) / SR) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 26 * t)))
    return bordes(0.6 * x + 0.5 * filtro(ruido(len(t)), 3000) * (0.5 + 0.5 * np.sin(2 * np.pi * 26 * t)), 0.01, 0.04)
def fx_timbre():
    return junta([(campana(midi(88), 0.9, d=(0.4, 0.2, 0.12, 0.08)), 0, 1), (campana(midi(84), 1.1, d=(0.5, 0.25, 0.15, 0.1)), 0.28, 1)], 1.5)
def fx_bip():
    t = tt(0.11); return bordes(np.sin(2 * np.pi * 1760 * t) + 0.3 * np.sin(2 * np.pi * 3520 * t), 0.003, 0.02)
def fx_fiu():
    x, t = barrido(700, 2100, 0.16, 1.0); y, t2 = barrido(2100, 500, 0.3, 0.7)
    return junta([(bordes(x, 0.01, 0.02), 0, 0.8), (bordes(y * (1 - t2 / 0.3), 0.01, 0.03), 0.2, 0.8)], 0.55)
def fx_lluvia(dur=4.3):
    t = tt(dur); n = filtro(ruido(len(t)), 1400, 9000); lento = filtro(ruido(len(t)), None, 3) ; lento = lento / (np.max(np.abs(lento)) + 1e-9)
    env = np.minimum(t / 0.3, 1) * np.minimum((dur - t) / 0.5, 1)
    return n * (0.75 + 0.25 * lento) * env
# nombre: (funcion, ganancia base)
FX = {"golpe": (fx_golpe, 0.5), "pop": (fx_pop, 0.32), "clic": (fx_clic, 0.24), "bien": (fx_bien, 0.2), "campana": (fx_campana, 0.3),
      "caja": (fx_caja, 0.24), "barrido": (fx_barrido, 0.16), "raya": (fx_raya, 0.24), "alarma": (fx_alarma, 0.4), "soplo": (fx_soplo, 0.26),
      "boing": (fx_boing, 0.3), "paso": (fx_paso, 0.3), "habla": (fx_habla, 0.2), "tic": (fx_tic, 0.36), "toc": (fx_toc, 0.36), "zip": (fx_zip, 0.2),
      "cae": (fx_cae, 0.2), "sube": (fx_sube, 0.2), "cohete": (fx_cohete, 0.3), "magia": (fx_magia, 0.16), "confeti": (fx_confeti, 0.28),
      "error": (fx_error, 0.3), "sirena": (fx_sirena, 0.2), "aspira": (fx_aspira, 0.26), "escaner": (fx_escaner, 0.14), "moneda": (fx_moneda, 0.2),
      "desinfla": (fx_desinfla, 0.24), "latido": (fx_latido, 0.6), "tecla": (fx_tecla, 0.3), "burbuja": (fx_burbuja, 0.26), "fanfarria": (fx_fanfarria, 0.3),
      "ronquido": (fx_ronquido, 0.3), "chispa": (fx_chispa, 0.22), "trueno": (fx_trueno, 0.4), "rebobina": (fx_rebobina, 0.2), "timbre": (fx_timbre, 0.26),
      "bip": (fx_bip, 0.16), "fiu": (fx_fiu, 0.2), "lluvia": (fx_lluvia, 0.1)}

PROGS = [
    [(48, (60, 64, 67, 72)), (43, (59, 62, 67, 71)), (45, (57, 60, 64, 69)), (41, (57, 60, 65, 69))],   # Do, Sol, La menor, Fa
    [(45, (57, 60, 64, 69)), (41, (57, 60, 65, 69)), (48, (60, 64, 67, 72)), (43, (59, 62, 67, 71))],   # La menor, Fa, Do, Sol
    [(41, (57, 60, 65, 69)), (43, (59, 62, 67, 71)), (40, (59, 64, 67, 71)), (45, (57, 60, 64, 69))],   # Fa, Sol, Mi menor, La menor
    [(48, (60, 64, 67, 72)), (45, (57, 60, 64, 69)), (41, (57, 60, 65, 69)), (43, (59, 62, 67, 71))],   # Do, La menor, Fa, Sol
]
TENSION = [(45, (57, 60, 64)), (41, (53, 57, 60)), (38, (50, 53, 57)), (40, (52, 56, 59))]              # La menor, Fa, Re menor, Mi

def poner(buf, x, t0, g=1.0):
    i = int(round(t0 * SR))
    if i >= len(buf): return
    if i < 0: x = x[-i:]; i = 0
    n = min(len(x), len(buf) - i); buf[i:i + n] += g * x[:n]

def componer(dur, cortes, sonidos, mus):
    n = int(dur * SR)
    ritmo, grave, armonia, efectos = (np.zeros(n) for _ in range(4))
    total = int(np.ceil(dur / 2 - 1e-6))
    compases = list(mus.get("compases") or [])
    if not compases: compases = ["intro"] + ["alegre"] * max(0, total - 2) + ["final"]
    while len(compases) < total: compases.append(compases[-1])
    prog = PROGS[mus.get("prog", 0) % len(PROGS)]; tono = mus.get("tono", 0)
    K, P, H, H2, RD = bombo(), palmada(), platillo(), platillo(0.045, 0.16), redoble()
    bombeo = np.ones(n); tg = np.arange(n) / SR
    k_ac = 0; k_tn = 0
    for c, tipo in enumerate(compases[:total]):
        t0 = 2.0 * c
        if tipo == "silencio": continue
        if tipo == "tension":
            raiz, notas = TENSION[k_tn % 4]; k_tn += 1; raiz += tono; notas = tuple(m + tono for m in notas)
            for k in range(8): poner(grave, bajo(midi(raiz), 0.2), t0 + 0.25 * k, 0.2 if k % 2 == 0 else 0.12)
            for k in range(8): poner(ritmo, H, t0 + 0.25 * k, 0.16 if k % 2 else 0.08)
            poner(ritmo, K, t0, 0.5); poner(ritmo, K, t0 + 0.75, 0.3); poner(ritmo, K, t0 + 1.0, 0.45)
            for m in notas: poner(armonia, metal(midi(m), 1.7), t0, 0.07)
            poner(armonia, punteo(midi(notas[0] + 13), 0.6, 1.2), t0 + 1.5, 0.1); poner(armonia, punteo(midi(notas[0] + 12), 0.6, 1.2), t0 + 1.75, 0.1)
            continue
        raiz, notas = prog[k_ac % 4]; k_ac += 1; raiz += tono; notas = tuple(m + tono for m in notas)
        if tipo == "intro":                          # arpegio que va creciendo
            for k in range(8): poner(armonia, punteo(midi(notas[k % 4] + (12 if k >= 4 else 0)), 0.7, 1.5), t0 + 0.25 * k, 0.16 + 0.03 * k)
            t = tt(2.0); poner(ritmo, filtro(ruido(len(t)), 2500) * (t / 2.0) ** 2.5, t0, 0.13)
        elif tipo == "lento":                        # paso de tortuga: tuba y madera
            poner(grave, tuba(midi(raiz), 0.8), t0, 0.34); poner(grave, tuba(midi(raiz + 7), 0.8), t0 + 1.0, 0.3)
            poner(ritmo, madera(900, 0.03), t0 + 0.5, 0.3); poner(ritmo, madera(1200, 0.03), t0 + 1.5, 0.3)
            for m in notas[:3]: poner(armonia, punteo(midi(m), 0.5, 1.0), t0 + 0.5, 0.1); poner(armonia, punteo(midi(m), 0.5, 1.0), t0 + 1.5, 0.1)
        elif tipo == "suave":                        # acordes y platillos, sin palmada
            poner(ritmo, K, t0, 0.42); poner(ritmo, K, t0 + 1.0, 0.42)
            for k in range(8): poner(ritmo, H, t0 + 0.25 * k + 0.125, 0.12)
            for k in range(4): poner(grave, bajo(midi(raiz), 0.3), t0 + 0.5 * k, 0.13)
            for pos in (0, 1.5, 2.5):
                for m in notas: poner(armonia, punteo(midi(m), 0.9, 1.4), t0 + 0.5 * pos, 0.17)
            for k in range(4): poner(armonia, punteo(midi(notas[(k * 3) % 4] + 12), 0.5, 1.6), t0 + 0.5 * k + 0.25, 0.1)
        elif tipo == "subida":                       # redoble que acelera antes del golpe
            for b in range(4): poner(ritmo, K, t0 + 0.5 * b, 0.55)
            tiempos = [0.25 * k for k in range(4)] + [1.0 + 0.125 * k for k in range(4)] + [1.5 + 0.0625 * k for k in range(8)]
            for i, q in enumerate(tiempos): poner(ritmo, RD, t0 + q, 0.2 + 0.4 * i / len(tiempos))
            t = tt(2.0); poner(ritmo, filtro(ruido(len(t)), 1800) * (t / 2.0) ** 2, t0, 0.2)
            x, t2 = barrido(midi(raiz + 12), midi(raiz + 36), 2.0, 1.4); poner(armonia, x * (t2 / 2.0) ** 1.5, t0, 0.12)
            for k in range(8): poner(grave, bajo(midi(raiz)), t0 + 0.25 * k, 0.15)
        elif tipo == "final":                        # acorde que queda sonando
            for m in notas: poner(armonia, punteo(midi(m), 1.9, 1.5), t0, 0.3)
            poner(armonia, punteo(midi(notas[0] + 12), 1.9), t0, 0.14)
            poner(ritmo, K, t0, 0.62); poner(grave, bajo(midi(raiz), 1.2), t0, 0.16); poner(ritmo, platillo(0.5, 1.6), t0, 0.16)
        else:                                        # alegre: ritmo completo
            for b in range(4):
                poner(ritmo, K, t0 + 0.5 * b, 0.62)
                if b in (1, 3): poner(ritmo, P, t0 + 0.5 * b, 0.6)
                poner(ritmo, H2 if b == 3 else H, t0 + 0.5 * b + 0.25, 0.3)
                poner(ritmo, H, t0 + 0.5 * b + 0.125, 0.1); poner(ritmo, H, t0 + 0.5 * b + 0.375, 0.1)
            for k in range(8): poner(grave, bajo(midi(raiz + (12 if k % 2 else 0))), t0 + 0.25 * k, 0.16)
            for pos in (0, 0.75, 1.5, 2.5, 3.25):
                for m in notas: poner(armonia, punteo(midi(m), 0.8, 1.5), t0 + 0.5 * pos, 0.2)
            for k in range(8):
                poner(armonia, punteo(midi(notas[(k * 3) % 4] + 12), 0.5, 1.6), t0 + 0.25 * k, 0.13)
                if k % 2 == 0: poner(armonia, punteo(midi(notas[(k + 1) % 4] + 24), 0.4, 1.6), t0 + 0.25 * k, 0.07)
            if c > 0 and compases[c - 1] != "alegre": poner(ritmo, platillo(0.55, 1.6), t0, 0.2)
            activo = (tg >= t0) & (tg < t0 + 2.0)
            bombeo = np.where(activo, 1 - 0.55 * np.exp(-((tg - t0) % 0.5) / 0.11), bombeo)
    grave *= bombeo; armonia *= bombeo
    for c in cortes: poner(efectos, fx_soplo(), c - 0.24, 0.22)
    faltan = set()
    for nombre, t0, g in sonidos:
        if nombre not in FX: faltan.add(nombre); continue
        f, g0 = FX[nombre]; poner(efectos, f(), t0, g0 * g)
    if faltan: print("  SONIDOS SIN DEFINIR:", sorted(faltan))
    tr = tt(0.9); ri = filtro(ruido(len(tr)) * np.exp(-tr / 0.2), 350, 6000); ri /= np.sqrt(np.sum(ri ** 2))
    def reverb(x):
        m = len(x) + len(ri) - 1; return np.fft.irfft(np.fft.rfft(x, m) * np.fft.rfft(ri, m), m)[:len(x)]
    humedo = reverb(armonia + 0.5 * efectos)
    retardo = int(0.011 * SR); arm_d = np.concatenate([np.zeros(retardo), armonia[:-retardo]])
    centro = 0.85 * ritmo + grave + 1.25 * efectos
    izq = centro + 0.95 * armonia + 0.16 * humedo
    der = centro + 0.95 * arm_d + 0.16 * np.roll(humedo, 173)
    st = np.stack([izq, der], axis=1)
    st = np.tanh(1.15 * st / np.max(np.abs(st))) / np.tanh(1.15) * 0.9
    fin = int(0.25 * SR); st[-fin:] *= np.linspace(1, 0, fin)[:, None]
    return st

if __name__ == "__main__":
    g = json.load(open(sys.argv[1])); salida = sys.argv[2]
    st = componer(g["dur"], g.get("cortes", []), g.get("sonidos", []), g.get("musica") or {})
    with wave.open(salida, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype("<i2").tobytes())
    rms = np.sqrt(np.mean(st ** 2))
    print(f"{salida}: {len(st) / SR:.1f} s, pico {np.max(np.abs(st)):.2f}, RMS {20 * np.log10(rms):.1f} dB, sonidos {len(g.get('sonidos', []))}, NaN: {bool(np.isnan(st).any())}")
