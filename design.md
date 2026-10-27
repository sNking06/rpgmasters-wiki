# Design: Wiki RpgMasters

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: Photographic (home is an Index; interior articles use Banner)
- Theme: Ink
- Axes: light/grotesk-sans/chromatic-teal · posture: restrained

## Tokens
`app/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(99.5% 0.003 100);  --color-paper-2: oklch(97% 0.004 100);  --color-paper-3: oklch(94% 0.006 100);
  --color-ink: oklch(16% 0 0);  --color-ink-2: oklch(28% 0 0);  --color-muted: oklch(44% 0 0);  --color-rule: oklch(89% 0.004 100);
  --color-accent: oklch(50% 0.095 188);  --color-accent-ink: oklch(99.5% 0.003 100);  --color-focus: oklch(50% 0.095 188);
  --font-display: "Epilogue", ui-sans-serif, system-ui, sans-serif;  --font-body: var(--font-display);
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 12px;  --radius-pill: 999px;  --rule-hair: 1px;  --shadow-card: 0 20px 40px oklch(20% 0 0 / 0.16);
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `app/tokens.css`. Dark reading is `:root[data-theme='dark']` in the same file (hue 100, paper near L 16, ink near L 94, accent lifted, shadow off). Element hues (terre, feu, eau, air) are data, not a second accent.

## Controls
- Primary: ink fill · radius 10px · height 44px
- Secondary: paper outline · same radius and height

## Motion
- Character: still; colour only on press and hover (`--dur-micro`); under reduced motion everything ends at once.

## Exports
`app/tokens.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request, per `export-formats.md`.
