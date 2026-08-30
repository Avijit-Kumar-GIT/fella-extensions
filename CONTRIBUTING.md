# Contributing a pack

A pack is a **theme**, a **skill**, or an **mcp** connector. If your idea is not
one of those three, it is not a pack: open an issue on
[`woody-ai`](https://github.com/Avijit-Kumar-GIT/woody-ai) instead. New file
formats and new built-in tools are app changes, not packs.

## Build the pack

A pack is a directory:

```
my-pack/
  woody-pack.json      the manifest (schema: woody-pack.schema.json)
  <payload>            one file, named in the manifest
```

`woody-pack.json`:

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

Test it in Woody with `/packs add /path/to/my-pack`, then `/packs enable my-pack`.

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
- Optional top-level `"appearance": "light" | "dark"` so Woody can hint the OS.

### skill
- `payload` is a `.md` file, **16 KB max**.
- Instructions and vocabulary only: what a column means, how the user's files
  are organised, terms to expand, caveats to always state. It may suggest
  questions.
- It must not tell the model to state figures it did not compute. Woody's
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
- Woody offers a tool the server marks `readOnlyHint: true` normally, flags one
  with no annotation, and **withholds** one marked `readOnlyHint: false` or
  `destructiveHint: true`. Say in the PR which tools the server exposes and
  their annotations.

## Submit

1. Host the pack (its own repo is fine; a folder under `packs/` in a PR here is
   also fine for small ones).
2. Open a PR adding an entry to [`catalog.json`](catalog.json):
   ```json
   {
     "id": "my-pack",
     "kind": "skill",
     "name": "My Pack",
     "version": "1.0.0",
     "description": "One sentence.",
     "author": "your-handle",
     "source": "https://github.com/your-handle/my-pack",
     "files": [
       { "path": "woody-pack.json", "url": "https://raw.githubusercontent.com/your-handle/my-pack/<commit-sha>/woody-pack.json", "sha256": "..." },
       { "path": "skill.md",        "url": "https://raw.githubusercontent.com/your-handle/my-pack/<commit-sha>/skill.md",        "sha256": "..." }
     ]
   }
   ```
   URLs **must** be pinned to a commit SHA, not a branch. Every file needs its
   `sha256` (`sha256sum <file>`).
3. A maintainer reviews the content at that commit. The hashes lock it: a later
   change to the pack needs a new PR.

## Code of conduct

This repo follows the same
[Code of Conduct](https://github.com/Avijit-Kumar-GIT/woody-ai/blob/main/CODE_OF_CONDUCT.md)
as the main project.
