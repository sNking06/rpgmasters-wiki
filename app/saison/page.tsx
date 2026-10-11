import Link from 'next/link';
import type { Metadata } from 'next';
import { Bars, Essentiel, Fiche, M, More, PageEnd, PageHeader, Section, Tip, Warn } from '@/components/ui';
import { DATA_DATE_LABEL, SEASON_END } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Saison Héroïque',
  description: 'Saison Héroïque de RpgMasters (9–12 oct 2026) : XP ×4, pas d’énergie, mort définitive face aux boss, banque, classement 6 modes, récompenses.',
};

const ULTIMES = [10, 8, 6, 5, 4, 3, 2, 1, 1, 1];

// Chronologie : du ven. 9 oct 18:00 au lun. 12 oct 08:00 = 62 h ; relevé le 11 oct vers 17 h (fin « dans 14 h 50 »).
const SEASON_HOURS = 62;
const ELAPSED_AT_DATA = SEASON_HOURS - (14 + 50 / 60);

export default function SaisonPage() {
  const pct = (ELAPSED_AT_DATA / SEASON_HOURS) * 100;
  return (
    <>
      <PageHeader
        title="Saison Héroïque"
        intro="Un perso éphémère, XP ×4, sans énergie — mais les boss tuent pour de bon."
        dateBadge={`fin ${SEASON_END}`}
      />

      <Essentiel>
        <li>
          Un <strong>perso créé de zéro</strong>, en plus du principal, qui reste intact. <M s="T" />
        </li>
        <li>
          <strong>Pas d’énergie</strong> (combats gratuits) et <strong>XP ×4</strong>. <M s="T" />
        </li>
        <li>
          <strong>Mort définitive contre les boss</strong> : une défaite face à un boss arrête le perso. <M s="T" />
        </li>
        <li>
          Récompenses et <strong>contenu de la Banque</strong> versés sur le perso principal à la fin. <M s="T" />
        </li>
      </Essentiel>

      <Warn title={`${DATA_DATE_LABEL} — fin ${SEASON_END}`}>
        <p>
          Ce wiki n’est pas mis à jour en direct : après cette date, cette page décrit une saison passée. Vérifiez la page
          Saison du jeu.
        </p>
      </Warn>

      <Section id="dates" title="Chronologie">
        <figure className="viz">
          <div
            className="season-bar"
            role="img"
            aria-label={`Saison de 62 heures, environ ${Math.round(pct)} % écoulés au moment du relevé.`}
          >
            <span className="season-elapsed" style={{ width: `${pct}%` }} />
            <span className="season-now" style={{ left: `calc(${pct}% - 2px)` }} />
          </div>
          <ul className="season-legend">
            <li>
              <strong>Début</strong> ven. 9 oct, 18:00
            </li>
            <li>
              <strong>Relevé</strong> 11 oct vers 17 h
            </li>
            <li>
              <strong>Fin</strong> lun. 12 oct, 08:00
            </li>
          </ul>
          <figcaption>
            Heure de Paris. Au relevé, la page indiquait une fin « dans 14 h 50 ». <M s="T" />
          </figcaption>
        </figure>
      </Section>

      <Fiche
        title="🏆 Fiche saison"
        rows={[
          ['Dates', '9 → 12 oct 2026'],
          ['XP', '×4'],
          ['Énergie', 'illimitée'],
          ['Face aux boss', 'mort définitive'],
          ['Prestige max', '10'],
          ['Banque', '8 places, +3 par Prestige'],
          ['Persos classés', '1 289 (au relevé)'],
          ['Récompenses', 'sur le perso principal'],
        ]}
      />

      <Section id="regles" title="Règles Héroïques">
        <ul>
          <li>
            Classe au choix. On passe d’un perso à l’autre avec le sélecteur Principal / Saison. <M s="T" />
          </li>
          <li>
            Le perso mort reste au classement avec son niveau. <M s="T" />
          </li>
          <li>
            HDV de saison séparé ; pas de guilde, de Faille ni de succès. <M s="T" />
          </li>
          <li>
            Prestiges limités à <strong>10</strong> ; les suivants (jusqu’au 15) seulement sur le perso principal. <M s="T" />
          </li>
        </ul>
        <Tip title="Astuces de saison">
          <ul>
            <li>
              Le <strong>bonus Discord</strong> est partagé avec le perso de saison : liez-le depuis le perso principal.{' '}
              <M s="T" />
            </li>
            <li>
              <strong>Après une mort</strong>, un nouveau perso gagne <strong>XP ×2 en plus</strong> tant qu’il est sous le
              niveau du perso tombé. <M s="T" />
            </li>
          </ul>
        </Tip>
        <More title="Première défaite adoucie">
          <p>
            La première fois que le compte meurt, la moitié du stuff équipé et des équipements en inventaire attend sur le
            prochain perso de saison (une seule fois). Les morts suivantes ne rendent rien. <M s="T" />
          </p>
        </More>
      </Section>

      <Section id="banque" title="Banque de saison">
        <ul>
          <li>
            <strong>8 emplacements, +3 par Prestige</strong> (selon le record de la saison), depuis l’inventaire de saison.{' '}
            <M s="T" />
          </li>
          <li>
            Son contenu <strong>survit à la mort</strong> ; les objets éternels y sont mis à l’abri si le perso meurt. <M s="T" />
          </li>
          <li>
            Fin de saison : <strong>tout</strong> son contenu passe définitivement dans l’inventaire du perso principal (lundi
            8 h). <M s="T" />
          </li>
        </ul>
        <More title="Objet éternel en saison">
          <p>
            L’objet éternel de Prestige n’est donné que si le Prestige dépasse le record déjà récompensé sur le compte.{' '}
            <M s="T" />
          </p>
        </More>
      </Section>

      <Section id="classement" title="Classement">
        <ul>
          <li>
            <strong>Moyenne des places</strong> dans 6 modes (Niveau, Aventure, Ascension, Abysses, Arène, Collection).{' '}
            <Link href="/arene/#classement-saison">Détail</Link> <M s="T" />
          </li>
          <li>
            Au relevé : <strong>1 289 persos classés</strong>, morts compris (score au moment de la mort). <M s="T" />
          </li>
          <li>
            Fin de saison : classement figé. <M s="T" />
          </li>
        </ul>
        <More title="Quelles classes en haut du classement ?">
          <p>
            Top 30 affiché : surtout Zobal, puis Iop, Ouginak, Féca, Roublard (extrait observé, non exhaustif). Aucun Crâ dans ce
            top 30 ; un Crâ à la 69e place du top 100. <M s="T" />
          </p>
          <p>
            On ne peut rien en conclure de fiable sur la force des classes. <M s="D" />
          </p>
        </More>
      </Section>

      <Section id="recompenses" title="Récompenses">
        <ul>
          <li>
            Sur le <strong>perso principal</strong>, une fois par compte, pour son meilleur perso. <M s="T" />
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
        current="/saison/"
        see={[
          { href: '/arene/#classement-saison', label: 'Classement 6 modes' },
          { href: '/prestige/', label: 'Prestige' },
          { href: '/energie-xp/', label: 'Énergie & XP' },
        ]}
        sources="txt_saison.txt, txt_faq.txt, mecaniques.md §7"
      />
    </>
  );
}
