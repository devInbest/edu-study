'use client';

import Link from 'next/link';

import {
  IconBook,
  IconBuildingSkyscraper,
  IconCompass,
  IconFileDescription,
  IconSchool,
  IconShieldHeart,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

import Container from '@/components/common/Container/Container';
import AppButton from '@/components/common/AppButton/AppButton';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import { serviceColors } from '@/constants/home';
import { services } from '@/data/services';

import classes from './ServicesPreview.module.scss';

const icons = {
  school: IconSchool,
  compass: IconCompass,
  building: IconBuildingSkyscraper,
  file: IconFileDescription,
  shield: IconShieldHeart,
  book: IconBook,
};

export default function ServicesPreview({ showAllLink = true }) {
  return (
    <section className={classes.section}>
      <Container>
        <ScrollReveal className={classes.header}>
          <div>
            <p className={classes.eyebrow}>Our services</p>
            <h2 className="sectionTitle">Support for Your Education Journey</h2>
          </div>
          {showAllLink ? (
            <AppButton href="/services" variant="outline" color="navy">
              View all services
            </AppButton>
          ) : null}
        </ScrollReveal>

        <div className={classes.grid}>
          {services.map((service, index) => {
            const Icon = icons[service.icon] || IconSchool;
            const palette = serviceColors[service.id] || serviceColors['admission-guidance'];
            return (
              <motion.article
                key={service.id}
                className={classes.item}
                id={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
              >
                <span
                  className={classes.icon}
                  style={{ background: palette.bg, color: palette.icon }}
                >
                  <Icon size={24} stroke={1.7} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <Link href={`/services#${service.id}`} style={{ color: palette.accent }}>
                  Learn more →
                </Link>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
