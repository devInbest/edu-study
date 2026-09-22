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
  missionItems: [
    {
      title: 'Right course fit',
      text: 'Matched to goals, aptitude, and career plans.',
    },
    {
      title: 'Smart shortlists',
      text: 'Filtered by eligibility, budget, and location.',
    },
    {
      title: 'Clear pathways',
      text: 'Entrance routes and timelines made simple.',
    },
    {
      title: 'Family support',
      text: 'Practical next steps — not generic lists.',
    },
    {
      title: 'Student-first advice',
      text: 'Guided by ambition, ability, and options.',
    },
  ],
  visionItems: [
    {
      title: 'Trusted guidance',
      text: 'Honest comparisons students can rely on.',
    },
    {
      title: 'Full transparency',
      text: 'Clear on fees, seats, and chances.',
    },
    {
      title: 'Nationwide reach',
      text: 'Quality counselling across India.',
    },
    {
      title: 'End-to-end partner',
      text: 'From first enquiry to settling-in.',
    },
    {
      title: 'Lasting impact',
      text: 'India’s most trusted consultancy brand.',
    },
  ],
  philosophyCard: {
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
  },
};

export const contactPlaceholders = {
  address: 'Edu Study Wala Office 304, Prestige Salt Lake 5',
  city: 'Kolkata',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Prestige+Salt+Lake+5+Kolkata&t=&z=16&ie=UTF8&iwloc=&output=embed',
};

export const socialLinks = {
  facebook:
    import.meta.env.VITE_FACEBOOK_URL ||
    process.env.NEXT_PUBLIC_FACEBOOK_URL ||
    'https://www.facebook.com/profile.php?id=61594714647675',
  instagram:
    import.meta.env.VITE_INSTAGRAM_URL ||
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    'https://www.instagram.com/EDUSTUDYWALA202226/',
  whatsapp: '',
};

export const qualificationOptions = [
  'Class 10th',
  'Class 12th',
  'Diploma',
  'Undergraduate',
  'Postgraduate',
  'Other',
];

export const coursePreferenceOptions = [
  'MBBS',
  'MD / MS',
  'Management',
  'Engineering',
  'Pharmacy',
  'Nursing',
  'Other',
];
