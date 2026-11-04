# Study Quest — source

`index.html` and `ib/index.html` at the repo root are **built files**. Edit the files in `src/`, then rebuild.

| File | What it holds |
|---|---|
| `template.html` | The game: rules (`reduce`), netcode (PeerJS host/client), UI, tests, bots, the Compensation and Practice packs |
| `ihrm.js` | The MGMT 660 Exam 3 (Ch 8–10) pack: questions, short answers, Employer 1-1 sessions, chest generators, theme. Add topics the study guide drops to `IHRM_OFF_TOPICS` |
| `compemon-css.css`, `compemon-data.js`, `compemon-art.js` | Shared parts from the Compémon game: base styles, the Ch 7–11 question bank and calculators, scribble-art parts |
| `ceo.b64` | The CEO boss drawing (base64 PNG) |
| `build.py` | Fills the `/*@@...@@*/` placeholders in the template and writes both pages |

## Commands (macOS, zsh, Python 3, Google Chrome)

```sh
python3 src/build.py                     # rebuild index.html and ib/index.html
zsh src/test.sh basic ib                 # in-page tests: basic | sim | odds | rival | all ; main | ib ; [accuracy]
zsh src/test.sh sim main 0.75            # balance simulation at 75% accuracy
zsh src/shot.sh "?demo=30&stop=map&force=tutor" out.png 430 1400 ib   # screenshot a state
zsh src/deploy.sh "message"              # build, test both pages, commit, push (live in ~1 minute)
```

Set `CHROME=/path/to/chrome` if Chrome is not in `/Applications`.
The test and screenshot scripts work in a temporary folder and delete it when they finish.
