#!/bin/zsh
# Run the in-page tests in headless Chrome.
# Usage: src/test.sh [basic|sim|odds|rival|all] [main|ib] [accuracy]
#   e.g. src/test.sh basic ib      src/test.sh sim main 0.75
# Prints the JSON results. Exits 1 if any test fails. Leaves nothing behind.
set -e
HERE=${0:A:h}
PART=${1:-basic}; WHICH=${2:-main}; ACC=${3:-0.72}
CHROME=${CHROME:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
python3 "$HERE/build.py" --no-cdn "$TMP/pages" >/dev/null
PAGE="$TMP/pages/index.html"; [[ $WHICH == ib ]] && PAGE="$TMP/pages/ib/index.html"
"$CHROME" --headless=new --disable-gpu --user-data-dir="$TMP/chrome" --virtual-time-budget=20000 \
  --dump-dom "file://$PAGE?test=$PART&acc=$ACC" > "$TMP/dom.txt" 2>/dev/null &
pid=$!; for i in {1..300}; do kill -0 $pid 2>/dev/null || break; sleep 1; done; kill $pid 2>/dev/null || true
python3 - "$TMP/dom.txt" <<'PY'
import html, json, re, sys
d = open(sys.argv[1]).read()
m = re.search(r'<pre id="testout">(.*?)</pre>', d, re.S)
if not m: print(d[-2000:]); sys.exit(1)
out = html.unescape(m.group(1)); print(out)
sys.exit(1 if json.loads(out).get("fail") else 0)
PY
