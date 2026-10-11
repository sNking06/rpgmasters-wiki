import type { Metadata } from 'next';
import { Essentiel, M, More, PageEnd, PageHeader, Section, STATUS_INFO, TableWrap, Warn, type Status } from '@/components/ui';
import { GAME_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Sources et limites',
  description: 'Wiki non officiel RpgMasters : méthode, légende des pastilles ✓ ~ = ?, lacunes connues, règles de la communauté et fichiers sources.',
};

const FILES: [string, string][] = [
  ['mecaniques.md', 'Mécaniques tirées des pages et du code client publics (stats, classes, cartes, objets, Prestige, arène, saison, coffres, énergie, lacunes, recommandations Crâ).'],
  ['rea_classement.md', 'Compléments : courbe d’XP, énergie, Elo, dégâts (résultats négatifs), Prestige, classement de saison.'],
  ['passifs_classes.txt', 'Textes des passifs des 19 classes (page /classes).'],
  ['txt_faq.txt', 'Texte brut de la page publique /faq.'],
  ['txt_saison.txt', 'Texte brut de la page publique /saison (au moment du relevé).'],
  ['txt_classes.txt', 'Texte brut de la page publique /classes.'],
  ['txt_home.txt', 'Texte brut de la page d’accueil publique.'],
  ['txt_mentions.txt', 'Texte brut de la page publique /mentions (mentions et règles).'],
];

const LEGEND: [Status, string][] = [
  ['T', 'Écrit tel quel dans une page publique ou dans le code client public.'],
  ['D', 'Interprétation des notes sources, à confirmer en jeu.'],
  ['C', 'Calcul fait à partir de valeurs trouvées.'],
  ['N', 'Absent des sources publiques (lacune). Rien n’a été inventé pour la combler.'],
];

export default function SourcesPage() {
  return (
    <>
      <PageHeader section="sources" title="Sources et limites" intro="D’où viennent les infos, comment lire les pastilles, et ce qu’on ne sait pas." />

      <Essentiel>
        <li>
          Wiki <strong>non officiel</strong>, fait par des fans : il peut contenir des erreurs.
        </li>
        <li>
          Tiré uniquement des <strong>pages publiques</strong> du jeu et de son code client public, sans connexion.
        </li>
        <li>
          Relevé le <strong>11 octobre 2026</strong> : rien n’est mis à jour automatiquement.
        </li>
      </Essentiel>

      <Section id="statut" title="Un wiki non officiel">
        <Warn>
          <p>
            Non affilié à l’équipe de RpgMasters ni à <strong>Ankama Games</strong>. Vérifiez toujours en jeu.
          </p>
        </Warn>
        <ul>
          <li>
            RpgMasters est un projet de fans, gratuit et à but non lucratif, sans publicité ni achat, ni affilié, ni soutenu, ni
            approuvé par Ankama Games. <M s="T" />
          </li>
          <li>
            Ses mécaniques sont originales : ne supposez pas que les formules de DOFUS s’appliquent. <M s="T" />
          </li>
          <li>
            Les classes, objets, noms, illustrations… de l’univers DOFUS appartiennent à Ankama Games. Ce wiki ne reproduit{' '}
            <strong>aucune image ni ressource</strong> du jeu. <M s="T" />
          </li>
        </ul>
      </Section>

      <Section id="legende" title="Légende des pastilles">
        <p>En fin de ligne, une petite pastille indique d’où vient l’info (survolez-la pour le détail) :</p>
        <TableWrap caption="Signification des pastilles">
          <thead>
            <tr>
              <th>Pastille</th>
              <th>Sens</th>
            </tr>
          </thead>
          <tbody>
            {LEGEND.map(([s, d]) => (
              <tr key={s}>
                <td>
                  <M s={s} /> {STATUS_INFO[s].label}
                </td>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
        <p>
          ✓ et ~ reprennent les marqueurs [TROUVÉ] et [DÉDUIT] des notes d’origine ; = correspond à [calcul sur TROUVÉ].
        </p>
      </Section>

      <Section id="methode" title="Méthode">
        <ul>
          <li>
            Pages publiques de{' '}
            <a href={GAME_URL} rel="noopener noreferrer">
              rpgmasters.houk.fr
            </a>{' '}
            (/, /faq, /classes, /saison, /mentions) et <strong>code client JavaScript public</strong> (15 fichiers{' '}
            <code>/_next/static/chunks/*.js</code>). <M s="T" />
          </li>
          <li>
            <strong>Lecture seule, sans connexion</strong>, sans API privée. Relevé le 11 octobre 2026 (heure de Paris). <M s="T" />
          </li>
          <li>
            Les combats sont calculés côté serveur : beaucoup de formules restent invisibles. <M s="T" />
          </li>
        </ul>
        <More title="La page Mentions autorise-t-elle cette lecture ?">
          <p>
            La page /mentions ne contient aucune interdiction d’analyser le code client ou de lire les pages publiques. <M s="T" />
          </p>
        </More>
      </Section>

      <Section id="lacunes" title="Ce qu’on ne sait pas">
        <More title="Lacunes connues (10)">
          <ul>
            <li>
              Formules de dégâts. <M s="N" />
            </li>
            <li>
              Formules de PV. <M s="N" />
            </li>
            <li>
              XP réellement gagnée par combat. <M s="N" />
            </li>
            <li>
              Table complète <code>MONSTER_XP_REF</code> (seules quelques valeurs sont citées). <M s="N" />
            </li>
            <li>
              Valeurs des bonus de panoplies. <M s="N" />
            </li>
            <li>
              Coefficients de Force, Intelligence, Chance, Agilité, Vitalité, Sagesse. <M s="N" />
            </li>
            <li>
              Stats de la table d’objets. <M s="N" />
            </li>
            <li>
              Cartes communes (hors cartes de classe). <M s="N" />
            </li>
            <li>
              Calcul de l’Elo et bonus de série de victoires. <M s="N" />
            </li>
            <li>
              Formule du classement de saison, et tout score « Opti ». <M s="N" />
            </li>
          </ul>
        </More>
      </Section>

      <Section id="regles" title="Règles de la communauté">
        <ul>
          <li>
            Un seul compte et un seul personnage par personne. <M s="T" />
          </li>
          <li>
            Pas de triche : scripts, robots ou exploitation de bugs (signale-les plutôt !). <M s="T" />
          </li>
          <li>
            Pas de nom insultant, haineux ou qui usurpe l’identité de quelqu’un. <M s="T" />
          </li>
          <li>
            Les comptes qui ne respectent pas ces règles peuvent être supprimés. <M s="T" />
          </li>
        </ul>
        <More title="Données personnelles">
          <p>
            Seuls l’adresse e-mail (connexion) et les données du personnage sont conservées ; nom et progression visibles
            publiquement dans les classements ; suppression du compte possible à tout moment. <M s="T" />
          </p>
        </More>
      </Section>

      <Section id="fichiers" title="Fichiers sources">
        <More title="Les 8 fichiers du dossier sources/">
          <ul>
            {FILES.map(([f, d]) => (
              <li key={f}>
                <code>{f}</code> — {d}
              </li>
            ))}
          </ul>
        </More>
      </Section>

      <PageEnd current="/sources/" see={[{ href: '/faq/', label: 'FAQ' }, { href: '/', label: 'Accueil' }]} />
    </>
  );
}
