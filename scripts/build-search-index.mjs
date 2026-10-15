// Génère out/search-index.json à partir des pages HTML exportées (une entrée par page et par section).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const OUT = join(process.cwd(), 'out');

async function walk(dir) {
  const files = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === '_next' || e.name.startsWith('_') || e.name === '404') continue;
      files.push(...(await walk(p)));
    } else if (e.name === 'index.html') {
      files.push(p);
    }
  }
  return files;
}

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));

const toText = (html) =>
  decode(
    html
      .replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<(br|\/p|\/li|\/tr|\/h\d|\/summary|\/td|\/th)[^>]*>/gi, ' ')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/\s+/g, ' ')
    .trim();

const index = [];
for (const file of await walk(OUT)) {
  const html = await readFile(file, 'utf8');
  if (/<meta[^>]+http-equiv="refresh"/i.test(html)) continue;
  const breadcrumb = html.match(/<nav[^>]+class="crumbs"[^>]*>([\s\S]*?)<\/nav>/i)?.[1] ?? '';
  const sectionPath = [...breadcrumb.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map(m => toText(m[1])).filter(s => s !== 'Accueil').join(' › ');
  const rel = relative(OUT, file).split(sep).join('/');
  const url = '/' + rel.replace(/index\.html$/, '');
  // Les <nav> (fil d'Ariane, « Voir aussi », précédent/suivant, sommaires) ne sont pas du contenu : on les retire.
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '').replace(/<nav[\s\S]*?<\/nav>/gi, ' ');
  const page = toText(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '') || url;

  const parts = main.split(/<section id="/i);
  const intro = toText(parts[0].replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, ''));
  index.push({ title: page, page: sectionPath || page, sectionPath, url, text: intro });

  for (const part of parts.slice(1)) {
    const id = part.slice(0, part.indexOf('"'));
    const title = toText(part.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)?.[1] ?? id);
    const body = toText(part.replace(/^[^>]*>/, '').replace(/<h2[^>]*>[\s\S]*?<\/h2>/i, ''));
    index.push({ title, page: sectionPath || page, sectionPath, url: `${url}#${id}`, text: body });
  }
}

index.sort((a, b) => a.url.localeCompare(b.url));
await writeFile(join(OUT, 'search-index.json'), JSON.stringify(index));
console.log(`search-index.json : ${index.length} entrées`);
