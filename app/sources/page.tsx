import type { Metadata } from 'next';
export const metadata: Metadata = {title:'Page déplacée',alternates:{canonical:'/a-propos/sources/'},robots:{index:false,follow:true}};
export default function Alias(){return <><meta httpEquiv="refresh" content="0;url=/a-propos/sources/"/><h1>Page déplacée</h1><p><a href="/a-propos/sources/">Continuer vers la nouvelle page</a></p></>;}
