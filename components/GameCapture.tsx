import captures from '@/lib/captures.json';
import { Icon } from './icons';

const byId = new Map(captures.map(capture => [capture.id, capture]));

export function GameCapture({ id, caption }: { id: string; caption?: string }) {
  const capture = byId.get(id);
  if (!capture) return null;
  const full = `/captures/${capture.id}.webp`;

  return (
    <figure className="game-capture">
      <a href={full} data-lightbox>
        {/* Native images preserve the static export and the generated variants. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/captures/${capture.id}-640.webp`}
          srcSet={`/captures/${capture.id}-640.webp ${capture.smallWidth}w${capture.width > capture.smallWidth ? `, ${full} ${capture.width}w` : ''}`}
          sizes="(max-width: 760px) 100vw, 760px"
          width={capture.width}
          height={capture.height}
          alt={capture.alt}
          loading="lazy"
          decoding="async"
        />
      </a>
      <figcaption>
        <Icon name="camera" size={16} />
        <span>{caption ? <>{caption} — </> : null}Capture en jeu, {capture.date}</span>
      </figcaption>
    </figure>
  );
}

export function CaptureGallery({ ids, captions }: { ids: string[]; captions?: Record<string, string> }) {
  const available = ids.filter(id => byId.has(id));
  if (!available.length) return null;
  return <div className="capture-gallery">{available.map(id => <GameCapture key={id} id={id} caption={captions?.[id]} />)}</div>;
}

export default GameCapture;
