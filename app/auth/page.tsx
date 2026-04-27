// app/auth/page.tsx
'use client';

import { useLanguage } from "@/context/LanguageContext";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: '',
  });

  const router = useRouter();
  const { t, lang } = useLanguage();

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

  const inputClass =
    "w-full pl-12 pr-4 py-3 rounded-2xl border transition-all duration-300 outline-none placeholder:text-white/50";

  const inputStyle = {
    background: 'rgba(237, 242, 251, 0.18)',
    borderColor: 'rgba(255,255,255,0.22)',
    color: 'rgb(var(--alice-blue))',
  };

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{ background: 'rgb(var(--baby-blue-ice))' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-3xl opacity-20"
          style={{ background: 'rgb(var(--periwinkle))' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="space-y-8">
              {/* Brand */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl premium-gradient flex items-center justify-center shadow-xl">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2
                    className="text-3xl font-semibold"
                    style={{ color: 'rgb(var(--alice-blue))' }}
                  >
                    LovedOne PsyCare
                  </h2>
                  <p
                    className={lang === "ur" ? "font-urdu text-sm" : "text-sm"}
                    style={{ color: 'rgba(237,242,251,0.75)' }}
                  >
                    {t.auth.tagline}
                  </p>
                </div>
              </div>

              {/* Hero Text */}
              <div className="space-y-5">
                <h1
                  className="text-5xl leading-tight font-semibold"
                  style={{ color: 'rgb(var(--alice-blue))' }}
                >
                  Your Safe Space for{" "}
                  <span className="text-gradient">Mental Wellness</span>
                </h1>

                <p
                  className="text-lg leading-relaxed max-w-xl"
                  style={{ color: 'rgba(237,242,251,0.8)' }}
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
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="premium-card rounded-2xl p-5 flex gap-4"
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
                        className="font-semibold"
                        style={{ color: 'rgb(var(--alice-blue))' }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-sm mt-1"
                        style={{ color: 'rgba(237,242,251,0.72)' }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="premium-card rounded-[2rem] shadow-2xl p-8 border border-white/20">
              {/* Toggle */}
              <div className="flex rounded-full p-1 mb-8 bg-white/10">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
                    isLogin ? 'premium-gradient text-white shadow-lg' : 'text-white/70'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all ${
                    !isLogin ? 'premium-gradient text-white shadow-lg' : 'text-white/70'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <h2
                  className="text-3xl font-semibold"
                  style={{ color: 'rgb(var(--alice-blue))' }}
                >
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-sm text-white/70 mt-2">
                  {isLogin
                    ? 'Continue your wellness journey'
                    : 'Start your path toward healing'}
                </p>
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={isLogin ? 'login' : 'signup'}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {!isLogin && (
                    <>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
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
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
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
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
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
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
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
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    variant="premium"
                    size="lg"
                    className="w-full premium-gradient text-white rounded-2xl"
                  >
                    {isLogin ? 'SIGN IN' : 'SIGN UP'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.form>
              </AnimatePresence>

              {/* Divider */}
              <div className="relative my-6">
                <div className="border-t border-white/20"></div>
                <span className="absolute inset-x-0 -top-3 mx-auto w-fit px-4 text-sm text-white/60 bg-transparent">
                  or
                </span>
              </div>

              {/* Social */}
              <div className="grid grid-cols-2 gap-3">
                <button className="premium-card rounded-2xl py-3 flex items-center justify-center gap-2">
                  <Facebook className="w-5 h-5 text-blue-500" />
                  <span className="text-white/80 text-sm">Facebook</span>
                </button>

                <button className="premium-card rounded-2xl py-3 flex items-center justify-center gap-2">
                  <span className="text-white/80 text-sm">Google</span>
                </button>
              </div>
            </div>

            {/* Emergency */}
            <div className="mt-6 premium-card rounded-2xl p-4">
              <p className="text-sm text-white">
                <strong className="text-red-300">Need immediate help?</strong>
              </p>
              <p className="text-sm text-white/70 mt-1">
                Emergency Helpline: <span className="font-semibold text-red-300">1122</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}