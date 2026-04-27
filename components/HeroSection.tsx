// components/sections/HeroSection.tsx
'use client';

import { useRef } from 'react';
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-visible pt-40 md:pt-48 pb-24 md:pb-28"
      style={{ background: 'linear-gradient(135deg, rgb(var(--alice-blue)) 0%, rgb(var(--lavender)) 50%, rgb(var(--periwinkle)) 100%)' }}
    >
      {/* Fixed Background Elements - No movement */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 premium-gradient opacity-5" />
        
        {/* Static Blobs - No animation */}
        <div
          className="absolute top-20 right-10 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(171,196,255,0.2) 0%, rgba(204,219,253,0.05) 100%)' }}
        />
        
        <div
          className="absolute bottom-20 left-10 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(193,211,254,0.2) 0%, rgba(215,227,252,0.05) 100%)' }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(226,234,252,0.15) 0%, transparent 70%)' }}
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
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6"
            >
              <span className="text-gradient">Mental Health Care,</span>
              <br />
              <span style={{ color: 'rgba(60,70,120,0.85)' }}>Rooted in Pakistan</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl mb-10 leading-relaxed"
              style={{ color: 'rgba(60,70,120,0.75)' }}
            >
              Your mind matters. We are here to help with culturally-aware,
              confidential support, wherever you are in Pakistan.
            </motion.p>

            {/* CTA Buttons */}
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
                  style={{ background: 'linear-gradient(135deg, rgb(var(--periwinkle-3)), rgb(var(--periwinkle-2)), rgb(var(--baby-blue-ice)))' }}
                >
                  Start Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <button className="flex items-center space-x-3 transition-all duration-300 group">
                <span 
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(171,196,255,0.3)'
                  }}
                >
                  <Play className="w-4 h-4 ml-0.5" style={{ color: 'rgb(var(--periwinkle-3))' }} />
                </span>
                <span className="text-sm font-medium" style={{ color: 'rgb(var(--periwinkle-3))' }}>Watch Our Story</span>
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" style={{ color: 'rgb(var(--periwinkle-3))' }} />
                <span className="text-sm" style={{ color: 'rgba(60,70,120,0.75)' }}>Verified Therapists</span>
              </div>
              <div className="w-px h-6" style={{ backgroundColor: 'rgba(60,70,120,0.2)' }} />
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" style={{ color: 'rgb(var(--periwinkle-3))' }} />
                <span className="text-sm" style={{ color: 'rgba(60,70,120,0.75)' }}>10,000+ Clients Helped</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT - Modern Card Design with Logo and Quote */}
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
                background: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
            >
              {/* Logo prominently displayed */}
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
                    <Quote className="w-10 h-10" style={{ color: 'rgb(var(--periwinkle-3))' }} />
                  </div>
                  
                  <h3 
                    className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-3"
                    style={{ 
                      color: 'rgb(var(--periwinkle-3))',
                      fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif'
                    }}
                  >
                    "You can't see people's mental health so be kind"
                  </h3>
                  
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Heart className="w-4 h-4 fill-current" style={{ color: 'rgb(var(--baby-blue-ice))' }} />
                    <span className="text-xs" style={{ color: 'rgba(60,70,120,0.6)' }}>Always remember</span>
                    <Heart className="w-4 h-4 fill-current" style={{ color: 'rgb(var(--baby-blue-ice))' }} />
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
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(171,196,255,0.3)'
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgb(var(--periwinkle-3)), rgb(var(--baby-blue-ice)))' }}>
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'rgb(var(--periwinkle-3))' }}>98%</p>
                  <p className="text-xs" style={{ color: 'rgba(60,70,120,0.7)' }}>Client Satisfaction</p>
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
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(171,196,255,0.3)'
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgb(var(--periwinkle-3)), rgb(var(--baby-blue-ice)))' }}>
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: 'rgb(var(--periwinkle-3))' }}>24/7</p>
                  <p className="text-xs" style={{ color: 'rgba(60,70,120,0.7)' }}>AI Support Available</p>
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
            background: 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(171,196,255,0.3)'
          }}
        >
          <motion.div
            animate={{ height: [3, 10, 3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 rounded-full"
            style={{ backgroundColor: 'rgb(var(--baby-blue-ice))' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};