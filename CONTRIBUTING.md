# Contributing a pack

A pack is a **theme**, a **skill**, or an **mcp** connector. If your idea is not
one of those three, it is not a pack: open an issue on
[`fella-ai`](https://github.com/Avijit-Kumar-GIT/fella-ai) instead. New file
formats and new built-in tools are app changes, not packs.

## Build the pack

A pack is a directory:

```
my-pack/
  fella-pack.json      the manifest (schema: fella-pack.schema.json)
  README.md            what it does, how to use it — rendered on the browse site
  LICENSE              the pack's licence text
  <payload>            one file, named in the manifest
```

`README.md` and `LICENSE` are required. The README is shown verbatim on the
packs page (as sanitised HTML — no raw HTML, no scripts).

`fella-pack.json`:

```json
{
  "schema": 1,
  "id": "my-pack",
  "kind": "skill",
  "name": "My Pack",
  "version": "1.0.0",
  "description": "One sentence.",
  "author": "your-handle",
  "homepage": "https://github.com/your-handle/my-pack",
  "license": "MIT",
  "payload": "skill.md"
}
```

Test it in Fella with `/packs add /path/to/my-pack`, then `/packs enable my-pack`.

## Per-kind rules

### theme
- `payload` is a `.json` object mapping the app's CSS custom properties, e.g.
  `{ "--bg": "#2e3440", "--text": "#eceff4", ... }`. Colour tokens are:
  `--bg --bg-raised --bg-inset --border --border-strong --text --text-dim
  --text-faint --accent --link --ok --warn --err`. You may also set the scalars
  `--radius --pad`. Unknown keys are ignored.
- Define **all** colour tokens. Partial themes look broken.
- Text must stay readable: aim for WCAG AA contrast of `--text` on `--bg` and of
  `--text-dim` on `--bg-inset`.
- Optional top-level `"appearance": "light" | "dark"` so Fella can hint the OS.

### skill
- `payload` is a `.md` file, **16 KB max**.
- Instructions and vocabulary only: what a column means, how the user's files
  are organised, terms to expand, caveats to always state. It may suggest
  questions.
- It must not tell the model to state figures it did not compute. Fella's
  verification pass will reject fabricated numbers regardless, but don't try.
- English. Plain language.

### mcp
- `payload` is a `connector.json`. **Streamable HTTP only** (a remote server,
  no local subprocess):
  ```json
  {
    "transport": "http",
    "url": "https://mcp.example.com/mcp",
    "auth": { "type": "bearer", "secret": "EXAMPLE_TOKEN" },
    "setup": "Where to get the token and what access it grants."
  }
  ```
  `auth` is one of `{"type":"none"}`, `{"type":"bearer","secret":"<VAR>"}`, or
  `{"type":"header","header":"X-Api-Key","secret":"<VAR>"}`. The user pastes the
  token with `/connect <id>`; it is stored in `auth.json`, never in the pack.
- The server must already exist and be reputable (an official one from the data
  source, ideally). This repo does not host server code.
- Fella offers a tool the server marks `readOnlyHint: true` normally, flags one
  with no annotation, and **withholds** one marked `readOnlyHint: false` or
  `destructiveHint: true`. Say in the PR which tools the server exposes and
  their annotations.

## Submit

Add your pack as a folder under `packs/<id>/` (the id must match the folder
name) and open a PR. `catalog.json` is **generated** — you don't hand-edit it.

1. `git switch -c add-my-pack`, then create `packs/my-pack/` with the four files
   above.
2. Regenerate the catalog and commit it:
   ```
   node scripts/build-catalog.mjs
   git add packs/my-pack catalog.json
   ```
   The script computes every `sha256` and byte size, reads the first-commit and
   last-touched dates from git, and renders `README.md` to HTML. CI re-runs it
   with `--check` and fails if the committed `catalog.json` isn't a fresh build.
3. Open the PR. A maintainer reviews the pack contents; the hashes in
   `catalog.json` lock them, so a later change to the pack is another PR.

All packs currently live in this repo under `packs/`, so their file URLs track
`main` — content is still sha256-locked and a maintainer owns `main`. If we ever
list a pack hosted in someone else's repo, its URLs must pin to a **commit SHA**
(an outside repo can force-push); open an issue first.

## Conduct

Be decent, and assume good faith. Harassment or personal attacks get you removed
from the project.
