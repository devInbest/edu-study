'use client';

import { IconStarFilled } from '@tabler/icons-react';

import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import { testimonials } from '@/constants/home';

import classes from './TestimonialsSection.module.scss';

export default function TestimonialsSection() {
  return (
    <section className={classes.section}>
      <Container>
        <ScrollReveal className={classes.header}>
          <p className={classes.eyebrow}>Testimonials</p>
          <h2 className="sectionTitle">What Our Students & Parents Say</h2>
          <p className="sectionLead">
            Real stories from students who found clarity, confidence, and the right next step.
          </p>
        </ScrollReveal>

        <div className={classes.grid}>
          {testimonials.map((item, index) => (
            <ScrollReveal key={item.name} className={classes.card} delay={index * 0.1}>
              <div className={classes.top}>
                <div className={classes.avatar} aria-hidden="true">
                  {item.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.place}</p>
                </div>
              </div>
              <p className={classes.quote}>“{item.quote}”</p>
              <div className={classes.stars} aria-label={`${item.rating} star rating`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <IconStarFilled key={i} size={16} />
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
