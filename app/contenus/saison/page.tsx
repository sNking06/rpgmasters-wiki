import GameCapture from '@/components/GameCapture';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SectionIcon } from '@/components/icons';
import { Bars, Essentiel, Fiche, M, PageEnd, PageHeader, Section, Warn, Contra, Disc, Officiel } from '@/components/ui';
import { SEASON_END } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Saison des Cartes',
  description: 'La saison des Cartes de RpgMasters (18–25 oct 2026) : XP ×4, énergie illimitée, packs de cartes, pas de mort définitive, banque, classement 6 modes et récompenses. Relevé du 20 oct 2026.',
};

const ULTIMES = [10, 8, 6, 5, 4, 3, 2, 1, 1, 1];

// Du dim. 18 oct 17:14 au dim. 25 oct 18:00 (heure de Paris) ; relevé le mar. 20 oct vers 16:50 (fin « dans 5 j 2 h »).
const START = Date.UTC(2026, 9, 18, 15, 14);
const END = Date.UTC(2026, 9, 25, 16, 0);
const READ_AT = Date.UTC(2026, 9, 20, 14, 50);
const SEASON_HOURS = (END - START) / 3.6e6;

export default function SaisonPage() {
  const pct = ((READ_AT - START) / (END - START)) * 100;
  return (
    <>
      <PageHeader href="/contenus/saison/"
        section="saison"
        title="La saison des Cartes"
        intro="Un perso de saison en plus du principal : XP ×4, combats gratuits, packs de cartes, et pas de mort définitive cette fois."
        dateBadge={`fin ${SEASON_END}`}
      />

      <Essentiel>
        <li>
          Un <strong>perso créé de zéro</strong> (classe au choix), en plus du principal, qui reste intact. <M s="T" />
        </li>
        <li>
          <strong>Pas d’énergie</strong> (combats gratuits) et <strong>XP ×4</strong>. <M s="T" />
        </li>
        <li>
          <strong>Pas de mort définitive</strong> cette saison. <M s="T" />
        </li>
        <li>
          Chaque victoire peut donner un <strong>pack de 4 cartes de monstres</strong>. <M s="T" />
        </li>
        <li>
          Récompenses et <strong>contenu de la Banque</strong> versés sur le perso principal à la fin. <M s="T" />
        </li>
      </Essentiel>

      <GameCapture id="site-saison" caption="Page publique Saison au 20 oct 2026 (saison des Cartes)" />

      <Warn title="Relevé du 20 oct 2026 vers 16 h 50 (Paris)">
        <p>
          Texte repris de la page publique Saison du jeu ce jour-là. Ce wiki n’est pas mis à jour en direct : après le{' '}
          {SEASON_END}, cette page décrit une saison passée. Vérifiez la page Saison du jeu.
        </p>
      </Warn>

      <Section id="dates" title="Chronologie">
        <figure className="viz">
          <div
            className="season-bar"
            role="img"
            aria-label={`Saison d’environ ${Math.round(SEASON_HOURS)} heures, environ ${Math.round(pct)} % écoulés au moment du relevé.`}
          >
            <span className="season-elapsed" style={{ width: `${pct}%` }} />
            <span className="season-now" style={{ left: `calc(${pct}% - 2px)` }} />
          </div>
          <ul className="season-legend">
            <li>
              <strong>Début</strong> dim. 18 oct, 17:14
            </li>
            <li>
              <strong>Relevé</strong> mar. 20 oct vers 16 h 50
            </li>
            <li>
              <strong>Fin</strong> dim. 25 oct, 18:00
            </li>
          </ul>
          <figcaption>
            Heure de Paris. Au relevé, la page indiquait une fin « dans 5 j 2 h ». <M s="T" />
          </figcaption>
        </figure>
      </Section>

      <Fiche
        title="Fiche saison"
        icon={<SectionIcon section="saison" size={20} />}
        rows={[
          ['Nom', 'La saison des Cartes'],
          ['Dates', '18 → 25 oct 2026'],
          ['XP', '×4'],
          ['Énergie', 'illimitée'],
          ['Mort définitive', 'non (cette saison)'],
          ['Banque', '8 places, +3 par Prestige'],
          ['Récompenses', 'sur le perso principal'],
        ]}
      />

      <Section id="regles" title="Règles Héroïques">
        <ul>
          <li>
            Un <strong>perso créé de zéro</strong> (classe au choix), en plus du perso principal, qui reste intact. <M s="T" />
          </li>
          <li>
            <strong>Pas d’énergie</strong> : combats gratuits. <strong>XP ×4</strong>. <M s="T" />
          </li>
          <li>
            <strong>Packs de cartes</strong> : chaque victoire, dans tous les modes, peut donner un pack de 4 cartes de monstres
            (3 Communes + 1 Rare ou mieux). Les gros boss sont <strong>Arc-en-ciel</strong>, et toute carte a 0,1 % de chance
            d’être <strong>Alternative</strong>. <M s="T" />
          </li>
          <li>
            <strong>Classement sur la collection</strong> : le top 10 gagne un coffre avec un objet au hasard de la pano Mehdi.
            Une famille de monstres complète donne un bonus de stats. <M s="T" />
          </li>
          <li>
            <strong>Pas de mort définitive</strong> cette saison. <M s="T" />
          </li>
          <li>
            <strong>Le Prestige ne fait rien perdre</strong> : cartes, packs, poussières d’étoiles et présentoir restent
            intacts. <M s="T" />
          </li>
          <li>
            HDV de saison séparé ; pas de guilde, de Faille ni de succès pour le perso de saison. <M s="T" />
          </li>
        </ul>
      </Section>

      <Section id="officiel" title="Annonces officielles des saisons">
        <Officiel title="La saison des Cartes" d="18/10">
          <p>Dimanche 18 oct. 18 h → dimanche 25 oct. 18 h (Paris) : XP ×4 toute la semaine, énergie illimitée, top 10 = coffre de la pano Mehdi ; chaque victoire peut lâcher un pack de 4 cartes ; gros boss Arc-en-ciel, 0,1 % de cartes Alternatives ; famille complète = bonus de stats ; la Banque part sur le perso principal à la fin. Le patch du 20/10 confirme la fin affichée au dimanche 25/10 à 18 h. <Disc d="20/10" /></p>
        </Officiel>
        <GameCapture id="patch-saison-cartes-annonce" />
        <Contra title="Dates de la saison des Cartes">
          <p>Un autre visuel officiel de la saison des Cartes indique « Du vendredi 23 octobre 18h au lundi 26 octobre 8h » (date de publication non relevée). L’annonce du 18/10, le patch du 20/10 et la page Saison du jeu (relevée le 20/10) disent du 18 au 25 oct à 18 h : ce sont ces dates qui sont gardées.</p>
        </Contra>
        <h3>Première saison : la Saison Héroïque (9 → 12 oct)</h3>
        <ul>
          <li>Annoncée le 08/10 : une saison toutes les deux semaines, du vendredi 18 h au lundi 8 h. Héros de saison de zéro, aucune énergie, XP ×4, <strong>mort définitive contre les boss</strong> (Chemin, boss de zone, Ascension), rejoueur avec XP bonus, HDV séparé, pas de guilde, de Krala, de quêtes du jour ni de succès. <Disc d="08/10" /></li>
          <li>Récompenses sur le perso principal : Top 100 de 100 Coffres Légendaires (1er) à 10 (100e) ; Top 10 en plus 10 / 8 / 6 / 5 / 4 / 3 / 2 / 1 / 1 / 1 Coffres Ultimes ; couronne pour le 1er. <Disc d="08/10" /></li>
          <li>Première mort adoucie (moitié du stuff gardée, une fois par compte) ; la Banque (8 places, +3 par Prestige) ; récompense de Prestige une seule fois par compte et par palier. <Disc d="09/10" /></li>
          <li>Fin : <strong>seule la Banque</strong> est transférée sur le perso principal ; les objets éternels peuvent y être rangés et restent éternels. <Disc d="11/10" /> <Disc d="12/10" /></li>
          <li>Les Abysses joués avec le perso de saison comptent pour le perso principal. <Disc d="12/10" /></li>
        </ul>
      </Section>

      <Section id="banque" title="Banque de saison">
        <ul>
          <li>
            <strong>8 emplacements, +3 par Prestige</strong> (selon le record de la saison). On peut y ranger des objets pour
            les retrouver sur le perso principal. <M s="T" />
          </li>
          <li>
            Fin de saison : son contenu est transféré <strong>définitivement</strong> dans l’inventaire du perso principal
            (dimanche 25 octobre à 18 h). <M s="T" />
          </li>
          <li>
            <strong>Objet éternel</strong> de Prestige : donné seulement si le Prestige dépasse le record déjà récompensé sur le
            compte. <M s="T" />
          </li>
        </ul>
        <GameCapture id="saison-banque" caption="Règles de la saison des Cartes en jeu, dont la Banque de saison" />
      </Section>

      <Section id="classement" title="Classement">
        <ul>
          <li>
            <strong>Moyenne des places</strong> dans les 6 modes (Niveau, Aventure, Ascension, Abysses, Arène, Collection),
            parmi les persos de la saison. <Link href="/contenus/arene/#classement-saison">Détail</Link> <M s="T" />
          </li>
          <li>
            Fin de saison : classement figé. <M s="T" />
          </li>
        </ul>
        <GameCapture id="site-saison-classement" caption="Haut du classement de la saison, pseudos floutés" />
      </Section>

      <Section id="recompenses" title="Récompenses">
        <ul>
          <li>
            Versées sur le <strong>perso principal</strong> (coffres). <M s="T" />
          </li>
          <li>
            <strong>Top 100</strong> : de <strong>100 Coffres Légendaires</strong> (1er) à <strong>10</strong> (100e).{' '}
            <M s="T" />
          </li>
          <li>
            <strong>Top 10</strong> : Coffres Ultimes en plus. Le 1er porte la couronne 👑 dans le chat jusqu’à la saison
            suivante. <M s="T" />
          </li>
        </ul>
        <Bars
          label="Coffres Ultimes du top 10"
          max={10}
          items={ULTIMES.map((n, i) => ({ name: `${i + 1}${i ? 'e' : 'er'}`, value: n, display: String(n), hl: i === 0 }))}
          caption={
            <>
              Coffres Ultimes par place (en plus des Légendaires). <M s="T" />
            </>
          }
        />
        <p>
          Coffres Légendaires des places intermédiaires : seules les bornes (100 au 1er, 10 au 100e) sont écrites. <M s="N" />
        </p>
      </Section>

      <PageEnd
        current="/contenus/saison/"
        see={[
          { href: '/contenus/arene/#classement-saison', label: 'Classement 6 modes' },
          { href: '/personnage/prestige/', label: 'Prestige' },
          { href: '/debuter/energie-xp/', label: 'Énergie & XP' },
        ]}
        sources="Page publique /saison relevée le 20 oct 2026"
      />
    </>
  );
}
