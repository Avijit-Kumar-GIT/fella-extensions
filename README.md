# fella-extensions

The pack marketplace for [Fella](https://github.com/Avijit-Kumar-GIT/fella-ai).

A **pack** is one of exactly three things:

| Kind | What it is |
|------|------------|
| `theme` | a colour scheme (`theme.json`, a map of the app's CSS tokens) |
| `skill` | vocabulary and rules fed to the model (`skill.md`, Markdown) |
| `mcp` | a connector to a data source outside your folder, via an MCP server (`connector.json`) |

Packs carry **no application code**. Anything that needs app code, a new file
format, or a new built-in tool goes to the
[`fella-ai`](https://github.com/Avijit-Kumar-GIT/fella-ai) repo instead. See
that repo's `docs/EXTENSIBILITY.md`.

## Using a pack

In Fella:

```
/packs browse            # opens the marketplace website to find a pack's id
/packs install <id>      # install by id (downloaded files are hash-checked)
/packs                   # what you have installed
/packs enable <id>       # skills and connectors are off until enabled
/packs remove <id>
```

The app does not render the catalog itself browsing happens on the website,
which reads this repo's `catalog.json`. You can also `/packs add <path>` a local
pack directory you're developing; Fella marks anything not installed from the
marketplace as **unverified**.

## Contributing a pack

See [`CONTRIBUTING.md`](CONTRIBUTING.md). In short: build the pack as a
directory with a `fella-pack.json` manifest, test it locally with
`/packs add`, then open a PR adding an entry to [`catalog.json`](catalog.json).

## Layout

```
catalog.json              the index Fella reads
fella-pack.schema.json    JSON Schema for fella-pack.json
packs/<id>/               example / core-maintained packs
```
