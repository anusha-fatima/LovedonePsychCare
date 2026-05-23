"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  Shield,
  Award,
  Linkedin,
  Twitter,
} from "lucide-react";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background */}
        <div className="absolute inset-0 bg-[rgb(var(--canvas))]" />

        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-periwinkle-200/30 blur-3xl rounded-full opacity-40" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-midnight-200/20 blur-3xl rounded-full opacity-30" />

        <div className="container-page relative z-10">
          {/* Hero Section - About Us Heading */}
          <div
            className="rounded-[32px] p-8 md:p-12 mb-16"
            style={{ background: "rgb(11, 20, 55)" }}
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left Content */}
              <div>
                <p
                  className="text-sm font-semibold uppercase tracking-[0.18em] mb-3"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  About Us
                </p>

                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
                  style={{ color: "white", fontFamily: "var(--font-fraunces)" }}
                >
                  We are a dedicated
                  <br />
                  team of five.
                </h1>

                <p
                  className="mt-5 text-lg max-w-xl leading-relaxed font-medium"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  We engineer safe, secure, and intuitive digital spaces for
                  anyone navigating emotional and psychological struggles.
                </p>

              
              </div>

              {/* Right Image */}
              <div className="relative h-[320px] lg:h-[400px] rounded-[28px] overflow-hidden">
                <Image
                  src="/team-working.png"
                  alt="Our team working together"
                  fill
                  className="object-cover"
                />               
              </div>
            </div>
          </div>

          {/* Company Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[400px] rounded-[32px] overflow-hidden">
              <Image
                src="/team-meeting.jpg"
                alt="Our dedicated team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            <div>
              <p className="eyebrow">Who We Are & Where We Come From</p>
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-ink-900 font-display">
                Combining Technical Integrity
                <br />
                With Deep Psychological Care.
              </h2>
              <p className="mt-4 text-ink-500 leading-relaxed">
                At LovedOne PsyCare, we believe that seeking emotional guidance
                should never be complicated, cold, or disconnected. Founded by a
                closely knit team of five software developers, product
                designers, and mental health allies, our company emerged from a
                shared understanding: while modern digital technology was
                advancing exponentially, online support tools lacked true human
                warmth and genuine clinical responsibility. We stepped in to
                bridge that gap, cultivating an environment where high-end
                development works hand-in-hand with clinical empathy.
              </p>
              <p className="mt-4 text-ink-500 leading-relaxed">
                Our path began with a fundamental realization of the current
                mental health landscape—long waitlists, structural cost
                friction, and isolated healing journeys. As technical
                innovators, we recognized that system pipelines could dismantle
                logistical roadblocks. However, as human beings, we knew that
                technology handling personal vulnerability must be engineered
                with absolute ethical care.
              </p>
            </div>
          </div>

          {/* Mission & Values Section - 3 Boxes as specified */}
          <div id="mission" className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="eyebrow">Our Foundation</p>
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-ink-900 font-display">
                Mission, Vision & Values
              </h2>
              <p className="mt-4 text-ink-500 leading-relaxed">
                Built with compassion, driven by purpose. Here's what guides us
                every day.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Box 1 - Our Mission (High Contrast Solid Card) */}
              <div className="rounded-[28px] p-6 bg-ink-900 text-white shadow-lg">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-sm leading-relaxed text-white/80">
                  To eliminate geographic, economic, and logistical barriers to
                  emotional wellness by providing immediate, protected, and warm
                  interactive environments to individuals seeking safe
                  therapeutic spaces.
                </p>
              </div>

              {/* Box 2 - Our Vision (Soft Transparent Frosted Card) */}
              <div className="rounded-[28px] p-6 bg-white/60 backdrop-blur-xl border border-white/20 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-midnight-50 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-midnight-700" />
                </div>
                <h3 className="text-xl font-semibold text-ink-900 mb-2">
                  Our Vision
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed">
                  To normalize preventative daily emotional care through
                  intuitive digital tools, creating a reliable global standard
                  for immediate, barrier-free mental health support.
                </p>
              </div>

              {/* Box 3 - Our Values (Accent Theme Card) */}
              <div className="rounded-[28px] p-6 bg-periwinkle-100/70 backdrop-blur-sm border border-periwinkle-200 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-midnight-50 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-midnight-700" />
                </div>
                <h3 className="text-xl font-semibold text-ink-900 mb-2">
                  Our Values
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed">
                  Absolute clinical privacy, bulletproof security data pipelines
                  that protect patient autonomy, and an unyielding dedication to
                  partnering exclusively with verified, empathetic
                  practitioners.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <div className="text-center p-6 rounded-[28px] bg-white/60 backdrop-blur-sm">
              <div className="text-4xl font-bold text-midnight-700">500+</div>
              <div className="text-sm text-ink-500 mt-1">Patients Helped</div>
            </div>
            <div className="text-center p-6 rounded-[28px] bg-white/60 backdrop-blur-sm">
              <div className="text-4xl font-bold text-midnight-700">50+</div>
              <div className="text-sm text-ink-500 mt-1">
                Verified Psychologists
              </div>
            </div>
            <div className="text-center p-6 rounded-[28px] bg-white/60 backdrop-blur-sm">
              <div className="text-4xl font-bold text-midnight-700">24/7</div>
              <div className="text-sm text-ink-500 mt-1">AI Support</div>
            </div>
            <div className="text-center p-6 rounded-[28px] bg-white/60 backdrop-blur-sm">
              <div className="text-4xl font-bold text-midnight-700">100%</div>
              <div className="text-sm text-ink-500 mt-1">Confidential</div>
            </div>
          </div>

          {/* Meet Our Team Section */}
          <div id="team" className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="eyebrow">The People Behind It</p>
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-ink-900 font-display">
                Meet Our Core Team
              </h2>
              <p className="mt-4 text-ink-500 leading-relaxed">
                A closely knit team of five technology professionals and mental
                health advocates united by a common purpose.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="card rounded-[28px] overflow-hidden bg-white/90 backdrop-blur-xl hover:shadow-lg transition-all">
                <div className="relative h-[280px] bg-midnight-100">
                  <Image
                    src="/team-founder.jpg"
                    alt="Dr. Sarah Ahmed - Founder"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-ink-900">
                    Dr. Sarah Ahmed
                  </h3>
                  <p className="text-sm text-midnight-600 mb-3">
                    Founder & Clinical Director
                  </p>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    PhD in Clinical Psychology. 15+ years of experience in
                    mental health advocacy and therapy.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <Link
                      href="#"
                      className="w-8 h-8 rounded-full bg-midnight-50 flex items-center justify-center hover:bg-midnight-100 transition"
                    >
                      <Linkedin className="w-4 h-4 text-midnight-700" />
                    </Link>
                    <Link
                      href="#"
                      className="w-8 h-8 rounded-full bg-midnight-50 flex items-center justify-center hover:bg-midnight-100 transition"
                    >
                      <Twitter className="w-4 h-4 text-midnight-700" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="card rounded-[28px] overflow-hidden bg-white/90 backdrop-blur-xl hover:shadow-lg transition-all">
                <div className="relative h-[280px] bg-midnight-100">
                  <Image
                    src="/team-cto.jpg"
                    alt="Ali Raza - CTO"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-ink-900">
                    Ali Raza
                  </h3>
                  <p className="text-sm text-midnight-600 mb-3">
                    Chief Technology Officer
                  </p>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    Leads our voice cloning, AI triage, and platform security
                    initiatives.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <Link
                      href="#"
                      className="w-8 h-8 rounded-full bg-midnight-50 flex items-center justify-center hover:bg-midnight-100 transition"
                    >
                      <Linkedin className="w-4 h-4 text-midnight-700" />
                    </Link>
                    <Link
                      href="#"
                      className="w-8 h-8 rounded-full bg-midnight-50 flex items-center justify-center hover:bg-midnight-100 transition"
                    >
                      <Twitter className="w-4 h-4 text-midnight-700" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="card rounded-[28px] overflow-hidden bg-white/90 backdrop-blur-xl hover:shadow-lg transition-all">
                <div className="relative h-[280px] bg-midnight-100">
                  <Image
                    src="/team-psychologist.jpg"
                    alt="Dr. Fatima Khan"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-ink-900">
                    Dr. Fatima Khan
                  </h3>
                  <p className="text-sm text-midnight-600 mb-3">
                    Head of Clinical Operations
                  </p>
                  <p className="text-sm text-ink-500 leading-relaxed">
                    Specializes in trauma and grief counseling. Oversees all
                    psychologist verifications.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <Link
                      href="#"
                      className="w-8 h-8 rounded-full bg-midnight-50 flex items-center justify-center hover:bg-midnight-100 transition"
                    >
                      <Linkedin className="w-4 h-4 text-midnight-700" />
                    </Link>
                    <Link
                      href="#"
                      className="w-8 h-8 rounded-full bg-midnight-50 flex items-center justify-center hover:bg-midnight-100 transition"
                    >
                      <Twitter className="w-4 h-4 text-midnight-700" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-ink-500">
                +2 more dedicated developers, support staff, and a growing
                network of psychologists working behind the scenes.
              </p>
            </div>
          </div>


          {/* CTA Section */}
          <div className="card rounded-[36px] p-8 md:p-12 bg-gradient-to-br from-midnight-50 to-periwinkle-50/50 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-periwinkle-200/30 blur-3xl rounded-full" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <p className="eyebrow">Join Us</p>
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-ink-900 font-display">
                Ready to start your
                <br />
                healing journey?
              </h2>
              <p className="mt-4 text-ink-500 leading-relaxed">
                We are deeply passionate about building tools that prioritize
                your long-term emotional well-being. Take the first step today.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 hover:bg-midnight-800 transition-all text-white px-6 py-3 text-sm font-semibold"
                >
                  Start Free Assessment
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-900/20 bg-white/80 hover:bg-white transition-all px-6 py-3 text-sm font-semibold text-ink-900"
                >
                  Contact Our Team
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}