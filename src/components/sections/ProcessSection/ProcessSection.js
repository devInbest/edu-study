'use client';

import { useEffect, useState } from 'react';

import {
  IconCompass,
  IconEar,
  IconFileCheck,
  IconHeartHandshake,
  IconListCheck,
} from '@tabler/icons-react';
import { useReducedMotion } from 'framer-motion';

import Container from '@/components/common/Container/Container';
import ScrollReveal from '@/components/common/ScrollReveal/ScrollReveal';
import BackgroundRippleEffect from '@/components/ui/BackgroundRippleEffect/BackgroundRippleEffect';
import { processSteps } from '@/constants/site';

import ApproachGlobe from './ApproachGlobe';
import classes from './ProcessSection.module.scss';

const stepIcons = [IconEar, IconCompass, IconListCheck, IconFileCheck, IconHeartHandshake];

export default function ProcessSection() {
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const orbiting = isDesktop && !reduceMotion;

  return (
    <section className={classes.section} aria-labelledby="approach-title">
      <BackgroundRippleEffect cellSize={56} />
      <Container className={classes.content}>
        <ScrollReveal className={classes.header}>
          <h2 id="approach-title" className="sectionTitle">
            Our approach
          </h2>
        </ScrollReveal>

        <div className={classes.orbit}>
          {isDesktop ? <ApproachGlobe /> : null}

          <div className={`${classes.rotor} ${orbiting ? classes.rotorSpin : ''}`}>
            <ol className={classes.steps}>
              {processSteps.map((step, index) => {
                const Icon = stepIcons[index];
                const baseAngle = index * 72 - 90;

                return (
                  <li
                    key={step.title}
                    className={classes.slot}
                    style={{ '--i': index, '--base-angle': `${baseAngle}deg` }}
                  >
                    <div
                      className={`${classes.keeper} ${orbiting ? classes.keeperSpin : ''}`}
                      style={
                        orbiting
                          ? undefined
                          : { transform: isDesktop ? `rotate(${-baseAngle}deg)` : undefined }
                      }
                    >
                      <article className={`${classes.card} ${classes[`tone${index + 1}`] || ''}`}>
                        <div className={classes.cardTop}>
                          <span className={classes.index}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className={classes.badge}>
                            <Icon size={16} stroke={2.2} />
                          </span>
                        </div>
                        <div className={classes.cardBody}>
                          <h3>{step.title}</h3>
                          <p>{step.description}</p>
                        </div>
                      </article>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
