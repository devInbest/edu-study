import aboutBanner from '@/assets/images/banners/about.jpg';
import PageBanner from '@/components/common/PageBanner/PageBanner';
import CtaBanner from '@/components/sections/CtaBanner/CtaBanner';
import ProcessSection from '@/components/sections/ProcessSection/ProcessSection';
import ServicesFaq from '@/components/sections/ServicesFaq/ServicesFaq';
import { aboutFaq } from '@/data/aboutFaq';

import AboutValues from './AboutValues';
import classes from './about.module.scss';

export const metadata = {
  title: 'About Us',
  description:
    'Learn about Edu Study Consultancy — our mission, vision, and counselling philosophy for students across India.',
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        image={aboutBanner}
        imageAlt="Indian education consultants collaborating with students in a modern office"
        eyebrow="Who We Are"
        title="About Us"
        icon="about"
        priority
      />

      <AboutValues />

      <ProcessSection />

      <CtaBanner className={classes.ctaSection} />

      <ServicesFaq
        items={aboutFaq}
        title="Questions About Edu Study"
        titleId="about-faq-title"
        idPrefix="about-faq"
      />
    </>
  );
}
