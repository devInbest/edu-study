/**
 * Builds src/data/collegeResearch.js from curated parts.
 * Run: node scripts/buildCollegeResearch.mjs
 */
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { medical } from './research-parts/medical.mjs';
import { mba } from './research-parts/mba.mjs';
import { engineering } from './research-parts/engineering.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const GALLERY_POOL = [
  { src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80', alt: 'Campus buildings' },
  { src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80', alt: 'Library study hall' },
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80', alt: 'Lecture hall' },
  { src: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80', alt: 'Hostel corridor' },
  { src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba6851?auto=format&fit=crop&w=1200&q=80', alt: 'Sports ground' },
  { src: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7e11c?auto=format&fit=crop&w=1200&q=80', alt: 'Science laboratory' },
  { src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80', alt: 'Campus walkway' },
  { src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80', alt: 'Reading room' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80', alt: 'Seminar classroom' },
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', alt: 'Student common area' },
  { src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80', alt: 'Campus green' },
  { src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80', alt: 'Engineering lab' },
];

function withGallery(data, offset) {
  return {
    overview: data.overview || '',
    established: data.established || '',
    type: data.type || '',
    affiliation: data.affiliation || '',
    approval: data.approval || '',
    ranking: data.ranking || '',
    website: data.website || '',
    contact: data.contact || '',
    teachingHospital: data.teachingHospital || '',
    campusSize: data.campusSize || '',
    highlights: data.highlights || [],
    courses: data.courses || [],
    courseNotes: data.courseNotes || [],
    cutoffs: data.cutoffs || [],
    admissionSteps: data.admissionSteps || [],
    placements: data.placements || [],
    campusLife: data.campusLife || [],
    gallery: Array.from({ length: 6 }, (_, i) => {
      const item = GALLERY_POOL[(offset + i) % GALLERY_POOL.length];
      return { src: item.src, alt: item.alt };
    }),
  };
}

const SLUG_ORDER = [
  ...Object.keys(medical),
  ...Object.keys(mba),
  ...Object.keys(engineering),
];

const collegeResearch = {};
SLUG_ORDER.forEach((slug, index) => {
  const raw = medical[slug] || mba[slug] || engineering[slug];
  collegeResearch[slug] = withGallery(raw, index);
});

const out = `/** Research profiles from College Research Report 2026. Verify before counselling. */

export const collegeResearch = ${JSON.stringify(collegeResearch, null, 2)};

export function getCollegeResearch(slug) {
  return collegeResearch[slug] || null;
}
`;

const dest = join(root, 'src/data/collegeResearch.js');
writeFileSync(dest, out, 'utf8');
console.log('Wrote', dest, 'keys=', Object.keys(collegeResearch).length);
