import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import StudentUseCases from '@/components/StudentUseCases';
import HowItWorks from '@/components/HowItWorks';
import TrustSection from '@/components/TrustSection';
import FAQAccordion from '@/components/FAQAccordion';
import FinalCTA from '@/components/FinalCTA';
import SiteFooter from '@/components/SiteFooter';
import MobileBottomBar from '@/components/MobileBottomBar';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-24 lg:pb-0">
        <HeroSection />
        <BenefitsGrid />
        <StudentUseCases />
        <HowItWorks />
        <TrustSection />
        <FAQAccordion />
        <FinalCTA />
      </main>
      <SiteFooter />
      <MobileBottomBar />
    </>
  );
}
