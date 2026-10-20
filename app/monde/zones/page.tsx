import type { Metadata } from 'next';
import { ZoneList } from '@/components/ZoneList';
import GameCapture from '@/components/GameCapture';
import { BestiaryCaveats } from '@/components/BestiaryCaveats';
import { Essentiel, PageEnd, PageHeader, Section, Warn } from '@/components/ui';
export const metadata: Metadata = { title: 'Zones et monstres', description: 'Explore les zones, les familles de monstres et leurs objets bonus de victoire.' };
export default function Page() {
  return <>
    <PageHeader href="/monde/zones/" section="economie" title="Zones et monstres" intro="Explore les zones, les familles de monstres et leurs objets bonus de victoire." />
    <Essentiel><li>Relevé du bestiaire filtré sur les niveaux 150–200 ; certaines plages de zones commencent plus bas.</li><li>Recherche une zone, un monstre, une famille ou un objet.</li><li>Les résultats sont regroupés par zone avec leur plage de niveaux.</li></Essentiel>
    <Warn title="Familles et butin des monstres"><p>La colonne source « mechanics » contient uniquement la famille : aucune mécanique individuelle ni aucun PV ne sont affichés dans le bestiaire. Une liste de butin vide reprend l’indication « Pas de butin propre à ce monstre (seulement l’objet bonus de victoire) ». Les objets listés sont des bonus de victoire, sans taux relevé.</p><p>Le fichier contient des liens monstre × zone : un même monstre peut apparaître dans plusieurs zones.</p></Warn>
    <GameCapture id="monde-zones" caption="Page Chasse : les zones de ton niveau ou toutes les zones (222)" />
    <BestiaryCaveats />
    <Section id="catalogue" title="Zones et monstres"><ZoneList /></Section>
    <PageEnd current="/monde/zones/" see={[{ href: '/equipement/objets/', label: 'Objets' }, { href: '/a-propos/sources/', label: 'Sources et limites' }]} sources="Bestiaire et collection en jeu, compte SNking, relevé du 15 octobre 2026 vers 07:00–07:30 ; fichiers CSV et README-rpgmasters.md" />
  </>;
}
