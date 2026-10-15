import { notFound } from 'next/navigation';
import { zoneEntries } from '@/lib/nav';
import { ZoneDetails } from '@/components/WorldDetails';
export const dynamicParams=false;
export function generateStaticParams(){return zoneEntries.map(e=>({slug:e.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=zoneEntries.find(e=>e.slug===slug);return {title:entry?.name};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=zoneEntries.find(e=>e.slug===slug);if(!entry)notFound();return <ZoneDetails zone={entry}/>;}
