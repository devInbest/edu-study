import { Button } from '@mantine/core';

import Container from '@/components/common/Container/Container';

import classes from './CtaSection.module.scss';

export default function CtaSection() {
  return (
    <section className={classes.section} id="pricing">
      <Container>
        <div className={classes.banner}>
          <div>
            <h2>Ready to start learning?</h2>
            <p>Join eduStudy and keep your courses, tools, and study plans in one place.</p>
          </div>
          <Button size="md" variant="white" color="dark" component="a" href="#contact">
            Get Started
          </Button>
        </div>
      </Container>
    </section>
  );
}
