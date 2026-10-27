# Design: Wiki RpgMasters

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

Replaced the Ink lock on purpose: that redesign was rejected. This file is the Dofus-inspired board.

## System
- Genre: playful
- Shape of the first page: Element board (seven solid terre/feu/eau/air tiles fill the first screen, a small plate sits beside the title; interior articles keep a banner mast)
- Theme: custom (vibe: "warm comic fantasy codex")
- Axes: light/rounded-sans/chromatic-blue · posture: full-palette

## Tokens
`app/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(95% 0.028 88);  --color-paper-2: oklch(92% 0.032 86);  --color-paper-3: oklch(88% 0.04 82);
  --color-ink: oklch(28% 0.045 55);  --color-ink-2: oklch(36% 0.04 55);  --color-muted: oklch(44% 0.04 55);  --color-rule: oklch(78% 0.035 80);
  --color-accent: oklch(40% 0.13 232);  --color-accent-ink: oklch(97% 0.016 88);  --color-focus: oklch(40% 0.14 232);
  --font-display: "Rowdies", ui-sans-serif, sans-serif;  --font-body: "Figtree", ui-sans-serif, sans-serif;
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 18px;  --radius-pill: 999px;  --rule-hair: 1px;  --shadow-card: 0 12px 28px oklch(32% 0.06 232 / 0.16);
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `app/tokens.css`. The frame is `--color-world` (azure, hue 232) with `--color-gold` trim. Terre, feu, eau and air are data hues. The placards use `--band-*` (the same hues at a solid, readable ground) with `--band-ink`, in both themes, so the board stays coloured when the paper goes dark. Dark reading is `:root[data-theme='dark']` in the same file (hues held, paper near L 16, ink near L 94, accent lifted for text, shadow off).

## Controls
- Primary: azure accent fill, accent-ink label · radius 12px · height 44px
- Secondary: stone outline · same radius and height
- Current nav: gold fill, gold-ink label

## Motion
- Character: still; colour and a 1px press only (`--dur-micro`); under reduced motion everything ends at once.

## Exports
`app/tokens.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request, per `export-formats.md`.
