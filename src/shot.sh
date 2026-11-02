#!/bin/zsh
# Screenshot a game state in headless Chrome.
# Usage: src/shot.sh "<query>" out.png [width] [height] [main|ib]
#   e.g. src/shot.sh "?demo=30&stop=map&force=tutor" tutor.png 430 1400 ib
# Query hooks: demo=N (bot steps), stop=map|reveal, force=shop|essay|work|tutor|chest|boss,
#              fill=essay|work|tutor, gear=1, calcq=1 (math chest question), press=keys (calculator taps).
set -e
HERE=${0:A:h}
CHROME=${CHROME:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
python3 "$HERE/build.py" --no-cdn "$TMP/pages" >/dev/null
PAGE="$TMP/pages/index.html"; [[ ${5:-main} == ib ]] && PAGE="$TMP/pages/ib/index.html"
OUT=${2:A}
"$CHROME" --headless=new --disable-gpu --user-data-dir="$TMP/chrome" --hide-scrollbars --window-size=${3:-1100},${4:-1300} \
  --virtual-time-budget=2500 --screenshot="$OUT" "file://$PAGE$1" >/dev/null 2>&1
echo "saved $OUT"
