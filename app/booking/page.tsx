"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Mic,
  Heart,
  Shield,
  Calendar,
  MessageCircle,
  User,
  Mail,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const [step, setStep] = useState<"terms" | "form">("terms");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    window.addEventListener("themeChange", checkDarkMode);
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });
    return () => {
      window.removeEventListener("themeChange", checkDarkMode);
      observer.disconnect();
    };
  }, []);

  // FORM STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    concern: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store user data in database put api logic here
    localStorage.setItem("userName", form.name);
    localStorage.setItem("userEmail", form.email);
    localStorage.setItem("userConcern", form.concern);
    router.push("/dashboard");
  };

  if (!mounted) return null;

  // Theme colors
  const lightColors = {
    cardBg: "rgba(255,255,255,0.7)",
    cardBorder: "1px solid rgba(171,196,255,0.3)",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    textTertiary: "#475569",
    iconBg: "rgba(120,137,179,0.15)",
    buttonGradient:
      "linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155), rgb(85,98,127))",
  };

  const darkColors = {
    cardBg: "rgba(255,255,255,0.08)",
    cardBorder: "1px solid rgba(200,220,255,0.15)",
    textPrimary: "#f1f5f9",
    textSecondary: "#cbd5e1",
    textTertiary: "#94a3b8",
    iconBg: "rgba(171,196,255,0.15)",
    buttonGradient:
      "linear-gradient(135deg, rgb(171,196,255), rgb(193,211,254), rgb(204,219,253))",
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl relative">
        <AnimatePresence mode="wait">
          {step === "terms" && (
            <motion.div
              key="terms"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-8 md:p-10 text-center transition-all duration-300"
              style={{
                background: colors.cardBg,
                border: colors.cardBorder,
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex justify-center mb-6">
                <div
                  className="p-4 rounded-full"
                  style={{ background: colors.iconBg }}
                >
                  <Mic
                    className="w-6 h-6"
                    style={{ color: colors.textPrimary }}
                  />
                </div>
              </div>

              <h2
                className="text-3xl md:text-4xl font-light mb-4 transition-colors duration-300"
                style={{ color: colors.textPrimary }}
              >
                Before We Begin
              </h2>

              <p
                className="text-sm md:text-base mb-8 max-w-xl mx-auto transition-colors duration-300"
                style={{ color: colors.textTertiary }}
              >
                We're here to support you in the most comforting way possible.
                Our voice-cloning feature is designed to feel familiar, safe,
                and deeply personal.
              </p>

              <div className="text-left space-y-4 text-sm mb-8">
                {[
                  "This platform provides emotional support — not a replacement for emergency medical services.",
                  "Voice cloning is used only to enhance comfort and familiarity.",
                  "Your data remains private, secure, and confidential at all times.",
                  "You are in full control — you may stop or change your session anytime.",
                ].map((term, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle
                      className="w-4 h-4 mt-1 shrink-0"
                      style={{ color: colors.textSecondary }}
                    />
                    <p
                      className="transition-colors duration-300"
                      style={{ color: colors.textSecondary }}
                    >
                      {term}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep("form")}
                className="px-8 py-4 rounded-full flex items-center justify-center gap-2 mx-auto transition-all duration-300 hover:scale-105"
                style={{
                  background: colors.buttonGradient,
                  color: isDark ? "#0f172a" : "#ffffff",
                }}
              >
                I Understand & Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-8 md:p-10 transition-all duration-300"
              style={{
                background: colors.cardBg,
                border: colors.cardBorder,
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex justify-center mb-4">
                <div
                  className="p-3 rounded-full"
                  style={{ background: colors.iconBg }}
                >
                  <Heart
                    className="w-6 h-6"
                    style={{ color: colors.textPrimary }}
                  />
                </div>
              </div>

              <h2
                className="text-3xl font-light text-center mb-2 transition-colors duration-300"
                style={{ color: colors.textPrimary }}
              >
                Tell Us About You
              </h2>

              <p
                className="text-center text-sm mb-8 transition-colors duration-300"
                style={{ color: colors.textTertiary }}
              >
                This helps us connect you with the right support 💙
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: colors.textTertiary }}
                  />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 focus:outline-none"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.9)",
                      border: `1px solid ${isDark ? "rgba(200,220,255,0.2)" : "rgba(171,196,255,0.3)"}`,
                      color: colors.textPrimary,
                    }}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: colors.textTertiary }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 focus:outline-none"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.9)",
                      border: `1px solid ${isDark ? "rgba(200,220,255,0.2)" : "rgba(171,196,255,0.3)"}`,
                      color: colors.textPrimary,
                    }}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="relative">
                  <FileText
                    className="absolute left-4 top-4 w-5 h-5"
                    style={{ color: colors.textTertiary }}
                  />
                  <textarea
                    placeholder="What would you like support with?"
                    rows={4}
                    className="w-full pl-12 pr-4 py-3 rounded-xl transition-all duration-300 focus:outline-none resize-none"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.9)",
                      border: `1px solid ${isDark ? "rgba(200,220,255,0.2)" : "rgba(171,196,255,0.3)"}`,
                      color: colors.textPrimary,
                    }}
                    value={form.concern}
                    onChange={(e) =>
                      setForm({ ...form, concern: e.target.value })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                  style={{
                    background: colors.buttonGradient,
                    color: isDark ? "#0f172a" : "#ffffff",
                  }}
                >
                  Go to My Dashboard
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
