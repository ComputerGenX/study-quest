#!/usr/bin/env python3
"""Build Study Quest from the files in this folder.

Writes the two published pages at the repo root:
  index.html     Study Quest (default pack: MGMT 660 Exam 3, Ch 8-10)
  ib/index.html  International Business Quest (same game, own title, link, and save key)

Usage:  python3 src/build.py [--copy-to DIR] [--no-cdn DIR]
  --copy-to DIR  also copy both pages into DIR (keeps the same index.html + ib/index.html layout)
  --no-cdn DIR   also write test copies without the PeerJS <script> tag (headless tests run offline)
"""
import argparse, pathlib, shutil

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent
read = lambda name: (HERE / name).read_text()
part = lambda name: read(name)[:-1]  # each part file ends with one extra newline
PEERJS = '<script src="https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.5/peerjs.min.js"></script>'

def build():
    t = read("template.html")
    t = t.replace("/*@@CSS@@*/", part("compemon-css.css"))
    t = t.replace("/*@@DATA@@*/", part("compemon-data.js"))
    t = t.replace("/*@@ART@@*/", part("compemon-art.js"))
    t = t.replace("/*@@IHRM@@*/", read("ihrm.js"))
    t = t.replace("/*@@CEO@@*/", "data:image/png;base64," + read("ceo.b64").strip())
    assert "@@" not in t, "a /*@@...@@*/ placeholder was not filled"
    reps = [
        ('<title>Study Quest</title>', '<title>International Business Quest</title>'),
        ('content="Study Quest — try not to get fired"', 'content="International Business Quest — don\'t get sent home early"'),
        ('content="https://computergenx.github.io/study-quest/"', 'content="https://computergenx.github.io/study-quest/ib/"'),
        ('href="https://computergenx.github.io/study-quest/" style="color:#111">computergenx.github.io/study-quest<', 'href="https://computergenx.github.io/study-quest/ib/" style="color:#111">computergenx.github.io/study-quest/ib<'),
        ('const SITE_URL = "https://computergenx.github.io/study-quest/";', 'const SITE_URL = "https://computergenx.github.io/study-quest/ib/";'),
        ('const KEY = "studyquest.v1."', 'const KEY = "ibquest.v1."'),
        ('font-weight:bold;letter-spacing:1px">STUDY QUEST<', 'font-weight:bold;letter-spacing:1px">INTERNATIONAL BUSINESS QUEST<'),
    ]
    u = t
    for a, b in reps:
        assert u.count(a) == 1, "IB swap not found exactly once: " + a
        u = u.replace(a, b)
    return {"index.html": t, "ib/index.html": u}

def write(pages, base):
    for rel, text in pages.items():
        p = pathlib.Path(base) / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(text)

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--copy-to"); ap.add_argument("--no-cdn")
    a = ap.parse_args()
    pages = build()
    write(pages, ROOT)
    print("built", ROOT / "index.html", "and", ROOT / "ib/index.html")
    if a.copy_to: write(pages, a.copy_to); print("copied to", a.copy_to)
    if a.no_cdn:
        assert all(v.count(PEERJS) == 1 for v in pages.values())
        write({k: v.replace(PEERJS, "") for k, v in pages.items()}, a.no_cdn); print("test copies in", a.no_cdn)
