import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge, Callout, Fact, Facts, PageHeader, Section } from '@/components/ui';
import { DATA_DATE, GAME_URL, NAV, SEASON_DATES, SEASON_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Wiki de fans non officiel de RpgMasters : mécaniques relevées sur les pages publiques du jeu, avec leur niveau de certitude.',
};

export default function Home() {
  return (
    <>
      <PageHeader
        title="Wiki RpgMasters (non officiel)"
        lead={
          <>
            Un petit wiki de fans qui rassemble, en français clair, les mécaniques du jeu{' '}
            <a href={GAME_URL} rel="noopener noreferrer">RpgMasters</a> relevées sur ses pages publiques.
          </>
        }
      />

      <Callout kind="warn">
        <p>
          <strong>Avertissement.</strong> Ce wiki n’est <strong>pas officiel</strong>. Il n’est affilié ni à l’équipe du jeu
          ni à Ankama Games. RpgMasters est lui-même un projet de fans, gratuit et à but non lucratif, non affilié à
          Ankama Games. Les informations peuvent contenir des erreurs : vérifiez en jeu.
        </p>
      </Callout>

      <Section id="donnees" title="Date des données">
        <Facts>
          <Fact s="T">
            Données relevées le <strong>{DATA_DATE}</strong> (heure de Paris). Rien n’est mis à jour automatiquement.
          </Fact>
          <Fact s="T">
            Saison relevée : <strong>{SEASON_NAME}</strong>, {SEASON_DATES}. Voir la page{' '}
            <Link href="/saison/">Saison</Link> (données du {DATA_DATE}).
          </Fact>
        </Facts>
      </Section>

      <Section id="legende" title="Comment lire ce wiki">
        <p>Chaque fait est précédé d’un badge qui indique d’où il vient :</p>
        <Facts>
          <Fact s="T">Écrit tel quel dans une page publique du jeu ou dans son code client public.</Fact>
          <Fact s="D">Interprétation des auteurs des notes sources, à confirmer en jeu.</Fact>
          <Fact s="C">Calcul fait à partir de valeurs trouvées.</Fact>
          <Fact s="N">Information absente des sources publiques (lacune) : rien n’a été inventé pour la combler.</Fact>
        </Facts>
        <p>
          Détails sur la méthode : <Link href="/sources/">Sources et limites</Link>. Les badges <Badge s="T" /> et{' '}
          <Badge s="D" /> reprennent les marqueurs des notes d’origine.
        </p>
      </Section>

      <Section id="sections" title="Sections">
        <ul className="cards">
          {NAV.map((n) => (
            <li key={n.href} className="card">
              <Link className="card-title" href={n.href}>
                {n.label}
              </Link>
              <p>{n.desc}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
