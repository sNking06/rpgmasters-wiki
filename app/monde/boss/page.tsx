import type { Metadata } from 'next';
import { BossList } from '@/components/BossList';
import { BestiaryCaveats } from '@/components/BestiaryCaveats';
import { Essentiel, PageEnd, PageHeader, Section, Warn } from '@/components/ui';
export const metadata: Metadata = { title: 'Boss et butin', description: '106 entrées du bestiaire, leurs butins et les mécaniques relevées pour 27 boss de niveaux 150–200.' };
export default function Page() {
  return <>
    <PageHeader section="economie" title="Boss et butin" intro="106 entrées du bestiaire, leurs butins et les mécaniques relevées pour 27 boss de niveaux 150–200." />
    <Essentiel><li>Recherche par nom, lieu, butin ou mécanique ; filtre par intervalle de niveaux.</li><li>106 entrées du bestiaire et une fiche complémentaire pour le Kralamoure Géant.</li><li>Déplie une fiche pour lire les difficultés et les taux affichés.</li></Essentiel>
    <Warn title="Mécaniques : couverture et règles générales"><p>Les mécaniques des boss de niveau inférieur à 150 n’ont pas été collectées. 27 boss de niveaux 150–200 sont documentés ; Bworker (180) était verrouillé.</p><p>Abysses : la mécanique de chaque boss est tirée au hasard à chaque descente et adoucie ; elle n’est donc pas listée ici.</p><p>Ascension : dès l’étage 101, les boss Transmutés ont 2–3 mécaniques parmi Épuisement final, Sceau, Élément mouvant, Inversion, Échange de PV et Rancune (une seule dès l’étage 140). Dès l’étage 140 : Écho, Glas, Lien d’âme, Accoutumance, Seuil de douleur, Hâte.</p><p>Dès l’étape 400 de l’Aventure, tous les boss pulvérisent celui qui garde un bouclier 6 tours d’affilée ; ils préviennent un tour avant.</p></Warn>
    <BestiaryCaveats />
    <Section id="catalogue" title="Boss et butin"><BossList /></Section>
    <PageEnd current="/monde/boss/" see={[{ href: '/equipement/objets/', label: 'Objets' }, { href: '/a-propos/sources/', label: 'Sources et limites' }]} sources="Bestiaire et collection en jeu, compte SNking, relevé du 15 octobre 2026 vers 07:00–07:30 ; fichiers CSV et README-rpgmasters.md" />
  </>;
}
