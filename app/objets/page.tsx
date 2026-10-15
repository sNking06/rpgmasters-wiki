import type { Metadata } from 'next';
export const metadata: Metadata = {title:'Page déplacée',alternates:{canonical:'/equipement/objets/'},robots:{index:false,follow:true}};
export default function Alias(){return <><meta httpEquiv="refresh" content="0;url=/equipement/objets/"/><h1>Page déplacée</h1><p><a href="/equipement/objets/">Continuer vers la nouvelle page</a></p></>;}
