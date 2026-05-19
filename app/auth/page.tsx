"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const QUICK = [
  { label: "User · Demo", email: "demo@lopc.com", password: "demo123" },
  { label: "Therapist · Approved", email: "dr.sarah@lopc.com", password: "therapist123" },
  { label: "Admin", email: "admin@lopc.com", password: "admin123" },
];

export default function SignInPage() {
  const router = useRouter();
  const { signIn, account, ready } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!ready || !account) return;
    if (account.role === "admin") router.replace("/admin");
    else if (account.role === "therapist") router.replace("/dashboard");
    else router.replace("/chat");
  }, [ready, account, router]);

  async function handle(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const acc = await signIn(email, password);
      if (acc.role === "admin") router.push("/admin");
      else if (acc.role === "therapist") router.push("/dashboard");
      else router.push("/chat");
    } catch (e: any) {
      setErr(e.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] py-12 md:py-20">
      <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
        <div className="hidden lg:block">
          <p className="eyebrow">Welcome back</p>
          <h1 className="h-display text-5xl">Pick up where you left off.</h1>
          <p className="mt-4 text-ink-500 max-w-md">
            Your conversation, your therapist, your context — exactly as you left it.
          </p>

          <div className="mt-10 card p-6 max-w-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Demo accounts
            </p>
            <ul className="mt-3 space-y-2">
              {QUICK.map((q) => (
                <li key={q.email}>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(q.email);
                      setPassword(q.password);
                    }}
                    className="w-full text-left rounded-2xl border border-ink-900/5 bg-cream/50 px-4 py-3 hover:border-midnight-300"
                  >
                    <p className="text-sm font-semibold text-ink-900">{q.label}</p>
                    <p className="text-xs text-ink-400">{q.email} · {q.password}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card p-8 md:p-10">
          <h2 className="font-display text-3xl text-ink-900">Sign in</h2>
          <p className="mt-1 text-sm text-ink-500">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-midnight-700 font-semibold">
              Create one
            </Link>
          </p>

          <form className="mt-7 space-y-4" onSubmit={handle}>
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
            <div>
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {err && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{err}</p>
            )}
            <button className="btn-primary w-full" disabled={busy} type="submit">
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-6 lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Demo accounts
            </p>
            <div className="mt-3 grid gap-2">
              {QUICK.map((q) => (
                <button
                  key={q.email}
                  type="button"
                  onClick={() => {
                    setEmail(q.email);
                    setPassword(q.password);
                  }}
                  className="rounded-2xl border border-ink-900/5 bg-cream/50 px-4 py-3 text-left hover:border-midnight-300"
                >
                  <p className="text-sm font-semibold text-ink-900">{q.label}</p>
                  <p className="text-xs text-ink-400">{q.email} · {q.password}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
