'use client';

import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import { servicesFaq } from '@/data/servicesFaq';

import classes from './ServicesFaq.module.scss';

const ease = [0.22, 1, 0.36, 1];

function FaqItem({ item, index, open, onToggle, reduceMotion, idPrefix }) {
  const panelId = `${idPrefix}-panel-${index}`;
  const buttonId = `${idPrefix}-button-${index}`;

  return (
    <div className={`${classes.item} ${open ? classes.open : ''}`}>
      <button
        id={buttonId}
        type="button"
        className={classes.trigger}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className={classes.question}>{item.question}</span>
        <span className={classes.icon} aria-hidden="true">
          <IconPlus size={16} stroke={2.4} />
        </span>
      </button>

      {reduceMotion ? (
        open ? (
          <div id={panelId} role="region" aria-labelledby={buttonId} className={classes.panel}>
            <p>{item.answer}</p>
          </div>
        ) : null
      ) : (
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={classes.panel}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <p>{item.answer}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
    </div>
  );
}

export default function ServicesFaq({
  items = servicesFaq,
  title = 'Questions Frequently Asked',
  titleId = 'services-faq-title',
  idPrefix = 'services-faq',
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className={classes.section} aria-labelledby={titleId}>
      <Container>
        <ScrollReveal className={classes.header}>
          <h2 id={titleId} className="sectionTitle">
            {title}
          </h2>
        </ScrollReveal>

        <ScrollReveal className={classes.list} delay={0.08}>
          {items.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              index={index}
              open={openIndex === index}
              reduceMotion={reduceMotion}
              idPrefix={idPrefix}
              onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
            />
          ))}
        </ScrollReveal>
      </Container>
    </section>
  );
}
