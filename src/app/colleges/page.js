import collegesBanner from '@/assets/images/banners/colleges.jpg';
import Container from '@/components/common/Container/Container';
import PageBanner from '@/components/common/PageBanner/PageBanner';
import CollegeDirectory from '@/components/colleges/CollegeDirectory/CollegeDirectory';
import CtaBanner from '@/components/sections/CtaBanner/CtaBanner';

import classes from './colleges.module.scss';

export const metadata = {
  title: 'Colleges',
  description:
    'Browse colleges and universities by stream, state, and city. Explore eligibility and admission information with Edu Study Consultancy.',
};

export default function CollegesPage() {
  return (
    <>
      <PageBanner
        image={collegesBanner}
        imageAlt="IIT Kharagpur campus building in India"
        eyebrow="College Directory"
        title="Colleges"
        icon="colleges"
        priority
      />
      <section className={classes.section}>
        <Container>
          <CollegeDirectory />
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
