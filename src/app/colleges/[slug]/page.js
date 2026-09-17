import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { IconMapPin } from '@tabler/icons-react';

import AppButton from '@/components/common/AppButton/AppButton';
import Container from '@/components/common/Container/Container';
import EnquiryForm from '@/components/forms/EnquiryForm/EnquiryForm';
import { colleges, getCollegeBySlug } from '@/data/colleges';
import { getWhatsAppUrl } from '@/utils/helpers';

import classes from './college-detail.module.scss';

export function generateStaticParams() {
  return colleges.map((college) => ({ slug: college.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) {
    return { title: 'College not found' };
  }

  return {
    title: college.name,
    description: college.shortDescription,
    openGraph: {
      title: `${college.name} | Edu Study Consultancy`,
      description: college.shortDescription,
    },
  };
}

export default async function CollegeDetailPage({ params }) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) notFound();

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroMedia}>
          <Image
            src={college.image}
            alt={college.name}
            fill
            priority
            sizes="100vw"
            className={classes.heroImage}
          />
        </div>
        <Container className={classes.heroInner}>
          <p className={classes.stream}>{college.stream}</p>
          <h1>{college.name}</h1>
          <p className={classes.location}>
            <IconMapPin size={16} />
            {college.city}, {college.state}, {college.country}
          </p>
          <div className={classes.heroActions}>
            <AppButton href="#enquire">Enquire about this college</AppButton>
            <AppButton
              href={getWhatsAppUrl(`Hi, I want counselling for ${college.name}.`)}
              external
              variant="outline"
              className={classes.outline}
            >
              WhatsApp Us
            </AppButton>
          </div>
        </Container>
      </section>

      <section className={classes.section}>
        <Container className={classes.layout}>
          <div className={classes.content}>
            <article>
              <h2>About</h2>
              <p>{college.shortDescription}</p>
            </article>
            <article>
              <h2>Courses & degrees</h2>
              <ul className={classes.degrees}>
                {college.degrees.map((degree) => (
                  <li key={degree}>{degree}</li>
                ))}
              </ul>
            </article>
            <article>
              <h2>Eligibility</h2>
              <p>{college.eligibility}</p>
            </article>
            <article>
              <h2>Admission information</h2>
              <p>{college.admissionInfo}</p>
            </article>
            <Link href="/colleges" className={classes.back}>
              ← Back to college list
            </Link>
          </div>

          <div id="enquire" className={classes.formCol}>
            <EnquiryForm defaultCollege={college.name} />
          </div>
        </Container>
      </section>
    </>
  );
}
