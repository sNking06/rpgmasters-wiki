import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge, PageHeader, Section, Src } from '@/components/ui';
import { FAQ } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'FAQ synthétique de RpgMasters : niveau, Aventure vs Chasse, classe, caractéristiques, Prestige, coffres, énergie, fusion, saison, HDV, Discord, compagnon.',
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="FAQ"
        lead={
          <>
            Synthèse de la FAQ publique du jeu (38 questions à l’origine), reformulée. Tout est <Badge s="T" />.
          </>
        }
      />
      {FAQ.map((g) => (
        <Section key={g.id} id={g.id} title={g.title}>
          {g.items.map((it) => (
            <details key={it.id} id={`q-${it.id}`} className="faq">
              <summary>{it.q}</summary>
              <div className="faq-body">
                {it.a.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {it.see ? (
                  <p>
                    → <Link href={it.see.href}>{it.see.label}</Link>
                  </p>
                ) : null}
              </div>
            </details>
          ))}
        </Section>
      ))}
      <Src>txt_faq.txt</Src>
    </>
  );
}
