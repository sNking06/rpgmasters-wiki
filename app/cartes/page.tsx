import type { Metadata } from 'next';
export const metadata: Metadata = {title:'Page déplacée',alternates:{canonical:'/equipement/cartes/'},robots:{index:false,follow:true}};
export default function Alias(){return <><meta httpEquiv="refresh" content="0;url=/equipement/cartes/"/><h1>Page déplacée</h1><p><a href="/equipement/cartes/">Continuer vers la nouvelle page</a></p></>;}
