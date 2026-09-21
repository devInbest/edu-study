import {
  IconEye,
  IconHeartHandshake,
  IconTargetArrow,
} from '@tabler/icons-react';

import Container from '@/components/common/Container/Container';
import { aboutContent } from '@/constants/site';

import classes from './about.module.scss';

function CapsuleSide({ tone, title, items, mirror = false }) {
  const Icon = mirror ? IconEye : IconTargetArrow;

  return (
    <div className={`${classes.side} ${classes[tone]}`}>
      <div className={classes.orbStage}>
        <div className={classes.orb} aria-hidden="true">
          <span className={classes.orbBloom} />
          <span className={classes.orbCore}>
            {mirror ? (
              <span className={classes.orbLabel}>
                <Icon size={26} stroke={2.2} />
                Our
              </span>
            ) : (
              <span className={classes.orbLabel}>
                Our
                <Icon size={26} stroke={2.2} />
              </span>
            )}
            <strong>{title}</strong>
          </span>
        </div>

        <ol className={classes.items}>
          {items.map((item, index) => (
            <li key={item.title} className={classes.item} data-i={index + 1}>
              <div className={classes.itemHead}>
                <span className={classes.badge}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function AboutValues() {
  const philosophy = aboutContent.philosophyCard;

  return (
    <section className={classes.section} aria-labelledby="about-values-title">
      <Container>
        <header className={classes.header}>
          <h2 id="about-values-title" className="sectionTitle">
            Vision & Mission
          </h2>
        </header>

        <div className={classes.capsule} role="group" aria-label="Mission and Vision">
          <CapsuleSide tone="mission" title="Mission" items={aboutContent.missionItems} />
          <div className={classes.divider} aria-hidden="true" />
          <CapsuleSide
            tone="vision"
            title="Vision"
            items={aboutContent.visionItems}
            mirror
          />
        </div>

        <article className={classes.philosophy}>
          <div className={classes.cardTop}>
            <span className={classes.iconWrap} aria-hidden="true">
              <IconHeartHandshake size={22} stroke={1.75} />
            </span>
            <p className={classes.cardEyebrow}>{philosophy.eyebrow}</p>
          </div>
          <h3 className={classes.cardTitle}>{philosophy.title}</h3>
          <ul className={classes.points}>
            {philosophy.points.map((point) => (
              <li key={point}>
                <span className={classes.bullet} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </article>
      </Container>
    </section>
  );
}
