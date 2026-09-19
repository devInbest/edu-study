import {
  IconEye,
  IconHeartHandshake,
  IconTarget,
} from '@tabler/icons-react';

import Container from '@/components/common/Container/Container';
import { aboutContent } from '@/constants/site';

import classes from './about.module.scss';

const icons = {
  mission: IconTarget,
  vision: IconEye,
  philosophy: IconHeartHandshake,
};

export default function AboutValues() {
  return (
    <section className={classes.section} aria-labelledby="about-values-title">
      <Container>
        <header className={classes.header}>
          <h2 id="about-values-title" className="sectionTitle">
            Our Foundation
          </h2>
        </header>

        <div className={classes.grid}>
          {aboutContent.cards.map((card) => {
            const Icon = icons[card.id] || IconTarget;
            return (
              <article
                key={card.id}
                className={`${classes.card} ${classes[card.tone]}${
                  card.wide ? ` ${classes.wide}` : ''
                }`}
              >
                <div className={classes.cardTop}>
                  <span className={classes.iconWrap} aria-hidden="true">
                    <Icon size={22} stroke={1.75} />
                  </span>
                  <p className={classes.cardEyebrow}>{card.eyebrow}</p>
                </div>
                <h3 className={classes.cardTitle}>{card.title}</h3>
                <ul className={classes.points}>
                  {card.points.map((point) => (
                    <li key={point}>
                      <span className={classes.bullet} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
