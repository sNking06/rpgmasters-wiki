'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV, normalizePath, trailFor, siblingsFor, type NavNode } from '@/lib/nav';
function Branch({node,path}:{node:NavNode;path:string}){
 const ancestor=path.startsWith(node.href);
 const [expanded,setExpanded]=useState(ancestor);
 useEffect(()=>{if(ancestor)setExpanded(true);},[path,ancestor]);
 return <li><div className="tree-row"><Link href={node.href} aria-current={path===node.href?'page':undefined}>{node.title}</Link>{node.children?.length?<button type="button" aria-label={`${expanded?'Replier':'Déplier'} ${node.title}`} aria-expanded={expanded} aria-controls={`tree-${node.href.replaceAll('/','-')}`} onClick={()=>setExpanded(!expanded)}>{expanded?'−':'+'}</button>:null}</div>{node.children?.length?<ul id={`tree-${node.href.replaceAll('/','-')}`} hidden={!expanded}>{node.children.map(n=><Branch key={n.href} node={n} path={path}/>)}</ul>:null}</li>;
}
export function Sidebar(){const [open,setOpen]=useState(false);useEffect(()=>{setOpen(window.matchMedia('(min-width: 1100px)').matches);},[]);const path=normalizePath(usePathname()??'/');return <aside className="wiki-sidebar"><details className="wiki-tree" open={open} onToggle={e=>setOpen(e.currentTarget.open)}><summary>Explorer le wiki</summary><nav aria-label="Arborescence du wiki"><ul><li><Link href="/" aria-current={path==='/'?'page':undefined}>Accueil</Link></li>{NAV.map(n=><Branch key={n.href} node={n} path={path}/>)}</ul></nav></details></aside>;}
export function Breadcrumbs(){const path=normalizePath(usePathname()??'/');const trail=trailFor(path);return <nav className="crumbs" aria-label="Fil d'Ariane"><ol><li>{path==='/'?<span aria-current="page">Accueil</span>:<Link href="/">Accueil</Link>}</li>{trail.map((n,i)=><li key={n.href}>{i===trail.length-1?<span aria-current="page">{n.title}</span>:<Link href={n.href}>{n.title}</Link>}</li>)}</ol></nav>;}
export function SectionNeighbors(){const path=normalizePath(usePathname()??'/');const siblings=siblingsFor(path);const i=siblings.findIndex(n=>n.href===path);if(i<0)return null;const prev=siblings[i-1],next=siblings[i+1];return <nav className="prev-next" aria-label="Pages voisines de la section">{prev?<Link className="pn pn-prev" href={prev.href}>← Précédent : {prev.title}</Link>:<span/>}{next?<Link className="pn pn-next" href={next.href}>Suivant : {next.title} →</Link>:null}</nav>;}
