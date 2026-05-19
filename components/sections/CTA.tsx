import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[36px] bg-midnight-600 text-white p-10 md:p-16 shadow-soft">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-16 -bottom-24 h-72 w-72 rounded-full bg-periwinkle-300/30 blur-3xl" />

          <div className="relative max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
              You don't have to figure it out alone tonight.
            </h2>
            <p className="mt-5 text-white/80 text-lg">
              Open the chat. Talk to Sukoon. Ask for a human. We've made every
              step as small as we could.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/auth/signup"
                className="btn bg-white text-midnight-700 hover:bg-cream"
              >
                Create a free account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth"
                className="btn border border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                I already have one
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
