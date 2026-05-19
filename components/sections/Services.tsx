import {
  MessageSquare,
  UserRound,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Globe,
} from "lucide-react";

const SERVICES = [
  {
    icon: MessageSquare,
    title: "AI guide, Sukoon",
    body:
      "Talk freely, any hour. Sukoon listens, reflects, and helps you organise the noise — at your pace.",
    accent: "bg-midnight-50 text-midnight-700 ring-midnight-200",
  },
  {
    icon: UserRound,
    title: "Licensed therapists",
    body:
      "When you're ready, request a human. A vetted PMDC therapist joins the same chat — no apps, no waiting room.",
    accent: "bg-periwinkle-50 text-periwinkle-500 ring-periwinkle-200",
  },
  {
    icon: HeartPulse,
    title: "Crisis-aware",
    body:
      "Our team can de-escalate, pause, or escalate any conversation to a human within minutes.",
    accent: "bg-azure-50 text-azure-500 ring-azure-200",
  },
  {
    icon: Globe,
    title: "Bilingual care",
    body: "Both English and Urdu, with therapists who understand the culture, family, and faith you live in.",
    accent: "bg-midnight-50 text-midnight-700 ring-midnight-200",
  },
  {
    icon: Sparkles,
    title: "Built for everyday",
    body:
      "Anxiety, sleep, grief, relationships, exam stress, parenting — bring whatever weighs on you today.",
    accent: "bg-periwinkle-50 text-periwinkle-500 ring-periwinkle-200",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    body:
      "Your conversations are yours. We don't sell data, and you can wipe your history at any time.",
    accent: "bg-azure-50 text-azure-500 ring-azure-200",
  },
];

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">What we offer</p>
          <h2 className="h-display text-4xl md:text-5xl">
            Care that meets you where you are.
          </h2>
          <p className="mt-4 text-ink-500 text-lg">
            One private chat. Two ways to be supported. You decide when to bring
            a human in.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="card p-6 hover:-translate-y-1 transition-transform"
            >
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${s.accent}`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-xl text-ink-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
