"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles, ShieldCheck, Download, Heart } from "lucide-react";
import { Button } from "./ui/Button";
import Link from "next/link";
import Image from "next/image";

export const AppShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]);

  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkDarkMode = () => {
      const hasDarkClass = document.documentElement.classList.contains("dark");
      setIsDark(hasDarkClass);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    window.addEventListener("themeChange", checkDarkMode);

    return () => {
      observer.disconnect();
      window.removeEventListener("themeChange", checkDarkMode);
    };
  }, []);

  if (!mounted) return null;

  // LIGHT THEME
  const lightGradientPrimary =
    "linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155), rgb(85,98,127))";

  const lightCardBg = "rgba(255,255,255,0.75)";
  const lightCardBorder = "1px solid rgba(171,196,255,0.25)";
  const lightTextPrimary = "#0f172a";
  const lightTextSecondary = "#334155";
  const lightTextTertiary = "#64748b";

  const lightBgOverlay =
    "linear-gradient(135deg, rgb(237,242,251) 0%, rgb(226,234,252) 50%, rgb(215,227,252) 100%)";

  const lightIconColor = "rgb(120,137,179)";

  // DARK THEME
  const darkGradientPrimary =
    "linear-gradient(135deg, rgb(171,196,255), rgb(193,211,254), rgb(204,219,253))";

  const darkCardBg = "rgba(255,255,255,0.07)";
  const darkCardBorder = "1px solid rgba(200,220,255,0.12)";
  const darkTextPrimary = "#f1f5f9";
  const darkTextSecondary = "#cbd5e1";
  const darkTextTertiary = "#94a3b8";

  const darkBgOverlay =
    "linear-gradient(135deg, rgb(15,23,42) 0%, rgb(30,41,59) 50%, rgb(30,41,59) 100%)";

  const darkIconColor = "rgb(171,196,255)";

  // SELECT THEME
  const gradientPrimary = isDark ? darkGradientPrimary : lightGradientPrimary;

  const textPrimary = isDark ? darkTextPrimary : lightTextPrimary;

  const textSecondary = isDark ? darkTextSecondary : lightTextSecondary;

  const textTertiary = isDark ? darkTextTertiary : lightTextTertiary;

  const bgOverlay = isDark ? darkBgOverlay : lightBgOverlay;

  const iconColor = isDark ? darkIconColor : lightIconColor;

  return (
    <section ref={sectionRef} className="relative py-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: bgOverlay }} />
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-0 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(171,196,255,0.10) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(171,196,255,0.22) 0%, transparent 70%)",
        }}
      />

      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(193,211,254,0.10) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(204,219,253,0.28) 0%, transparent 70%)",
        }}
      />

      <div className="absolute left-0 top-0 h-full w-40 overflow-hidden opacity-40">
        <div
          className="absolute inset-0"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                rgba(125,211,252,0.15),
                rgba(125,211,252,0.15) 2px,
                transparent 2px,
                transparent 12px
              )
            `,
            filter: "blur(1px)",
            transform: "perspective(500px) rotateY(25deg)",
          }}
        />
      </div>

      <div className="absolute right-0 bottom-0 h-full w-40 overflow-hidden opacity-40">
        <div
          className="absolute inset-0"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                rgba(125,211,252,0.15),
                rgba(125,211,252,0.15) 2px,
                transparent 2px,
                transparent 12px
              )
            `,
            filter: "blur(1px)",
            transform: "perspective(500px) rotateY(-25deg)",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-2"
      >
        <div className="text-center mb-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.8)",
              border: isDark
                ? "1px solid rgba(200,220,255,0.15)"
                : "1px solid rgba(171,196,255,0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: iconColor }} />

            <span
              className="text-sm font-medium"
              style={{ color: textSecondary }}
            >
              Get Support Anywhere
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-2"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: gradientPrimary,
              }}
            >
              Get Our App,
            </span>

            <br />

            <span style={{ color: textPrimary }}>Healing In Your Hands</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ color: textSecondary }}
          >
            Talk with professionals, access calming support, and stay connected
            to your healing journey anytime, anywhere, right from your phone.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center min-h-[480px] md:min-h-[520px]"
        >
          <motion.div className="absolute left-0 top-8 md:left-6 z-20">
            <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px]  overflow-hidden ">
              <Image
                src="/doctor-phone.png"
                alt="Doctor on phone"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="absolute right-0 top-20 md:right-6 z-20"
          >
            <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] overflow-hidden">
              <Image
                src="/doctor-patient-call.png"
                alt="Doctor talking with patient"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            {/* SOFT GLOW */}
            <div
              className="absolute inset-2 scale-125 rounded-full blur-[100px] opacity-30"
              style={{
                background: isDark
                  ? "rgba(171,196,255,0.22)"
                  : "rgba(171,196,255,0.32)",
              }}
            />

            <div className="relative w-[220px] md:w-[310px]">
              <Image
                src="/mobile-hand.png"
                alt="App in hand"
                width={310}
                height={540}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="flex flex-col items-center justify-center mt-5">
          <Link href="/download-app">
            <Button
              size="lg"
              className="rounded-full px-8 h-10 text-base font-semibold shadow-xl border-0"
              style={{
                background: gradientPrimary,
                color: isDark ? "#0f172a" : "#ffffff",
              }}
            >
              Get Our App
              <Download className="ml-2 w-4 h-4" />
            </Button>
          </Link>

          <div className="flex items-center gap-2 mt-3">
            <Heart className="w-3 h-3" style={{ color: iconColor }} />

            <p className="text-xs" style={{ color: textTertiary }}>
              Therapy that stays with you — wherever you go.
            </p>
          </div>
        </motion.div>

        <motion.div className="flex flex-wrap justify-center gap-6 text-center mt-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" style={{ color: iconColor }} />

            <span className="text-xs" style={{ color: textTertiary }}>
              Secure & Private
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: iconColor }} />

            <span className="text-xs" style={{ color: textTertiary }}>
              AI Wellness Tools
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" style={{ color: iconColor }} />

            <span className="text-xs" style={{ color: textTertiary }}>
              Built For Emotional Care
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
