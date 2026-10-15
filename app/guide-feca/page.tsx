import type { Metadata } from 'next';
import { ClassIcon } from '@/components/icons';
import { Essentiel, M, PageEnd, PageHeader, Section, TableWrap, Tip, Warn } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Guide Féca et Kralamoure',
  description: 'Féca RpgMasters : Armure Féca, cartes exclusives, et deck de 7 cartes pour le boss de guilde Kralamoure (109 506 dégâts en un combat).',
};

const CARDS: [string, string, string][] = [
  ['Bouclier Féca', '2', 'Bouclier de 33 % des PV max pendant 2 tours'],
  ['Bulle', '2', '20 à 23 dommages Eau'],
  ['Rempart', '2', '+33 % de résistances pendant 1 tour + 10 à 13 dommages Terre'],
];

export default function GuideFecaPage() {
  return (
    <>
      <PageHeader icon={<ClassIcon name="Féca" size={28} />} crumbs={[{ href: '/classes/', label: 'Classes' }]} title="Guide Féca et Kralamoure" intro="Le Féca en pratique et le boss de guilde Kralamoure. Observé en jeu du 13 au 15 oct 2026." />
      <Essentiel>
        <li>Chaque sort de bouclier, soin ou résistance donne 1 charge d’<strong>Armure Féca</strong> (5 max). <M s="T" /></li>
        <li>Kralamoure : deck de 7 cartes, <strong>Précipitation en premier</strong>, un bouclier à chaque tour. <M s="T" /></li>
        <li>Record observé : <strong>109 506 dégâts</strong> en un combat (15 oct 2026). <M s="T" /></li>
      </Essentiel>
      <Section id="armure" title="Armure Féca">
        <p>Observé en combat : chaque charge donne <strong>−4 % de dégâts subis</strong> et <strong>+4,8 % de dégâts infligés</strong>, 5 charges au maximum. <M s="T" /></p>
        <Warn><p>Le texte public de la page Classes annonçait −6 % / +6 % par charge (relevé du 11 oct) : les valeurs ont pu changer, celles ci-dessus sont celles vues en combat le 15 oct.</p></Warn>
        <p>Le Prestige 4 donne <strong>+40 %</strong> aux sorts de dégâts de classe. <M s="T" /></p>
      </Section>
      <Section id="cartes" title="Cartes exclusives">
        <TableWrap caption="Cartes Féca">
          <thead><tr><th>Carte</th><th>PA</th><th>Effet</th></tr></thead>
          <tbody>{CARDS.map(([n, p, e]) => <tr key={n}><td>{n}</td><td>{p}</td><td>{e}</td></tr>)}</tbody>
        </TableWrap>
      </Section>
      <Section id="kralamoure" title="Kralamoure (boss de guilde)">
        <ul>
          <li>Accessible <strong>uniquement en guilde</strong> : Guilde → Faille du Kralamoure. <M s="T" /></li>
          <li>1 combat toutes les <strong>20 minutes</strong>, <strong>10 tours</strong>, sans énergie. <M s="T" /></li>
          <li>Environ <strong>100 M de PV</strong> partagés par la guilde. <M s="T" /></li>
          <li>Odorat divise par deux son prochain Gros coup. <M s="T" /></li>
          <li>Le Prestige 5 demande 500 000 dégâts cumulés sur le Kralamoure. <M s="T" /></li>
        </ul>
        <h3>Deck de 7 cartes</h3>
        <p>Bouclier Féca, Vertu, Précipitation, Traversée, Bluff, Pelle des Anciens, Tibia. Précipitation en premier pour les PA, puis un bouclier à chaque tour.</p>
        <Tip title="Résultat">
          <p><strong>109 506 dégâts</strong> en un combat avec ce deck, contre <strong>74 420</strong> avec un deck de 14 cartes (15 oct 2026). Monter vite les 5 charges d’Armure, puis tout envoyer.</p>
        </Tip>
      </Section>
      <PageEnd current="/guide-feca/" see={[{ href: '/classes/', label: 'Classes' }, { href: '/objets/', label: 'Objets' }, { href: '/ascension/', label: 'Ascension' }]} sources="Observations en combat, 13-15 oct 2026" />
    </>
  );
}
