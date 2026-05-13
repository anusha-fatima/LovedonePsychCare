"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Brain,
  MessageCircleHeart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const supportCards = [
  {
    id: 1,
    title: "Small conversations matter",
    description:
      "Sometimes healing begins with a simple conversation. You don't need perfect words just a moment for yourself.",
    tag: "Gentle support",
    image: "/talking-illustration.png",
    icon: MessageCircleHeart,
  },
  {
    id: 2,
    title: "Understand your thoughts softly",
    description:
      "Take things slowly. Explore emotions, stress, and thoughts in a calm space designed to feel safe and comforting.",
    tag: "Peaceful clarity",
    image: "/brain-illustration.png",
    icon: Brain,
  },
  {
    id: 3,
    title: "Take care of yourself first",
    description:
      "There's no pressure here. Try it if it feels right for you, and always move at a pace that feels comfortable.",
    tag: "Your own pace",
    image: "/healing-illustration.png",
    icon: Heart,
  },
];

export const CTASection = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);

    observer.observe(document.documentElement, {
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  // SAME COLOR SYSTEM
  const bgGradient = isDark
    ? "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,41,59,0.98), rgba(30,41,59,0.98))"
    : "linear-gradient(135deg, rgba(237,242,251,0.95), rgba(226,234,252,0.92), rgba(204,219,253,0.9))";

  const cardBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.72)";

  const cardBorder = isDark
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(171,196,255,0.22)";

  const titleColor = isDark ? "#F8FAFC" : "#0f172a";

  const subColor = isDark ? "rgba(226,232,240,0.85)" : "rgba(71,85,105,0.88)";

  const softAccent = isDark ? "rgb(150,170,220)" : "rgb(120,137,179)";

  const buttonGradient =
    "linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155))";

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        background: bgGradient,
      }}
    >
      <div
        className="absolute -top-20 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
        style={{
          background: isDark ? "rgb(120,137,179)" : "rgb(171,196,255)",
        }}
      />

      <div
        className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full blur-3xl opacity-20"
        style={{
          background: isDark ? "rgb(100,115,155)" : "rgb(193,211,254)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-xl"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(255,255,255,0.7)",
                border: cardBorder,
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: softAccent }} />
              <span
                className="text-sm font-medium tracking-wide uppercase"
                style={{ color: subColor }}
              >
                Start gently
              </span>
            </div>
            <h2
              className="text-[3rem] sm:text-[4rem] leading-[1] tracking-[-2px] font-light italic"
              style={{
                color: titleColor,
              }}
            >
              Try it
              <span
                className="block font-bold not-italic mt-2"
                style={{
                  color: softAccent,
                }}
              >
                for free first.
              </span>
            </h2>

            <div className="mt-10">
              <Link href="/booking">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full px-8 py-4 text-base font-semibold flex items-center gap-3 shadow-2xl transition-all"
                  style={{
                    background: buttonGradient,
                    color: "#fff",
                  }}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
            <p
              className="mt-6 text-sm max-w-sm leading-relaxed opacity-70"
              style={{
                color: subColor,
              }}
            >
              Explore everything at your own comfort level. No pressure, no rush
              just a calm space for your well-being.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:pl-8 border-l border-white/10"
          >
            <p
              className="text-2xl md:text-3xl lg:text-3xl leading-[1.4] font-light tracking-tight"
              style={{
                color: titleColor,
                fontFamily: "var(--font-serif), Georgia, serif", // Using a serif font for that "Discover Calm" look
              }}
            >
              A{" "}
              <span className="italic font-serif" style={{ color: softAccent }}>
                peaceful
              </span>{" "}
              and supportive experience designed to help you feel understood.
              Whether you just want to explore, talk, or simply take a small
              step toward feeling better
              <span className="font-medium">
                {" "}
                everything here moves with you, never against you.
              </span>
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {supportCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.55,
                }}
                whileHover={{ y: -5 }}
                className={`group ${index === 1 ? "md:translate-y-6" : ""}`}
              >
                <div
                  className="relative rounded-2xl overflow-hidden h-full flex flex-col"
                  style={{
                    background: cardBg,
                    border: cardBorder,
                    backdropFilter: "blur(24px)",
                    boxShadow: isDark
                      ? "0 8px 30px rgba(0,0,0,0.2)"
                      : "0 8px 30px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="relative h-[250px] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: isDark
                          ? "linear-gradient(to top, rgba(15,23,42,0.55), transparent)"
                          : "linear-gradient(to top, rgba(255,255,255,0.7), transparent)",
                      }}
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    {/* Small Tag */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{
                          background: isDark
                            ? "rgba(171,196,255,0.12)"
                            : "rgba(171,196,255,0.2)",
                        }}
                      >
                        <Icon
                          className="w-3.5 h-3.5"
                          style={{
                            color: softAccent,
                          }}
                        />
                      </div>

                      <span
                        className="text-[10px] px-2.5 py-0.5 rounded-full"
                        style={{
                          background: isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(171,196,255,0.15)",
                          color: subColor,
                        }}
                      >
                        {card.tag}
                      </span>
                    </div>
                    <h3
                      className="text-lg leading-snug font-semibold mb-2"
                      style={{
                        color: titleColor,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: subColor,
                      }}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
