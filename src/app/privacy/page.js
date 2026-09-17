import Container from '@/components/common/Container/Container';
import PageHero from '@/components/common/PageHero/PageHero';
import env from '@/constants/env';

import classes from './privacy.module.scss';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Edu Study Consultancy — how we collect and use enquiry information.',
};

const sections = [
  {
    title: '1. Information we collect',
    body: `When you submit an enquiry on ${env.appName}, we may collect your name, mobile number, email address, preferred course, college interest, location, academic qualification, and message content.`,
  },
  {
    title: '2. How we use your information',
    body: 'We use enquiry details to respond to counselling requests, share relevant college/course guidance, and follow up on admission-related queries. We do not sell personal information to third parties.',
  },
  {
    title: '3. Sharing of information',
    body: 'We may share information with authorised counselling staff or partner institutions only when needed to support your enquiry, or when required by law.',
  },
  {
    title: '4. Data security',
    body: 'We take reasonable steps to protect personal data submitted through our website. No method of transmission over the internet is fully secure, so please share only information you are comfortable providing.',
  },
  {
    title: '5. Cookies & analytics',
    body: 'Our website may use basic analytics or essential cookies to understand traffic and improve performance. You can control cookies through your browser settings.',
  },
  {
    title: '6. Your choices',
    body: `To update or request deletion of your enquiry details, contact us at ${env.contactEmail} or ${env.contactPhone}.`,
  },
  {
    title: '7. Policy updates',
    body: 'We may update this Privacy Policy from time to time. Continued use of the website after changes means you accept the updated policy.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Edu Study Consultancy collects, uses, and protects information shared through our website."
      />
      <section className={classes.section}>
        <Container className={classes.content}>
          {sections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
