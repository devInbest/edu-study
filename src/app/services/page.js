import servicesBanner from '@/assets/images/banners/services.jpg';
import PageBanner from '@/components/common/PageBanner/PageBanner';
import CtaAdBanner from '@/components/sections/CtaAdBanner/CtaAdBanner';
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
      <PageBanner
        image={servicesBanner}
        imageAlt="Indian career counsellor guiding a student through admission options"
        eyebrow="What We Offer"
        title="Our Services"
        icon="services"
        priority
      />

      <ServicesList />

      <CtaAdBanner />

      <ServicesFaq />
    </>
  );
}
