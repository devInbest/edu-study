export const heroContent = {
  brand: 'Edu Study Consultancy',
  headline: 'Your Journey to the Right Education Starts Here',
  supporting:
    'Trusted admission guidance, career counselling, and local guardian support for students across India.',
  ctas: [
    { label: 'Get Free Counselling', href: '#enquiry', variant: 'filled' },
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
  'MBBS / MD / MS',
  'MBA / Management',
  'Engineering / B.Tech',
  'Pharmacy',
  'Nursing',
  'Other',
];
