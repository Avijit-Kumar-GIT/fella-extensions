<!-- A pack is a theme, a skill, or an mcp connector. Nothing else. -->

## Pack

- **id:**
- **kind:** theme / skill / mcp

## Checklist

- [ ] `packs/<id>/` has `fella-pack.json`, `README.md`, `LICENSE`, and the payload
- [ ] `id` matches the folder name
- [ ] Ran `node scripts/build-catalog.mjs` and committed the updated `catalog.json`
- [ ] Tested locally with `/packs add packs/<id>` then `/packs enable <id>`
- [ ] theme: all colour tokens set, text stays readable
- [ ] skill: instructions/vocabulary only, ≤ 16 KB, does not push fabricated numbers
- [ ] mcp: server already exists and is reputable; credentials declared in `auth`; non-read-only tools flagged in this PR
