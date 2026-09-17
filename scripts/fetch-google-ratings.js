const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const queries = [
  ['Kanachur Institute of Medical Sciences', 'Kanachur Institute of Medical Sciences Mangalore'],
  ['Kempegowda Institute of Medical Sciences', 'Kempegowda Institute of Medical Sciences Bangalore'],
  ['BGS Global Institute of Medical Sciences', 'BGS Global Institute of Medical Sciences Bangalore'],
  ['Sapthagiri Institute Of Medical Sciences', 'Sapthagiri Institute of Medical Sciences Bangalore'],
  ['Vydehi institute of Medical Sciences & Research Centre', 'Vydehi Institute of Medical Sciences Bangalore'],
  ['Smt.Kashibai Navale Medical College and General Hospital', 'Smt Kashibai Navale Medical College Pune'],
  ['Dr. N.Y Tasgaonkar Institute of Medical Sciences', 'Dr NY Tasgaonkar Institute of Medical Sciences Karjat'],
  ['Vedanta Institute Of Medical Sciences', 'Vedanta Institute of Medical Sciences Palghar'],
  ['D.Y Patil Medical College, Hospital and Research Centre', 'Dr DY Patil Medical College Pimpri Pune'],
  ['Heritage Institute of Medical Sciences', 'Heritage Institute of Medical Sciences Varanasi'],
  ['Santosh Medical College', 'Santosh Medical College Ghaziabad'],
  ['Venkateshwara Institute of Medical Sciences', 'Venkateshwara Institute of Medical Sciences Gajraula'],
  ['ICARE Institute of Medical Sciences and Research', 'ICARE Institute of Medical Sciences Haldia'],
  ['K.P.C Medical College and Hospital', 'KPC Medical College and Hospital Kolkata'],
  ['Sanaka Medical College', 'Sanaka Medical College and Hospital Durgapur'],
  ['Shri Shankaracharya Institute of Medical Sciences', 'Shri Shankaracharya Institute of Medical Sciences Bhilai'],
  ['Raipur Institute of Medical Sciences(RIMS)', 'Raipur Institute of Medical Sciences'],
  ['Indian Institute of Management (IIM) Bangalore', 'Indian Institute of Management Bangalore'],
  ['T.A.PAI Management Institute ,Manipal', 'TAPMI Manipal'],
  ['Symbiosis Institute of Buisness Management, Bangalore', 'Symbiosis Institute of Business Management Bangalore'],
  ['Jamnalal Bajaj Institute of Management Studies, Mumbai', 'JBIMS Mumbai'],
  ['S.P Jain Institute of Management and Research', 'SPJIMR Mumbai'],
  ['Indian Institute of Management (IIM) Lucknow', 'Indian Institute of Management Lucknow'],
  ['Institute of Management Technology (IMT) Ghaziabad', 'IMT Ghaziabad'],
  ['Indian Institute of Management (IIM) Raipur', 'Indian Institute of Management Raipur'],
  ['Amity University, Raipur', 'Amity University Raipur'],
  ['Indian Institute of Management (IIM) Calcutta', 'Indian Institute of Management Calcutta'],
  ['Indian Institute of Foreign Trade (IIFT) Kolkata', 'IIFT Kolkata'],
  ['International Management Institute (IMI) Kolkata', 'IMI Kolkata'],
  ['Indian Institute of Science , Bangalore', 'Indian Institute of Science Bangalore'],
  ['National Institute of Technology Karnataka ,Surathkal', 'NITK Surathkal'],
  ['RV College of Engineering', 'RV College of Engineering Bangalore'],
  ['Institute of Chemical Technology,Mumbai', 'Institute of Chemical Technology Mumbai'],
  ['Veermata Jijabai Technological Institute,Mumbai', 'VJTI Mumbai'],
  ['Visvesvaraya National Institute of technology,Nagpur', 'VNIT Nagpur'],
  ['Indian Institute of Technology (BHU),Varanasi', 'IIT BHU Varanasi'],
  ['Amity University,Noida', 'Amity University Noida'],
  ['National Institute of Technology (NIT) Raipur', 'NIT Raipur'],
  ['Bhilai Institute of Technology(BIT) Durg', 'Bhilai Institute of Technology Durg'],
  ['National Institute of Technology(NIT) Durgapur', 'NIT Durgapur'],
  ['Heritage Institute of Technology', 'Heritage Institute of Technology Kolkata'],
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = {};

  for (const [key, q] of queries) {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(q)}`;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(3500);
      const text = await page.evaluate(() => document.body.innerText);
      const m = text.match(/(\d\.\d)\s*\(([\d,]+)\)/);
      if (m) {
        results[key] = {
          rating: Number(m[1]),
          reviewCount: Number(m[2].replace(/,/g, '')),
          source: 'google-maps',
        };
        console.log(`${m[1]}\t${m[2]}\t${key}`);
      } else {
        results[key] = { rating: null, reviewCount: null, source: 'not-found' };
        console.log(`NULL\t-\t${key}`);
      }
    } catch (e) {
      results[key] = { rating: null, reviewCount: null, source: 'error', error: String(e) };
      console.log(`ERR\t${key}\t${e.message}`);
    }
  }

  const out = path.join(__dirname, '.google_ratings.json');
  fs.writeFileSync(out, JSON.stringify(results, null, 2));
  const ok = Object.values(results).filter((r) => r.rating).length;
  console.log(`DONE ${ok}/${queries.length} -> ${out}`);
  await browser.close();
})();
