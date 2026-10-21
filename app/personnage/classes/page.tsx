import GameCapture from '@/components/GameCapture';
import Link from 'next/link';
import type { Metadata } from 'next';
import ClassGrid from '@/components/ClassGrid';
import { ClassIcon, Icon } from '@/components/icons';
import { Contra, Disc, Essentiel, M, More, PageEnd, PageHeader, Section, TableWrap, Tip } from '@/components/ui';
import { CLASSES, IOP_CARDS } from '@/lib/classes';

export const metadata: Metadata = {
  title: 'Classes',
  description: 'Les 19 classes de RpgMasters et leur passif en une ligne, changement de classe, fiche Crâ.',
};

export default function ClassesPage() {
  return (
    <>
      <PageHeader href="/personnage/classes/" section="classes" title="Classes" intro="19 classes jouables, chacune avec un passif et 3 cartes exclusives." />

      <Essentiel>
        <li>
          Chaque classe : <strong>1 passif</strong> + <strong>3 cartes exclusives</strong>. Les autres cartes sont communes à
          toutes les classes. <M s="T" />
        </li>
        <li>
          Changer de classe : <strong>1er changement gratuit</strong>, puis <strong>300 000 kamas</strong> (page Personnage).{' '}
          <M s="T" />
        </li>
        <li>
          Le jeu ne désigne <strong>aucune « meilleure » classe</strong> : chacune a son style. <M s="T" />
        </li>
      </Essentiel>

      <GameCapture id="site-classes" caption="Page publique Classes du site" />

      <Link href="/personnage/classes/cra/" className="feature">
        <span className="medal" aria-hidden="true">
          <ClassIcon name="Crâ" size={28} />
        </span>
        <span>
          <span className="feature-title">Crâ — fiche détaillée</span>
          <span className="feature-desc">Build conseillé, cartes exclusives, vision spectrale et PO.</span>
        </span>
        <Icon name="arrowRight" size={22} className="feature-arrow" />
      </Link>

      <p><Link href="/personnage/classes/feca/">Féca — armure et cartes exclusives →</Link></p>
      <Section id="liste" title="Les 19 classes et leur passif">
        <p>Touchez une classe pour lire le texte complet de son passif.</p>
        <ClassGrid classes={CLASSES} />
        <More title="D’où viennent ces textes ?">
          <ul>
            <li>
              Textes des passifs repris de la page publique /classes. <M s="T" />
            </li>
            <li>
              L’association classe → passif suit l’ordre de la page (même ordre que la liste des 19 classes) et colle au nom
              des passifs : très probable, mais déduite. <M s="D" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="equilibrage" title="Équilibrage officiel des classes">
        <p>Passifs revalorisés le 10/10 (patch en ligne à 18:00), puis retouches. <Disc d="10/10" /></p>
        <TableWrap caption="Passifs annoncés le 10/10 et retouches suivantes">
          <thead><tr><th>Classe</th><th>Passif annoncé</th></tr></thead>
          <tbody>
            <tr><td>Féca</td><td>Armure : 5 charges, −6 % de dégâts subis et +6 % de dégâts chacune (jusqu’à −30 % / +30 %) — plafonnée à 20 % le 13/10</td></tr>
            <tr><td>Osamodas</td><td>Invocations +100 %, +20 % par invocation active (3 max, +60 %) ; 12/10 : invocations répercutent 25 % de ses dégâts ; 17/10 : 25 % → 50 %</td></tr>
            <tr><td>Enutrof</td><td>Jusqu’à 10 Pièces, +5 % chacune (+50 %)</td></tr>
            <tr><td>Sram</td><td>+30 % sous 50 % de PV ennemis, +60 % sous 25 %</td></tr>
            <tr><td>Xélor</td><td>Jusqu’à 10 charges, +6 % chacune (+60 %)</td></tr>
            <tr><td>Écaflip</td><td>32 % de coups de chance (dégâts doublés), 2 % de malchance</td></tr>
            <tr><td>Eniripsa</td><td>5 Mots, +9 % de dégâts et +9 % de soins chacun ; 3 sorts de soin par tour (16/10)</td></tr>
            <tr><td>Crâ</td><td>Œil de lynx : +26 % de vision spectrale (plafond 60 %)</td></tr>
            <tr><td>Sadida</td><td>Poison 3 % par tour, cumul 12 % (20 % pour les sorts de poison)</td></tr>
            <tr><td>Sacrieur</td><td>+7 % par tranche de 10 % de PV manquants (+63 %) ; 3 sorts de soin par tour (16/10)</td></tr>
            <tr><td>Pandawa</td><td>6 niveaux d’Ivresse, +5 % chacun (+30 %) ; soins d’Ivresse jamais réduits ni inversés</td></tr>
            <tr><td>Roublard</td><td>Bombes et invocations +50 %, +10 % par bombe qui explose (3 max) ; 17/10 : bombes qui n’explosent plus seules, 10 max, Kaboom +20 % par bombe (×3 à 10)</td></tr>
            <tr><td>Steamer</td><td>+7 % par évolution, 6 évolutions (+42 %)</td></tr>
            <tr><td>Éliotrope</td><td>Une attaque sur 2 passe par un portail, +50 %</td></tr>
            <tr><td>Huppermage</td><td>+11 % par rune d’élément différent (4 max, +44 %)</td></tr>
            <tr><td>Ouginak</td><td>+12 % par sort sur la proie (5 max, +60 %)</td></tr>
            <tr><td>Forgelance</td><td>Le premier sort de dégâts de chaque tour inflige +45 %</td></tr>
            <tr><td>Iop, Zobal</td><td>Inchangés</td></tr>
          </tbody>
        </TableWrap>
        <ul>
          <li>Changement de classe : 500 000 → <strong>300 000 kamas</strong>, le premier reste gratuit. <Disc d="10/10" /></li>
          <li>Transfusion : dégâts Neutre de 1 à 80 % des PV max, 2 fois par tour. <Disc d="17/10" /></li>
          <li>Soins et boucliers : 40 % des PV max, 2 sorts par tour (3 pour l’Eniripsa et le Sacrieur). <Disc d="16/10" /></li>
        </ul>
        <Contra title="Textes de classe et annonces">
          <p>Les passifs de la grille ci-dessus viennent de la page publique /classes ; ils peuvent différer des valeurs annoncées sur Discord. Exemple : Féca −6 % / +6 % par charge le 10/10, plafonné à 20 % le 13/10, −4 % / +4,8 % observés en combat le 15/10 (voir <Link href="/personnage/classes/feca/#armure">Féca</Link>).</p>
        </Contra>
      </Section>

      <Section id="exemple-iop" title="Exemple : les cartes du Iop">
        <p>
          La page /classes affiche le Iop par défaut (« Guerrier téméraire », difficulté ★☆☆). <M s="T" />
        </p>
        <TableWrap caption="Cartes exclusives du Iop">
          <thead>
            <tr>
              <th>Carte</th>
              <th className="num">PA</th>
              <th>Effet</th>
            </tr>
          </thead>
          <tbody>
            {IOP_CARDS.map((c) => (
              <tr key={c.name}>
                <td>{c.name}</td>
                <td className="num">{c.pa}</td>
                <td>{c.effect}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <Tip>
          <p>Le 1er changement de classe est gratuit : vous pouvez en tester une autre sans rien payer.</p>
        </Tip>
      </Section>

      <Section id="lacunes" title="Ce qu’on ne sait pas">
        <More title="Lacunes des sources (2)">
          <ul>
            <li>
              Cartes exclusives des autres classes (hors Crâ, Féca et Iop) : non relevées. <M s="N" />
            </li>
            <li>
              Classement de puissance des classes : aucun, le jeu n’en désigne pas. <M s="N" />
            </li>
          </ul>
        </More>
      </Section>

      <PageEnd
        current="/personnage/classes/"
        see={[
          { href: '/personnage/classes/cra/', label: 'Fiche Crâ' },
          { href: '/personnage/caracteristiques/', label: 'Caractéristiques' },
          { href: '/personnage/classes/feca/', label: 'Guide Féca' },
        ]}
        sources="passifs_classes.txt, txt_classes.txt, txt_faq.txt"
      />
    </>
  );
}
