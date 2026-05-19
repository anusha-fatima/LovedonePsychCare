"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/lib/types";

const SPECIALTIES = [
  "Anxiety",
  "Depression",
  "Trauma",
  "Relationships",
  "Stress",
  "Grief",
  "Young Adults",
  "Family",
  "Addiction",
  "CBT",
  "EMDR",
];

export default function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <SignUpInner />
    </Suspense>
  );
}

function SignUpInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { signUp, account, ready } = useAuth();

  const [role, setRole] = useState<Role>(
    (params.get("role") as Role) === "therapist" ? "therapist" : "user"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [credentials, setCredentials] = useState("");
  const [bio, setBio] = useState("");
  const [years, setYears] = useState("");
  const [langs, setLangs] = useState<string[]>(["English"]);
  const [specs, setSpecs] = useState<string[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!ready || !account) return;
    if (account.role === "admin") router.replace("/admin");
    else if (account.role === "therapist") router.replace("/dashboard");
    else router.replace("/chat");
  }, [ready, account, router]);

  function toggle<T>(list: T[], setList: (v: T[]) => void, v: T) {
    setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  async function handle(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const acc = await signUp({
        name,
        email,
        password,
        role,
        therapist:
          role === "therapist"
            ? {
                status: "pending",
                title,
                credentials,
                bio,
                yearsOfExperience: Number(years) || 0,
                specialties: specs,
                languages: langs,
              }
            : undefined,
      });
      if (acc.role === "therapist") router.push("/dashboard");
      else router.push("/chat");
    } catch (e: any) {
      setErr(e.message ?? "Could not create account.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] py-12 md:py-20">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Create your account</p>
        <h1 className="h-display text-4xl md:text-5xl">
          {role === "therapist"
            ? "Join as a clinician."
            : "Start the conversation."}
        </h1>
        <p className="mt-3 text-ink-500">
          Already have an account?{" "}
          <Link href="/auth" className="text-midnight-700 font-semibold">
            Sign in
          </Link>
        </p>

        <div className="mt-6 inline-flex rounded-full bg-cream p-1 border border-ink-900/5">
          {(["user", "therapist"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition ${
                role === r
                  ? "bg-ink-900 text-white"
                  : "text-ink-500 hover:text-ink-900"
              }`}
            >
              {r === "user" ? "I want support" : "I'm a clinician"}
            </button>
          ))}
        </div>

        <form className="mt-8 card p-6 md:p-8 space-y-5" onSubmit={handle}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Full name</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          {role === "therapist" && (
            <>
              <div className="mt-2 rounded-2xl bg-midnight-50 border border-midnight-200 px-4 py-3 text-sm text-midnight-700">
                Therapist accounts go through an admin review before you can
                see clients. You&apos;ll be able to sign in immediately, but
                conversations stay locked until you&apos;re approved.
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Title</label>
                  <input
                    className="input"
                    placeholder="Clinical Psychologist"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label">Years of experience</label>
                  <input
                    className="input"
                    type="number"
                    min={0}
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">Credentials &amp; license</label>
                <input
                  className="input"
                  placeholder="PhD Clinical Psych, FJWU · PMDC #..."
                  value={credentials}
                  onChange={(e) => setCredentials(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label">About you</label>
                <textarea
                  className="input min-h-[120px]"
                  placeholder="A few sentences about your approach, the people you work with best, and your style."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label">Languages</label>
                <div className="flex flex-wrap gap-2">
                  {["English", "Urdu", "Punjabi", "Sindhi", "Pashto"].map((l) => {
                    const on = langs.includes(l);
                    return (
                      <button
                        type="button"
                        key={l}
                        onClick={() => toggle(langs, setLangs, l)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${
                          on
                            ? "bg-midnight-600 text-white ring-midnight-600"
                            : "bg-white text-ink-700 ring-ink-900/10"
                        }`}
                      >
                        {l}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="label">Specialties</label>
                <div className="flex flex-wrap gap-2">
                  {SPECIALTIES.map((s) => {
                    const on = specs.includes(s);
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggle(specs, setSpecs, s)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${
                          on
                            ? "bg-periwinkle-500 text-white ring-periwinkle-500"
                            : "bg-white text-ink-700 ring-ink-900/10"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {err && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{err}</p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <p className="text-xs text-ink-400 max-w-md">
              By continuing you agree to our{" "}
              <Link href="/terms" className="underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
            <button className="btn-primary" disabled={busy} type="submit">
              {busy
                ? "Creating…"
                : role === "therapist"
                ? "Submit application"
                : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
