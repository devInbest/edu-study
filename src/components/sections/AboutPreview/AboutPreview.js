'use client';

import Image from 'next/image';

import { IconSparkles, IconTargetArrow } from '@tabler/icons-react';

import aboutBanner from '@/assets/images/banners/about.jpg';
import AppButton from '@/components/common/AppButton/AppButton';
import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import { aboutContent } from '@/constants/site';

import classes from './AboutPreview.module.scss';

function HexCard({ tone, title, text, icon: Icon, delay = 0 }) {
  return (
    <ScrollReveal delay={delay} className={`${classes.hexWrap} ${classes[tone]}`}>
      <article className={classes.hex}>
        <span className={classes.hexIcon}>
          <Icon size={34} stroke={1.6} />
        </span>
        <h3>{title}</h3>
        <p>{text}</p>
      </article>
    </ScrollReveal>
  );
}

export default function AboutPreview() {
  return (
    <section className={classes.section}>
      <Container className={classes.grid}>
        <ScrollReveal className={classes.visual} direction="left">
          <Image
            src={aboutBanner}
            alt="Graduation cap, books and globe"
            fill
            sizes="(max-width: 1024px) 100vw, 32vw"
            className={classes.image}
          />
          <div className={classes.overlay}>
            <p>Better Education</p>
            <strong>Brighter Future</strong>
          </div>
        </ScrollReveal>

        <ScrollReveal className={classes.copy} delay={0.08}>
          <h2 className="sectionTitle">Guiding Students Towards A Brighter Future</h2>
          <p className="sectionLead">{aboutContent.philosophy}</p>
          <AppButton href="/about" className={classes.knowMore}>
            Know More
          </AppButton>
        </ScrollReveal>

        <div className={classes.cards}>
          <HexCard
            tone="mission"
            title="Our Mission"
            text={aboutContent.mission}
            icon={IconTargetArrow}
            delay={0.12}
          />
          <HexCard
            tone="vision"
            title="Our Vision"
            text={aboutContent.vision}
            icon={IconSparkles}
            delay={0.22}
          />
        </div>
      </Container>
    </section>
  );
}
