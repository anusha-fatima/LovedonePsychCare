// components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, User, Sun, Moon } from "lucide-react";
import Image from "next/image";


export const FloatingNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!mounted) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.background =
        "linear-gradient(180deg, rgb(15,23,42) 0%, rgb(30,41,59) 100%)";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.background =
        "linear-gradient(135deg, rgb(171,196,255) 0%, rgb(182,204,254) 50%, rgb(193,211,254) 100%)";
    }
    window.dispatchEvent(new CustomEvent("themeChange"));
  }, [theme, mounted]);

  const isDark = theme === "dark";
  const textColor = isDark ? "rgba(230,235,255,0.92)" : "rgba(60,70,120,0.85)";
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{
          y: isNavVisible ? 0 : -120,
          transition: { duration: 0.4, ease: "circOut" },
        }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-1"
      >
        <div className={`max-w-7xl mx-auto transition-all duration-500`}>
          <div className="px- py-1">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex-shrink-0 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-30 h-25 md:w-36 md:h-20"
                >
                  <Image
                    src="/logo.png"
                    alt="LovedOne PsyCare Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </Link>

              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="p-2.5 rounded-full transition-all hover:scale-110"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,0.4)",
                    color: textColor,
                  }}
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                  className="flex items-center space-x-2 text-xs font-bold px-4 py-2 rounded-full border border-white/20 transition-all hover:bg-white/10"
                  style={{ color: textColor }}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{language === "en" ? "اردو" : "EN"}</span>
                </button>

                <Link href="/auth">
                  <button
                    className="flex items-center space-x-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(255,255,255,0.4)",
                      color: textColor,
                    }}
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                </Link>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.4)",
                  color: textColor,
                }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-24 left-4 right-4 z-50 md:hidden rounded-3xl p-8 shadow-2xl ${
              isDark
                ? "bg-slate-900/95 border border-white/10"
                : "bg-white/80 backdrop-blur-2xl border border-white/40"
            }`}
          >
            <div className="flex flex-col space-y-6">
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="flex items-center justify-between w-full text-lg font-semibold"
                style={{ color: textColor }}
              >
                <span>Switch to {isDark ? "Light" : "Dark"} Mode</span>
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                className="flex items-center justify-between w-full text-lg font-semibold"
                style={{ color: textColor }}
              >
                <span>Language</span>
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {language === "en" ? "اردو" : "English"}
                </span>
              </button>

              <div className="h-px bg-white/10 w-full" />

              <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                <button
                  className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,0.4)",
                    color: textColor,
                  }}
                >
                  <User className="w-5 h-5" />
                  Login / Sign Up
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
