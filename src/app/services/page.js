import PageHero from '@/components/common/PageHero/PageHero';
import CtaBanner from '@/components/sections/CtaBanner/CtaBanner';
import ServicesFaq from '@/components/sections/ServicesFaq/ServicesFaq';

import ServicesList from './ServicesList';

export const metadata = {
  title: 'Services',
  description:
    'Admission guidance, career counselling, college selection, application assistance, local guardian support, and course selection.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need for a confident admission journey"
        description="Focused support designed to take students from first questions to campus confidence."
      />

      <ServicesList />

      <ServicesFaq />

      <CtaBanner />
    </>
  );
}
