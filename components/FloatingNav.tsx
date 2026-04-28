// components/layout/FloatingNav.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, User, Sparkles, Sun, Moon } from "lucide-react";
import { Button } from "../components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/psychologists", label: "Psychologists" },
  { href: "/ai-chat", label: "AI Support" },
  { href: "/booking", label: "Book Session" },
  { href: "/about", label: "About" },
];

export const FloatingNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "ur">("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.background = "linear-gradient(180deg, rgb(15,23,42) 0%, rgb(30,41,59) 100%)";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.background = "linear-gradient(135deg, rgb(171,196,255) 0%, rgb(182,204,254) 50%, rgb(193,211,254) 100%)";
    }

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('themeChange'));
  }, [theme, mounted]);

  const isDark = theme === "dark";

  // Light theme
  const lightTextColor = "rgba(60,70,120,0.85)";
  const lightNavBg = isScrolled
    ? "bg-white/40 backdrop-blur-lg border border-white/50 shadow-lg"
    : "bg-white/20 backdrop-blur-md border border-white/30 shadow-sm";
  const lightButtonGradient = "linear-gradient(135deg, rgb(182,204,254), rgb(171,196,255))";
  const lightButtonHoverGradient = "linear-gradient(135deg, rgb(171,196,255), rgb(182,204,254))";

  // Dark theme
  const darkTextColor = "rgba(230,235,255,0.92)";
  const darkNavBg = "bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 shadow-2xl";
  const darkButtonGradient = "linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155))";
  const darkButtonHoverGradient = "linear-gradient(135deg, rgb(100,115,155), rgb(85,98,127))";

  // Select based on theme
  const textColor = isDark ? darkTextColor : lightTextColor;
  const navBg = isDark ? darkNavBg : lightNavBg;
  const buttonGradient = isDark ? darkButtonGradient : lightButtonGradient;

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
        className="fixed top-6 left-0 right-0 z-50 px-4 transition-all duration-500"
      >
        <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-500 ${navBg}`}>
          <div className="px-3 py-2">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-20 h-20 md:w-24 md:h-24"
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

              {/* Desktop Navigation */}
              <div
                className="hidden md:flex items-center space-x-8"
                style={{ color: textColor }}
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium transition-all duration-300 relative group"
                    style={{ color: textColor }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                      style={{
                        background: isDark
                          ? 'linear-gradient(90deg, rgb(200,220,255), rgb(150,170,220))'
                          : 'linear-gradient(90deg, rgb(182,204,254), rgb(171,196,255))',
                      }}
                    />
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="hidden md:flex items-center space-x-3" style={{ color: textColor }}>
                {/* Theme Toggle */}
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 group"
                  style={{
                    color: textColor,
                    background: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.35)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = isDark
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(255,255,255,0.5)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.35)";
                  }}
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                  <span className="text-sm">{isDark ? "Light" : "Dark"}</span>
                </button>

                {/* Language Toggle */}
                <button
                  onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                  className="flex items-center space-x-2 text-sm px-3 py-2 rounded-xl transition-all duration-300 group"
                  style={{
                    color: textColor,
                    background: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.25)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = isDark
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(255,255,255,0.4)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.25)";
                  }}
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === "en" ? "اردو" : "English"}</span>
                </button>

                {/* Login Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/auth">
                    <Button
                      className="text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      size="sm"
                      style={{
                        background: buttonGradient,
                      }}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                </motion.div>

                {/* CTA Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/booking">
                    <Button
                      size="sm"
                      className="text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{
                        background: buttonGradient,
                      }}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Start Free Assessment
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-colors"
                style={{ color: textColor }}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-24 left-4 right-4 z-50 md:hidden rounded-2xl shadow-xl transition-all duration-300 ${
              isDark
                ? "bg-slate-900/95 border border-slate-700/50"
                : "bg-white/60 backdrop-blur-lg border border-white/40"
            }`}
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-base transition-colors"
                  style={{ color: textColor }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="w-full text-left py-2 text-sm transition-colors"
                style={{ color: textColor }}
              >
                Switch to {isDark ? "Light" : "Dark"} Mode
              </button>

              <div className="pt-4 space-y-3 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                <Link href="/booking">
                  <Button
                    className="w-full text-white shadow-lg transition-all"
                    style={{
                      background: buttonGradient,
                    }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Free Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};