/** Footer / menu courses mapped to college catalogue streams. */

export const courseLinks = [
  {
    slug: 'mbbs-md-ms',
    label: 'MBBS/MD/MS',
    href: '/courses/mbbs-md-ms',
    stream: 'MBBS/MD/MS',
    title: 'MBBS / MD / MS Colleges',
    description:
      'Explore medical colleges offering MBBS, MD, and MS programmes. Get counselling on eligibility, NEET pathways, and admissions.',
  },
  {
    slug: 'mba',
    label: 'MBA',
    href: '/courses/mba',
    stream: 'MBA',
    title: 'MBA Colleges',
    description:
      'Discover management institutes for MBA and related postgraduate business programmes across India.',
  },
  {
    slug: 'btech',
    label: 'B.Tech',
    href: '/courses/btech',
    stream: 'Engineering',
    title: 'B.Tech / Engineering Colleges',
    description:
      'Browse engineering and technology institutes offering B.Tech, B.E., and postgraduate engineering programmes.',
  },
];

export function getCourseBySlug(slug) {
  return courseLinks.find((course) => course.slug === slug) || null;
}
