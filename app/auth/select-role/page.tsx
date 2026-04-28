// app/auth/select-role/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Heart,
  UserCircle,
  Stethoscope,
  ArrowRight,
  Shield,
  MessageCircle,
  Calendar,
  Users,
  Award,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SelectRolePage() {
  const [selectedRole, setSelectedRole] = useState<
    "user" | "psychologist" | null
  >(null);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

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

  // Light theme colors (Dark text for light background)
  const lightColors = {
    textPrimary: '#0f172a', // Dark slate
    textSecondary: '#334155', // Slate-700
    textTertiary: '#475569', // Slate-600
    cardBg: 'rgba(255,255,255,0.5)',
    cardBorder: '1px solid rgba(171,196,255,0.2)',
    buttonGradient: 'linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155), rgb(85,98,127))',
    selectedBorder: '#0f172a',
    iconColor: '#0f172a',
  };

  // Dark theme colors (Light text for dark background)
  const darkColors = {
    textPrimary: '#f1f5f9', // Light slate
    textSecondary: '#cbd5e1', // Slate-300
    textTertiary: '#94a3b8', // Slate-400
    cardBg: 'rgba(255,255,255,0.08)',
    cardBorder: '1px solid rgba(200,220,255,0.15)',
    buttonGradient: 'linear-gradient(135deg, rgb(171,196,255), rgb(193,211,254), rgb(204,219,253))',
    selectedBorder: '#cbd5e1',
    iconColor: '#cbd5e1',
  };

  const colors = isDark ? darkColors : lightColors;

  const handleContinue = () => {
    if (selectedRole === "user") {
      router.push("/dashboard");
    } else if (selectedRole === "psychologist") {
      router.push("/psychologist/onboarding");
    }
  };

  const userFeatures = [
    { icon: MessageCircle, text: "Free AI Chat Support" },
    { icon: Calendar, text: "Book Therapy Sessions" },
    { icon: Heart, text: "Personalized Care Plans" },
    { icon: Shield, text: "100% Confidential" },
  ];

  const psychologistFeatures = [
    { icon: Users, text: "Manage Client Sessions" },
    { icon: Award, text: "Verified Professional Badge" },
    { icon: Calendar, text: "Flexible Scheduling" },
    { icon: Clock, text: "Earn Competitive Rates" },
  ];

  return (
    <div className="min-h-screen pt-28 md:pt-32 relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ccdbfd' fillOpacity='${isDark ? '0.08' : '0.2'}'%3E%3Cpath d='M50 10 L58 25 L50 40 L42 25 Z M50 60 L58 75 L50 90 L42 75 Z M10 50 L25 58 L40 50 L25 42 Z M90 50 L75 58 L60 50 L75 42 Z M30 30 L35 38 L30 45 L25 38 Z M70 70 L75 78 L70 85 L65 78 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          opacity: isDark ? 0.3 : 0.5,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300"
            style={{ color: colors.textPrimary }}
          >
            Welcome to LovedOne PsyCare
          </h1>
          <p
            className="text-lg transition-colors duration-300"
            style={{ color: colors.textSecondary }}
          >
            Please tell us how you'd like to use our platform
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Role Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => setSelectedRole("user")}
            className={`cursor-pointer transition-all duration-300 ${
              selectedRole === "user" ? "scale-105" : "hover:scale-102"
            }`}
          >
            <div
              className={`rounded-3xl p-8 h-full transition-all duration-300 ${
                selectedRole === "user"
                  ? "shadow-2xl"
                  : "hover:shadow-xl"
              }`}
              style={{
                background: colors.cardBg,
                border: selectedRole === "user"
                  ? `2px solid ${colors.selectedBorder}`
                  : colors.cardBorder,
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: colors.buttonGradient }}
                >
                  <UserCircle
                    className="w-10 h-10"
                    style={{ color: isDark ? '#0f172a' : '#ffffff' }}
                  />
                </div>
                {selectedRole === "user" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: colors.buttonGradient }}
                  >
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </motion.div>
                )}
              </div>

              <h2
                className="text-2xl font-bold mb-2 transition-colors duration-300"
                style={{ color: colors.textPrimary }}
              >
                I Need Support
              </h2>
              <p
                className="mb-6 transition-colors duration-300"
                style={{ color: colors.textTertiary }}
              >
                I'm looking for mental health support, therapy sessions, or
                someone to talk to.
              </p>

              <div className="space-y-3 mb-8">
                {userFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: colors.iconColor }}
                    />
                    <span
                      className="text-sm transition-colors duration-300"
                      style={{ color: colors.textSecondary }}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant={selectedRole === "user" ? "premium" : "outline"}
                className="w-full transition-all duration-300"
                onClick={handleContinue}
                style={{
                  color: selectedRole === "user" 
                    ? (isDark ? '#0f172a' : '#ffffff')
                    : colors.textPrimary,
                  background: selectedRole === "user"
                    ? colors.buttonGradient
                    : 'transparent',
                  borderColor: selectedRole === "user"
                    ? 'transparent'
                    : (isDark ? 'rgba(200,220,255,0.3)' : 'rgba(171,196,255,0.3)'),
                }}
              >
                Continue as Seeker
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Psychologist Role Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => setSelectedRole("psychologist")}
            className={`cursor-pointer transition-all duration-300 ${
              selectedRole === "psychologist" ? "scale-105" : "hover:scale-102"
            }`}
          >
            <div
              className={`rounded-3xl p-8 h-full transition-all duration-300 ${
                selectedRole === "psychologist"
                  ? "shadow-2xl"
                  : "hover:shadow-xl"
              }`}
              style={{
                background: colors.cardBg,
                border: selectedRole === "psychologist"
                  ? `2px solid ${colors.selectedBorder}`
                  : colors.cardBorder,
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: colors.buttonGradient }}
                >
                  <Stethoscope
                    className="w-10 h-10"
                    style={{ color: isDark ? '#0f172a' : '#ffffff' }}
                  />
                </div>
                {selectedRole === "psychologist" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: colors.buttonGradient }}
                  >
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </motion.div>
                )}
              </div>

              <h2
                className="text-2xl font-bold mb-2 transition-colors duration-300"
                style={{ color: colors.textPrimary }}
              >
                I'm a Psychologist
              </h2>
              <p
                className="mb-6 transition-colors duration-300"
                style={{ color: colors.textTertiary }}
              >
                I'm a licensed mental health professional wanting to help
                others.
              </p>

              <div className="space-y-3 mb-8">
                {psychologistFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: colors.iconColor }}
                    />
                    <span
                      className="text-sm transition-colors duration-300"
                      style={{ color: colors.textSecondary }}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant={
                  selectedRole === "psychologist" ? "premium" : "outline"
                }
                className="w-full transition-all duration-300"
                onClick={handleContinue}
                style={{
                  color: selectedRole === "psychologist"
                    ? (isDark ? '#0f172a' : '#ffffff')
                    : colors.textPrimary,
                  background: selectedRole === "psychologist"
                    ? colors.buttonGradient
                    : 'transparent',
                  borderColor: selectedRole === "psychologist"
                    ? 'transparent'
                    : (isDark ? 'rgba(200,220,255,0.3)' : 'rgba(171,196,255,0.3)'),
                }}
              >
                Continue as Psychologist
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl transition-all duration-300"
          style={{
            background: colors.cardBg,
            border: colors.cardBorder,
            backdropFilter: 'blur(10px)',
          }}
        >
          <p className="text-sm transition-colors duration-300" style={{ color: colors.textSecondary }}>
            <Shield
              className="w-4 h-4 inline mr-2 transition-colors duration-300"
              style={{ color: colors.iconColor }}
            />
            Both options are completely free to start. Psychologists will need
            to verify their credentials.
            <br />
            Your information is always kept confidential and secure.
          </p>
        </motion.div>
      </div>
    </div>
  );
}