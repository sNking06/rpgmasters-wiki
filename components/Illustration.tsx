import { existsSync } from 'node:fs';
import path from 'node:path';
import type { IllustrationName } from '@/lib/illustrations';

/** Résolution au build : déposer un WebP suffit pour remplacer le dessin SVG. */
export default function Illustration({ name, alt, priority = false, className, sizes = '100vw' }: {
  name: IllustrationName; alt: string; priority?: boolean; className?: string; sizes?: string;
}) {
  const base = `/illustrations/${name}`;
  const has = (suffix: string) => existsSync(path.join(process.cwd(), 'public', `${base}${suffix}`));
  const webp = has('.webp');
  const responsive = webp && has('-800.webp');
  return <img className={className} src={`${base}${webp ? '.webp' : '.svg'}`} alt={alt}
    width={1600} height={600} loading={priority ? 'eager' : 'lazy'}
    decoding={priority ? undefined : 'async'} fetchPriority={priority ? 'high' : undefined}
    srcSet={responsive ? `${base}-800.webp 800w, ${base}.webp 1280w` : undefined}
    sizes={responsive ? sizes : undefined} />;
}
