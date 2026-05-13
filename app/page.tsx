import { FloatingNav } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import Footer from "../components/Footer";
import { KineticTypography } from "@/components/KineticTypography";
import { AppShowcase} from "../components/AppShowcase";
import QuoteSection from "@/components/QuoteSection";
import { CTASection } from '../components/CTASection';

export default function Home() {
  return (
    <>
      <FloatingNav />
      <HeroSection />
      <KineticTypography />
      <AppShowcase />
      <CTASection />    
      <QuoteSection />
      <Footer />
    </>
  );
}