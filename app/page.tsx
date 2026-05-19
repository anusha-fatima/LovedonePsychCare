import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { AppPreview } from "@/components/sections/AppPreview";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <AppPreview />
      <CaseStudies />
      <Testimonials />
      <CTA />
      <SiteFooter />
    </>
  );
}
