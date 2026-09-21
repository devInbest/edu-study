'use client';

import { useEffect, useRef, useState } from 'react';

import { animate, useInView, useReducedMotion } from 'framer-motion';

import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import { homeStats } from '@/constants/home';

import classes from './StatsSection.module.scss';

function parseStatValue(value) {
  const match = String(value).match(/^(\d+)(.*)$/);
  if (!match) {
    return { target: 0, suffix: value };
  }
  return { target: Number(match[1]), suffix: match[2] || '' };
}

function AnimatedValue({ value, delay = 0 }) {
  const { target, suffix } = parseStatValue(value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      setDisplay(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [delay, isInView, reduceMotion, target]);

  return (
    <p ref={ref} className={classes.value}>
      {display}
      {suffix}
    </p>
  );
}

export default function StatsSection() {
  return (
    <section className={classes.section} aria-label="Key results">
      <Container>
        <div className={classes.grid}>
          {homeStats.map((stat, index) => (
            <ScrollReveal
              key={stat.label}
              className={classes.card}
              delay={0.08 * index}
              direction="up"
            >
              <AnimatedValue value={stat.value} delay={0.12 + index * 0.12} />
              <p className={classes.label}>{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
