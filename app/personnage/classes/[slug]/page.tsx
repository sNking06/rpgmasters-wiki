import { notFound } from 'next/navigation';
import Cra, { metadata as craMetadata } from '@/content/cra';
import Feca, { metadata as fecaMetadata } from '@/content/feca';
export const dynamicParams = false;
export function generateStaticParams(){return [{slug:'cra'},{slug:'feca'}];}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){return (await params).slug==='cra'?craMetadata:fecaMetadata;}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(slug==='cra')return <Cra/>;if(slug==='feca')return <Feca/>;notFound();}
