'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
  Video,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Heart,
  Users,
  CheckCircle,
  ArrowRight,
  Brain,
  Calendar,
} from 'lucide-react';
import { Button } from './ui/Button';
import Link from 'next/link';

const expertiseAreas = [
  { name: "Anxiety & Depression", icon: Brain, description: "Evidence-based approaches to manage mood disorders" },
  { name: "Trauma & PTSD", icon: ShieldCheck, description: "Safe space for healing and recovery" },
  { name: "Relationship Counseling", icon: Heart, description: "Improve communication and connection" },
  { name: "Child & Adolescent", icon: Users, description: "Support for young minds and families" },
];

export const PsychologistShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDarkMode = () => {
      const hasDarkClass = document.documentElement.classList.contains('dark');
      setIsDark(hasDarkClass);
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });
    window.addEventListener('themeChange', checkDarkMode);

    return () => {
      observer.disconnect();
      window.removeEventListener('themeChange', checkDarkMode);
    };
  }, []);

  if (!mounted) return null;

  // Light theme - Dark text colors
  const lightGradientPrimary = 'linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155), rgb(85,98,127))';
  const lightCardBg = 'rgba(255,255,255,0.7)';
  const lightCardBorder = '1px solid rgba(171,196,255,0.3)';
  const lightTextPrimary = '#0f172a'; // Dark slate
  const lightTextSecondary = '#334155'; // Slate-700
  const lightTextTertiary = '#475569'; // Slate-600
  const lightBgOverlay = 'linear-gradient(135deg, rgb(237,242,251) 0%, rgb(226,234,252) 50%, rgb(215,227,252) 100%)';
  const lightIconColor = 'rgb(120,137,179)'; // Darker purple-blue

  //  Light text colors
  const darkGradientPrimary = 'linear-gradient(135deg, rgb(171,196,255), rgb(193,211,254), rgb(204,219,253))';
  const darkCardBg = 'rgba(255,255,255,0.08)';
  const darkCardBorder = '1px solid rgba(200,220,255,0.15)';
  const darkTextPrimary = '#f1f5f9'; // Light slate
  const darkTextSecondary = '#cbd5e1'; // Slate-300
  const darkTextTertiary = '#94a3b8'; // Slate-400
  const darkBgOverlay = 'linear-gradient(135deg, rgb(15,23,42) 0%, rgb(30,41,59) 50%, rgb(30,41,59) 100%)';
  const darkIconColor = 'rgb(171,196,255)'; // Light blue

  // Select based on theme
  const gradientPrimary = isDark ? darkGradientPrimary : lightGradientPrimary;
  const cardBg = isDark ? darkCardBg : lightCardBg;
  const cardBorder = isDark ? darkCardBorder : lightCardBorder;
  const textPrimary = isDark ? darkTextPrimary : lightTextPrimary;
  const textSecondary = isDark ? darkTextSecondary : lightTextSecondary;
  const textTertiary = isDark ? darkTextTertiary : lightTextTertiary;
  const bgOverlay = isDark ? darkBgOverlay : lightBgOverlay;
  const iconColor = isDark ? darkIconColor : lightIconColor;

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{ background: bgOverlay }}
      />

      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(171,196,255,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(171,196,255,0.25) 0%, transparent 70%)',
          opacity: isDark ? 0.3 : 0.4,
        }}
      />
      
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(193,211,254,0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(204,219,253,0.3) 0%, transparent 70%)',
          opacity: isDark ? 0.25 : 0.3,
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-6"
      >
      
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23abc4ff' fillOpacity='0.25'%3E%3Cpath d='M40 20v-8h-4v8h-8v4h8v8h4v-8h8v-4h-8zM40 60v-8h-4v8h-8v4h8v8h4v-8h8v-4h-8zM0 40v-8H-8v8H0v8h4v-8h8v-4H0zM80 40v-8h-8v8h8v8h4v-8h8v-4h-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            opacity: isDark ? 0.06 : 0.15,
          }}
        />

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6"
            style={{
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.8)',
              border: isDark ? '1px solid rgba(200,220,255,0.15)' : '1px solid rgba(171,196,255,0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: iconColor }} />
            <span className="text-sm font-medium" style={{ color: textSecondary }}>
              Expert Mental Health Professionals
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-4"
          >
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradientPrimary }}>
              Professional Care,
            </span>
            <br />
            <span style={{ color: textPrimary }}>
              Right Where You Are
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-lg"
            style={{ color: textSecondary }}
          >
            Connect with licensed psychologists who understand Pakistani culture.
            Evidence-based care, confidential, and accessible from anywhere.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-semibold mb-3" style={{ color: textPrimary }}>
              Areas of Expertise
            </h3>
            <p className="text-sm" style={{ color: textTertiary }}>
              Specialized care for every unique situation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {expertiseAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="relative rounded-2xl p-6 text-center group cursor-pointer transition-all duration-300"
                  style={{
                    background: cardBg,
                    border: cardBorder,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ background: gradientPrimary }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: textPrimary }}>
                    {area.name}
                  </h4>
                  <p className="text-xs" style={{ color: textTertiary }}>
                    {area.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-16"
        >
          <div className="absolute inset-0" style={{ background: gradientPrimary, opacity: 0.9 }} />
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M40 20v-8h-4v8h-8v4h8v8h4v-8h8v-4h-8zM40 60v-8h-4v8h-8v4h8v8h4v-8h8v-4h-8zM0 40v-8H-8v8H0v8h4v-8h8v-4H0zM80 40v-8h-8v8h8v8h4v-8h8v-4h-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          
          <div className="relative p-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white opacity-90" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find Your Perfect Match
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Answer a few questions and we'll match you with the psychologist best suited to your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/psychologists">
                <Button
                  size="lg"
                  className="group shadow-xl hover:shadow-2xl transition-all duration-300"
                  style={{
                    background: 'rgba(15, 23, 42, 0.9)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  Browse All Psychologists
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/booking">
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid white',
                    color: 'white',
                  }}
                >
                  <Calendar className="mr-2 w-4 h-4" />
                  Book Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 text-center"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" style={{ color: iconColor }} />
            <span className="text-sm" style={{ color: textTertiary }}>100% Confidential</span>
          </div>
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5" style={{ color: iconColor }} />
            <span className="text-sm" style={{ color: textTertiary }}>Secure Video Sessions</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" style={{ color: iconColor }} />
            <span className="text-sm" style={{ color: textTertiary }}>24/7 AI Support</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" style={{ color: iconColor }} />
            <span className="text-sm" style={{ color: textTertiary }}>Licensed Professionals</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};