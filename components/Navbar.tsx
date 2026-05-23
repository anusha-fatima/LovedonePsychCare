"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard, MessageCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/psychologists", label: "Therapists" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const { account, signOut, ready } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const inApp =
    pathname.startsWith("/chat") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin");

  if (inApp) return null;

  const dashboardHref =
    account?.role === "admin"
      ? "/admin"
      : account?.role === "therapist"
      ? "/dashboard"
      : "/chat";

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all ${
        scrolled
          ? "bg-canvas/85 backdrop-blur-md border-b border-ink-900/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 md:h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="LovedOne PsyCare"
            width={180}
            height={55}
            className="h-11 md:h-14 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-ink-900"
                    : "text-ink-500 hover:text-ink-900"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-midnight-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {ready && account ? (
            <>
              <Link href={dashboardHref} className="btn-ghost">
                <LayoutDashboard className="h-4 w-4" />
                {account.role === "user" ? "Chat" : "Dashboard"}
              </Link>
              <button onClick={() => { signOut(); router.push("/"); }} className="btn-outline">
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth" className="btn-ghost">
                Sign in
              </Link>
              <Link href="/auth/signup" className="btn-primary">
                <MessageCircle className="h-4 w-4" />
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden rounded-full p-2 text-ink-900 hover:bg-ink-900/5"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-900/5 bg-canvas/95 backdrop-blur">
          <div className="container-page py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                  pathname === l.href
                    ? "bg-midnight-50 text-midnight-700"
                    : "text-ink-700 hover:bg-ink-900/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              {ready && account ? (
                <>
                  <Link href={dashboardHref} className="btn-secondary w-full">
                    <LayoutDashboard className="h-4 w-4" />
                    {account.role === "user" ? "Open chat" : "Open dashboard"}
                  </Link>
                  <button
                    onClick={() => { signOut(); router.push("/"); }}
                    className="btn-outline w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth" className="btn-outline w-full">
                    Sign in
                  </Link>
                  <Link href="/auth/signup" className="btn-primary w-full">
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export const FloatingNav = Navbar;