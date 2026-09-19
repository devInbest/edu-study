export const heroContent = {
  brand: 'Edu Study Consultancy',
  headline: 'Your Journey to the Right Education Starts Here',
  supporting:
    'Trusted admission guidance, career counselling, and local guardian support for students across India.',
  ctas: [
    { label: 'Get Free Counselling', href: '/contact', variant: 'filled' },
    { label: 'WhatsApp Us', href: 'whatsapp', variant: 'outline' },
    { label: 'Explore Colleges', href: '/colleges', variant: 'subtle' },
  ],
};

export const processSteps = [
  {
    title: 'Understand',
    description: 'We learn your goals, academic profile, and preferred study destinations.',
  },
  {
    title: 'Guide',
    description: 'Counsellors map career paths and recommend the right streams and degrees.',
  },
  {
    title: 'Shortlist',
    description: 'We curate colleges that match eligibility, budget, and location preferences.',
  },
  {
    title: 'Assist',
    description: 'From applications to documentation, we stay with you through every step.',
  },
  {
    title: 'Support',
    description: 'Local guardian support continues after admission for a smooth campus life.',
  },
];

export const aboutContent = {
  mission:
    'To help every student find a college and course that fits their ambition, ability, and future.',
  vision:
    'To be India’s most trusted education consultancy for transparent counselling and admission support.',
  philosophy:
    'We believe counselling should be honest, personalised, and free from pressure — students deserve clarity before commitment.',
  cards: [
    {
      id: 'mission',
      title: 'Mission',
      eyebrow: 'What drives us',
      points: [
        'Match courses to goals, aptitude, and long-term career plans',
        'Shortlist colleges by eligibility, budget, and preferred locations',
        'Explain entrance pathways, cutoffs, and counselling timelines clearly',
        'Support families with practical next steps — not generic lists',
      ],
      tone: 'mission',
    },
    {
      id: 'vision',
      title: 'Vision',
      eyebrow: 'Where we are headed',
      points: [
        'Build trust through clear advice and honest college comparisons',
        'Stay transparent on fees, seats, and realistic admission chances',
        'Guide students nationwide with consistent, quality counselling',
        'Remain a reliable partner from first enquiry to campus settling-in',
      ],
      tone: 'vision',
    },
    {
      id: 'philosophy',
      title: 'Counselling philosophy',
      eyebrow: 'How we counsel',
      points: [
        'Honest, personalised guidance free from sales pressure — clarity before commitment',
        'No push toward a particular college, course, or paid package',
        'Plans shaped around academics, interests, budget, and preferred locations',
        'Parents and students get the same clear facts on eligibility and timelines',
        'Entrance exams, counselling rounds, and document checklists explained step by step',
        'Realistic options only — we say when a seat or cutoff may not be a fit',
        'Free first conversation so you can decide with confidence',
        'Support continues after counselling for applications and reporting if you need it',
      ],
      tone: 'philosophy',
      wide: true,
    },
  ],
};

export const contactPlaceholders = {
  address: 'Office address to be confirmed by Edu Study Consultancy',
  city: 'India',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=India&t=&z=5&ie=UTF8&iwloc=&output=embed',
};

export const socialLinks = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '#',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#',
  whatsapp: '',
};

export const qualificationOptions = [
  'Class 10',
  'Class 12 / Intermediate',
  'Diploma',
  'Undergraduate',
  'Postgraduate',
  'Other',
];

export const coursePreferenceOptions = [
  'MBBS',
  'MD / MS',
  'MBA / Management',
  'B.Tech',
  'Pharmacy',
  'Nursing',
  'Other',
];
