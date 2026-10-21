import type { Metadata } from 'next';
import Link from 'next/link';
import { Contra, Disc, Essentiel, PageEnd, PageHeader, Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Abysses',
  description: 'Abysses de RpgMasters : étages, reprise après défaite, boss Enragés, récompenses, runes, d’après les annonces officielles du Discord.',
};

export default function Page() {
  return (
    <>
      <PageHeader href="/contenus/abysses/" title="Abysses" intro="Une descente d’étages de plus en plus durs, avec son propre build et ses propres récompenses." />
      <Essentiel>
        <li>Sans limite d’étages depuis le 20/10 (plafond de 1000 auparavant). <Disc d="20/10" /></li>
        <li>Une descente coûte <strong>20 d’énergie</strong> (relevé en jeu). Les bonus de Prestige 15 à 20 demandent des records aux Abysses (voir <Link href="/personnage/prestige/">Prestige</Link>).</li>
        <li>Mode Auto possible, sauf contre les boss <strong>Enragés</strong> (un tous les 5 étages), à jouer à la main. <Disc d="08/10" /></li>
        <li>Les passifs de Dofus, le Compagnon et les bonus de combat du 12/10 (Initiative, sorts à une ligne…) ne s’appliquent pas aux Abysses. <Disc d="12/10" /></li>
      </Essentiel>
      <Section id="regles" title="Règles">
        <ul>
          <li>Reprise après une défaite : on repart 25 étages sous l’étage max de sa meilleure descente, avec le build de ce moment-là ; la graine change. <Disc d="08/10" /> La reprise est aussi enregistrée depuis le perso de saison. <Disc d="20/10" /></li>
          <li>L’Élixir de vie est supprimé. <Disc d="08/10" /></li>
          <li>L’ordre des sorts est fixe : un sort lancé reste à sa place, grisé. <Disc d="09/10" /></li>
          <li>Le bonus « % résistances » n’est proposé qu’une fois, à 50 %. <Disc d="14/10" /> Les stats plafonnées sont retirées des offres et de l’IA Auto. <Disc d="20/10" /></li>
          <li>Changer de classe pendant une descente annule juste le combat d’étage en cours. <Disc d="14/10" /></li>
          <li>Une relance des propositions tous les 25 étages franchis (3 en réserve au plus) ; confirmation avant une nouvelle descente qui laisse une reprise de côté. <Disc d="20/10" /></li>
          <li>Les Abysses joués avec le perso de saison comptent pour le principal (record, succès, classements). <Disc d="12/10" /></li>
        </ul>
      </Section>
      <Section id="recompenses" title="Récompenses">
        <ul>
          <li>Paliers de récompense tous les 10 étages ; Coffres Ultimes aux étages 250, 500, 750 et 1000. <Disc d="08/10" /> Paliers de coffres et de runes prolongés au-delà de 1000. <Disc d="20/10" /></li>
          <li>Un Coffre de trophée au choix tous les 5 étages, et en plus un Coffre de trophée Rayonnant +1 au choix tous les 50. <Disc d="14/10" /></li>
          <li>Boss des Abysses : chances de rune ×5. Coffre de 5 runes aux étages 250, 500, 750 et 1000 la première fois. <Disc d="12/10" /></li>
        </ul>
        <Contra>
          <p>Le 08/10, les Abysses montaient « jusqu’à l’étage 1000 » ; le 20/10, elles sont « sans limite d’étages ». C’est la règle du 20/10 qui s’applique.</p>
        </Contra>
      </Section>
      <PageEnd current="/contenus/abysses/" see={[{ href: '/personnage/prestige/', label: 'Prestige (P15 à P20)' }, { href: '/economie/#runes', label: 'Runes' }, { href: '/a-propos/journal/', label: 'Journal des mises à jour' }]} sources="Discord officiel RpgMasters, #annonces ; Énergie & XP (coût relevé en jeu)" />
    </>
  );
}
