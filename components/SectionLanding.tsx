import Link from 'next/link';
import { NAV, trailFor, type NavNode } from '@/lib/nav';
export function SectionCards({nodes=NAV}:{nodes?:NavNode[]}){return <ul className="hub">{nodes.map(n=><li key={n.href}><Link className="hub-card" href={n.href}><span className="hub-title">{n.title}</span><span className="hub-desc">{n.description}</span></Link></li>)}</ul>;}
export default function SectionLanding({href}:{href:string}){const trail=trailFor(href);const n=trail[trail.length-1];return <><header className="page-header"><h1>{n.title}</h1><p className="intro">{n.description}</p></header><SectionCards nodes={n.children}/></>;}
