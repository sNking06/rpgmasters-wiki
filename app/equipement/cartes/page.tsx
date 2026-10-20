import type { Metadata } from 'next';
import { CardTable } from '@/components/CardTable';
import { BestiaryCaveats } from '@/components/BestiaryCaveats';
import { Essentiel, PageEnd, PageHeader, Section, Warn } from '@/components/ui';
export const metadata: Metadata = { title: 'Catalogue des cartes', description: 'Compare les 241 cartes possédées relevées dans la collection : coût en PA, éléments, effets et rareté.' };
export default function Page() {
  return <>
    <PageHeader href="/equipement/cartes/" section="economie" title="Catalogue des cartes" intro="Compare les 241 cartes possédées relevées dans la collection : coût en PA, éléments, effets et rareté." />
    <Essentiel><li>Filtre par coût en PA, élément, rareté ou tag Classe / Incarné.</li><li>La recherche porte aussi sur les effets et les notes.</li><li>Les éléments et les raretés sont toujours indiqués en texte.</li></Essentiel>
    <Warn title="Collection partielle"><p>11 cartes non découvertes sont absentes. La collection affichait 235/246 cartes découvertes et 241 possédées : ces compteurs ne décrivent pas la même chose. Ce catalogue reprend les 241 cartes possédées du fichier, pas toutes les cartes du jeu.</p><p>Les éléments sont ceux nommés dans les effets. Une rareté ou un élément non renseigné reste inconnu. Les tags Classe / Incarné ne donnent pas le nom précis d’une classe ; les cartes sans tag sont regroupées sous « Général / sans tag ».</p></Warn>
    
    <Section id="catalogue" title="Catalogue des cartes"><CardTable /></Section>
    <PageEnd current="/equipement/cartes/" see={[{ href: '/equipement/objets/', label: 'Objets' }, { href: '/a-propos/sources/', label: 'Sources et limites' }]} sources="Bestiaire et collection en jeu, compte SNking, relevé du 15 octobre 2026 vers 07:00–07:30 ; fichiers CSV et README-rpgmasters.md" />
  </>;
}
