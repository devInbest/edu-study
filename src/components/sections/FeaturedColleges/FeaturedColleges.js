'use client';

import AppButton from '@/components/common/AppButton/AppButton';
import CollegeCard from '@/components/colleges/CollegeCard/CollegeCard';
import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import { colleges } from '@/data/colleges';

import classes from './FeaturedColleges.module.scss';

export default function FeaturedColleges() {
  const featured = [
    ...colleges.filter((c) => c.stream === 'MBBS/MD/MS').slice(0, 2),
    ...colleges.filter((c) => c.stream === 'MBA').slice(0, 2),
    ...colleges.filter((c) => c.stream === 'B.Tech').slice(0, 2),
  ];

  return (
    <section className={classes.section}>
      <Container>
        <ScrollReveal className={classes.header}>
          <div>
            <h2 className="sectionTitle">Explore Colleges Across India</h2>
          </div>
          <AppButton href="/colleges" variant="outline" color="navy">
            View full list
          </AppButton>
        </ScrollReveal>

        <div className={classes.grid}>
          {featured.map((college, index) => (
            <ScrollReveal key={college.id} className={classes.item} delay={index * 0.06}>
              <CollegeCard college={college} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
