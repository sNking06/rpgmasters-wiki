/** Noms des scènes originales et correspondance des URLs publiques. */
export type IllustrationName = 'home' | 'debuter' | 'personnage' | 'equipement' | 'monde' | 'contenus' | 'economie' | 'kralamoure' | 'feca' | 'momore' | 'ascension' | 'jardins-d-hiver';

export function illustrationFor(url: string): IllustrationName {
  const parts = url.split('/').filter(Boolean);
  const special: Record<string, IllustrationName> = {
    kralamoure: 'kralamoure', feca: 'feca', panoplies: 'momore',
    ascension: 'ascension', 'jardins-d-hiver': 'jardins-d-hiver',
  };
  const last = parts.at(-1) ?? '';
  if (special[last]) return special[last];
  const sections = ['debuter', 'personnage', 'equipement', 'monde', 'contenus', 'economie'];
  return sections.includes(parts[0]) ? parts[0] as IllustrationName : 'home';
}
