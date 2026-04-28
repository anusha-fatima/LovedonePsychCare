// app/auth/page.tsx
'use client';

import { useLanguage } from "@/context/LanguageContext";
import { useState } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import {
  Heart,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Facebook,
  ArrowRight,
  Sparkles,
  Shield,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from 'next-themes';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isPageVisible] = useState(true); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: '',
  });

  const router = useRouter();
  const { t, lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin) {
      router.push('/auth/select-role');
    } else {
      console.log('Login form submitted:', formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getTextColor = () => {
    if (isDark) {
      return {
        primary: '#f1f5f9',
        secondary: '#cbd5e1',
        tertiary: '#94a3b8',
      };
    }
    return {
      primary: '#0f172a',
      secondary: '#334155',
      tertiary: '#64748b',
    };
  };

  const colors = getTextColor();

  const inputClass =
    "w-full pl-12 pr-4 py-3 rounded-2xl border transition-all duration-300 outline-none placeholder:text-gray-400";

  const inputStyle = {
    background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(171, 196, 255, 0.3)',
    color: colors.primary,
  };

  return (
    <div className="pt-28 md:pt-32 min-h-screen relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 transition-all duration-500"
          style={{ 
            background: isDark 
              ? 'rgb(59, 130, 246)' 
              : 'rgb(var(--baby-blue-ice))' 
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-20 transition-all duration-500"
          style={{ 
            background: isDark 
              ? 'rgb(147, 197, 253)' 
              : 'rgb(var(--periwinkle))' 
          }}
        />
      </div>
      {/* Diamond Pattern Overlay */}
<div 
  className="absolute inset-0 opacity-30 pointer-events-none"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ccdbfd' fillOpacity='0.3'%3E%3Cpath d='M50 10 L58 25 L50 40 L42 25 Z M50 60 L58 75 L50 90 L42 75 Z M10 50 L25 58 L40 50 L25 42 Z M90 50 L75 58 L60 50 L75 42 Z M30 30 L35 38 L30 45 L25 38 Z M70 70 L75 78 L70 85 L65 78 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat'
  }}
/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isPageVisible ? 1 : 0, x: isPageVisible ? 0 : -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="space-y-8">
              {/* Brand */}
              <div className="flex items-center gap-4">
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
                <div>
                  <h2
                    className="text-3xl font-semibold transition-colors duration-300"
                    style={{ color: colors.primary }}
                  >
                    LovedOne PsyCare
                  </h2>
                  <p
                    className={lang === "ur" ? "font-urdu text-sm" : "text-sm transition-colors duration-300"}
                    style={{ color: colors.tertiary }}
                  >
                    {t?.auth?.tagline || "Your trusted mental health partner"}
                  </p>
                </div>
              </div>

              {/* Hero Text */}
              <div className="space-y-5">
                <h1
                  className="text-5xl leading-tight font-semibold transition-colors duration-300"
                  style={{ color: colors.primary }}
                >
                  Your Safe Space for{" "}
                  <span className="text-5xl leading-tight font-semibold transition-colors duration-300"
                  style={{ color: colors.primary }}
                  >Mental Wellness</span>
                </h1>

                <p
                  className="text-lg leading-relaxed max-w-xl transition-colors duration-300"
                  style={{ color: colors.secondary }}
                >
                  Compassionate support, trusted professionals, and modern care —
                  all in one beautiful platform designed for healing.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    title: 'Share Freely',
                    description: 'Talk in a calm, secure, and judgment-free space.',
                    icon: Heart,
                  },
                  {
                    step: '02',
                    title: 'Get Guidance',
                    description: 'Receive support from experts and AI companions.',
                    icon: User,
                  },
                  {
                    step: '03',
                    title: 'Heal Gradually',
                    description: 'Personalized care designed for long-term growth.',
                    icon: Shield,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="rounded-2xl p-5 flex gap-4 transition-all duration-300"
                    style={{
                      background: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(18px)',
                      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(171, 196, 255, 0.2)'}`,
                    }}
                  >
                    <div className="w-12 h-12 rounded-2xl premium-gradient flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <span
                        className="text-xs font-bold"
                        style={{ color: 'rgb(var(--baby-blue-ice))' }}
                      >
                        {item.step}
                      </span>
                      <h4
                        className="font-semibold transition-colors duration-300"
                        style={{ color: colors.primary }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-sm mt-1 transition-colors duration-300"
                        style={{ color: colors.tertiary }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Section - Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md mx-auto"
          >
            <div 
              className="rounded-[2rem] shadow-2xl p-8 transition-all duration-300"
              style={{
                background: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(171, 196, 255, 0.3)'}`,
              }}
            >
              {/* Toggle */}
              <div className="flex rounded-full p-1 mb-8 transition-all duration-300" style={{ background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(171, 196, 255, 0.15)' }}>
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isLogin 
                      ? isDark ? 'bg-blue-600 text-white shadow-lg' : 'premium-gradient text-white shadow-lg' 
                      : isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    !isLogin 
                      ? isDark ? 'bg-blue-600 text-white shadow-lg' : 'premium-gradient text-white shadow-lg' 
                      : isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h2
                  className="text-3xl font-semibold transition-colors duration-300"
                  style={{ color: colors.primary }}
                >
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-sm mt-2 transition-colors duration-300" style={{ color: colors.tertiary }}>
                  {isLogin
                    ? 'Continue your wellness journey'
                    : 'Start your path toward healing'}
                </p>
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={isLogin ? 'login' : 'signup'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {!isLogin && (
                    <>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: colors.tertiary }} />
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={inputClass}
                          style={inputStyle}
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: colors.tertiary }} />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={inputClass}
                          style={inputStyle}
                        />
                      </div>
                    </>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: colors.tertiary }} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: colors.tertiary }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`${inputClass} pr-12`}
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: colors.tertiary }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    variant="premium"
                    size="lg"
                    className="w-full rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      background: isDark 
                        ? "linear-gradient(135deg, rgb(59, 130, 246), rgb(96, 165, 250))"
                        : "linear-gradient(135deg, rgb(171, 196, 255), rgb(204, 219, 253))",
                      color: isDark ? "#ffffff" : "#102a43",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    {isLogin ? 'SIGN IN' : 'SIGN UP'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.form>
              </AnimatePresence>

              {/* Divider */}
              <div className="relative my-6">
                <div className="border-t transition-all duration-300" style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(171, 196, 255, 0.2)' }}></div>
                <span className="absolute inset-x-0 -top-3 mx-auto w-fit px-4 text-sm transition-colors duration-300" style={{ color: colors.tertiary }}>
                  or
                </span>
              </div>

              {/* Social */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  className="rounded-2xl py-3 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                  style={{
                    background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.7)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(171, 196, 255, 0.2)'}`,
                  }}
                >
                  <Facebook className="w-5 h-5 text-blue-500" />
                  <span className="text-sm transition-colors duration-300" style={{ color: colors.secondary }}>Facebook</span>
                </button>

                <button 
                  className="rounded-2xl py-3 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                  style={{
                    background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.7)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(171, 196, 255, 0.2)'}`,
                  }}
                >
                  <span className="text-sm transition-colors duration-300" style={{ color: colors.secondary }}>Google</span>
                </button>
              </div>
            </div>

            {/* Emergency Section */}
            <motion.div 
              className="mt-6 rounded-2xl p-4 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                background: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(18px)',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(171, 196, 255, 0.2)'}`,
              }}
            >
              <p className="text-sm transition-colors duration-300" style={{ color: colors.primary }}>
                <strong className="text-red-500">Need immediate help?</strong>
              </p>
              <p className="text-sm mt-1 transition-colors duration-300" style={{ color: colors.secondary }}>
                Emergency Helpline: <span className="font-semibold text-red-500">1122</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}