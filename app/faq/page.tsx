import type { Metadata } from 'next';
export const metadata: Metadata = {title:'Page déplacée',alternates:{canonical:'/debuter/faq/'},robots:{index:false,follow:true}};
export default function Alias(){return <><meta httpEquiv="refresh" content="0;url=/debuter/faq/"/><h1>Page déplacée</h1><p><a href="/debuter/faq/">Continuer vers la nouvelle page</a></p></>;}
