import type { Metadata } from 'next';
import { CardAnalysis } from '@/components/CardAnalysis';
import { CardTable } from '@/components/CardTable';
import { Essentiel, PageEnd, PageHeader, Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Catalogue des cartes',
  description:
    '253 cartes possédées au 26 octobre 2026 : 252/252 dans Ma collection, plus Maîtrise des Popokémons. Raretés, éléments, PA, rôles et repères Féca, Ascension, Kralamoure.',
};

export default function Page() {
  return (
    <>
      <PageHeader
        href="/equipement/cartes/"
        section="stats"
        dateLabel="Données du 26 oct 2026"
        title="Catalogue des cartes"
        intro="Les 253 cartes possédées au 26 octobre 2026 : les 252 de « Ma collection » (0 manquante) et Maîtrise des Popokémons, hors liste standard."
      />
      <Essentiel>
        <li>« Ma collection » affiche 252 / 252 sorts obtenus. Le filtre Manquants est vide.</li>
        <li>/deck en compte 253, dont les 6 cartes Classe et Incarné toujours possédées.</li>
        <li>Maîtrise des Popokémons (Légendaire, 6 PA) est la carte en plus : sur /deck, hors des 252.</li>
        <li>242 effets portent un bonus de doublons : ce sont les valeurs du compte relevé, pas des valeurs de base reconstruites.</li>
      </Essentiel>
      <CardAnalysis />
      <Section id="catalogue" title="Catalogue des cartes">
        <CardTable />
      </Section>
      <PageEnd
        current="/equipement/cartes/"
        see={[
          { href: '/personnage/classes/feca/', label: 'Guide Féca' },
          { href: '/contenus/ascension/', label: 'Ascension' },
          { href: '/contenus/kralamoure/', label: 'Kralamoure' },
          { href: '/a-propos/journal/#p-26-10', label: 'Journal du 26/10' },
          { href: '/a-propos/sources/', label: 'Sources et limites' },
        ]}
        sources="Export /deck et écran « Ma collection », 26 octobre 2026 (Europe/Paris). Fourchettes stackées : tooltips du compte relevé. Écart de noms avec le CSV du 15 octobre 2026 (241 cartes)."
      />
    </>
  );
}
