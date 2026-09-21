'use client';

import { IconStarFilled } from '@tabler/icons-react';

import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import InfiniteMovingCards from '@/components/ui/InfiniteMovingCards/InfiniteMovingCards';
import { testimonials } from '@/constants/home';

import classes from './TestimonialsSection.module.scss';

function TestimonialCard({ item }) {
  return (
    <article className={classes.card}>
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
    </article>
  );
}

export default function TestimonialsSection() {
  return (
    <section className={classes.section}>
      <Container>
        <ScrollReveal className={classes.header}>
          <h2 className="sectionTitle">What Our Students & Parents Say</h2>
        </ScrollReveal>
      </Container>

      <div className={classes.marquee}>
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
          pauseOnHover
          renderItem={(item) => <TestimonialCard item={item} />}
        />
      </div>
    </section>
  );
}
