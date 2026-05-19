import { SiteFooter } from "@/components/sections/SiteFooter";
import { CTA } from "@/components/sections/CTA";
import { HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "About · LovedOne PsyCare",
};

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Care, not commerce",
    body:
      "We are a small, mission-led team. We don't sell ads, we don't sell data. Our incentive is your well-being.",
  },
  {
    icon: ShieldCheck,
    title: "Local first",
    body:
      "We build for Pakistan: Urdu and English in the same chat, therapists who get the cultural weight, and crisis lines that work here.",
  },
  {
    icon: Sparkles,
    title: "AI with a leash",
    body:
      "Our AI guide listens and reflects. The moment something is too heavy, a human takes over — we engineered the handoff to be silent.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">Why we built this</p>
          <h1 className="h-display text-5xl md:text-6xl">
            Therapy in Pakistan should be the easiest thing you do this week.
          </h1>
          <p className="mt-5 text-ink-500 text-lg">
            LovedOne PsyCare started because we watched people we love struggle
            in silence — late nights, anxious mornings, grief no one knew how
            to talk about. The clinics existed, but the door felt heavy. We
            wanted a door that opens with a single tap.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page grid md:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="card p-6">
              <v.icon className="h-6 w-6 text-midnight-600" />
              <h3 className="mt-4 font-display text-xl text-ink-900">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTA />
      <SiteFooter />
    </>
  );
}
