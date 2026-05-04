// components/sections/HeroSection.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mic, Heart, Sparkles, Volume2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import Image from "next/image";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    window.addEventListener('themeChange', checkDarkMode);
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });

    // Simulate loading complete after 3 seconds
    const timer = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      window.removeEventListener('themeChange', checkDarkMode);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  if (!mounted) return null;

  const lightColors = {
    headingColor: '#0f172a', // Dark slate
    subColor: '#334155', // Slate-700
    textColor: '#475569', // Slate-600
    buttonGradient: 'linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155), rgb(85,98,127))',
    voiceButtonBg: 'rgba(120,137,179,0.12)',
    voiceButtonBorder: '1px solid rgba(120,137,179,0.3)',
    voiceButtonText: '#334155',
    cardBg: 'rgba(255,255,255,0.6)',
    cardBorder: '1px solid rgba(120,137,179,0.2)',
    micColor: 'rgb(120,137,179)',
    dotColor: 'rgb(120,137,179)',
    scrollBg: 'rgba(255,255,255,0.4)',
    scrollBorder: '1px solid rgba(120,137,179,0.2)',
  };

  
  const darkColors = {
    headingColor: '#f1f5f9', // Light slate
    subColor: '#cbd5e1', // Slate-300
    textColor: '#94a3b8', // Slate-400
    buttonGradient: 'linear-gradient(135deg, rgb(171,196,255), rgb(193,211,254), rgb(204,219,253))',
    voiceButtonBg: 'rgba(171,196,255,0.12)',
    voiceButtonBorder: '1px solid rgba(171,196,255,0.3)',
    voiceButtonText: '#cbd5e1',
    cardBg: 'rgba(255,255,255,0.08)',
    cardBorder: '1px solid rgba(171,196,255,0.15)',
    micColor: 'rgb(171,196,255)',
    dotColor: 'rgb(171,196,255)',
    scrollBg: 'rgba(255,255,255,0.1)',
    scrollBorder: '1px solid rgba(171,196,255,0.2)',
  };

  const colors = isDark ? darkColors : lightColors;

  return (
  <section
  ref={containerRef}
 className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-[70vh]"
  style={{
    paddingTop: '145px', 
    paddingBottom: '45px', 
  }}
>
      {/* Fixed Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155))'
              : 'linear-gradient(135deg, rgb(171,196,255), rgb(204,219,253))',
          }}
        />
        
        {/* Static Blobs */}
        <div
          className="absolute top-20 right-10 w-96 h-96 rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(120,137,179,0.15) 0%, rgba(100,115,155,0.03) 100%)'
              : 'radial-gradient(circle, rgba(171,196,255,0.2) 0%, rgba(204,219,253,0.05) 100%)',
          }}
        />
        
        <div
          className="absolute bottom-20 left-10 w-80 h-80 rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(100,115,155,0.15) 0%, rgba(85,98,127,0.03) 100%)'
              : 'radial-gradient(circle, rgba(193,211,254,0.2) 0%, rgba(215,227,252,0.05) 100%)',
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(120,137,179,0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(226,234,252,0.15) 0%, transparent 70%)',
          }}
        />
      </div>

     {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              background: isDark
                ? 'linear-gradient(180deg, rgb(15,23,42) 0%, rgb(30,41,59) 100%)'
                : 'linear-gradient(135deg, rgb(171,196,255) 0%, rgb(182,204,254) 50%, rgb(193,211,254) 100%)',
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center justify-center"
            >
              {/* Animated Logo Container */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-48 h-48 md:w-56 md:h-56 mb-8"
              >
                <Image
                  src="/logo.png"
                  alt="LovedOne PsyCare Logo"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
 
              {/* Loading Text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-center text-lg md:text-xl font-light tracking-wide"
                style={{ color: isDark ? 'rgb(200,220,255)' : 'rgba(60,70,120,0.7)' }}
              >
                Welcome to LovedOne PsyCare
              </motion.p>
 
              {/* Animated Loading Dots */}
              <motion.div
                className="flex gap-2 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: isDark ? 'rgb(150,170,220)' : 'rgb(var(--baby-blue-ice))',
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content - Centered Layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Main Heading - Warm & Gentle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-6"
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-4 transition-colors duration-300"
            style={{ color: colors.headingColor, letterSpacing: '-0.02em' }}
          >
            <span className="font-normal">When you need</span>
            <br />
            <span 
              className="font-semibold bg-clip-text text-transparent transition-all duration-300"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(135deg, rgb(200,220,255), rgb(150,170,220))'
                  : 'linear-gradient(135deg, rgb(120,137,179), rgb(85,98,127))',
              }}
            >
              someone to listen
            </span>
          </h1>
        </motion.div>

        {/* Subheading - Warm & Welcoming */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed font-light transition-colors duration-300"
          style={{ color: colors.textColor }}
        >
          Compassionate support from licensed psychologists. Talk about what matters. 
          <span className="block mt-2">Connect at your own pace, in your own language.</span>
        </motion.p>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          {/* Main CTA Button */}
          <Link href="/booking">
            <Button
              size="lg"
              className="shadow-xl hover:shadow-2xl transition-all duration-300 group border-0"
              style={{
                background: colors.buttonGradient,
                color: isDark ? '#0f172a' : '#ffffff',
              }}
            >
              <Heart className="w-5 h-5 mr-2" style={{ color: isDark ? '#0f172a' : '#ffffff' }} />
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          {/* Voice Feature Button - Highlighted */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              className="px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 border font-semibold group"
              style={{
                background: colors.voiceButtonBg,
                borderColor: isDark ? 'rgba(171,196,255,0.3)' : 'rgba(120,137,179,0.3)',
                color: colors.voiceButtonText,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Volume2 className="w-5 h-5" style={{ color: colors.micColor }} />
              </motion.div>
              <span>Voice Cloning Feature</span>
              <Sparkles className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        </motion.div>

        {/* Trust Indicators - Soft & Gentle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm md:text-base"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: colors.dotColor }}
            />
            <span className="transition-colors duration-300" style={{ color: colors.textColor }}>Licensed Therapists</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: colors.dotColor }}
            />
            <span className="transition-colors duration-300" style={{ color: colors.textColor }}>100% Confidential</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: colors.dotColor }}
            />
            <span className="transition-colors duration-300" style={{ color: colors.textColor }}>Available 24/7</span>
          </div>
        </motion.div>

        {/* Voice Feature Highlight Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 30 : 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 md:mt-16"
        >
          <div
            className="rounded-2xl p-6 md:p-8 backdrop-blur-md transition-all duration-300"
            style={{
              background: colors.cardBg,
              border: colors.cardBorder,
            }}
          >
            <div className="flex items-start gap-4 mb-4 text-left">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mic
                  className="w-6 h-6 shrink-0 mt-1"
                  style={{ color: colors.micColor }}
                />
              </motion.div>
              <div>
                <h3
                  className="text-lg md:text-xl font-semibold mb-2 transition-colors duration-300"
                  style={{ color: colors.headingColor }}
                >
                  Voice Cloning: Hear From Someone You Love
                </h3>
                <p className="text-sm md:text-base transition-colors duration-300" style={{ color: colors.textColor }}>
                  Experience AI-powered voice support that sounds like someone you trust. 
                  A unique feature designed to make therapy feel more personal and comforting.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};