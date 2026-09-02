# Nord

A cool, muted dark palette for Fella, based on the
[Nord](https://www.nordtheme.com/) colour scheme.

## What it changes

Every Fella colour token, plus an `appearance: "dark"` hint so the OS is told
this is a dark theme. Backgrounds sit in the Nord "Polar Night" range; text is
"Snow Storm"; the accent and link colours come from "Frost".

## Install

In the app:

```
/packs install nord-theme
/packs enable nord-theme
```

One theme is active at a time enabling this disables any other.

## Notes

- Contrast: `--text` on `--bg` and `--text-dim` on `--bg-inset` both clear WCAG
  AA.
- Nothing here is code. A theme is an inert map of CSS custom properties Fella
  reads.
