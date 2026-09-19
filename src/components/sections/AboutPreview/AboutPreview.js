'use client';

import Image from 'next/image';

import { IconEye, IconTarget } from '@tabler/icons-react';

import aboutBanner from '@/assets/images/banners/about.jpg';
import AppButton from '@/components/common/AppButton/AppButton';
import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import { aboutContent } from '@/constants/site';

import classes from './AboutPreview.module.scss';

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
          <p className={classes.eyebrow}>About us</p>
          <h2 className="sectionTitle">Guiding Students Towards A Brighter Future</h2>
          <p className="sectionLead">{aboutContent.philosophy}</p>
          <AppButton href="/about" className={classes.knowMore}>
            Know More
          </AppButton>
        </ScrollReveal>

        <div className={classes.cards}>
          <ScrollReveal delay={0.12} className={classes.card}>
            <span className={`${classes.icon} ${classes.mission}`}>
              <IconTarget size={22} />
            </span>
            <h3>Our Mission</h3>
            <p>{aboutContent.mission}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className={classes.card}>
            <span className={`${classes.icon} ${classes.vision}`}>
              <IconEye size={22} />
            </span>
            <h3>Our Vision</h3>
            <p>{aboutContent.vision}</p>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
