const TESTIMONIALS = [
  {
    quote:
      "Texting Sukoon at 3 AM felt safer than calling anyone I know. By morning I had words for what was happening.",
    name: "Hira, 26",
    place: "Lahore",
  },
  {
    quote:
      "I never thought I'd talk to a therapist in Urdu, on my phone, in my own bed. This is the first thing that didn't feel foreign.",
    name: "Tariq, 38",
    place: "Karachi",
  },
  {
    quote:
      "The handoff was seamless. The AI listened, the human caught up, and I never had to repeat my story.",
    name: "Sana, 31",
    place: "Islamabad",
  },
];

export function Testimonials() {
  return (
    <section className="section bg-cream/60">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">In their words</p>
          <h2 className="h-display text-4xl md:text-5xl">
            The people we built this for.
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card p-6">
              <blockquote className="text-ink-900 text-lg leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-ink-900">{t.name}</span>
                <span className="text-ink-400"> · {t.place}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
