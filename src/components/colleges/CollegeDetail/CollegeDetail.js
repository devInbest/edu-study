'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  IconArrowLeft,
  IconBuildingHospital,
  IconCalendar,
  IconCertificate,
  IconExternalLink,
  IconMapPin,
  IconPhone,
  IconSchool,
  IconTrophy,
  IconWorld,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

import AppButton from '@/components/common/AppButton/AppButton';
import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import EnquiryForm from '@/components/forms/EnquiryForm/EnquiryForm';
import { getWhatsAppUrl } from '@/utils/helpers';

import classes from './CollegeDetail.module.scss';

const ease = [0.22, 1, 0.36, 1];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'courses', label: 'Courses & Fees' },
  { id: 'cutoffs', label: 'Cutoffs' },
  { id: 'admission', label: 'Admission' },
  { id: 'placements', label: 'Placements' },
  { id: 'campus', label: 'Campus Life' },
  { id: 'gallery', label: 'Gallery' },
];

function HighlightCard({ icon: Icon, label, value, delay = 0 }) {
  if (!value) return null;

  return (
    <ScrollReveal delay={delay} className={classes.highlightCard}>
      <span className={classes.highlightIcon} aria-hidden>
        <Icon size={20} stroke={1.6} />
      </span>
      <div>
        <p className={classes.highlightLabel}>{label}</p>
        <p className={classes.highlightValue}>{value}</p>
      </div>
    </ScrollReveal>
  );
}

function SectionNav({ activeId, onSelect }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <nav className={classes.sectionNav} aria-label="College sections">
      {SECTIONS.map((section) => {
        const isActive = activeId === section.id;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`${classes.navLink} ${isActive ? classes.navLinkActive : ''}`}
            onClick={() => onSelect(section.id)}
            aria-current={isActive ? 'true' : undefined}
          >
            {isActive && !reduceMotion ? (
              <motion.span
                layoutId="college-section-tab"
                className={classes.navLinkBg}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            ) : null}
            {isActive && reduceMotion ? <span className={classes.navLinkBg} /> : null}
            <span className={classes.navLinkLabel}>{section.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function Gallery({ images, collegeName }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const items = images?.length
    ? images
    : [
        {
          src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
          alt: `${collegeName} campus`,
        },
      ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const frame = (
    <div className={classes.galleryFrame}>
      <Image
        src={items[active].src}
        alt={items[active].alt || `${collegeName} gallery`}
        fill
        sizes="(max-width: 900px) 100vw, 70vw"
        className={classes.galleryImage}
      />
    </div>
  );

  return (
    <div className={classes.gallery}>
      <div className={classes.galleryMain}>
        {mounted && !reduceMotion ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={items[active].src}
              className={classes.galleryFrame}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease }}
            >
              <Image
                src={items[active].src}
                alt={items[active].alt || `${collegeName} gallery`}
                fill
                sizes="(max-width: 900px) 100vw, 70vw"
                className={classes.galleryImage}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          frame
        )}
        <p className={classes.galleryCaption}>{items[active].alt}</p>
      </div>

      <div className={classes.galleryThumbs} role="list">
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            role="listitem"
            className={`${classes.thumb} ${index === active ? classes.thumbActive : ''}`}
            onClick={() => setActive(index)}
            aria-label={`View gallery image ${index + 1}`}
            aria-pressed={index === active}
          >
            <Image src={item.src} alt="" fill sizes="120px" className={classes.thumbImage} />
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroMotion({ children, className, delay = 0 }) {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function CollegeDetail({ college }) {
  const research = college.research || {};
  const [activeSection, setActiveSection] = useState('overview');

  const highlights = research.highlights?.length
    ? research.highlights
    : [
        { label: 'Established', value: research.established },
        { label: 'Type', value: research.type },
        { label: 'Affiliation', value: research.affiliation },
        { label: 'Approval', value: research.approval },
        { label: 'Ranking', value: research.ranking },
        { label: 'Campus', value: research.campusSize },
        { label: 'Teaching hospital', value: research.teachingHospital },
      ].filter((item) => item.value);

  const highlightIcons = [
    IconCalendar,
    IconSchool,
    IconCertificate,
    IconTrophy,
    IconBuildingHospital,
    IconWorld,
  ];

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroMedia}>
          <Image
            src={college.image}
            alt={college.name}
            fill
            priority
            sizes="100vw"
            className={classes.heroImage}
          />
        </div>
        <Container className={classes.heroInner}>
          <HeroMotion delay={0}>
            <p className={classes.stream}>{college.stream}</p>
          </HeroMotion>
          <HeroMotion delay={0.08}>
            <h1>{college.name}</h1>
          </HeroMotion>
          <HeroMotion delay={0.14}>
            <p className={classes.location}>
              <IconMapPin size={16} />
              {college.city}, {college.state}, {college.country}
            </p>
          </HeroMotion>
          <HeroMotion className={classes.heroMeta} delay={0.2}>
            {research.website ? (
              <a
                href={
                  research.website.startsWith('http')
                    ? research.website
                    : `https://${research.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={classes.metaLink}
              >
                <IconExternalLink size={15} />
                Official website
              </a>
            ) : null}
            {research.contact ? (
              <span className={classes.metaItem}>
                <IconPhone size={15} />
                {research.contact}
              </span>
            ) : null}
          </HeroMotion>
          <HeroMotion className={classes.heroActions} delay={0.26}>
            <AppButton href="#enquire">Enquire about this college</AppButton>
            <AppButton
              href={getWhatsAppUrl(`Hi, I want counselling for ${college.name}.`)}
              external
              variant="outline"
              className={classes.outline}
            >
              WhatsApp Us
            </AppButton>
          </HeroMotion>
        </Container>
      </section>

      <div className={classes.stickyBar}>
        <Container>
          <SectionNav activeId={activeSection} onSelect={setActiveSection} />
        </Container>
      </div>

      <section className={classes.section}>
        <Container className={classes.layout}>
          <div className={classes.content}>
            <ScrollReveal as="article" id="overview" className={classes.block}>
              <h2>Overview</h2>
              <p className={classes.lead}>{research.overview || college.shortDescription}</p>
              {highlights.length ? (
                <div className={classes.highlightGrid}>
                  {highlights.map((item, index) => (
                    <HighlightCard
                      key={`${item.label}-${index}`}
                      icon={highlightIcons[index % highlightIcons.length]}
                      label={item.label}
                      value={item.value}
                      delay={0.04 * index}
                    />
                  ))}
                </div>
              ) : null}
            </ScrollReveal>

            <ScrollReveal as="article" id="courses" className={classes.block} delay={0.05}>
              <h2>Courses, eligibility & fees</h2>
              {research.courses?.length ? (
                <div className={classes.tableWrap}>
                  <table className={classes.table}>
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Duration</th>
                        <th>Seats</th>
                        <th>Eligibility</th>
                        <th>Fees (approx.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {research.courses.map((course, index) => (
                        <tr key={`${course.name}-${index}`}>
                          <td data-label="Course">{course.name}</td>
                          <td data-label="Duration">{course.duration || '—'}</td>
                          <td data-label="Seats">{course.seats || '—'}</td>
                          <td data-label="Eligibility">{course.eligibility || college.eligibility}</td>
                          <td data-label="Fees">{course.fees || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  <ul className={classes.degrees}>
                    {college.degrees.map((degree) => (
                      <li key={degree}>{degree}</li>
                    ))}
                  </ul>
                  <p>{college.eligibility}</p>
                </>
              )}
              {research.courseNotes?.length ? (
                <ul className={classes.notes}>
                  {research.courseNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
            </ScrollReveal>

            <ScrollReveal as="article" id="cutoffs" className={classes.block} delay={0.05}>
              <h2>Cutoffs</h2>
              {research.cutoffs?.length ? (
                <div className={classes.cutoffList}>
                  {research.cutoffs.map((item, index) => (
                    <div key={`${item.label}-${index}`} className={classes.cutoffRow}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={classes.muted}>
                  Cutoff details will be updated soon. Verify latest counselling ranks before applying.
                </p>
              )}
            </ScrollReveal>

            <ScrollReveal as="article" id="admission" className={classes.block} delay={0.05}>
              <h2>Admission process</h2>
              {research.admissionSteps?.length ? (
                <ol className={classes.steps}>
                  {research.admissionSteps.map((step, index) => (
                    <li key={`${index}-${step.slice(0, 24)}`}>
                      <span className={classes.stepIndex}>{String(index + 1).padStart(2, '0')}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p>{college.admissionInfo}</p>
              )}
            </ScrollReveal>

            <ScrollReveal as="article" id="placements" className={classes.block} delay={0.05}>
              <h2>Placements & internship</h2>
              {research.placements?.length ? (
                <ul className={classes.bulletList}>
                  {research.placements.map((item, index) => (
                    <li key={`${index}-${item.slice(0, 24)}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className={classes.muted}>
                  Placement and internship details vary by programme. Speak with a counsellor for the
                  latest figures.
                </p>
              )}
            </ScrollReveal>

            <ScrollReveal as="article" id="campus" className={classes.block} delay={0.05}>
              <h2>Campus life & hostel</h2>
              {research.campusLife?.length ? (
                <ul className={classes.bulletList}>
                  {research.campusLife.map((item, index) => (
                    <li key={`${index}-${item.slice(0, 24)}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className={classes.muted}>Campus and hostel details will be added soon.</p>
              )}
            </ScrollReveal>

            <ScrollReveal as="article" id="gallery" className={classes.block} delay={0.05}>
              <h2>Campus gallery</h2>
              <p className={classes.muted}>
                Placeholder campus visuals for now — replace these with official college photos when
                ready.
              </p>
              <Gallery images={research.gallery} collegeName={college.name} />
            </ScrollReveal>

            <AppButton
              href="/colleges"
              variant="outline"
              leftSection={<IconArrowLeft size={16} stroke={2.2} />}
              className={classes.back}
            >
              Back to colleges
            </AppButton>
          </div>

          <div id="enquire" className={classes.formCol}>
            <ScrollReveal direction="left" delay={0.1}>
              <EnquiryForm
                defaultCollege={college.name}
                stacked
                eyebrow={null}
                title="Enquire About This College"
              />
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
