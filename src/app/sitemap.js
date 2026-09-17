import env from '@/constants/env';
import { colleges } from '@/data/colleges';
import { courseLinks } from '@/data/courses';

export default function sitemap() {
  const base = env.siteUrl.replace(/\/$/, '');

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/colleges',
    '/contact',
    '/terms',
    '/privacy',
  ].map((path) => ({
    url: `${base}${path || '/'}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  const courseRoutes = courseLinks.map((course) => ({
    url: `${base}${course.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const collegeRoutes = colleges.map((college) => ({
    url: `${base}/colleges/${college.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes, ...collegeRoutes];
}
