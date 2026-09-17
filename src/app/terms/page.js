import Container from '@/components/common/Container/Container';
import PageHero from '@/components/common/PageHero/PageHero';
import env from '@/constants/env';

import classes from './terms.module.scss';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using Edu Study Consultancy website and counselling services.',
};

const sections = [
  {
    title: '1. Service scope',
    body: `${env.appName} provides education counselling, college shortlisting support, application guidance, and related advisory services. We do not guarantee admission to any institution.`,
  },
  {
    title: '2. Admission disclaimer',
    body: 'Admissions are governed solely by the respective colleges, universities, and counselling authorities. Seat allotment, fees, eligibility, and timelines may change without notice from us.',
  },
  {
    title: '3. Information accuracy',
    body: 'College details, eligibility notes, and admission information on this website are shared for guidance and may require verification. Students should confirm final details with official sources before applying.',
  },
  {
    title: '4. Counselling disclaimer',
    body: 'Counselling recommendations are based on information provided by the student/parent and publicly available institutional data. Final academic and career decisions remain with the student and family.',
  },
  {
    title: '5. Student responsibility',
    body: 'Students are responsible for submitting accurate documents, meeting deadlines, paying applicable fees to institutions, and complying with college/university rules.',
  },
  {
    title: '6. Third-party websites',
    body: 'Links to external websites or platforms (including social media and maps) are provided for convenience. We are not responsible for third-party content or practices.',
  },
  {
    title: '7. Intellectual property',
    body: 'Website content, branding, and materials belonging to Edu Study Consultancy may not be copied or reused without prior written permission.',
  },
  {
    title: '8. Privacy',
    body: 'Enquiry form data is collected to respond to counselling requests and related follow-ups. We do not sell personal information. Contact us for privacy-related questions.',
  },
  {
    title: '9. Changes to terms',
    body: 'We may update these Terms & Conditions from time to time. Continued use of the website after updates constitutes acceptance of the revised terms.',
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Please read these terms carefully before using our website or counselling services."
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
