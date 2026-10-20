import Link from 'next/link';
import type { Metadata } from 'next';
import { Essentiel, M, PageEnd, PageHeader, Section } from '@/components/ui';
import { FAQ } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'FAQ courte de RpgMasters par thème : progresser, Prestige, coffres, énergie, objets, combat, modes de jeu, HDV, compte.',
};

export default function FaqPage() {
  return (
    <>
      <PageHeader href="/debuter/faq/" section="faq" title="FAQ" intro="Les questions fréquentes du jeu, résumées en quelques lignes." />

      <Essentiel>
        <li>
          Changer de classe : <strong>1er changement gratuit</strong>, puis 300 000 kamas. <M s="T" />
        </li>
        <li>
          Énergie : <strong>100 max, +1 toutes les 6 min</strong>. <M s="T" />
        </li>
        <li>
          Prestige : <strong>plus aucune perte dès le Prestige 4</strong>. <M s="T" />
        </li>
      </Essentiel>

      <p>
        Synthèse reformulée de la FAQ publique du jeu (38 questions à l’origine). Tout y est trouvé tel quel <M s="T" />.
      </p>

      <nav aria-label="Thèmes de la FAQ">
        <ul className="chips">
          {FAQ.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`}>{g.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      {FAQ.map((g) => (
        <Section key={g.id} id={g.id} title={g.title}>
          {g.items.map((it) => (
            <details key={it.id} id={`q-${it.id}`} className="faq">
              <summary>{it.q}</summary>
              <div className="faq-body">
                <ul>
                  {it.a.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
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

      <PageEnd
        current="/debuter/faq/"
        see={[
          { href: '/debuter/energie-xp/', label: 'Énergie & XP' },
          { href: '/personnage/prestige/', label: 'Prestige' },
          { href: '/economie/', label: 'Économie' },
        ]}
        sources="txt_faq.txt"
      />
    </>
  );
}
