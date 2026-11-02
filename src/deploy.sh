#!/bin/zsh
# Rebuild, run the basic tests on both pages, then commit and push. GitHub Pages serves the result
# at https://computergenx.github.io/study-quest/ (and /ib/) about a minute later.
# Usage: src/deploy.sh ["commit message"] [--copy-to DIR]
set -e
HERE=${0:A:h}; ROOT=${HERE:h}
MSG=${1:-"Study Quest update"}; shift 2>/dev/null || true
python3 "$HERE/build.py" "$@"
zsh "$HERE/test.sh" basic main >/dev/null && zsh "$HERE/test.sh" basic ib >/dev/null && echo "tests pass"
cd "$ROOT"
git add -A
git diff --cached --quiet && { echo "nothing to deploy"; exit 0; }
git commit -q -m "$MSG"
git push -q && echo "pushed — live in about a minute"
