import AboutPreview from '@/components/sections/AboutPreview/AboutPreview';
import CtaBanner from '@/components/sections/CtaBanner/CtaBanner';
import FeaturedColleges from '@/components/sections/FeaturedColleges/FeaturedColleges';
import HeroSection from '@/components/sections/HeroSection/HeroSection';
import ProcessSection from '@/components/sections/ProcessSection/ProcessSection';
import ServicesPreview from '@/components/sections/ServicesPreview/ServicesPreview';
import TestimonialsSection from '@/components/sections/TestimonialsSection/TestimonialsSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection/WhyChooseSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ServicesPreview />
      <WhyChooseSection />
      <ProcessSection />
      <FeaturedColleges />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
