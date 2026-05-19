import { SiteFooter } from "@/components/sections/SiteFooter";

export const metadata = { title: "Terms · LovedOne PsyCare" };

export default function TermsPage() {
  return (
    <>
      <section className="section">
        <div className="container-page max-w-3xl space-y-6 text-ink-700">
          <p className="eyebrow">Terms of service</p>
          <h1 className="h-display text-5xl">The straight version.</h1>
          <p className="text-ink-500 text-lg">
            By using LovedOne PsyCare you agree to use the service responsibly,
            understand that it is not an emergency line, and acknowledge that
            our AI guide is a support tool, not a clinician.
          </p>
          <Section title="What you agree to">
            <ul className="list-disc pl-5 space-y-2">
              <li>You are 18+ or have a guardian&apos;s consent.</li>
              <li>You won&apos;t use this service to harm yourself or others.</li>
              <li>You won&apos;t harass therapists or other users.</li>
            </ul>
          </Section>
          <Section title="What we promise">
            <ul className="list-disc pl-5 space-y-2">
              <li>To match you with licensed clinicians.</li>
              <li>To respond to safety reports quickly.</li>
              <li>To keep this product running with care.</li>
            </ul>
          </Section>
          <Section title="Not medical care">
            <p>
              LovedOne PsyCare is not a substitute for emergency, psychiatric, or
              hospital care. If you or someone you know is in immediate danger,
              please contact emergency services.
            </p>
          </Section>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink-900 mt-8">{title}</h2>
      <div className="mt-2 text-ink-500 leading-relaxed">{children}</div>
    </div>
  );
}
