"""Convertit les photos/illustrations locales en WebP pour les bannières du wiki."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'sources/illustrations'
TARGET = ROOT / 'public/illustrations'


def main():
    TARGET.mkdir(parents=True, exist_ok=True)
    for source in sorted(SOURCE.glob('*')):
        if source.suffix.lower() not in {'.jpg', '.png'}:
            continue
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original).convert('RGBA' if 'A' in original.getbands() else 'RGB')
            for width, suffix in [(1600, ''), (800, '-800')]:
                resized = image.copy()
                resized.thumbnail((width, max(1, round(image.height * width / image.width))), Image.Resampling.LANCZOS)
                target = TARGET / f'{source.stem}{suffix}.webp'
                resized.save(target, 'WEBP', quality=80)
                print(target.relative_to(ROOT))


if __name__ == '__main__':
    main()
