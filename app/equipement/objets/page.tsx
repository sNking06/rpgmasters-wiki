import type { Metadata } from 'next';
import { ItemTable } from '@/components/ItemTable';
import { Essentiel, PageEnd, PageHeader, Section, Warn } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Objets end-game',
  description: 'Table de 324 objets end-game RpgMasters (Légendaires, Dofus, Mythiques niv. 150+, Épiques et Rares niv. 185+) avec filtres, tri par stat et bonus de panoplie.',
};

export default function ObjetsPage() {
  return (
    <>
      <PageHeader section="economie" title="Objets end-game" intro="324 objets relevés à la main dans le bestiaire du jeu : filtre, trie par stat et compare les bonus de panoplie." />
      <Essentiel>
        <li>Contenu : tous les <strong>Légendaires et Dofus</strong>, les <strong>Mythiques niv. 150+</strong>, les <strong>Épiques et Rares niv. 185+</strong>.</li>
        <li>Valeurs lues en jeu le <strong>15 oct 2026</strong> sur la page Bestiaire (compte connecté).</li>
        <li>Trie par Chance, PA, Critique, dommages élémentaires… pour trouver la meilleure pièce par emplacement.</li>
      </Essentiel>
      <Warn title="À savoir">
        <p>Les chiffres sont ceux affichés au moment du relevé. On ne sait pas s’ils incluent un multiplicateur (Prestige du lecteur, fusion) : compare les objets entre eux plutôt qu’en valeur absolue. Une case vide = valeur non affichée ou nulle.</p>
      </Warn>
      <Section id="table" title="Table des objets">
        <ItemTable />
      </Section>
      <PageEnd current="/equipement/objets/" see={[{ href: '/personnage/caracteristiques/', label: 'Caractéristiques' }, { href: '/economie/#fusion', label: 'Fusion' }, { href: '/personnage/classes/feca/', label: 'Guide Féca' }]} sources="Bestiaire en jeu (rpgmasters.houk.fr/bestiaire), relevé du 15 oct 2026" />
    </>
  );
}
