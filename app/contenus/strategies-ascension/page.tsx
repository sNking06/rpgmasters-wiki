import type { Metadata } from 'next';
import Link from 'next/link';
import { Disc, Essentiel, Fiche, PageEnd, PageHeader, Section, TableWrap, Warn } from '@/components/ui';
import { SectionIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Stratégies communautaires de l’Ascension',
  description: 'Ascension de RpgMasters, étages 105 à 260 : repères officiels (boss Transmutés, paliers de Prestige) et conseils de joueurs non officiels.',
};

const PALIERS: [string, string][] = [
  ['110', 'Prestige 10'],
  ['140', 'Prestige 11'],
  ['170', 'Prestige 12'],
  ['200', 'Prestige 13'],
  ['230', 'Prestige 14'],
  ['260', 'Prestige 15 (avec un record de 130 étages aux Abysses)'],
];

export default function Page() {
  return (
    <>
      <PageHeader href="/contenus/strategies-ascension/" art="ascension" title="Stratégies communautaires de l’Ascension" intro="Étages 105 à 260 : ce que dit le développeur, et la place réservée aux conseils de joueurs." />
      <Warn title="Conseils de joueurs, non officiels">
        <p>
          Les conseils de cette page viennent des discussions du Discord RpgMasters, pas du développeur. Ils sont rédigés au conditionnel et n’ont pas été testés par ce wiki :
          notre record est l’étage 41. Seuls les blocs marqués « Discord officiel » viennent d’une annonce signée du développeur.
        </p>
      </Warn>
      <Essentiel>
        <li>Au-delà de l’étage 100, les boss deviennent des <strong>Transmutés</strong> (« Comte Razof Transmuté »…). <Disc d="08/10" /></li>
        <li>Leurs mécaniques sont « impossibles à deviner à l’avance » : passer son tour deux fois, sorts plus chers, élément qui change, soins inversés, échange de PV, soins du boss avec ta propre force… <Disc d="08/10" /></li>
        <li>Depuis le 12/10, chaque mécanique s’affiche sur la carte du boss, avec une alerte rouge ⚠ le tour où elle tombe. <Disc d="12/10" /></li>
        <li>Les succès vont jusqu’à l’<strong>étage 260</strong>. <Disc d="10/10" /></li>
      </Essentiel>
      <Fiche
        title="Paliers de Prestige (étages 105 à 260)"
        icon={<SectionIcon section="prestige" size={20} />}
        rows={PALIERS.map(([e, p]) => [`Étage ${e}`, p])}
      />
      <Section id="officiel" title="Règles officielles utiles au-delà de l’étage 100">
        <ul>
          <li>Soins et boucliers plafonnés à <strong>40 % des PV max</strong>, <strong>2 sorts de soin ou de bouclier par tour</strong> (3 pour l’Eniripsa et le Sacrieur), Ascension comprise. <Disc d="16/10" /></li>
          <li>Pandawa : les soins d’Ivresse ne sont jamais réduits ni inversés par les mécaniques anti-soin (Inversion des Transmutés comprise). <Disc d="10/10" /></li>
          <li>Fureur des boss : l’arme ne compte plus dans les cartes jouées du tour. <Disc d="20/10" /></li>
          <li>Les étages atteints restent acquis après un Prestige (voir <Link href="/personnage/prestige/">Prestige</Link>).</li>
        </ul>
      </Section>
      <Section id="conseils" title="Conseils de joueurs par tranche d’étages">
        <Warn title="Non officiel : conseils de joueurs">
          <p>
            Résumé du salon #boss-et-stratégies (messages du 13 au 21/10/2026), sans pseudo. Rien de tout cela n’a été testé par ce wiki ni confirmé
            par le développeur : à lire comme des pistes.
          </p>
        </Warn>
        <ul>
          <li><strong>Méta « rush »</strong> : selon les joueurs, il vaudrait mieux tuer vite que chercher à tenir, les Transmutés punissant les combats longs.</li>
          <li><strong>Traversée</strong> serait l’une des cartes les plus jouées à ces étages.</li>
          <li><strong>Appui</strong> se jouerait avec une <strong>dague</strong>.</li>
          <li>Contre les boss à <strong>renvoi</strong>, un deck <strong>mono-élément</strong> serait conseillé.</li>
          <li>Dofus recommandés : <Link href="/equipement/dofus/#passifs">Ébène</Link> (Perforation ×1,3), <Link href="/equipement/dofus/#passifs">Émeraude</Link> (survit une fois à 20 % de PV) et <Link href="/equipement/dofus/#passifs">Ivoire</Link> (aucun coup ordinaire au-delà de 35 % des PV max).</li>
        </ul>
        <TableWrap caption="Tranches d’étages et repères">
          <thead><tr><th>Étages</th><th>Repère officiel</th><th>Conseils de joueurs</th></tr></thead>
          <tbody>
            <tr><td>105 – 110</td><td>Transmutés · P10 à 110</td><td>rush, Traversée, Dofus Ébène / Émeraude / Ivoire</td></tr>
            <tr><td>111 – 260</td><td>P11 à 140 … P15 à 260</td><td>mêmes conseils ; mono-élément contre les boss à renvoi</td></tr>
          </tbody>
        </TableWrap>
        <p>Les messages ne détaillent pas de composition étage par étage, et rien n’a été trouvé pour les étages 42 à 60.</p>
      </Section>
      <PageEnd current="/contenus/strategies-ascension/" see={[{ href: '/contenus/ascension/', label: 'Ascension (étages observés)' }, { href: '/personnage/prestige/', label: 'Prestige' }, { href: '/a-propos/journal/', label: 'Journal des mises à jour' }]} sources="Discord officiel RpgMasters, #annonces (08/10, 10/10, 12/10, 16/10, 20/10) ; #boss-et-stratégies, joueurs (13–21/10, non officiel) ; FAQ du jeu relevée le 20/10" />
    </>
  );
}
