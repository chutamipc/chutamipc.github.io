# Arma el HTML de un video a partir de su guion (archivo .js con el cuerpo y el guion).
# Uso: python3 pagina.py guiones/<nombre>.js  -> html/<nombre>.html
# El .js tiene tres bloques separados por lineas "//== css", "//== html", "//== guion".
import sys, os, re
src = sys.argv[1]
nombre = os.path.splitext(os.path.basename(src))[0]
t = open(src, encoding="utf-8").read()
partes = dict(re.findall(r"//== (\w+)\n(.*?)(?=\n//== |\Z)", t, re.S))
voz_js = "const VOZ = null;"
if "voz" in partes:
    import subprocess, json
    aqui = os.path.dirname(os.path.abspath(__file__))
    r = subprocess.run([sys.executable, os.path.join(aqui, "voz.py"), src], env=dict(os.environ, PYTHONPATH=os.path.join(aqui, "..", "voz", "lib")), capture_output=True, text=True)
    if r.returncode: sys.exit("voz.py fallo:\n" + r.stdout + r.stderr)
    v = json.load(open(f"html/{nombre}-voz.json")); v.pop("huella", None)
    voz_js = "const VOZ = " + json.dumps(v, ensure_ascii=False) + "; window.__voz = { wav: VOZ.wav, frases: VOZ.frases.map(f => [f.t0, f.t1]) };"
libs = ["gsap.min.js", "MotionPathPlugin.min.js", "CustomEase.min.js", "CustomWiggle.min.js", "CustomBounce.min.js", "EasePack.min.js", "DrawSVGPlugin.min.js"]
doc = f'''<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>{nombre}</title>
<link rel="stylesheet" href="../fuentes/fuentes.css"><link rel="stylesheet" href="../base.css"><link rel="stylesheet" href="../extra.css">
<style>{partes.get("css", "")}</style></head>
<body><div id="esc"><div id="cam"><div id="zoom">
{partes.get("html", "")}
</div></div></div>
{"".join(f'<script src="../lib/{l}"></script>' for l in libs)}
<script src="../motor.js"></script><script src="../motor2.js"></script><script src="../motor3.js"></script><script src="../motor4.js"></script>
<script>
{voz_js}
function guion() {{
{partes.get("guion", "")}
}}
const FU = ['800 20px "Baloo 2"', '700 20px "Baloo 2"', '600 20px "Baloo 2"', '400 20px Poppins', '500 20px Poppins', '600 20px Poppins', '700 20px Poppins', '800 20px Poppins', 'italic 600 20px Poppins'];
Promise.all(FU.map(f => document.fonts.load(f))).then(() => Promise.all([...document.images].map(i => i.decode().catch(() => 0)))).then(() => {{ guion(); TL.time(0); window.__listo = true; }});
</script></body></html>'''
os.makedirs("html", exist_ok=True)
open(f"html/{nombre}.html", "w", encoding="utf-8").write(doc)
print("html/" + nombre + ".html")
