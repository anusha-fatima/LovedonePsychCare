"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Building2,
  Brain,
  ArrowRight,
  Sparkles,
  Shield,
  Video,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const solutions = [
  {
    id: 1,
    title: "LovePsychCare App",
    description:
      "Access mental health support nationwide with our trusted tele-health platform. Connect with licensed therapists and AI companions anytime, anywhere in Pakistan.",
    icon: Heart,
    link: "/for-patients",
    buttonText: "Explore Now",
    features: ["24/7 Access", "AI Support", "Video Sessions"],
  },
  {
    id: 2,
    title: "Corporate Wellness Program",
    description:
      "Online consultations and well-being sessions for corporate partners to improve employee mental health, reduce burnout, and boost workplace productivity.",
    icon: Building2,
    link: "/corporate-wellness",
    buttonText: "Explore Now",
    features: ["Employee Support", "Workshops", "Analytics"],
  },
  {
    id: 3,
    title: "Community E-Clinics",
    description:
      "Connect patients from community e-clinics to our qualified network of psychologists and specialists for virtual consultations across Pakistan.",
    icon: Users,
    link: "/e-clinics",
    buttonText: "Explore Now",
    features: ["Rural Access", "Affordable Care", "Specialist Network"],
  },
  {
    id: 4,
    title: "Mental Health & Well-being",
    description:
      "Access to mental health experts through online consultations and in-person well-being sessions for holistic emotional care.",
    icon: Brain,
    link: "/mental-health",
    buttonText: "Explore Now",
    features: ["Therapy", "Counseling", "Wellness Plans"],
  },
];

export const SolutionsGrid = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    window.addEventListener('themeChange', checkDarkMode);
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });
    return () => {
      window.removeEventListener('themeChange', checkDarkMode);
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  // Light theme
  const lightBgGradient = 'linear-gradient(135deg, rgba(237,242,251,0.95), rgba(226,234,252,0.92), rgba(204,219,253,0.9))';
  const lightHeaderBadgeBg = 'rgba(255,255,255,0.65)';
  const lightHeaderBadgeBorder = '1px solid rgba(171,196,255,0.35)';
  const lightHeaderBadgeColor = '#243447';
  const lightHeadingColor = '#1b263b';
  const lightHeadingAccent = 'rgb(var(--baby-blue-ice))';
  const lightSubColor = '#334155';
  const lightCardBg = 'rgba(255,255,255,0.65)';
  const lightCardBorder = '1px solid rgba(171,196,255,0.28)';
  const lightCardTitleColor = '#1e293b';
  const lightCardDescColor = '#475569';
  const lightFeatureBg = 'rgba(171,196,255,0.15)';
  const lightFeatureBorder = '1px solid rgba(171,196,255,0.3)';
  const lightFeatureColor = '#243447';
  const lightButtonGradient = 'linear-gradient(135deg, rgb(var(--periwinkle)), rgb(var(--baby-blue-ice)))';
  const lightButtonColor = '#102a43';
  const lightIconBg = 'rgba(171,196,255,0.18)';
  const lightIconColor = '#243447';
  const lightTrustBg = 'rgba(255,255,255,0.7)';
  const lightTrustBorder = '1px solid rgba(171,196,255,0.3)';
  const lightTrustTitle = '#1e293b';
  const lightTrustDesc = '#475569';

  // Dark theme
  const darkBgGradient = 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,41,59,0.98), rgba(30,41,59,0.98))';
  const darkHeaderBadgeBg = 'rgba(255,255,255,0.08)';
  const darkHeaderBadgeBorder = '1px solid rgba(200,220,255,0.2)';
  const darkHeaderBadgeColor = 'rgb(248,250,252)';
  const darkHeadingColor = 'rgb(248,250,252)';
  const darkHeadingAccent = 'rgb(150,170,220)';
  const darkSubColor = 'rgb(226,232,240)';
  const darkCardBg = 'rgba(255,255,255,0.08)';
  const darkCardBorder = '1px solid rgba(200,220,255,0.15)';
  const darkCardTitleColor = 'rgb(248,250,252)';
  const darkCardDescColor = 'rgb(226,232,240)';
  const darkFeatureBg = 'rgba(120,137,179,0.15)';
  const darkFeatureBorder = '1px solid rgba(120,137,179,0.3)';
  const darkFeatureColor = 'rgb(200,220,255)';
  const darkButtonGradient = 'linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155))';
  const darkButtonColor = 'rgb(248,250,252)';
  const darkIconBg = 'rgba(120,137,179,0.18)';
  const darkIconColor = 'rgb(200,220,255)';
  const darkTrustBg = 'rgba(255,255,255,0.08)';
  const darkTrustBorder = '1px solid rgba(200,220,255,0.15)';
  const darkTrustTitle = 'rgb(248,250,252)';
  const darkTrustDesc = 'rgb(226,232,240)';

  // Select based on theme
  const bgGradient = isDark ? darkBgGradient : lightBgGradient;
  const headerBadgeBg = isDark ? darkHeaderBadgeBg : lightHeaderBadgeBg;
  const headerBadgeBorder = isDark ? darkHeaderBadgeBorder : lightHeaderBadgeBorder;
  const headerBadgeColor = isDark ? darkHeaderBadgeColor : lightHeaderBadgeColor;
  const headingColor = isDark ? darkHeadingColor : lightHeadingColor;
  const headingAccent = isDark ? darkHeadingAccent : lightHeadingAccent;
  const subColor = isDark ? darkSubColor : lightSubColor;
  const cardBg = isDark ? darkCardBg : lightCardBg;
  const cardBorder = isDark ? darkCardBorder : lightCardBorder;
  const cardTitleColor = isDark ? darkCardTitleColor : lightCardTitleColor;
  const cardDescColor = isDark ? darkCardDescColor : lightCardDescColor;
  const featureBg = isDark ? darkFeatureBg : lightFeatureBg;
  const featureBorder = isDark ? darkFeatureBorder : lightFeatureBorder;
  const featureColor = isDark ? darkFeatureColor : lightFeatureColor;
  const buttonGradient = isDark ? darkButtonGradient : lightButtonGradient;
  const buttonColor = isDark ? darkButtonColor : lightButtonColor;
  const iconBg = isDark ? darkIconBg : lightIconBg;
  const iconColor = isDark ? darkIconColor : lightIconColor;
  const trustBg = isDark ? darkTrustBg : lightTrustBg;
  const trustBorder = isDark ? darkTrustBorder : lightTrustBorder;
  const trustTitle = isDark ? darkTrustTitle : lightTrustTitle;
  const trustDesc = isDark ? darkTrustDesc : lightTrustDesc;

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: bgGradient,
      }}
    >
      <div
        className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-30"
        style={{
          background: isDark ? 'rgb(120,137,179)' : 'rgb(var(--baby-blue-ice))',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full blur-3xl opacity-25"
        style={{
          background: isDark ? 'rgb(100,115,155)' : 'rgb(var(--periwinkle-2))',
        }}
      />

      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='104' viewBox='0 0 120 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0 L120 30 L120 74 L60 104 L0 74 L0 30 Z' fill='none' stroke='%23abc4ff' strokeWidth='1.5' strokeOpacity='${isDark ? '0.2' : '0.4'}'/%3E%3Cpath d='M60 20 L100 40 L100 64 L60 84 L20 64 L20 40 Z' fill='none' stroke='%23ccdbfd' strokeWidth='1' strokeOpacity='${isDark ? '0.15' : '0.3'}'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full shadow-md backdrop-blur-xl mb-6"
            style={{
              background: headerBadgeBg,
              border: headerBadgeBorder,
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: isDark ? 'rgb(150,170,220)' : 'rgb(var(--baby-blue-ice))' }} />
            <span className="text-sm font-medium" style={{ color: headerBadgeColor }}>
              Our Solutions
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-semibold mb-5" style={{ color: headingColor }}>
            Democratizing Mental
            <span className="block" style={{ color: headingAccent }}>
              Health Care
            </span>
          </h2>

          <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: subColor }}>
            Culturally-aware, accessible, and trusted mental healthcare
            solutions designed to support every Pakistani through technology and
            compassion.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;

            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <Link href={solution.link} className="block h-full">
                  <div
                    className="relative h-full min-h-[460px] flex flex-col justify-between rounded-[30px] overflow-hidden transition-all duration-500"
                    style={{
                      background: cardBg,
                      backdropFilter: 'blur(20px)',
                      border: cardBorder,
                      boxShadow: isDark ? '0 12px 35px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.08)',
                    }}
                  >
                    {/* Soft Glow */}
                    <div
                      className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:scale-125 transition-transform duration-700"
                      style={{
                        background: isDark ? 'rgb(120,137,179)' : 'rgb(var(--baby-blue-ice))',
                      }}
                    />

                    <div className="relative z-10 p-8 flex flex-col h-full">
                      {/* Icon */}
                      <div className="mb-6">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                          style={{
                            background: isDark
                              ? 'linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155), rgb(85,98,127))'
                              : 'linear-gradient(135deg, rgb(var(--periwinkle)), rgb(var(--periwinkle-2)), rgb(var(--baby-blue-ice)))',
                          }}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h3
                          className="text-2xl md:text-3xl font-bold mb-4 leading-snug"
                          style={{ color: cardTitleColor }}
                        >
                          {solution.title}
                        </h3>

                        <p className="leading-relaxed mb-6 text-[15px]" style={{ color: cardDescColor }}>
                          {solution.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                          {solution.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-3 py-1.5 text-xs rounded-full shadow-sm"
                              style={{
                                background: featureBg,
                                border: featureBorder,
                                color: featureColor,
                              }}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto">
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold shadow-lg"
                          style={{
                            background: buttonGradient,
                            color: buttonColor,
                          }}
                        >
                          <span>{solution.buttonText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: iconBg }}>
                            <Video className="w-4 h-4" style={{ color: iconColor }} />
                          </div>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: iconBg }}>
                            <MessageCircle className="w-4 h-4" style={{ color: iconColor }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl text-center"
          style={{
            background: trustBg,
            backdropFilter: 'blur(18px)',
            border: trustBorder,
            boxShadow: isDark ? '0 12px 30px rgba(0,0,0,0.3)' : '0 12px 30px rgba(0,0,0,0.08)',
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-5 h-5" style={{ color: isDark ? 'rgb(150,170,220)' : 'rgb(var(--baby-blue-ice))' }} />
            <span className="text-base font-semibold" style={{ color: trustTitle }}>
              Trusted by 500+ patients across Pakistan
            </span>
          </div>

          <p style={{ color: trustDesc }}>
            Secure, compassionate, and fully aligned with healthcare best
            practices for digital mental wellness.
          </p>
        </motion.div>
      </div>
    </section>
  );
};