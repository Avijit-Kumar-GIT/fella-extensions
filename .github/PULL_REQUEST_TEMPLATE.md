<!-- A pack is a theme, a skill, or an mcp connector. Nothing else. -->

## Pack

- **id:**
- **kind:** theme / skill / mcp
- **source:** (link to the pack's repo or folder)

## Checklist

- [ ] `fella-pack.json` validates against `fella-pack.schema.json`
- [ ] Tested locally with `/packs add`
- [ ] `catalog.json` entry added, URLs pinned to a **commit SHA** (not a branch)
- [ ] Every file in the entry has a correct `sha256`
- [ ] theme: all colour tokens set, text stays readable
- [ ] skill: instructions/vocabulary only, <= 16 KB, does not push fabricated numbers
- [ ] mcp: server already exists and is reputable; credentials declared in `env`; non-read-only tools flagged
