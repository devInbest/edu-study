import Container from '@/components/common/Container/Container';

import classes from './PageHero.module.scss';

export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className={classes.hero}>
      <Container className={classes.inner}>
        {eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </Container>
    </section>
  );
}
