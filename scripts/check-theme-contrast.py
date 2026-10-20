"""Check the theme's actual text/surface pairs against WCAG AA (4.5:1).

No external dependency. Includes translucent callouts and the button overlay.
Table headers have their own foreground in both themes. Exit nonzero on failure.
"""
import re
from pathlib import Path

CSS = Path(__file__).resolve().parents[1].joinpath('app/globals.css').read_text()


def tokens_for(selector):
    tokens = {}
    for block in re.findall(re.escape(selector) + r'\s*\{([^{}]*)\}', CSS):
        tokens.update(re.findall(r'--([\w-]+):\s*([^;]+);', block))
    return tokens


def rgb(color):
    if color.startswith('#'):
        return tuple(int(color[i:i + 2], 16) / 255 for i in (1, 3, 5))
    raise ValueError(f'Expected a six-digit hex color, got {color}')


def over(color, background):
    if color.startswith('#'):
        return rgb(color)
    match = re.fullmatch(r'rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)', color)
    if not match:
        raise ValueError(f'Unsupported color: {color}')
    r, g, b, alpha = map(float, match.groups())
    return tuple(c / 255 * alpha + bg * (1 - alpha)
                 for c, bg in zip((r, g, b), background))


def luminance(color):
    linear = [c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4 for c in color]
    return sum(c * weight for c, weight in zip(linear, (.2126, .7152, .0722)))


def ratio(foreground, background):
    low, high = sorted((luminance(foreground), luminance(background)))
    return (high + .05) / (low + .05)


base = tokens_for(':root')
light = tokens_for(":root[data-theme='light']")
failed = False
for theme, tokens in [('dark', base), ('light', base | light)]:
    pairs = []
    foregrounds = [
        'text', 'text-strong', 'muted', 'faint', 'gold', 'gold-2', 'copper',
        'teal', 'link', 'link-hover', 'green', 'amber', 'red', 'blue',
        'chart-text', 'mark-T', 'mark-D', 'mark-C', 'mark-N',
    ] + [key for key in tokens if key.startswith(('rar-', 'el-'))]
    backgrounds = ['bg', 'bg-2', 'surface', 'surface-2', 'surface-3', 'hero-a', 'hero-b', 'band']
    for fg in foregrounds:
        for bg in backgrounds:
            pairs.append((f'{fg}/{bg}', rgb(tokens[fg]), rgb(tokens[bg])))
    # Même un pixel blanc de l'illustration reste lisible sous le voile mobile,
    # moins opaque que le voile de bureau dans la zone du texte.
    banner_background = over(tokens['banner-veil'], rgb('#ffffff'))
    for text in ['banner-text', 'banner-title', 'banner-accent']:
        pairs.append((f'illustrated hero: {text}', rgb(tokens[text]), banner_background))
    pairs.append(('table header', rgb(tokens['on-header']), rgb(tokens['th-bg'])))
    pairs.append(('navigation active', rgb(tokens['nav-active']), rgb(tokens['nav-active-bg'])))
    pairs.append(('date chip', rgb(tokens['gold']), over(tokens['chip-bg'], rgb(tokens['bg']))))
    button = over(tokens['button-shade'], rgb(tokens['button-bg']))
    pairs.append(('primary button', rgb(tokens['on-button']), button))
    pairs.append(('skip link', rgb(tokens['on-gold']), rgb(tokens['gold'])))
    for kind, fg in [('tip', 'green'), ('warn', 'amber'), ('info', 'teal')]:
        background = over(tokens[f'{kind}-bg'], rgb(tokens['bg']))
        for text in [fg, 'text', 'text-strong', 'link']:
            pairs.append((f'callout {kind}: {text}', rgb(tokens[text]), background))
    results = [(ratio(fg, bg), label) for label, fg, bg in pairs]
    minimum, label = min(results)
    print(f'{theme}: {len(results)} pairs; minimum {minimum:.2f}:1 ({label})')
    for value, label in results:
        if value < 4.5:
            failed = True
            print(f'  FAIL {label}: {value:.2f}:1 (requires 4.5:1)')
raise SystemExit(1 if failed else 0)
