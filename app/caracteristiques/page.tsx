import type { Metadata } from 'next';
export const metadata: Metadata = {title:'Page déplacée',alternates:{canonical:'/personnage/caracteristiques/'},robots:{index:false,follow:true}};
export default function Alias(){return <><meta httpEquiv="refresh" content="0;url=/personnage/caracteristiques/"/><h1>Page déplacée</h1><p><a href="/personnage/caracteristiques/">Continuer vers la nouvelle page</a></p></>;}
