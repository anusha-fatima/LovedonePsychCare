import { FloatingNav } from "../components/FloatingNav";
import { HeroSection } from "../components/HeroSection";
import Footer from "../components/Footer";
// import Stats from "@/components/Stats";
import { KineticTypography } from "@/components/KineticTypography";
// import HowItWorks from "@/components/HowItWorks";
import { PsychologistShowcase } from "../components/PsychologistShowcase";
// import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { SolutionsGrid } from '../components/sections/SolutionsGrid';

export default function Home() {
  return (
    <>
      <FloatingNav />
      <HeroSection />
      {/* <Stats /> */}
      <KineticTypography />
      {/* <HowItWorks /> */}
      <PsychologistShowcase />
      <CTASection />
      {/* <Testimonials /> */}
      <SolutionsGrid />
      
      <Footer />
    </>
  );
}