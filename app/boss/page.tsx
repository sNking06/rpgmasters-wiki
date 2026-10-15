import type { Metadata } from 'next';
export const metadata: Metadata = {title:'Page déplacée',alternates:{canonical:'/monde/boss/'},robots:{index:false,follow:true}};
export default function Alias(){return <><meta httpEquiv="refresh" content="0;url=/monde/boss/"/><h1>Page déplacée</h1><p><a href="/monde/boss/">Continuer vers la nouvelle page</a></p></>;}
