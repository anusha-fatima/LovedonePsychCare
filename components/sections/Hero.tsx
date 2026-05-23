"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grain pointer-events-none" />
      <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-midnight-200 blur-3xl opacity-50 -z-10" />
      <div className="absolute -bottom-40 -right-20 h-[420px] w-[420px] rounded-full bg-periwinkle-100 blur-3xl opacity-70 -z-10" />

      <div className="container-page pt-12 md:pt-20 pb-16 md:pb-24 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 animate-slide-up">
          <span className="chip">
            <Sparkles className="h-3.5 w-3.5" />
            Mental health, rooted in Pakistan
          </span>
          <h1 className="h-display mt-5 text-[44px] sm:text-[56px] lg:text-[72px] leading-[1.04]">
            A safe place to <em className="not-italic shimmer-text">talk it out</em>,
            <br className="hidden md:block" />
            whenever you need it.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-500 leading-relaxed">
            Chat with our AI guide instantly, or be matched with a licensed
            psychologist — all inside one private, culturally-aware conversation.
            Free to start. No appointments needed.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/auth/signup" className="btn-primary text-base px-6 py-3">
              Start a free conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/psychologists" className="btn-outline text-base px-6 py-3">
              Meet our therapists
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-midnight-600" />
              End-to-end private
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-midnight-500" />
              Licensed PMDC therapists
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-periwinkle-400" />
              English &amp; Urdu
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 relative animate-fade-in">
          <div className="relative aspect-[5/6] rounded-[36px] overflow-hidden bg-midnight-50 shadow-soft">
            <Image
              src="/Therapist-client-talking.png"
              alt="Calm illustration of unraveling thoughts"
              fill
              className="object-contain p-6"
              priority
            />
          </div>

          <div className="absolute -left-6 bottom-10 hidden md:flex card p-4 gap-3 items-center max-w-[260px]">
            <div className="h-10 w-10 rounded-full bg-midnight-100 grid place-items-center text-midnight-700 font-semibold">
              S
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-900">Sukoon · AI guide</p>
              <p className="text-xs text-ink-400">Online now · replies in seconds</p>
            </div>
          </div>

          <div className="absolute -right-4 top-8 hidden md:flex card p-4 gap-3 items-center max-w-[260px]">
            <div className="h-10 w-10 rounded-full bg-periwinkle-100 grid place-items-center text-periwinkle-500 font-semibold">
              Dr
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-900">Dr. Sarah Ahmed</p>
              <p className="text-xs text-ink-400">Clinical Psychologist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
