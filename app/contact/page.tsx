"use client";

import { FormEvent, useState } from "react";
import { Mail, MessageCircle, Phone, ShieldAlert } from "lucide-react";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="section">
        <div className="container-page grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow">Contact</p>
            <h1 className="h-display text-5xl">We&apos;re here.</h1>
            <p className="mt-4 text-ink-500 text-lg">
              For general questions, partnerships, or clinician applications,
              drop us a line. We reply within one business day.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <p className="flex items-center gap-3 text-ink-700">
                <Mail className="h-4 w-4 text-midnight-600" />
                hello@lopc.com
              </p>
              <p className="flex items-center gap-3 text-ink-700">
                <Phone className="h-4 w-4 text-midnight-600" />
                +92 300 000 0000 · Mon–Sat, 9am–9pm
              </p>
              <p className="flex items-center gap-3 text-ink-700">
                <MessageCircle className="h-4 w-4 text-midnight-600" />
                Or just start a chat in the app.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-red-50 ring-1 ring-red-100 p-4 text-sm text-red-700">
              <p className="flex items-center gap-2 font-semibold">
                <ShieldAlert className="h-4 w-4" />
                In crisis?
              </p>
              <p className="mt-1">
                We are not a 24/7 emergency service. Please call{" "}
                <a href="tel:1166" className="underline">
                  Umang Pakistan · 0311-7786264
                </a>{" "}
                or your local emergency number.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form className="card p-6 md:p-8 space-y-4" onSubmit={submit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Name</label>
                  <input className="input" required />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input className="input" type="email" required />
                </div>
              </div>
              <div>
                <label className="label">Subject</label>
                <input className="input" required />
              </div>
              <div>
                <label className="label">Message</label>
                <textarea className="input min-h-[160px]" required />
              </div>

              {sent ? (
                <p className="rounded-2xl bg-midnight-50 ring-1 ring-midnight-200 text-midnight-700 px-4 py-3 text-sm">
                  Thanks. We&apos;ll get back to you soon.
                </p>
              ) : (
                <button className="btn-primary" type="submit">
                  Send message
                </button>
              )}
            </form>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
