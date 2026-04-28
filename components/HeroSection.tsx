'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight, Shield, Users, Sparkles, Heart, Clock, Quote } from 'lucide-react';
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

  // Light theme - Dark text colors
  const lightHeadingColor = '#0f172a'; // Slate-900 - Dark for contrast
  const lightSubColor = '#334155'; // Slate-700
  const lightTextColor = '#475569'; // Slate-600
  const lightCardBg = 'rgba(255,255,255,0.7)';
  const lightCardBorder = '1px solid rgba(171,196,255,0.3)';
  const lightQuoteColor = 'rgb(85, 98, 127)'; // baby-blue-ice-darker
  const lightFloatingBg = 'rgba(255,255,255,0.95)';
  const lightFloatingBorder = '1px solid rgba(171,196,255,0.4)';
  const lightGradientText = 'linear-gradient(135deg, rgb(120,137,179), rgb(85,98,127))'; 
  const lightButtonGradient = 'linear-gradient(135deg, rgb(120,137,179), rgb(85,98,127))';
  const lightPlayBg = 'rgba(255,255,255,0.9)';
  const lightPlayBorder = '1px solid rgba(120,137,179,0.3)';

  // Dark theme - Light text colors
  const darkHeadingColor = '#f1f5f9'; // Slate-100
  const darkSubColor = '#cbd5e1'; // Slate-300
  const darkTextColor = '#94a3b8'; // Slate-400
  const darkCardBg = 'rgba(255,255,255,0.08)';
  const darkCardBorder = '1px solid rgba(200,220,255,0.15)';
  const darkQuoteColor = 'rgb(200,220,255)';
  const darkFloatingBg = 'rgba(15,23,42,0.9)';
  const darkFloatingBorder = '1px solid rgba(200,220,255,0.2)';
  const darkGradientText = 'linear-gradient(135deg, rgb(200,220,255), rgb(171,196,255))';
  const darkButtonGradient = 'linear-gradient(135deg, rgb(171,196,255), rgb(204,219,253))';
  const darkPlayBg = 'rgba(255,255,255,0.1)';
  const darkPlayBorder = '1px solid rgba(200,220,255,0.3)';

  // Select based on theme
  const headingColor = isDark ? darkHeadingColor : lightHeadingColor;
  const subColor = isDark ? darkSubColor : lightSubColor;
  const textColor = isDark ? darkTextColor : lightTextColor;
  const cardBg = isDark ? darkCardBg : lightCardBg;
  const cardBorder = isDark ? darkCardBorder : lightCardBorder;
  const quoteColor = isDark ? darkQuoteColor : lightQuoteColor;
  const floatingBg = isDark ? darkFloatingBg : lightFloatingBg;
  const floatingBorder = isDark ? darkFloatingBorder : lightFloatingBorder;
  const gradientText = isDark ? darkGradientText : lightGradientText;
  const buttonGradient = isDark ? darkButtonGradient : lightButtonGradient;
  const playBg = isDark ? darkPlayBg : lightPlayBg;
  const playBorder = isDark ? darkPlayBorder : lightPlayBorder;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-visible pt-40 md:pt-48 pb-24 md:pb-28"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, rgb(15,23,42) 0%, rgb(30,41,59) 100%)'
          : 'linear-gradient(180deg, rgb(237,242,251) 0%, rgb(226,234,252) 100%)', 
      }}
    >
      {/* Fixed Background Elements - No movement */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155))'
              : 'linear-gradient(135deg, rgb(171,196,255), rgb(204,219,253))',
          }}
        />
        
        {/* Static Blobs - No animation */}
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

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
          
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6"
            >
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: gradientText }}
              >
                Mental Health Care,
              </span>
              <br />
              <span style={{ color: headingColor }}>Rooted in Pakistan</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl mb-10 leading-relaxed"
              style={{ color: subColor }}
            >
              Your mind matters. We are here to help with culturally-aware,
              confidential support, wherever you are in Pakistan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-12"
            >
              <Link href="/booking">
                <Button
                  size="lg"
                  className="shadow-xl hover:shadow-2xl transition-all duration-300 group text-white border-0"
                  style={{
                    background: buttonGradient,
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <button
                className="flex items-center space-x-3 transition-all duration-300 group"
                style={{ color: isDark ? 'rgb(200,220,255)' : 'rgb(var(--periwinkle-3))' }}
              >
                <span 
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: playBg,
                    backdropFilter: 'blur(10px)',
                    border: playBorder,
                  }}
                >
                  <Play className="w-4 h-4 ml-0.5" style={{ color: isDark ? 'rgb(200,220,255)' : 'rgb(var(--periwinkle-3))' }} />
                </span>
                <span className="text-sm font-medium">Watch Our Story</span>
              </button>
            </motion.div>

          
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" style={{ color: isDark ? 'rgb(200,220,255)' : 'rgb(var(--periwinkle-3))' }} />
                <span className="text-sm" style={{ color: textColor }}>Verified Therapists</span>
              </div>
            </motion.div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Card */}
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]"
              style={{
                background: cardBg,
                backdropFilter: 'blur(10px)',
                border: cardBorder,
              }}
            >
             
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-44 h-44 md:w-52 md:h-52 mb-8"
                >
                  <Image
                    src="/logo.png"
                    alt="LovedOne PsyCare Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>

                {/* Quote Container */}
                <div className="text-center max-w-sm">
                  <div className="flex justify-center mb-4">
                    <Quote className="w-10 h-10" style={{ color: isDark ? 'rgb(150,170,220)' : 'rgb(var(--baby-blue-ice))' }} />
                  </div>
                  
                  <h3 
                    className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-3"
                    style={{ 
                      color: quoteColor,
                      fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif'
                    }}
                  >
                    "You can't see people's mental health so be kind"
                  </h3>
                  
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Heart className="w-4 h-4 fill-current" style={{ color: isDark ? 'rgb(150,170,220)' : 'rgb(var(--baby-blue-ice))' }} />
                    <span className="text-xs" style={{ color: isDark ? 'rgba(226,232,240,0.6)' : 'rgba(60,70,120,0.6)' }}>Always remember</span>
                    <Heart className="w-4 h-4 fill-current" style={{ color: isDark ? 'rgb(150,170,220)' : 'rgb(var(--baby-blue-ice))' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 1 - Client Satisfaction */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -top-6 -left-6 rounded-2xl px-4 py-3 shadow-xl"
              style={{
                background: floatingBg,
                backdropFilter: 'blur(10px)',
                border: floatingBorder,
              }}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155))'
                      : 'linear-gradient(135deg, rgb(var(--periwinkle-3)), rgb(var(--baby-blue-ice)))',
                  }}
                >
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-semibold" style={{ color: isDark ? 'rgb(200,220,255)' : 'rgb(var(--periwinkle-3))' }}>Verified</p>
                  <p className="text-xs" style={{ color: isDark ? 'rgba(226,232,240,0.7)' : 'rgba(60,70,120,0.7)' }}>Therapists</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2 - 24/7 Support */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 rounded-2xl px-4 py-3 shadow-xl"
              style={{
                background: floatingBg,
                backdropFilter: 'blur(10px)',
                border: floatingBorder,
              }}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, rgb(120,137,179), rgb(100,115,155))'
                      : 'linear-gradient(135deg, rgb(var(--periwinkle-3)), rgb(var(--baby-blue-ice)))',
                  }}
                >
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: isDark ? 'rgb(200,220,255)' : 'rgb(var(--periwinkle-3))' }}>24/7</p>
                  <p className="text-xs" style={{ color: isDark ? 'rgba(226,232,240,0.7)' : 'rgba(60,70,120,0.7)' }}>AI Support Available</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full flex justify-center p-1"
          style={{
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(5px)',
            border: isDark ? '1px solid rgba(200,220,255,0.2)' : '1px solid rgba(171,196,255,0.3)',
          }}
        >
          <motion.div
            animate={{ height: [3, 10, 3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 rounded-full"
            style={{ backgroundColor: isDark ? 'rgb(150,170,220)' : 'rgb(var(--baby-blue-ice))' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};