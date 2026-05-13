"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mic, Star } from "lucide-react";
import { Button } from "../components/ui/Button";
import Image from "next/image";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    window.addEventListener("themeChange", checkDarkMode);
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });
    const timer = setTimeout(() => setIsLoading(false), 1200);

    return () => {
      window.removeEventListener("themeChange", checkDarkMode);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  if (!mounted) return null;

  const lightColors = {
    headingColor: "#0f172a",
    subheadingColor: "#334155",
    textColor: "#475569",
    accentColor: "rgb(120,137,179)",
    buttonGradient:
      "linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155))",
    voiceButtonBg: "rgba(120,137,179,0.1)",
    voiceButtonBorder: "rgba(120,137,179,0.3)",
  };

  const darkColors = {
    headingColor: "#f1f5f9",
    subheadingColor: "#cbd5e1",
    textColor: "#94a3b8",
    accentColor: "rgb(171,196,255)",
    buttonGradient:
      "linear-gradient(135deg, rgb(171,196,255), rgb(193,211,254))",
    voiceButtonBg: "rgba(171,196,255,0.1)",
    voiceButtonBorder: "rgba(171,196,255,0.3)",
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{
        background: isDark
          ? `
      radial-gradient(circle at top left, rgba(59,130,246,0.12), transparent 30%),
      radial-gradient(circle at bottom right, rgba(96,165,250,0.10), transparent 35%),
      linear-gradient(180deg, rgb(15,23,42) 0%, rgb(30,41,59) 100%)
    `
          : `
      radial-gradient(circle at top left, rgba(125,211,252,0.35), transparent 30%),
      radial-gradient(circle at bottom right, rgba(191,219,254,0.30), transparent 35%),
      linear-gradient(
        135deg,
        rgb(239,246,255) 0%,
        rgb(239,246,255) 30%,
         rgb(193,211,254) 60%,
        rgb(239,246,255) 100%
      )
    `,
        paddingTop: "clamp(80px, 10vh, 100px)",
        paddingBottom: "clamp(60px, 8vh, 80px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? -60 : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-1 flex justify-center lg:justify-start relative"
          >
            {/* LEFT SIDE CONTENT WITH IMAGE */}
            <div className="relative w-full max-w-[550px] lg:max-w-[650px] aspect-square">
              <Image
                src="/brain-thread.png"
                alt="Unraveling thoughts - Mental health illustration"
                fill
                className="object-contain "
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
              />

              <motion.div
                animate={{ opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-[120px] -z-10"
                style={{ background: colors.accentColor }}
              />

              <motion.div
                animate={{ x: [0, 20, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute top-1/3 -right-4 w-2 h-2 rounded-full"
                style={{ background: colors.accentColor }}
              />
              <motion.div
                animate={{ x: [0, 30, 0], opacity: [0, 0.8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                className="absolute top-1/2 -right-8 w-1.5 h-1.5 rounded-full"
                style={{ background: colors.accentColor }}
              />
              <motion.div
                animate={{ x: [0, 25, 0], opacity: [0, 0.6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
                className="absolute bottom-1/3 -right-2 w-1 h-1 rounded-full"
                style={{ background: colors.accentColor }}
              />
            </div>
          </motion.div>

          {/* RIGHT SIDE CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? 60 : 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="order-2"
          >
            <div className="space-y-6">
              <h1
                className="font-bold tracking-tight leading-[1.1]"
                style={{
                  fontSize: "clamp(44px, 7vw, 72px)",
                  color: colors.headingColor,
                }}
              >
                Where your
                <br />
                <span
                  className="relative inline-block"
                  style={{ color: colors.accentColor }}
                >
                  mind finds
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 rounded-full"
                    style={{ background: colors.accentColor }}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </span>
                <br />
                its voice.
              </h1>

              <h2
                className="font-light italic"
                style={{
                  fontSize: "clamp(20px, 3.5vw, 28px)",
                  color: colors.subheadingColor,
                }}
              >
                Speak. Heal. Thrive.
              </h2>

              <p
                className="leading-relaxed max-w-lg"
                style={{
                  fontSize: "clamp(15px, 1.8vw, 17px)",
                  color: colors.textColor,
                }}
              >
                Connect with licensed psychologists who truly understand you.
                Our revolutionary{" "}
                <span
                  className="font-semibold"
                  style={{ color: colors.accentColor }}
                >
                  voice cloning feature
                </span>{" "}
                lets you hear supportive words in a voice that feels like home,
                making therapy more personal, comforting, and effective.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/booking">
                  <Button
                    size="lg"
                    className="rounded-full px-8 md:px-10 h-12 md:h-14 text-base md:text-lg font-bold shadow-xl hover:scale-105 transition-transform border-0"
                    style={{
                      background: colors.buttonGradient,
                      color: isDark ? "#0f172a" : "#fff",
                    }}
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-6">
                <div className="flex items-center gap-2">
                  <Mic
                    className="w-3 h-3 md:w-4 md:h-4"
                    style={{ color: colors.accentColor }}
                  />
                  <span
                    className="text-xs md:text-sm font-medium uppercase tracking-wider"
                    style={{ color: colors.textColor }}
                  >
                    Voice Cloning
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star
                    className="w-3 h-3 md:w-4 md:h-4"
                    style={{ color: colors.accentColor }}
                  />
                  <span
                    className="text-xs md:text-sm font-medium uppercase tracking-wider"
                    style={{ color: colors.textColor }}
                  >
                    Licensed Therapists
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute -top-32 -left-24 w-[420px] h-[420px] blur-[90px] rounded-full"
          style={{
            background: isDark
              ? "rgba(96,165,250,0.12)"
              : "rgba(125,211,252,0.35)",
          }}
        />

        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute bottom-[-120px] right-[-80px] w-[450px] h-[450px] blur-[100px] rounded-full"
          style={{
            background: isDark
              ? "rgba(147,197,253,0.10)"
              : "rgba(191,219,254,0.30)",
          }}
        />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: isDark
              ? `
          radial-gradient(
            circle at center,
            rgba(255,255,255,0.03),
            transparent 60%
          )
        `
              : `
          radial-gradient(
            circle at center,
            rgba(255,255,255,0.75),
            transparent 60%
          )
        `,
          }}
        />

        <div className="absolute top-0 left-0 h-full w-[320px] opacity-40">
          <div
            className="w-full h-full"
            style={{
              background: `
          repeating-linear-gradient(
            90deg,
            rgba(125,211,252,0.12) 0px,
            rgba(125,211,252,0.12) 2px,
            transparent 2px,
            transparent 14px
          )
        `,
              filter: "blur(0.5px)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1), transparent)",
            }}
          />
        </div>

        <div className="absolute bottom-0 right-0 h-full w-[320px] opacity-35">
          <div
            className="w-full h-full"
            style={{
              background: `
          repeating-linear-gradient(
            90deg,
            rgba(147,197,253,0.10) 0px,
            rgba(147,197,253,0.10) 2px,
            transparent 2px,
            transparent 14px
          )
        `,
              filter: "blur(0.5px)",
              maskImage: "linear-gradient(to top, rgba(0,0,0,1), transparent)",
            }}
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "rgba(255,255,255,0.01)"
              : "rgba(255,255,255,0.35)",
            backdropFilter: "blur(2px)",
          }}
        />
      </div>
    </section>
  );
};
