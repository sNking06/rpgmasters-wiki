import type { Metadata } from 'next';
export const metadata: Metadata = {title:'Page déplacée',alternates:{canonical:'/contenus/arene/'},robots:{index:false,follow:true}};
export default function Alias(){return <><meta httpEquiv="refresh" content="0;url=/contenus/arene/"/><h1>Page déplacée</h1><p><a href="/contenus/arene/">Continuer vers la nouvelle page</a></p></>;}
