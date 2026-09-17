import { courseLinks } from '@/data/courses';

export const serviceLinks = [
  { label: 'Admission Guidance', href: '/services#admission-guidance' },
  { label: 'Career Counselling', href: '/services#career-counselling' },
  { label: 'College Selection', href: '/services#college-selection' },
  { label: 'Application Assistance', href: '/services#application-assistance' },
  { label: 'Local Guardian Support', href: '/services#local-guardian' },
  { label: 'Course Selection', href: '/services#course-selection' },
];

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: serviceLinks,
  },
  {
    label: 'Courses',
    href: '/courses',
    children: courseLinks.map(({ label, href }) => ({ label, href })),
  },
  { label: 'College List', href: '/colleges' },
  { label: 'Contact Us', href: '/contact' },
];

export const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'College List', href: '/colleges' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];
