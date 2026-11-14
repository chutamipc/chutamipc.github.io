#!/bin/bash
# Renderiza varios videos completos, tres a la vez. Uso: ./lote.sh nombre1 nombre2 ...
cd "$(dirname "$0")"
printf '%s\n' "$@" | xargs -P 3 -I{} sh -c './hacer.sh {} todo > log-{}.txt 2>&1; tail -1 log-{}.txt'
echo "LOTE TERMINADO"
