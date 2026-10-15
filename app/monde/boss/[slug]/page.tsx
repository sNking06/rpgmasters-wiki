import { notFound } from 'next/navigation';
import { bossEntries } from '@/lib/nav';
import { BossDetails } from '@/components/WorldDetails';
export const dynamicParams=false;
export function generateStaticParams(){return bossEntries.map(e=>({slug:e.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=bossEntries.find(e=>e.slug===slug);return {title:entry?.name};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=bossEntries.find(e=>e.slug===slug);if(!entry)notFound();return <BossDetails boss={entry}/>;}
