'use client';

import {
  IconArrowLeft,
  IconMapPin,
  IconPhone,
  IconStarFilled,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState, useSyncExternalStore } from 'react';

import AppButton from '@/components/common/AppButton/AppButton';
import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import EnquiryForm from '@/components/forms/EnquiryForm/EnquiryForm';

import classes from './CollegeDetail.module.scss';

const ease = [0.22, 1, 0.36, 1];

function useHasMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

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

function SectionHeading({ title }) {
  return (
    <header className={classes.sectionHeading}>
      <h2>{title}</h2>
    </header>
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
  const mounted = useHasMounted();
  const reduceMotion = usePrefersReducedMotion();
  const items = images?.length
    ? images
    : [
        {
          src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
          alt: `${collegeName} campus`,
        },
      ];

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
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease }}
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

      <div className={classes.galleryThumbs}>
        {items.map((item, index) => (
          <motion.button
            key={`${item.src}-${index}`}
            type="button"
            className={`${classes.thumb} ${index === active ? classes.thumbActive : ''}`}
            onClick={() => setActive(index)}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            aria-label={`View gallery image ${index + 1}`}
            aria-pressed={index === active}
          >
            <Image src={item.src} alt="" fill sizes="120px" className={classes.thumbImage} />
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function HeroMotion({ children, className, delay = 0 }) {
  const mounted = useHasMounted();
  const reduceMotion = usePrefersReducedMotion();

  if (!mounted || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
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
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const nodes = SECTIONS.map((section) => document.getElementById(section.id)).filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.35, 0.55] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

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

  const establishedYear =
    String(research.established || '').match(/\b(19|20)\d{2}\b/)?.[0] || research.established || '—';
  const collegeType = research.type || college.stream || '—';
  const overviewText = research.overview || college.shortDescription;
  const galleryPreviews = (research.gallery || []).slice(0, 4);
  const websiteUrl = research.website
    ? research.website.startsWith('http')
      ? research.website
      : `https://${research.website}`
    : null;
  const isPopular = Number(college.rating) >= 4.3;

  return (
    <>
      <section className={classes.hero}>
        <Container className={classes.heroGrid}>
          <div className={classes.heroCopy}>
            <HeroMotion delay={0}>
              <p className={classes.stream}>{college.stream}</p>
            </HeroMotion>

            <HeroMotion delay={0.06}>
              <h1>{college.name}</h1>
            </HeroMotion>

            <HeroMotion className={classes.badgeRow} delay={0.1}>
              <span className={classes.ratingBadge}>
                <IconStarFilled size={13} />
                {Number(college.rating || 0).toFixed(1)}
              </span>
              {college.reviewCount ? (
                <span className={classes.reviewLink}>
                  ({college.reviewCount.toLocaleString('en-IN')} Reviews)
                </span>
              ) : null}
              {isPopular ? (
                <span className={classes.popularBadge}>
                  <IconStarFilled size={12} />
                  Popular
                </span>
              ) : null}
            </HeroMotion>

            <HeroMotion delay={0.14}>
              <p className={classes.heroLead}>{overviewText}</p>
            </HeroMotion>

            <HeroMotion className={classes.heroMetaRow} delay={0.18}>
              <p className={classes.location}>
                <IconMapPin size={16} stroke={1.8} />
                {college.city} ({college.state})
              </p>
              {galleryPreviews.length ? (
                <a href="#gallery" className={classes.galleryLink}>
                  <span className={classes.galleryStack}>
                    {galleryPreviews.map((item, index) => (
                      <span
                        key={`${item.src}-${index}`}
                        className={classes.galleryDot}
                        style={{ zIndex: galleryPreviews.length - index }}
                      >
                        <Image src={item.src} alt="" fill sizes="36px" />
                      </span>
                    ))}
                  </span>
                  Gallery
                </a>
              ) : null}
            </HeroMotion>

            <HeroMotion className={classes.heroActions} delay={0.22}>
              {websiteUrl ? (
                <AppButton
                  href={websiteUrl}
                  external
                  variant="outline"
                  className={classes.secondaryCta}
                >
                  Official Website
                </AppButton>
              ) : null}
              <AppButton href="#enquire" className={classes.primaryCta}>
                Apply Now
              </AppButton>
            </HeroMotion>

            {research.contact ? (
              <HeroMotion className={classes.heroLinks} delay={0.26}>
                <span className={classes.metaItem}>
                  <IconPhone size={15} />
                  {research.contact}
                </span>
              </HeroMotion>
            ) : null}
          </div>

          <HeroMotion className={classes.heroVisual} delay={0.12}>
            <div className={classes.mediaFrame}>
              <Image
                src={college.image}
                alt={college.name}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 48vw"
                className={classes.mediaImage}
              />
            </div>

            <motion.div
              className={`${classes.floatCard} ${classes.floatCardTop}`}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease }}
            >
              <span>Year of Establishment</span>
              <strong>{establishedYear}</strong>
            </motion.div>

            <motion.div
              className={`${classes.floatCard} ${classes.floatCardBottom}`}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease }}
            >
              <span>Type</span>
              <strong>{collegeType}</strong>
            </motion.div>
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
              <SectionHeading title="Overview" />
              <p className={classes.lead}>{research.overview || college.shortDescription}</p>
              {highlights.length ? (
                <dl className={classes.statStrip}>
                  {highlights.map((item, index) => (
                    <div key={`${item.label}-${index}`}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </ScrollReveal>

            <ScrollReveal as="article" id="courses" className={`${classes.block} ${classes.blockContrast}`} delay={0.04}>
              <SectionHeading title="Courses & Fees" />
              {research.courses?.length ? (
                <div className={classes.courseList}>
                  {research.courses.map((course, index) => (
                    <motion.div
                      key={`${course.name}-${index}`}
                      className={classes.courseRow}
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ delay: 0.04 * index, duration: 0.4, ease }}
                    >
                      <div className={classes.courseHead}>
                        <h3>{course.name}</h3>
                        {course.duration ? <span>{course.duration}</span> : null}
                      </div>
                      <p>
                        <em>Seats</em> {course.seats || '—'}
                      </p>
                      <p>
                        <em>Eligibility</em> {course.eligibility || college.eligibility}
                      </p>
                      <p className={classes.courseFees}>
                        <em>Fees</em> {course.fees || '—'}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <>
                  <ul className={classes.degrees}>
                    {college.degrees.map((degree) => (
                      <li key={degree}>{degree}</li>
                    ))}
                  </ul>
                  <p className={classes.muted}>{college.eligibility}</p>
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

            <ScrollReveal as="article" id="cutoffs" className={classes.block} delay={0.04}>
              <SectionHeading title="Cutoffs" />
              {research.cutoffs?.length ? (
                <div className={classes.cutoffTableWrap}>
                  <table className={classes.cutoffTable}>
                    <thead>
                      <tr>
                        <th scope="col">Exam / Category</th>
                        <th scope="col">Cutoff</th>
                      </tr>
                    </thead>
                    <tbody>
                      {research.cutoffs.map((item, index) => (
                        <motion.tr
                          key={`${item.label}-${index}`}
                          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.4 }}
                          transition={{ delay: 0.03 * index, duration: 0.35, ease }}
                        >
                          <td data-label="Exam / Category">{item.label}</td>
                          <td data-label="Cutoff">{item.value}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className={classes.muted}>
                  Cutoff details will be updated soon. Verify latest counselling ranks before applying.
                </p>
              )}
            </ScrollReveal>

            <ScrollReveal as="article" id="admission" className={`${classes.block} ${classes.blockContrast}`} delay={0.04}>
              <SectionHeading title="Admission" />
              {research.admissionSteps?.length ? (
                <ol className={classes.steps}>
                  {research.admissionSteps.map((step, index) => (
                    <motion.li
                      key={`${index}-${step.slice(0, 24)}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ delay: 0.05 * index, duration: 0.4, ease }}
                    >
                      <span aria-hidden>{String(index + 1).padStart(2, '0')}</span>
                      <p>{step}</p>
                    </motion.li>
                  ))}
                </ol>
              ) : (
                <p className={classes.muted}>{college.admissionInfo}</p>
              )}
            </ScrollReveal>

            <ScrollReveal as="article" id="placements" className={classes.block} delay={0.04}>
              <SectionHeading title="Placements" />
              {research.placements?.length ? (
                <ul className={classes.plainList}>
                  {research.placements.map((item, index) => (
                    <motion.li
                      key={`${index}-${item.slice(0, 24)}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ delay: 0.04 * index, duration: 0.35, ease }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className={classes.muted}>
                  Placement and internship details vary by programme. Speak with a counsellor for the
                  latest figures.
                </p>
              )}
            </ScrollReveal>

            <ScrollReveal as="article" id="campus" className={`${classes.block} ${classes.blockContrast}`} delay={0.04}>
              <SectionHeading title="Campus Life" />
              {research.campusLife?.length ? (
                <ul className={classes.plainList}>
                  {research.campusLife.map((item, index) => (
                    <motion.li
                      key={`${index}-${item.slice(0, 24)}`}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ delay: 0.04 * index, duration: 0.35, ease }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className={classes.muted}>Campus and hostel details will be added soon.</p>
              )}
            </ScrollReveal>

            <ScrollReveal as="article" id="gallery" className={classes.block} delay={0.04}>
              <SectionHeading title="Gallery" />
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
