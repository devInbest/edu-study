'use client';

import { motion } from 'framer-motion';

import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import { offeredCourses } from '@/constants/home';

import classes from './CoursesOffered.module.scss';

function CourseIcon({ id }) {
  switch (id) {
    case 'engineering':
      return (
        <svg viewBox="0 0 88 88" fill="none" aria-hidden="true">
          <rect x="14" y="20" width="48" height="38" rx="4" fill="#D6E8FF" stroke="#0F172A" strokeWidth="2.5" />
          <rect x="20" y="26" width="20" height="14" rx="2" fill="#fff" stroke="#0F172A" strokeWidth="2" />
          <circle cx="58" cy="52" r="16" fill="#FDB813" stroke="#0F172A" strokeWidth="2.5" />
          <path
            d="M58 40v4M58 60v4M46 52h4M66 52h4M49.5 43.5l2.8 2.8M63.7 57.7l2.8 2.8M49.5 60.5l2.8-2.8M63.7 46.3l2.8-2.8"
            stroke="#0F172A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="58" cy="52" r="5" fill="#fff" stroke="#0F172A" strokeWidth="2" />
        </svg>
      );
    case 'medical':
      return (
        <svg viewBox="0 0 88 88" fill="none" aria-hidden="true">
          <circle cx="44" cy="44" r="28" fill="#2F80ED" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M44 28v32M28 44h32" stroke="#E11D48" strokeWidth="8" strokeLinecap="round" />
          <path d="M44 28v32M28 44h32" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'law':
      return (
        <svg viewBox="0 0 88 88" fill="none" aria-hidden="true">
          <rect x="22" y="58" width="44" height="10" rx="2" fill="#C4A574" stroke="#0F172A" strokeWidth="2.5" />
          <rect x="38" y="28" width="12" height="32" rx="2" fill="#A67C52" stroke="#0F172A" strokeWidth="2.5" />
          <rect x="28" y="22" width="32" height="12" rx="3" fill="#8B5E3C" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="44" cy="18" r="5" fill="#FDB813" stroke="#0F172A" strokeWidth="2.5" />
        </svg>
      );
    case 'bed':
      return (
        <svg viewBox="0 0 88 88" fill="none" aria-hidden="true">
          <rect x="18" y="18" width="40" height="28" rx="3" fill="#FFF3CD" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M24 28h20M24 34h14" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="54" cy="52" r="8" fill="#FDB813" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M46 72c0-8 4-12 12-12s12 4 12 12" fill="#1A4F8C" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M28 54h18v18H28z" fill="#D6E8FF" stroke="#0F172A" strokeWidth="2.5" />
        </svg>
      );
    case 'nursing':
      return (
        <svg viewBox="0 0 88 88" fill="none" aria-hidden="true">
          <circle cx="44" cy="28" r="12" fill="#FFE0E0" stroke="#0F172A" strokeWidth="2.5" />
          <path
            d="M24 72c2-16 10-24 20-24s18 8 20 24"
            fill="#14B8A6"
            stroke="#0F172A"
            strokeWidth="2.5"
          />
          <circle cx="62" cy="48" r="12" fill="#D8F3F0" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M62 42v12M56 48h12" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'management':
      return (
        <svg viewBox="0 0 88 88" fill="none" aria-hidden="true">
          <circle cx="44" cy="18" r="8" fill="#FDB813" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M44 26v16" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M24 58V42h40v16" stroke="#0F172A" strokeWidth="2.5" fill="none" />
          <circle cx="24" cy="66" r="8" fill="#D6E8FF" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="44" cy="66" r="8" fill="#D8F3F0" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="64" cy="66" r="8" fill="#EDE4FF" stroke="#0F172A" strokeWidth="2.5" />
        </svg>
      );
    case 'commerce':
      return (
        <svg viewBox="0 0 88 88" fill="none" aria-hidden="true">
          <rect x="18" y="38" width="28" height="28" rx="3" fill="#D8F3F0" stroke="#0F172A" strokeWidth="2.5" />
          <path d="M24 38v-6h16v6" stroke="#0F172A" strokeWidth="2.5" />
          <rect x="26" y="48" width="8" height="10" rx="1" fill="#fff" stroke="#0F172A" strokeWidth="2" />
          <circle cx="60" cy="34" r="16" fill="#FFF3CD" stroke="#0F172A" strokeWidth="2.5" />
          <path
            d="M60 24v4M60 40v4M54 30c1-2 3-3 6-3s5 1 5 3-2 3-5 3.5-6 1.5-6 4 2.5 3.5 6 3.5 5-1 6-3"
            stroke="#0D9488"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'paramedical':
      return (
        <svg viewBox="0 0 88 88" fill="none" aria-hidden="true">
          <path
            d="M44 18c8 10 20 14 20 28a20 20 0 1 1-40 0c0-14 12-18 20-28z"
            fill="#2F80ED"
            stroke="#0F172A"
            strokeWidth="2.5"
          />
          <path
            d="M36 40c2 6 4 10 8 16M52 40c-2 6-4 10-8 16"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M30 34h28M32 52h24" stroke="#FDB813" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="44" cy="58" r="4" fill="#fff" stroke="#0F172A" strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function CoursesOffered() {
  return (
    <section className={classes.section} aria-labelledby="courses-offered-title">
      <Container>
        <ScrollReveal className={classes.header}>
          <h2 id="courses-offered-title" className={classes.title}>
            Find Your Right Domain
          </h2>
        </ScrollReveal>

        <ul className={classes.grid}>
          {offeredCourses.map((course, index) => (
            <motion.li
              key={course.id}
              className={classes.item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={classes.icon}>
                <CourseIcon id={course.id} />
              </span>
              <span className={classes.label}>{course.label}</span>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
