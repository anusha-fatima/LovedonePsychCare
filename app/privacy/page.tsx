import { SiteFooter } from "@/components/sections/SiteFooter";

export const metadata = { title: "Privacy · LovedOne PsyCare" };

export default function PrivacyPage() {
  return (
    <>
      <section className="section">
        <div className="container-page max-w-3xl prose-like space-y-6 text-ink-700">
          <p className="eyebrow">Privacy</p>
          <h1 className="h-display text-5xl">Your conversations are yours.</h1>
          <p className="text-ink-500 text-lg">
            We treat what you say to LovedOne PsyCare with the same care we&apos;d
            want for our own families. Here&apos;s the short version.
          </p>

          <Section title="What we collect">
            <p>
              Your email and password, the messages you send in your conversation,
              and minimal device/usage data to keep the service running. That&apos;s
              it.
            </p>
          </Section>
          <Section title="What we don't do">
            <p>
              We don&apos;t sell or rent your data. We don&apos;t train third-party
              models on your conversations. We don&apos;t show you ads.
            </p>
          </Section>
          <Section title="Who can see your chat">
            <p>
              You, the AI guide, and a licensed therapist if you invite one in.
              An administrator may access conversations only when needed for
              safety, abuse, or legal compliance, and that access is logged.
            </p>
          </Section>
          <Section title="Deletion">
            <p>
              You can wipe your conversation history from the app, and request
              full account deletion by emailing hello@lopc.com.
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
