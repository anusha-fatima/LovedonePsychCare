import { Quote } from "lucide-react";

const CASES = [
  {
    tag: "Anxiety · 23",
    title: "“I finally slept through the night.”",
    body:
      "Rida started by chatting with Sukoon at 2 AM after panic attacks. After three sessions with Dr. Sarah, she has tools for the spike and a sleep routine she trusts.",
    metric: "11 → 2",
    metricLabel: "panic episodes / month",
  },
  {
    tag: "Grief · 38",
    title: "“I could finally say his name out loud.”",
    body:
      "Tariq lost his father and stopped speaking about it. He typed in Urdu, in fragments. A bilingual therapist met him there.",
    metric: "6 weeks",
    metricLabel: "to first in-person family talk",
  },
  {
    tag: "Burnout · 29",
    title: "“I stopped apologising for being tired.”",
    body:
      "Ahmed thought therapy meant a fancy office. He started in the chat on a lunch break. Two months later, he set his first work boundary.",
    metric: "+38%",
    metricLabel: "self-rated well-being",
  },
];

export function CaseStudies() {
  return (
    <section className="section bg-ink-900 text-white">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-midnight-200">
            Real stories
          </p>
          <h2 className="font-display font-medium text-4xl md:text-5xl mt-3 leading-[1.05]">
            Quiet wins, from people like you.
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Names changed, permission given. These are the moments that
            convinced us this works.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {CASES.map((c) => (
            <article
              key={c.title}
              className="rounded-3xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.07] transition-colors"
            >
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-midnight-200 bg-midnight-200/10 ring-1 ring-midnight-200/20 rounded-full px-3 py-1">
                {c.tag}
              </span>
              <Quote className="h-5 w-5 mt-5 text-midnight-200/70" />
              <h3 className="font-display text-2xl mt-2 leading-snug">
                {c.title}
              </h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{c.body}</p>
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="font-display text-3xl text-midnight-200">
                  {c.metric}
                </div>
                <div className="text-xs uppercase tracking-wider text-white/50">
                  {c.metricLabel}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
