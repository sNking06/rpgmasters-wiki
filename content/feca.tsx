import Link from 'next/link';
import type { Metadata } from 'next';
import { ClassIcon } from '@/components/icons';
import { Essentiel, M, PageEnd, PageHeader, Section, TableWrap, Tip, Warn } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Guide Féca',
  description: 'Féca RpgMasters : Armure Féca et cartes exclusives, observations en combat.',
};

const CARDS: [string, string, string][] = [
  ['Bouclier Féca', '2', 'Bouclier de 33 % des PV max pendant 2 tours'],
  ['Bulle', '2', '20 à 23 dommages Eau'],
  ['Rempart', '2', '+33 % de résistances pendant 1 tour + 10 à 13 dommages Terre'],
];

export default function GuideFecaPage() {
  return (
    <>
      <PageHeader icon={<ClassIcon name="Féca" size={28} />} crumbs={[{ href: '/personnage/classes/', label: 'Classes' }]} title="Guide Féca" intro="Le Féca en pratique. Observé en jeu du 13 au 15 oct 2026." />
      <Essentiel>
        <li>Chaque sort de bouclier, soin ou résistance donne 1 charge d’<strong>Armure Féca</strong> (5 max). <M s="T" /></li>
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
      <p><Link href="/contenus/kralamoure/">Kralamoure : accès, deck et résultat observé →</Link></p>
      <PageEnd current="/personnage/classes/feca/" see={[{ href: '/personnage/classes/', label: 'Classes' }, { href: '/equipement/objets/', label: 'Objets' }, { href: '/contenus/ascension/', label: 'Ascension' }]} sources="Observations en combat, 13-15 oct 2026" />
    </>
  );
}
