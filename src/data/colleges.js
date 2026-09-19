/**
 * College catalogue from the client brief, grouped by stream and state.
 * Image URLs point at campus / institution photography for directory cards.
 * Research profiles (overview, courses, cutoffs, etc.) come from College_Research_Report_2026.
 */

import { getCollegeResearch } from './collegeResearch';

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const STREAM_ORDER = ['MBBS', 'MD/MS', 'MBA', 'B.Tech'];

/** Filter / display streams. `catalogueStream` maps to the value stored on each college. */
export const STREAM_META = {
  MBBS: {
    title: 'MBBS',
    description:
      'Undergraduate medical colleges across Karnataka, Maharashtra, Uttar Pradesh, West Bengal, and Chhattisgarh.',
    catalogueStream: 'MBBS/MD/MS',
    degrees: ['MBBS'],
  },
  'MD/MS': {
    title: 'MD/MS',
    description:
      'Postgraduate medical colleges offering MD and MS programmes across India.',
    catalogueStream: 'MBBS/MD/MS',
    degrees: ['MD', 'MS'],
  },
  MBA: {
    title: 'MBA',
    description: 'Premier management institutes for postgraduate business programmes.',
    catalogueStream: 'MBA',
  },
  'B.Tech': {
    title: 'B.Tech',
    description: 'Leading engineering and technology institutes for B.Tech / B.E. and postgraduate study.',
    catalogueStream: 'B.Tech',
  },
};

function collegeMatchesStream(college, stream) {
  if (!stream) return true;

  const filterMeta = STREAM_META[stream];
  if (filterMeta) {
    if (college.stream !== filterMeta.catalogueStream) return false;
    if (!filterMeta.degrees?.length) return true;
    return filterMeta.degrees.some((degree) =>
      college.degrees.some((d) => d.toLowerCase() === String(degree).toLowerCase())
    );
  }

  return college.stream === stream;
}

const rawColleges = [
  // ——— MBBS / MD / MS ———
  {
    name: 'Kanachur Institute of Medical Sciences',
    state: 'Karnataka',
    city: 'Mangaluru',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    rating: 3.8,
    reviewCount: 48,
    eligibility: 'NEET-UG / NEET-PG as applicable; Class 12 PCB for MBBS.',
    admissionInfo: 'Centralised counselling based on NEET rank and state quota rules.',
  },
  {
    name: 'Kempegowda Institute of Medical Sciences',
    state: 'Karnataka',
    city: 'Bengaluru',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    rating: 4.4,
    reviewCount: 560,
    eligibility: 'NEET qualified with required percentile for the applied quota.',
    admissionInfo: 'State medical counselling with document verification at allotted college.',
  },
  {
    name: 'BGS Global Institute of Medical Sciences',
    state: 'Karnataka',
    city: 'Bengaluru',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80',
    rating: 4.2,
    reviewCount: 774,
    eligibility: 'NEET with PCB in Class 12 for undergraduate entry.',
    admissionInfo: 'Admission through authorised medical counselling authorities.',
  },
  {
    name: 'Sapthagiri Institute Of Medical Sciences',
    state: 'Karnataka',
    city: 'Bengaluru',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    rating: 3.7,
    reviewCount: 813,
    eligibility: 'NEET score as per current academic year cut-offs.',
    admissionInfo: 'Management and government quota seats as notified annually.',
  },
  {
    name: 'Vydehi institute of Medical Sciences & Research Centre',
    state: 'Karnataka',
    city: 'Bengaluru',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    rating: 3.5,
    reviewCount: 1063,
    eligibility: 'NEET-UG/PG with Karnataka / AIQ eligibility norms.',
    admissionInfo: 'Allotment via official medical counselling rounds.',
  },
  {
    name: 'Smt.Kashibai Navale Medical College and General Hospital',
    state: 'Maharashtra',
    city: 'Pune',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
    rating: 3.7,
    reviewCount: 657,
    eligibility: 'NEET with required subject combination in Class 12.',
    admissionInfo: 'State CET Cell counselling for Maharashtra medical seats.',
  },
  {
    name: 'Dr. N.Y Tasgaonkar Institute of Medical Sciences',
    state: 'Maharashtra',
    city: 'Karjat',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    rating: 3.8,
    reviewCount: 159,
    eligibility: 'NEET qualified candidates meeting domicile/quota criteria.',
    admissionInfo: 'Follow state counselling schedule and reporting guidelines.',
  },
  {
    name: 'Vedanta Institute Of Medical Sciences',
    state: 'Maharashtra',
    city: 'Palghar',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1200&q=80',
    rating: 3.7,
    reviewCount: 171,
    eligibility: 'NEET with Maharashtra / AIQ eligibility as applicable.',
    admissionInfo: 'Counselling-based admission; verify latest seat matrix.',
  },
  {
    name: 'D.Y Patil Medical College, Hospital and Research Centre',
    state: 'Maharashtra',
    city: 'Pune',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    rating: 4.2,
    reviewCount: 3254,
    eligibility: 'NEET percentile as per category and year.',
    admissionInfo: 'Admission through authorised medical counselling authorities.',
  },
  {
    name: 'Heritage Institute of Medical Sciences',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80',
    rating: 4.4,
    reviewCount: 1167,
    eligibility: 'NEET with UP / AIQ eligibility as applicable.',
    admissionInfo: 'UP NEET counselling for state seats; AIQ via MCC where applicable.',
  },
  {
    name: 'Santosh Medical College',
    state: 'Uttar Pradesh',
    city: 'Ghaziabad',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80',
    rating: 3.7,
    reviewCount: 140,
    eligibility: 'NEET-UG for MBBS; NEET-PG for MD/MS.',
    admissionInfo: 'Admission through official UP medical counselling portal.',
  },
  {
    name: 'Venkateshwara Institute of Medical Sciences',
    state: 'Uttar Pradesh',
    city: 'Gajraula',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1200&q=80',
    rating: 3.9,
    reviewCount: 651,
    eligibility: 'NEET with institutional eligibility norms.',
    admissionInfo: 'Central/university counselling processes as notified.',
  },
  {
    name: 'ICARE Institute of Medical Sciences and Research',
    state: 'West Bengal',
    city: 'Haldia',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80',
    rating: 4.1,
    reviewCount: 434,
    eligibility: 'NEET with West Bengal / AIQ criteria.',
    admissionInfo: 'WBMCC counselling for state quota medical seats.',
  },
  {
    name: 'K.P.C Medical College and Hospital',
    state: 'West Bengal',
    city: 'Kolkata',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    rating: 3.9,
    reviewCount: 2446,
    eligibility: 'NEET score meeting cut-off for the allotted round.',
    admissionInfo: 'Follow WBMCC allotment and document checklist.',
  },
  {
    name: 'Sanaka Medical College',
    state: 'West Bengal',
    city: 'Durgapur',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    rating: 3.4,
    reviewCount: 150,
    eligibility: 'NEET with required academic qualifications.',
    admissionInfo: 'State counselling with college-level reporting.',
  },
  {
    name: 'Shri Shankaracharya Institute of Medical Sciences',
    state: 'Chhattisgarh',
    city: 'Bhilai',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    rating: 3.7,
    reviewCount: 1499,
    eligibility: 'NEET with Chhattisgarh / AIQ eligibility.',
    admissionInfo: 'State medical counselling for CG quota seats.',
  },
  {
    name: 'Raipur Institute of Medical Sciences(RIMS)',
    state: 'Chhattisgarh',
    city: 'Raipur',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS', 'MD', 'MS'],
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    rating: 3.8,
    reviewCount: 342,
    eligibility: 'NEET-UG with PCB in qualifying examination.',
    admissionInfo: 'Admission via authorised CG counselling authority.',
  },

  // ——— MBA ———
  {
    name: 'Indian Institute of Management (IIM) Bangalore',
    state: 'Karnataka',
    city: 'Bengaluru',
    stream: 'MBA',
    degrees: ['MBA', 'PGP'],
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewCount: 1329,
    eligibility: 'CAT / GMAT as applicable with bachelor’s degree.',
    admissionInfo: 'Institute selection process including WAT/PI stages.',
  },
  {
    name: 'T.A.PAI Management Institute ,Manipal',
    state: 'Karnataka',
    city: 'Manipal',
    stream: 'MBA',
    degrees: ['MBA', 'PGDM'],
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    reviewCount: 288,
    eligibility: 'Graduation with CAT/XAT/GMAT/NMAT as accepted.',
    admissionInfo: 'Application, shortlisting, and personal interview rounds.',
  },
  {
    name: 'Symbiosis Institute of Buisness Management, Bangalore',
    state: 'Karnataka',
    city: 'Bengaluru',
    stream: 'MBA',
    degrees: ['MBA'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    rating: 4.3,
    reviewCount: 190,
    eligibility: 'SNAP score with graduation eligibility.',
    admissionInfo: 'SNAP → GE-PIWAT selection pathway.',
  },
  {
    name: 'Jamnalal Bajaj Institute of Management Studies, Mumbai',
    state: 'Maharashtra',
    city: 'Mumbai',
    stream: 'MBA',
    degrees: ['MMS', 'MBA'],
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewCount: 493,
    eligibility: 'MAH-MBA/MMS CET or equivalent as notified.',
    admissionInfo: 'State CAP rounds and institute-level processes.',
  },
  {
    name: 'S.P Jain Institute of Management and Research',
    state: 'Maharashtra',
    city: 'Mumbai',
    stream: 'MBA',
    degrees: ['PGDM', 'MBA'],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewCount: 364,
    eligibility: 'CAT / XAT / GMAT with bachelor’s degree.',
    admissionInfo: 'Application review, interviews, and final offer.',
  },
  {
    name: 'Indian Institute of Management (IIM) Lucknow',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    stream: 'MBA',
    degrees: ['MBA', 'PGP'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewCount: 944,
    eligibility: 'CAT with bachelor’s degree meeting IIM norms.',
    admissionInfo: 'CAP / institute admission process after CAT.',
  },
  {
    name: 'Institute of Management Technology (IMT) Ghaziabad',
    state: 'Uttar Pradesh',
    city: 'Ghaziabad',
    stream: 'MBA',
    degrees: ['PGDM', 'MBA'],
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
    rating: 4.4,
    reviewCount: 599,
    eligibility: 'CAT / XAT / GMAT / CMAT as accepted by the institute.',
    admissionInfo: 'Shortlisting followed by personal interview rounds.',
  },
  {
    name: 'Indian Institute of Management (IIM) Raipur',
    state: 'Chhattisgarh',
    city: 'Raipur',
    stream: 'MBA',
    degrees: ['MBA', 'PGP'],
    image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    reviewCount: 316,
    eligibility: 'CAT with bachelor’s degree meeting IIM norms.',
    admissionInfo: 'CAP / institute admission process after CAT.',
  },
  {
    name: 'Amity University, Raipur',
    state: 'Chhattisgarh',
    city: 'Raipur',
    stream: 'MBA',
    degrees: ['MBA'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    rating: 4.4,
    reviewCount: 919,
    eligibility: 'Graduation with entrance/test criteria of the university.',
    admissionInfo: 'Application, screening, and personal interview.',
  },
  {
    name: 'Indian Institute of Management (IIM) Calcutta',
    state: 'West Bengal',
    city: 'Kolkata',
    stream: 'MBA',
    degrees: ['MBA', 'PGP'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewCount: 1130,
    eligibility: 'CAT with bachelor’s degree meeting IIM norms.',
    admissionInfo: 'CAP / institute selection including WAT/PI.',
  },
  {
    name: 'Indian Institute of Foreign Trade (IIFT) Kolkata',
    state: 'West Bengal',
    city: 'Kolkata',
    stream: 'MBA',
    degrees: ['MBA'],
    image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    reviewCount: 422,
    eligibility: 'IIFT entrance / CAT as notified for the programme year.',
    admissionInfo: 'Entrance shortlisting followed by interview stages.',
  },
  {
    name: 'International Management Institute (IMI) Kolkata',
    state: 'West Bengal',
    city: 'Kolkata',
    stream: 'MBA',
    degrees: ['PGDM', 'MBA'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewCount: 346,
    eligibility: 'CAT / XAT / GMAT / CMAT with graduation eligibility.',
    admissionInfo: 'Application review and personal interaction rounds.',
  },

  // ——— B.Tech ———
  {
    name: 'Indian Institute of Science , Bangalore',
    state: 'Karnataka',
    city: 'Bengaluru',
    stream: 'B.Tech',
    degrees: ['B.Tech', 'M.Tech'],
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewCount: 3475,
    eligibility: 'JEE Advanced / GATE as applicable for the programme.',
    admissionInfo: 'JoSAA / institute processes based on programme.',
  },
  {
    name: 'National Institute of Technology Karnataka ,Surathkal',
    state: 'Karnataka',
    city: 'Surathkal',
    stream: 'B.Tech',
    degrees: ['B.Tech', 'M.Tech'],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewCount: 2739,
    eligibility: 'JEE Main for B.Tech; GATE for M.Tech.',
    admissionInfo: 'JoSAA/CSAB counselling for undergraduate seats.',
  },
  {
    name: 'RV College of Engineering',
    state: 'Karnataka',
    city: 'Bengaluru',
    stream: 'B.Tech',
    degrees: ['B.E.', 'M.Tech'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    rating: 4.3,
    reviewCount: 2805,
    eligibility: 'KCET / COMEDK / JEE as per seat type.',
    admissionInfo: 'State and management quota processes as notified.',
  },
  {
    name: 'Institute of Chemical Technology,Mumbai',
    state: 'Maharashtra',
    city: 'Mumbai',
    stream: 'B.Tech',
    degrees: ['B.Tech', 'M.Tech'],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewCount: 1116,
    eligibility: 'MHT-CET / JEE Main as applicable.',
    admissionInfo: 'Maharashtra CAP rounds for engineering admissions.',
  },
  {
    name: 'Veermata Jijabai Technological Institute,Mumbai',
    state: 'Maharashtra',
    city: 'Mumbai',
    stream: 'B.Tech',
    degrees: ['B.Tech', 'M.Tech'],
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    reviewCount: 2014,
    eligibility: 'MHT-CET / JEE with PCM in Class 12.',
    admissionInfo: 'State CAP allotment and institute confirmation.',
  },
  {
    name: 'Visvesvaraya National Institute of technology,Nagpur',
    state: 'Maharashtra',
    city: 'Nagpur',
    stream: 'B.Tech',
    degrees: ['B.Tech', 'M.Tech'],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    reviewCount: 2539,
    eligibility: 'JEE Main for B.Tech programmes.',
    admissionInfo: 'JoSAA counselling based on JEE Main rank.',
  },
  {
    name: 'Indian Institute of Technology (BHU),Varanasi',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    stream: 'B.Tech',
    degrees: ['B.Tech', 'M.Tech'],
    image: 'https://images.unsplash.com/photo-1462536943532-57a629f6cc60?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviewCount: 690,
    eligibility: 'JEE Advanced with Class 12 eligibility norms.',
    admissionInfo: 'JoSAA seat allocation and institute reporting.',
  },
  {
    name: 'Amity University,Noida',
    state: 'Uttar Pradesh',
    city: 'Noida',
    stream: 'B.Tech',
    degrees: ['B.Tech', 'M.Tech'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    rating: 4,
    reviewCount: 6045,
    eligibility: 'Class 12 PCM with university entrance / JEE as applicable.',
    admissionInfo: 'University application, counselling, and fee confirmation.',
  },
  {
    name: 'National Institute of Technology (NIT) Raipur',
    state: 'Chhattisgarh',
    city: 'Raipur',
    stream: 'B.Tech',
    degrees: ['B.Tech', 'M.Tech'],
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    rating: 4.4,
    reviewCount: 2843,
    eligibility: 'JEE Main with Class 12 PCM.',
    admissionInfo: 'JoSAA counselling and institute fee payment schedule.',
  },
  {
    name: 'Bhilai Institute of Technology(BIT) Durg',
    state: 'Chhattisgarh',
    city: 'Durg',
    stream: 'B.Tech',
    degrees: ['B.E.', 'M.Tech'],
    image: 'https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?auto=format&fit=crop&w=1200&q=80',
    rating: 4.2,
    reviewCount: 1023,
    eligibility: 'CGPET / JEE Main as per seat type.',
    admissionInfo: 'State counselling and institute reporting.',
  },
  {
    name: 'National Institute of Technology(NIT) Durgapur',
    state: 'West Bengal',
    city: 'Durgapur',
    stream: 'B.Tech',
    degrees: ['B.Tech', 'M.Tech'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/VJTI_Quadrangle.jpg',
    rating: 4.5,
    reviewCount: 1823,
    eligibility: 'JEE Main for B.Tech programmes.',
    admissionInfo: 'JoSAA/CSAB counselling pathway.',
  },
  {
    name: 'Heritage Institute of Technology',
    state: 'West Bengal',
    city: 'Kolkata',
    stream: 'B.Tech',
    degrees: ['B.Tech', 'M.Tech'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/KPC%2C_Kolkata_Front_gate.jpg',
    rating: 4.3,
    reviewCount: 1714,
    eligibility: 'WBJEE / JEE Main as applicable.',
    admissionInfo: 'WBJEE counselling for undergraduate engineering seats.',
  },
];

export const colleges = rawColleges.map((college, index) => {
  const slug = slugify(college.name);
  const research = getCollegeResearch(slug) || null;
  const overview = research?.overview?.trim();

  return {
    id: `college-${index + 1}`,
    slug,
    country: 'India',
    shortDescription:
      overview ||
      `${college.name} in ${college.city}, ${college.state} offers ${college.degrees.join(', ')} programmes under the ${college.stream} pathway. Edu Study Consultancy helps students evaluate eligibility and plan applications.`,
    ...college,
    eligibility:
      research?.courses?.find((course) => course.eligibility)?.eligibility || college.eligibility,
    admissionInfo: research?.admissionSteps?.length
      ? research.admissionSteps.join(' ')
      : college.admissionInfo,
    research,
  };
});

export function getCollegeBySlug(slug) {
  return colleges.find((college) => college.slug === slug) || null;
}

export function getCollegeFiltersMeta() {
  const states = [...new Set(colleges.map((c) => c.state))].sort();
  const cities = [...new Set(colleges.map((c) => c.city))].sort();
  const streams = STREAM_ORDER.filter((stream) =>
    colleges.some((college) => collegeMatchesStream(college, stream))
  ).map((stream) => ({
    value: stream,
    label: STREAM_META[stream]?.title || stream,
  }));
  return { states, cities, streams };
}

export function filterColleges({ q = '', state = '', city = '', stream = '', degrees = [] } = {}) {
  const query = q.trim().toLowerCase();
  const degreeList = Array.isArray(degrees) ? degrees : [];

  return colleges.filter((college) => {
    const matchesQuery =
      !query ||
      college.name.toLowerCase().includes(query) ||
      college.city.toLowerCase().includes(query) ||
      college.state.toLowerCase().includes(query) ||
      college.stream.toLowerCase().includes(query) ||
      college.degrees.some((degree) => degree.toLowerCase().includes(query));

    const matchesState = !state || college.state === state;
    const matchesCity = !city || college.city === city;
    const matchesStream = collegeMatchesStream(college, stream);
    const matchesDegrees =
      !degreeList.length ||
      degreeList.some((degree) =>
        college.degrees.some((d) => d.toLowerCase() === String(degree).toLowerCase())
      );

    return matchesQuery && matchesState && matchesCity && matchesStream && matchesDegrees;
  });
}

/** Group filtered results into stream → state sections (client list order). */
export function groupCollegesByStreamAndState(list) {
  return STREAM_ORDER.map((stream) => {
    const inStream = list.filter((c) => collegeMatchesStream(c, stream));
    if (!inStream.length) return null;

    // Preserve first-seen state order from the client catalogue
    const statesPresent = [];
    for (const college of inStream) {
      if (!statesPresent.includes(college.state)) {
        statesPresent.push(college.state);
      }
    }

    return {
      stream,
      ...STREAM_META[stream],
      states: statesPresent.map((state) => ({
        state,
        colleges: inStream.filter((c) => c.state === state),
      })),
    };
  }).filter(Boolean);
}
