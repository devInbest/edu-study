/** Footer / menu courses mapped to college catalogue streams. */

export const courseLinks = [
  {
    slug: 'mbbs',
    label: 'MBBS',
    href: '/courses/mbbs',
    stream: 'MBBS/MD/MS',
    degrees: ['MBBS'],
    title: 'MBBS Colleges',
    description:
      'Explore medical colleges offering MBBS programmes. Get counselling on eligibility, NEET-UG pathways, and admissions.',
  },
  {
    slug: 'md-ms',
    label: 'MD/MS',
    href: '/courses/md-ms',
    stream: 'MBBS/MD/MS',
    degrees: ['MD', 'MS'],
    title: 'MD / MS Colleges',
    description:
      'Explore medical colleges offering MD and MS postgraduate programmes. Get counselling on eligibility, NEET-PG pathways, and admissions.',
  },
  {
    slug: 'mba',
    label: 'Management',
    href: '/courses/mba',
    stream: 'MBA',
    title: 'MBA Colleges',
    description:
      'Discover management institutes for MBA and related postgraduate business programmes across India.',
  },
  {
    slug: 'btech',
    label: 'Engineering',
    href: '/courses/btech',
    stream: 'B.Tech',
    title: 'B.Tech Colleges',
    description:
      'Browse engineering and technology institutes offering B.Tech, B.E., and postgraduate engineering programmes.',
  },
];

/** Legacy combined medical slug → primary MBBS course page. */
export const courseSlugRedirects = {
  'mbbs-md-ms': 'mbbs',
};

export function getCourseBySlug(slug) {
  const resolved = courseSlugRedirects[slug] || slug;
  return courseLinks.find((course) => course.slug === resolved) || null;
}
