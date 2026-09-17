'use client';

import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import { processSteps } from '@/constants/site';

import classes from './ProcessSection.module.scss';

export default function ProcessSection() {
  return (
    <section className={classes.section}>
      <Container>
        <ScrollReveal className={classes.header}>
          <p className={classes.eyebrow}>Our approach</p>
          <h2 className="sectionTitle">Understand → Guide → Shortlist → Assist → Support</h2>
          <p className="sectionLead">
            A clear counselling journey designed to reduce confusion and increase confident
            decisions.
          </p>
        </ScrollReveal>

        <ol className={classes.steps}>
          {processSteps.map((step, index) => (
            <ScrollReveal as="li" key={step.title} delay={index * 0.08}>
              <span className={classes.index}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </ScrollReveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
