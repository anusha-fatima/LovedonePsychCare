import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import { SiteFooter } from "@/components/sections/SiteFooter";

export const metadata = {
  title: "Services · LovedOne PsyCare",
};

export default function ServicesPage() {
  return (
    <>
      <section className="section pb-0">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">Services</p>
          <h1 className="h-display text-5xl">
            Everything we offer, in one calm chat.
          </h1>
          <p className="mt-5 text-ink-500 text-lg">
            One conversation. Two ways to be supported. Free to start.
          </p>
        </div>
      </section>
      <Services />
      <Process />
      <CTA />
      <SiteFooter />
    </>
  );
}
