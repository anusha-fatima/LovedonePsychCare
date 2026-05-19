"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BadgeCheck, Filter, Languages, Sparkles, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { SiteFooter } from "@/components/sections/SiteFooter";

const ALL_SPECIALTIES = [
  "Anxiety",
  "Depression",
  "Trauma",
  "Relationships",
  "Stress",
  "CBT",
  "Young Adults",
];

export default function PsychologistsPage() {
  const { allAccounts } = useAuth();
  const [filter, setFilter] = useState<string | null>(null);

  const therapists = useMemo(() => {
    const list = allAccounts.filter(
      (a) => a.role === "therapist" && a.therapist?.status === "approved"
    );
    if (!filter) return list;
    return list.filter((t) =>
      t.therapist?.specialties.some((s) => s.toLowerCase() === filter.toLowerCase())
    );
  }, [allAccounts, filter]);

  return (
    <>
      <section className="section">
        <div className="container-page">
          <p className="eyebrow">Our clinicians</p>
          <h1 className="h-display text-5xl md:text-6xl">
            People you can talk to. <br />
            Verified, in your language.
          </h1>
          <p className="mt-5 text-ink-500 max-w-2xl text-lg">
            Every therapist on LovedOne is licensed by PMDC, vetted by our team,
            and ready to step into your conversation whenever you ask.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-ink-500 inline-flex items-center gap-1.5">
              <Filter className="h-4 w-4" /> Filter:
            </span>
            <button
              onClick={() => setFilter(null)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                !filter
                  ? "bg-ink-900 text-white ring-ink-900"
                  : "bg-white ring-ink-900/10 text-ink-700"
              }`}
            >
              All
            </button>
            {ALL_SPECIALTIES.map((s) => (
              <button
                key={s}
                onClick={() => setFilter((f) => (f === s ? null : s))}
                className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                  filter === s
                    ? "bg-midnight-600 text-white ring-midnight-600"
                    : "bg-white ring-ink-900/10 text-ink-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {therapists.length === 0 && (
              <p className="text-sm text-ink-400 col-span-full">
                No therapists match that filter.
              </p>
            )}
            {therapists.map((t) => (
              <article key={t.id} className="card p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div
                      className="h-12 w-12 rounded-full grid place-items-center text-white font-semibold text-lg"
                      style={{
                        background: `hsl(${t.avatarHue},45%,55%)`,
                      }}
                    >
                      {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                  </div>
                  <span className="chip">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                </div>
                <h3 className="font-display text-xl mt-4 text-ink-900">
                  {t.name}
                </h3>
                <p className="text-xs text-ink-400">{t.therapist?.title}</p>
                <p className="mt-3 text-sm text-ink-500 leading-relaxed line-clamp-3">
                  {t.therapist?.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.therapist?.specialties.slice(0, 4).map((s) => (
                    <span key={s} className="chip-peri">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-ink-400">
                  <Languages className="h-3.5 w-3.5" />
                  {t.therapist?.languages.join(" · ")}
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-ink-500 inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-periwinkle-400" />
                    {t.therapist?.yearsOfExperience}+ yrs
                  </span>
                  <Link href="/auth/signup" className="btn-primary h-9 px-3 text-xs">
                    <Sparkles className="h-4 w-4" />
                    Start with us
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
