import Container from '@/components/common/Container/Container';
import PageHero from '@/components/common/PageHero/PageHero';
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
      <PageHero
        eyebrow="College directory"
        title="Find colleges that match your goals"
        description="Search and filter institutions across MBBS/MD/MS, MBA, and Engineering pathways."
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
