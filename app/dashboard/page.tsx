'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Heart,
  MessageCircle,
  Mic,
  Calendar,
  User,
  Sparkles,
  Shield,
  Clock,
  Star,
  ArrowRight,
  Brain,
  Users,
  Volume2,
} from 'lucide-react';

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    setMounted(true);
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    window.addEventListener('themeChange', checkDarkMode);
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    // Get user data from localStorage
    const name = localStorage.getItem('userName') || 'Guest';
    setUserName(name);

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    return () => {
      window.removeEventListener('themeChange', checkDarkMode);
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  // Theme colors
  const lightColors = {
    bgGradient: 'linear-gradient(135deg, rgb(237,242,251), rgb(226,234,252))',
    cardBg: 'rgba(255,255,255,0.6)',
    cardBorder: '1px solid rgba(171,196,255,0.25)',
    textPrimary: '#0f172a',
    textSecondary: '#334155',
    textTertiary: '#475569',
    accentColor: 'rgb(120,137,179)',
    buttonGradient: 'linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155))',
  };

  const darkColors = {
    bgGradient: 'linear-gradient(135deg, rgb(15,23,42), rgb(30,41,59))',
    cardBg: 'rgba(255,255,255,0.08)',
    cardBorder: '1px solid rgba(200,220,255,0.15)',
    textPrimary: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    accentColor: 'rgb(171,196,255)',
    buttonGradient: 'linear-gradient(135deg, rgb(171,196,255), rgb(193,211,254))',
  };

  const colors = isDark ? darkColors : lightColors;

  const features = [
    {
      icon: MessageCircle,
      title: 'AI Chat Companion',
      description: '24/7 confidential chat support',
      link: '/ai-chat',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Volume2,
      title: 'Voice Cloning',
      description: 'Hear from someone you love',
      link: '/voice-cloning',
      color: 'from-purple-500 to-pink-500',
      highlight: true,
    },
    {
      icon: Calendar,
      title: 'Book Psychologist',
      description: 'Connect with licensed therapists',
      link: '/psychologists',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  const upcomingSessions = [
    {
      title: 'Therapy Session',
      with: 'Dr. Ayesha Khan',
      time: 'Today, 2:00 PM',
      type: 'Video Call',
    },
    {
      title: 'Wellness Check',
      with: 'AI Companion',
      time: 'Tomorrow, 10:00 AM',
      type: 'Chat',
    },
  ];

  const stats = [
    { label: 'Sessions Completed', value: '4', change: '+2 this week' },
    { label: 'AI Conversations', value: '12', change: 'Active engagement' },
    { label: 'Wellness Score', value: '85%', change: '+5% improvement' },
  ];

  return (
    <div 
      className="min-h-screen pb-14" 
      style={{ 
        background: colors.bgGradient,
        paddingTop: 'clamp(100px, 20vh, 140px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm mb-1" style={{ color: colors.textTertiary }}>{greeting}</p>
              <h1 className="text-3xl md:text-4xl font-semibold" style={{ color: colors.textPrimary }}>
                {userName}!
              </h1>
              <p className="mt-2" style={{ color: colors.textSecondary }}>How can I assist you today?</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: colors.cardBg, border: colors.cardBorder }}>
                <Sparkles className="w-4 h-4" style={{ color: colors.accentColor }} />
                <span className="text-sm" style={{ color: colors.textSecondary }}>Premium Member</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: colors.cardBg,
                border: colors.cardBorder,
                backdropFilter: 'blur(10px)',
              }}
            >
              <p className="text-sm mb-1" style={{ color: colors.textTertiary }}>{stat.label}</p>
              <p className="text-3xl font-bold mb-1" style={{ color: colors.textPrimary }}>{stat.value}</p>
              <p className="text-xs" style={{ color: colors.accentColor }}>{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={feature.link}>
                  <div
                    className="rounded-2xl p-6 cursor-pointer transition-all duration-300 h-full"
                    style={{
                      background: feature.highlight 
                        ? `linear-gradient(135deg, ${isDark ? 'rgb(120,137,179)' : 'rgb(171,196,255)'}, ${isDark ? 'rgb(100,115,155)' : 'rgb(150,170,220)'})`
                        : colors.cardBg,
                      border: feature.highlight ? 'none' : colors.cardBorder,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: feature.highlight 
                          ? 'rgba(255,255,255,0.2)' 
                          : isDark ? 'rgba(171,196,255,0.15)' : 'rgba(120,137,179,0.15)',
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: feature.highlight ? '#ffffff' : colors.accentColor }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: feature.highlight ? '#ffffff' : colors.textPrimary }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: feature.highlight ? 'rgba(255,255,255,0.8)' : colors.textTertiary }}>
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: feature.highlight ? '#ffffff' : colors.accentColor }}>
                      Get Started <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Upcoming Sessions & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl p-6"
            style={{
              background: colors.cardBg,
              border: colors.cardBorder,
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>Upcoming Sessions</h3>
              <Link href="/psychologists">
                <span className="text-xs cursor-pointer hover:opacity-70 transition" style={{ color: colors.accentColor }}>View all →</span>
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl transition-all duration-300 hover:translate-x-1"
                  style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(120,137,179,0.05)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: colors.accentColor + '20' }}>
                      <Clock className="w-4 h-4" style={{ color: colors.accentColor }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>{session.title}</p>
                      <p className="text-xs" style={{ color: colors.textTertiary }}>{session.with}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium" style={{ color: colors.textSecondary }}>{session.time}</p>
                    <p className="text-xs" style={{ color: colors.textTertiary }}>{session.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Wellness Tip & Quick Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-2xl p-6"
            style={{
              background: colors.cardBg,
              border: colors.cardBorder,
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Daily Wellness Tip</h3>
            <div className="flex items-start gap-3 mb-4">
              <Heart className="w-5 h-5 mt-0.5" style={{ color: colors.accentColor }} />
              <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                "Take a moment to breathe deeply. Three deep breaths can instantly calm your nervous system and bring you back to the present moment."
              </p>
            </div>
            <div className="pt-4 border-t" style={{ borderColor: isDark ? 'rgba(200,220,255,0.1)' : 'rgba(171,196,255,0.15)' }}>
              <Link href="/ai-chat">
                <button
                  className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: colors.buttonGradient,
                    color: isDark ? '#0f172a' : '#ffffff',
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Need to talk? Chat with AI Companion
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Emergency Support Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 rounded-2xl p-5 text-center"
          style={{
            background: isDark ? 'rgba(120,137,179,0.15)' : 'rgba(171,196,255,0.2)',
            border: `1px solid ${colors.accentColor}40`,
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5" style={{ color: colors.accentColor }} />
            <span className="text-sm font-semibold" style={{ color: colors.textPrimary }}>24/7 Crisis Support Available</span>
          </div>
          <p className="text-sm" style={{ color: colors.textTertiary }}>
            If you're in crisis or need immediate help, call our emergency helpline: <span className="font-semibold" style={{ color: colors.accentColor }}>1122</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}