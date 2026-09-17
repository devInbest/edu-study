import AppButton from '@/components/common/AppButton/AppButton';
import Container from '@/components/common/Container/Container';
import PageHero from '@/components/common/PageHero/PageHero';
import ProcessSection from '@/components/sections/ProcessSection/ProcessSection';
import { aboutContent } from '@/constants/site';

import classes from './about.module.scss';

export const metadata = {
  title: 'About Us',
  description:
    'Learn about Edu Study Consultancy — our mission, vision, and counselling philosophy for students across India.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Guidance you can trust at every step"
        description="We help students and families make clear, confident education decisions — without pressure or confusion."
      />

      <section className={classes.section}>
        <Container className={classes.grid}>
          <article>
            <h2>Mission</h2>
            <p>{aboutContent.mission}</p>
          </article>
          <article>
            <h2>Vision</h2>
            <p>{aboutContent.vision}</p>
          </article>
          <article className={classes.wide}>
            <h2>Counselling philosophy</h2>
            <p>{aboutContent.philosophy}</p>
          </article>
        </Container>
      </section>

      <ProcessSection />

      <section className={classes.cta}>
        <Container className={classes.ctaInner}>
          <div>
            <h2>Meet a counsellor</h2>
            <p>Share your goals and we will help you shortlist the right path forward.</p>
          </div>
          <AppButton href="/contact">Book free counselling</AppButton>
        </Container>
      </section>
    </>
  );
}
