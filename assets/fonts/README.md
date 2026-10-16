# Self-hosted fonts

Latin-subset variable fonts, served from our own domain via `next/font/local`
(see `lib/fonts.ts`). Self-hosting removes the render-blocking Google Fonts
stylesheet and lets Next.js preload the files with fallback metrics that
prevent layout shift.

| File | Family | Weights | Source |
|---|---|---|---|
| `space-grotesk-variable.woff2` | Space Grotesk | 400–700 | @fontsource-variable/space-grotesk 5.3.0 (latin) |
| `archivo-variable.woff2` | Archivo | 400–700 | @fontsource-variable/archivo 5.3.0 (latin) |

The source files were trimmed with fontTools to the weights the site uses
(400–700) and to Latin text glyphs (Basic Latin, Latin-1, punctuation, €, ™,
arrows) — ~44 KB for both instead of ~57 KB. If you add a lighter or heavier
weight in the design, re-export from the @fontsource-variable package.

Both are licensed under the SIL Open Font License 1.1 (`OFL.txt`).
