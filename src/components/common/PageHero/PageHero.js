import Container from '@/components/common/Container/Container';

import classes from './PageHero.module.scss';

export default function PageHero({ eyebrow, title, description }) {
  return (
    <Container className={classes.wrap}>
      <section className={classes.hero}>
        <div className={classes.inner}>
          {eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>
      </section>
    </Container>
  );
}
