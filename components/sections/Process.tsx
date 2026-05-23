import Image from "next/image";
import { MessageCircle, UserRound, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    icon: MessageCircle,
    title: "Start a Conversation",
    body: "Open a private chat anytime you need support.",
  },
  {
    icon: UserRound,
    title: "Connect With Experts",
    body: "Talk with licensed therapists who understand you.",
  },
  {
    icon: ShieldCheck,
    title: "Heal Safely",
    body: "Your journey stays secure, calm, and confidential.",
  },
];

export function Process() {
  return (
    <section id="process" className="section bg-cream/60 overflow-hidden">
      <div className="container-page">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow justify-center font-sans">Simple Steps</p>

          <h2 className="h-display text-4xl md:text-5xl font-display">How it works</h2>

          <p className="mt-4 text-ink-500 text-lg font-sans">
            Simple, private, and designed to feel human.
          </p>
        </div>

        {/* Content */}
        <div className="mt-16 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative w-full max-w-[420px] mx-auto">
              <div className="relative h-[380px] rounded-[32px] overflow-hidden shadow-soft">
                <Image
                  src="/doctor-virtual.png"
                  alt="Doctor"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* RIGHT STEPS */}
          <div className="lg:col-span-7">
            <div className="space-y-10">
              {STEPS.map((step, index) => (
                <div key={index} className="flex gap-5 relative">
                  {/* Vertical Line */}
                  {index !== STEPS.length - 1 && (
                    <div className="absolute left-[22px] top-14 h-full w-px bg-ink-900/10" />
                  )}

                  {/* Icon */}
                  <div
                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                      index === 0
                        ? "bg-[rgb(11,20,55)]"
                        : "border border-ink-900/10 bg-white"
                    }`}
                  >
                    <step.icon
                      className={`h-5 w-5 ${
                        index === 0 ? "text-white" : "text-[rgb(11,20,55)]"
                      }`}
                    />
                  </div>

                  {/* Text */}
                  <div className="pt-1">
                    <h3 className="font-display text-xl text-ink-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm text-ink-500 leading-relaxed max-w-md font-sans">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}