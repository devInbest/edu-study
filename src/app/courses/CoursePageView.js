import Link from 'next/link';

import btechBanner from '@/assets/images/banners/courses-btech.jpg';
import mbaBanner from '@/assets/images/banners/courses-mba.jpg';
import mbbsBanner from '@/assets/images/banners/courses-mbbs.jpg';
import mdMsBanner from '@/assets/images/banners/courses-md-ms.jpg';
import CollegeCard from '@/components/colleges/CollegeCard/CollegeCard';
import Container from '@/components/common/Container/Container';
import PageBanner from '@/components/common/PageBanner/PageBanner';
import CtaBanner from '@/components/sections/CtaBanner/CtaBanner';
import { filterColleges } from '@/data/colleges';
import { courseLinks } from '@/data/courses';

import classes from './[slug]/course.module.scss';

const courseBanners = {
  mbbs: {
    image: mbbsBanner,
    alt: 'Indian MBBS students in practical medical training in Lucknow',
  },
  'md-ms': {
    image: mdMsBanner,
    alt: 'Medical institute campus in India for MD and MS programmes',
  },
  mba: {
    image: mbaBanner,
    alt: 'Indian students collaborating in a professional MBA setting',
  },
  btech: {
    image: btechBanner,
    alt: 'Indian engineering students coding together for B.Tech studies',
  },
};

export default function CoursePageView({ course }) {
  const colleges = filterColleges({
    stream: course.stream,
    degrees: course.degrees || [],
  });

  const banner = courseBanners[course.slug] || courseBanners.mbbs;

  return (
    <>
      <PageBanner
        image={banner.image}
        imageAlt={banner.alt}
        eyebrow="Courses"
        title={course.title}
        icon="courses"
        priority
      />

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
