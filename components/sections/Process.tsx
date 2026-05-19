const STEPS = [
  {
    n: "01",
    title: "Create your space",
    body:
      "Sign up in seconds with just an email. No insurance forms, no public profile.",
  },
  {
    n: "02",
    title: "Open the chat",
    body:
      "Sukoon is already there. Start typing — about today, tonight, or something you've never said out loud.",
  },
  {
    n: "03",
    title: "Ask for a human",
    body:
      "When you're ready, tap “Talk to a therapist.” A licensed psychologist joins the same conversation.",
  },
  {
    n: "04",
    title: "Pick it up tomorrow",
    body:
      "Your chat persists. Come back when you need to — your context, your therapist, your pace.",
  },
];

export function Process() {
  return (
    <section id="process" className="section bg-cream/60">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow">How it works</p>
            <h2 className="h-display text-4xl md:text-5xl">
              Four small steps. <br />
              No leap of faith required.
            </h2>
            <p className="mt-5 text-ink-500 text-lg max-w-md">
              We designed the flow to feel less like a clinic, more like
              texting a friend who knows what to say.
            </p>
          </div>

          <ol className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {STEPS.map((s) => (
              <li key={s.n} className="card p-6">
                <span className="font-display text-3xl text-midnight-600">
                  {s.n}
                </span>
                <h3 className="mt-2 font-display text-xl text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
