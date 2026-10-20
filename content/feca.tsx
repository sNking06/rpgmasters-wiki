import Link from 'next/link';
import type { Metadata } from 'next';
import { ClassIcon } from '@/components/icons';
import { KeyFigures, TlDr, Essentiel, M, PageEnd, PageHeader, Section, TableWrap, Tip, Warn } from '@/components/ui';

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
      <PageHeader art="feca" icon={<ClassIcon name="Féca" size={28} />} crumbs={[{ href: '/personnage/classes/', label: 'Classes' }]} title="Guide Féca" intro="Le Féca en pratique. Observé en jeu du 13 au 20 oct 2026." />
      <TlDr>
        <li>Chaque sort de bouclier, soin ou résistance donne 1 charge d’Armure Féca.</li>
        <li>Armure Féca : 5 charges au maximum.</li>
        <li>Chaque charge donne −4 % de dégâts subis et +4,8 % de dégâts infligés.</li>
      </TlDr>
      <KeyFigures items={[
        {icon:'pv', value:'14 335', label:'PV'},
        {icon:'pa', value:'14', label:'PA'},
        {icon:'resistance', value:'50 %', label:'Résistances', note:'Tous les éléments'},
        {icon:'record', value:'19 883', label:'Opti', note:'Momore 6/6 · 20 oct 2026'},
      ]} />
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
      <Section id="ascension" title="Ascension : build défensif">
        <p>Les essais des 16-17 oct 2026 avec un deck de 11 cartes, Dofus Émeraude, Argenté Scintillant, du Cauchemar et Jadis Rayonnant +3 ont porté la survie de 11 429 PV / mort au tour 2 à 13 568 PV / mort au tour 17, avec 14 PA conservés. Rempart a été observé à +38 % de résistances tous éléments pendant 1 tour dans ce build. <M s="T" /></p>
        <p><Link href="/contenus/ascension/#build-defensif">Deck, équipement et résistances du build défensif Ascension →</Link></p>
      </Section>
      <Section id="panoplie" title="Panoplie défensive : Malédiction de Cire Momore 6/6">
        <p>Testée le 20 oct 2026 contre Gouffre 3/3 et Gouffre + Sanctuaire 2/3 : avec Momore 6/6, le Féca niveau 200 (Prestige 7) affiche <strong>14 335 PV</strong>, <strong>14 PA</strong>, <strong>50 % de résistance dans tous les éléments</strong>, une Réduction affichée de 89 % (plafonnée à 50 %), <strong>Opti 19 883</strong> et Puissance 1584. Dommages Eau 365, Terre/Feu/Air 333. <M s="T" /></p>
        <p><Link href="/equipement/panoplies/#tests-feca">Comparatif complet des panoplies testées →</Link></p>
      </Section>
      <p><Link href="/contenus/kralamoure/">Kralamoure : accès, deck et résultat observé →</Link></p>
      <PageEnd current="/personnage/classes/feca/" see={[{ href: '/personnage/classes/', label: 'Classes' }, { href: '/equipement/objets/', label: 'Objets' }, { href: '/equipement/panoplies/', label: 'Panoplies' }, { href: '/contenus/ascension/', label: 'Ascension' }]} sources="Observations en combat, 13-20 oct 2026" />
    </>
  );
}
