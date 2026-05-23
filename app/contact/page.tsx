"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MessageCircle,
  Phone,
  ShieldAlert,
  ArrowUpRight,
  Clock3,
  Instagram,
  Facebook,
  DiscIcon,
} from "lucide-react";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background */}
        <div className="absolute inset-0 bg-[rgb(var(--canvas))]" />

        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-periwinkle-200/30 blur-3xl rounded-full opacity-40" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-midnight-200/20 blur-3xl rounded-full opacity-30" />

        <div className="container-page relative z-10">
          {/* Hero Heading */}
          <div
            className="rounded-[32px] p-8 md:p-10 mb-14"
            style={{ background: "rgb(11, 20, 55)" }}
          >
            <div className="flex items-center justify-between gap-6">
              <div className="max-w-3xl">
                <p
                  className="eyebrow"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Reach Out Anytime
                </p>

                <h1
                  className="text-5xl md:text-7xl font-semibold leading-[0.95] tracking-tight"
                  style={{ color: "white", fontFamily: "var(--font-fraunces)" }}
                >
                  We’re here
                  <br />
                  to listen.
                </h1>

                <p
                  className="mt-5 text-lg max-w-2xl leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Whether you need emotional support, therapist guidance,
                  technical help, or simply someone to guide you through the
                  platform — LovedOne PsyCare is always within reach.
                </p>
              </div>
            </div>
          </div>

          {/* Top Section */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* LEFT */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Info Card */}
              <div className="card rounded-[34px] p-7 md:p-10 bg-white/90 backdrop-blur-xl">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Text */}
                  <div>
                    <p className="eyebrow">How You Can Reach Us</p>

                    <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-ink-900 font-display">
                      Support designed
                      <br />
                      around you.
                    </h2>

                    <p className="mt-4 text-ink-500 leading-relaxed">
                      Reach out for therapy inquiries, emotional support,
                      account help, collaborations, or questions about our
                      voice-cloning services.
                    </p>

                    <div className="mt-8 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-midnight-50 flex items-center justify-center shrink-0">
                          <Phone className="w-4 h-4 text-midnight-700" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-ink-900">
                            Call & WhatsApp
                          </h4>
                          <p className="text-sm text-ink-500 mt-1">
                            Quick support for appointments and therapist
                            guidance.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-midnight-50 flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4 text-midnight-700" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-ink-900">
                            Email Support
                          </h4>
                          <p className="text-sm text-ink-500 mt-1">
                            Contact us for partnerships, technical support, or
                            private assistance.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-midnight-50 flex items-center justify-center shrink-0">
                          <MessageCircle className="w-4 h-4 text-midnight-700" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-ink-900">
                            Live Chat
                          </h4>
                          <p className="text-sm text-ink-500 mt-1">
                            Speak with our support team directly through the
                            platform.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image - Fixed to match text length */}
                  <div className="flex flex-col">
                    <div className="relative flex-1 min-h-[280px] rounded-[30px] overflow-hidden">
                      <Image
                        src="/OnlineTherapy.jpg"
                        alt="Mental Health Support"
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      <div className="absolute top-5 right-5 rounded-full bg-white/85 backdrop-blur-md px-4 py-2 text-xs font-medium text-midnight-700 shadow-sm">
                        Safe conversations
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="card p-5 rounded-[28px]">
                  <div className="w-11 h-11 rounded-full bg-midnight-50 flex items-center justify-center mb-4">
                    <Phone className="w-5 h-5 text-midnight-700" />
                  </div>

                  <h3 className="font-semibold text-ink-900">
                    Call & WhatsApp
                  </h3>

                  <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                    +92 300 0000000
                    <br />
                    +92 311 7786264
                  </p>
                </div>

                <div className="card p-5 rounded-[28px]">
                  <div className="w-11 h-11 rounded-full bg-midnight-50 flex items-center justify-center mb-4">
                    <Clock3 className="w-5 h-5 text-midnight-700" />
                  </div>

                  <h3 className="font-semibold text-ink-900">Working Hours</h3>

                  <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                    Daily: 9am – 9pm
                    <br />
                    Friday: Closed
                  </p>
                </div>

                <div className="card p-5 rounded-[28px]">
                  <div className="w-11 h-11 rounded-full bg-midnight-50 flex items-center justify-center mb-4">
                    <Mail className="w-5 h-5 text-midnight-700" />
                  </div>

                  <h3 className="font-semibold text-ink-900">Write to Us</h3>

                  <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                    support@lovepsychcare.com
                    <br />
                    hello@lovepsychcare.com
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-5 space-y-6">
              {/* Social Links Card */}
              <div className="card rounded-[34px] p-7 bg-white/90 backdrop-blur-xl">
                <p className="eyebrow">Community & Socials</p>

                <h2 className="text-3xl font-semibold leading-tight text-ink-900 font-display">
                  Stay connected
                  <br />
                  beyond therapy.
                </h2>

                <p className="mt-4 text-ink-500 leading-relaxed">
                  Follow us for mental wellness tips, emotional healing content,
                  community discussions, and updates about new features.
                </p>

                <div className="mt-8 space-y-4">
                  <Link
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-ink-900/5 bg-white px-5 py-4 hover:border-midnight-200 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                        <Instagram className="w-5 h-5 text-[#E1306C]" />
                      </div>

                      <div>
                        <h4 className="font-semibold text-ink-900">
                          Instagram
                        </h4>
                        <p className="text-sm text-ink-500">
                          Mental wellness content & daily inspiration
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-midnight-700 transition-colors" />
                  </Link>

                  <Link
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-ink-900/5 bg-white px-5 py-4 hover:border-midnight-200 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#1877F2]/10 flex items-center justify-center">
                        <Facebook className="w-5 h-5 text-[#1877F2]" />
                      </div>

                      <div>
                        <h4 className="font-semibold text-ink-900">Facebook</h4>
                        <p className="text-sm text-ink-500">
                          Community updates and support announcements
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-midnight-700 transition-colors" />
                  </Link>

                  <Link
                    href="https://discord.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-ink-900/5 bg-white px-5 py-4 hover:border-midnight-200 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-indigo-100 flex items-center justify-center">
                        <DiscIcon className="w-5 h-5 text-indigo-600" />
                      </div>

                      <div>
                        <h4 className="font-semibold text-ink-900">Discord</h4>
                        <p className="text-sm text-ink-500">
                          Join safe discussions and healing communities
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-ink-400 group-hover:text-midnight-700 transition-colors" />
                  </Link>
                </div>
              </div>

              {/* Crisis Card */}
              <div className="rounded-[30px] border border-red-100 bg-red-50/90 p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-red-700">
                      Need urgent help?
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-red-600">
                      LovedOne PsyCare is not a 24/7 emergency service. Contact
                      Umang Pakistan at{" "}
                      <a
                        href="tel:03117786264"
                        className="underline font-medium"
                      >
                        0311-7786264
                      </a>{" "}
                      or your local emergency number.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-[180px] overflow-hidden rounded-[28px]">
                  <Image
                    src="/therapy-session.jpg"
                    alt="Therapy Session"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative h-[180px] overflow-hidden rounded-[28px]">
                  <Image
                    src="/mental-wellbeing.jpg"
                    alt="Mental Wellbeing"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM AT END */}
          <div className="mt-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="eyebrow">Contact Form</p>

              <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-ink-900 font-display">
                Send us a message.
              </h2>

              <p className="mt-4 text-ink-500 leading-relaxed">
                We usually respond within one business day. Your privacy and
                emotional safety always come first.
              </p>
            </div>

            <div className="card rounded-[36px] p-6 md:p-10 bg-white/90 backdrop-blur-xl max-w-5xl mx-auto">
              <form onSubmit={submit}>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="label">Name</label>
                    <input
                      className="input h-12"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      className="input h-12"
                      placeholder="hello@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="label">Subject</label>
                  <input
                    className="input h-12"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="mt-5">
                  <label className="label">Message</label>

                  <textarea
                    className="input min-h-[180px]"
                    placeholder="Tell us about your concern..."
                    required
                  />
                </div>

                <div className="mt-7">
                  {sent ? (
                    <div className="rounded-full bg-midnight-50 px-5 py-3 text-sm text-midnight-700 ring-1 ring-midnight-200 inline-flex">
                      Your message has been sent successfully.
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-ink-900 hover:bg-midnight-700 transition-all text-white px-7 py-3 text-sm font-semibold"
                    >
                      Send Message
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}