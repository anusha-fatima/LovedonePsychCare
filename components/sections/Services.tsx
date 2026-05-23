import {
  ShieldCheck,
  Sparkles,
  HeartHandshake,
} from "lucide-react";

const SERVICES = [
  {
    icon: ShieldCheck,
    title: "Safe & Private",
    body: "Your conversations stay secure, confidential, and judgment-free.",
    accent: "bg-[rgb(11,20,55)]",
  },
  {
    icon: Sparkles,
    title: "Care For You",
    body: "Support that adapts to your emotions, pace, and personal journey.",
    accent: "bg-[rgb(11,20,55)]",
    featured: true,
  },
  {
    icon: HeartHandshake,
    title: "Human Support",
    body: "Connect with real therapists who truly understand your struggles.",
    accent: "bg-[rgb(11,20,55)]",
  },
];

export function Services() {
  return (
    <section id="services" className="section overflow-hidden">
      <div className="container-page">
        {/* Top Heading */}
        <div className="max-w-2xl">
          <p className="eyebrow font-sans">What we offer</p>

          <h2 className="h-display text-4xl md:text-5xl font-display">
            Care that meets you where you are.
          </h2>

          <p className="mt-4 text-ink-500 text-lg font-sans">
            One private space for support, healing, and meaningful connection.
          </p>
        </div>

        {/* Services Layout */}
        <div className="mt-20 grid md:grid-cols-3 gap-10 md:gap-6 items-start">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className={`relative ${
                service.featured ? "md:-mt-6" : ""
              }`}
            >
              {/* Number */}
              <span className="absolute -top-2 right-2 text-sm text-ink-400 font-medium font-sans">
          
              </span>

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${service.accent}`}
              >
                <service.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="mt-6 max-w-[240px]">
                <h3 className="text-lg font-semibold text-ink-900 font-display">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink-500 font-sans">
                  {service.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}