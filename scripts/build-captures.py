#!/usr/bin/env python3
"""Recadre, floute les zones masquées et convertit en WebP les captures en jeu.
Entrées : sources/captures/*.png + sources/captures/captures.json. Sorties : public/captures/<id>.webp (largeur max 1400) et <id>-640.webp, plus lib/captures.json (métadonnées pour le site)."""
import json, pathlib
from PIL import Image, ImageFilter
root = pathlib.Path(__file__).resolve().parent.parent
src_dir, out_dir = root / 'sources/captures', root / 'public/captures'
out_dir.mkdir(parents=True, exist_ok=True)
manifest = json.loads((src_dir / 'captures.json').read_text())
meta = []
for c in manifest['captures']:
    path = src_dir / c['src']
    if not path.exists():
        print('absent, ignoré :', c['src']); continue
    im = Image.open(path).convert('RGB')
    for box in c.get('mask', []):
        region = im.crop(tuple(box)).filter(ImageFilter.GaussianBlur(18))
        im.paste(region, tuple(box[:2]))
    if 'strips' in c:
        parts = [im.crop(tuple(b)) for b in c['strips']]
        w = max(p.width for p in parts); h = sum(p.height for p in parts) + 4 * (len(parts) - 1)
        out = Image.new('RGB', (w, h), (23, 16, 5)); y = 0
        for p in parts: out.paste(p, (0, y)); y += p.height + 4
    else:
        out = im.crop(tuple(c['box'])) if 'box' in c else im
    full = out.copy(); full.thumbnail((1400, 4000), Image.LANCZOS)
    full.save(out_dir / f"{c['id']}.webp", 'WEBP', quality=82, method=6)
    small = out.copy(); small.thumbnail((640, 4000), Image.LANCZOS)
    small.save(out_dir / f"{c['id']}-640.webp", 'WEBP', quality=80, method=6)
    meta.append({'id': c['id'], 'alt': c['alt'], 'date': c.get('date', ''), 'width': full.width, 'height': full.height, 'smallWidth': small.width})
    print(c['id'], full.size)
(root / 'lib/captures.json').write_text(json.dumps(meta, ensure_ascii=False, indent=1))
