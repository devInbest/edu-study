'use client';

import Image from 'next/image';
import { IconCheck } from '@tabler/icons-react';

import AppButton from '@/components/common/AppButton/AppButton';
import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import { destinations, whyChooseUs } from '@/constants/home';

import classes from './WhyChooseSection.module.scss';

export default function WhyChooseSection() {
  return (
    <section className={classes.section}>
      <Container className={classes.grid}>
        <ScrollReveal className={classes.why} direction="left">
          <div className={classes.whyInner}>
            <h2>Trusted Guidance. Clear Decisions. Stronger Futures.</h2>
            <ul>
              {whyChooseUs.map((item, index) => (
                <ScrollReveal as="li" key={item} delay={0.05 * index} direction="left">
                  <span className={classes.check}>
                    <IconCheck size={14} stroke={2.4} />
                  </span>
                  {item}
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal className={classes.destinations} delay={0.1} direction="right">
          <h2>Popular Study Destinations</h2>
          <div className={classes.flags}>
            {destinations.map((item, index) => (
              <ScrollReveal
                key={item.name}
                className={classes.flagCard}
                delay={0.06 * index}
              >
                <span className={classes.flag} aria-hidden="true">
                  <Image
                    src={`https://flagcdn.com/w80/${item.flagCode}.png`}
                    alt=""
                    width={40}
                    height={30}
                    className={classes.flagImage}
                  />
                </span>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.blurb}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <AppButton href="/colleges" className={classes.viewBtn}>
            View Colleges
          </AppButton>
        </ScrollReveal>
      </Container>
    </section>
  );
}
