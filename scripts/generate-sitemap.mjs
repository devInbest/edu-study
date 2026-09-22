import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractQuoted(filePath, pattern) {
  const source = readFileSync(filePath, 'utf8');
  return [...source.matchAll(pattern)].map((match) => match[1]);
}

const siteUrl = (
  process.env.VITE_SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://edustudyconsultancy.com'
).replace(/\/$/, '');

const staticPaths = ['', '/about', '/services', '/colleges', '/contact', '/privacy', '/terms'];

const courseSlugs = extractQuoted(
  path.join(root, 'src/data/courses.js'),
  /slug:\s*['"]([^'"]+)['"]/g,
).filter((slug) => slug !== 'mbbs-md-ms');

const collegeNames = extractQuoted(
  path.join(root, 'src/data/colleges.js'),
  /name:\s*['"]([^'"]+)['"]/g,
);
const collegeSlugs = collegeNames.map(slugify);

const urls = [
  ...staticPaths,
  ...[...new Set(courseSlugs)].map((slug) => `/courses/${slug}`),
  ...[...new Set(collegeSlugs)].map((slug) => `/colleges/${slug}`),
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (pathname) => `  <url>
    <loc>${siteUrl}${pathname}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const outPath = path.join(root, 'dist', 'sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`Wrote ${urls.length} URLs to dist/sitemap.xml`);
