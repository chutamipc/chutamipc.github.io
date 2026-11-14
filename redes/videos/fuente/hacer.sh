#!/bin/bash
# Uso: ./hacer.sh <nombre> muestras [paso_s]   -> hoja de contacto en hojas/<nombre>.png
#      ./hacer.sh <nombre> todo                -> video final con audio en listo/<nombre>.mp4
set -e
cd "$(dirname "$0")"
S=$(cd .. && pwd)
n=$1; modo=${2:-muestras}
python3 pagina.py guiones/$n.js > /dev/null
if [ "$modo" = muestras ]; then
  d=muestras/$n-$(date +%H%M%S); mkdir -p $d
  node grabar2.js html/$n.html - $d muestras ${3:-0.5}
  python3 $S/videos/hoja.py $d $n hojas/$n.png
else
  node grabar2.js html/$n.html final/$n.mp4 muestras todo
  PYTHONPATH=$S/pylibs python3 audio2.py html/$n.json audio/$n.wav
  I=$(ffmpeg -hide_banner -i audio/$n.wav -af loudnorm=print_format=json -f null - 2>&1 | grep '"input_i"' | sed 's/[^0-9.-]//g')
  G=$(python3 -c "print(round(-14.5 - ($I), 2))")
  ffmpeg -y -loglevel error -i final/$n.mp4 -i audio/$n.wav -map 0:v -map 1:a -c:v copy -af "volume=${G}dB,alimiter=limit=0.84:level=false:attack=3:release=60" -c:a aac -b:a 192k -ar 44100 -shortest -movflags +faststart listo/$n.mp4
  echo "LISTO listo/$n.mp4 (sonoridad de entrada $I LUFS, ganancia $G dB) $(du -h listo/$n.mp4 | cut -f1)"
fi
