const fs = require('fs');

const path = 'src/data/colleges.js';
let text = fs.readFileSync(path, 'utf8');
const ratings = JSON.parse(fs.readFileSync('scripts/.google_ratings.json', 'utf8'));

for (const [name, info] of Object.entries(ratings)) {
  if (!info.rating) {
    console.log('SKIP', name);
    continue;
  }

  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(name: '${escaped}',[\\s\\S]*?image: '[^']+',)`);

  if (!re.test(text)) {
    console.log('MISS', name);
    continue;
  }

  text = text.replace(re, (match) => {
    if (match.includes('rating:')) return match;
    return `${match}\n    rating: ${info.rating},\n    reviewCount: ${info.reviewCount},`;
  });

  console.log('OK', name, info.rating, info.reviewCount);
}

fs.writeFileSync(path, text);
console.log('written');
