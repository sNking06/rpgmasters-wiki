import type { Metadata } from 'next';
export const metadata: Metadata = {title:'Page déplacée',alternates:{canonical:'/contenus/ascension/'},robots:{index:false,follow:true}};
export default function Alias(){return <><meta httpEquiv="refresh" content="0;url=/contenus/ascension/"/><h1>Page déplacée</h1><p><a href="/contenus/ascension/">Continuer vers la nouvelle page</a></p></>;}
