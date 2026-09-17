import Link from 'next/link';
import { notFound } from 'next/navigation';

import CollegeCard from '@/components/colleges/CollegeCard/CollegeCard';
import Container from '@/components/common/Container/Container';
import PageHero from '@/components/common/PageHero/PageHero';
import CtaBanner from '@/components/sections/CtaBanner/CtaBanner';
import { filterColleges } from '@/data/colleges';
import { courseLinks, getCourseBySlug } from '@/data/courses';

import classes from './course.module.scss';

export function generateStaticParams() {
  return courseLinks.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    return { title: 'Course not found' };
  }

  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const colleges = filterColleges({
    stream: course.stream,
    degrees: course.degrees || [],
  });

  return (
    <>
      <PageHero eyebrow="Courses" title={course.title} description={course.description} />

      <section className={classes.section}>
        <Container>
          <div className={classes.toolbar}>
            <p className={classes.count}>
              Showing <strong>{colleges.length}</strong> college
              {colleges.length === 1 ? '' : 's'} for {course.label}
            </p>
            <div className={classes.tabs}>
              {courseLinks.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className={item.slug === course.slug ? classes.activeTab : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {colleges.length ? (
            <div className={classes.grid}>
              {colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          ) : (
            <div className={classes.empty}>
              <h3>No colleges listed yet</h3>
              <p>Please check back soon or contact us for personalised counselling.</p>
              <Link href="/contact">Contact us →</Link>
            </div>
          )}
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
