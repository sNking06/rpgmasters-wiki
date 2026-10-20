import Link from 'next/link';
import { NAV, trailFor, type NavNode } from '@/lib/nav';
import { illustrationFor } from '@/lib/illustrations';
import Illustration from './Illustration';
import { PageHeader } from './ui';
import GameCapture, { CaptureGallery } from './GameCapture';

export function SectionCards({ nodes = NAV }: { nodes?: NavNode[] }) {
  return <ul className="hub">{nodes.map(n => <li key={n.href}>
    <Link className="hub-card" href={n.href}>
      <Illustration name={illustrationFor(n.href)} alt="" className="card-thumbnail" sizes="(max-width: 640px) 100vw, 450px" />
      <span className="hub-title">{n.title}</span>
      <span className="hub-desc">{n.description}</span>
    </Link>
  </li>)}</ul>;
}

export default function SectionLanding({ href, captureId, captureIds, captureCaption, captureCaptions }: { href: string; captureId?: string; captureIds?: string[]; captureCaption?: string; captureCaptions?: Record<string, string> }) {
  const trail = trailFor(href);
  const n = trail[trail.length - 1];
  return <>
    <PageHeader href={href} title={n.title} intro={n.description} />
    {captureId ? <GameCapture id={captureId} caption={captureCaption} /> : null}
    {captureIds?.length ? <CaptureGallery ids={captureIds} captions={captureCaptions} /> : null}
    <SectionCards nodes={n.children} />
  </>;
}
