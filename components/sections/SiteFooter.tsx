import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-900/5 bg-cream/40">
      <div className="container-page py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="LovedOne PsyCare"
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-ink-500 leading-relaxed">
            LovedOne PsyCare is a private mental-health platform. Talk to an AI
            guide, or a licensed psychologist — in your own language, on your
            own time.
          </p>
          <p className="mt-4 text-xs text-ink-400">
            If you are in crisis, please contact{" "}
            <a href="tel:1166" className="underline">
              Umang Pakistan · 0311-7786264
            </a>{" "}
            or call your local emergency line.
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
            Product
          </p>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/psychologists">Therapists</Link></li>
            <li><Link href="/auth/signup">Sign up</Link></li>
            <li><Link href="/auth">Sign in</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
            Company
          </p>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
            For clinicians
          </p>
          <ul className="mt-3 space-y-2 text-sm text-ink-700">
            <li><Link href="/auth/signup?role=therapist">Apply to join</Link></li>
            <li><Link href="/dashboard">Therapist portal</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-900/5">
        <div className="container-page py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-400">
          <p>© {new Date().getFullYear()} LovedOne PsyCare. Made with care in Pakistan.</p>
          <p>This service does not replace emergency care.</p>
        </div>
      </div>
    </footer>
  );
}
