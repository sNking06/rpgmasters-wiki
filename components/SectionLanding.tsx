import Link from 'next/link';
import { NAV, trailFor, type NavNode } from '@/lib/nav';
import { illustrationFor } from '@/lib/illustrations';
import Illustration from './Illustration';
import { PageHeader } from './ui';

export function SectionCards({ nodes = NAV }: { nodes?: NavNode[] }) {
  return <ul className="hub">{nodes.map(n => <li key={n.href}>
    <Link className="hub-card" href={n.href}>
      <Illustration name={illustrationFor(n.href)} alt="" className="card-thumbnail" sizes="(max-width: 640px) 100vw, 450px" />
      <span className="hub-title">{n.title}</span>
      <span className="hub-desc">{n.description}</span>
    </Link>
  </li>)}</ul>;
}

export default function SectionLanding({ href }: { href: string }) {
  const trail = trailFor(href);
  const n = trail[trail.length - 1];
  return <><PageHeader href={href} title={n.title} intro={n.description} /><SectionCards nodes={n.children} /></>;
}
