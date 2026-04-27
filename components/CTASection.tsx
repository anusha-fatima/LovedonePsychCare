// components/sections/CTASection.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles, ArrowRight, Shield, Brain } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const quotes = [
  {
    text: "Your mental health isn't a destination, it's a journey of self-discovery and growth.",
    author: "LovedOne PsyCare",
    icon: Heart
  },
  {
    text: "Healing doesn't mean the damage never existed. It means the damage no longer controls your life.",
    author: "Unknown",
    icon: Brain
  },
  {
    text: "The bravest thing you can do is ask for help when you need it the most.",
    author: "LovedOne PsyCare",
    icon: Sparkles
  },
  {
    text: "You are not your thoughts. You are the observer of your thoughts, and you have the power to choose which ones to believe.",
    author: "Anonymous",
    icon: Shield
  }
];

export default function CTASection() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const QuoteIcon = quotes[currentQuote].icon;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 overflow-hidden"
    >
      {/* Gradient Background with Periwinkle Colors */}
      <div 
        className="absolute inset-0 premium-gradient opacity-90"
        style={{
          background: "linear-gradient(135deg, rgba(204,219,253,0.95) 0%, rgba(193,211,254,0.95) 50%, rgba(171,196,255,0.95) 100%)"
        }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/20 blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white/20 blur-3xl animate-pulse"
          style={{ animationDuration: '10s', animationDelay: '2s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      <motion.div 
        className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 text-center"
        style={{ opacity, scale }}
      >
        {/* Animated Quote Badge */}
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <QuoteIcon className="w-5 h-5 text-white" />
            <span className="text-sm font-medium text-white tracking-wide">
              Mental Health Wisdom
            </span>
          </div>
        </motion.div>

        {/* Main Quote */}
        <motion.div
          key={currentQuote + "-text"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h2
            className="font-light leading-tight text-white"
            style={{
              fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
              fontSize: "clamp(2rem, 6vw, 4rem)",
              textShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
          >
            “{quotes[currentQuote].text}”
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-white/80 font-light tracking-wide"
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)"
            }}
          >
            — {quotes[currentQuote].author}
          </motion.p>
        </motion.div>

        {/* Quote Navigation Dots */}
        <div className="flex justify-center gap-2 mb-12">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`transition-all duration-300 rounded-full ${
                currentQuote === index
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          
          
          <Link href="/psychologists">
            <Button 
              size="lg" 
              variant="outline"
              className="border-white  hover:bg-white/10 transition-all duration-300" style={{ color: 'rgba(60,70,120,0.85)' }} 
            >
              Talk to a Professional
              <Heart className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          <div className="flex items-center space-x-2 text-white/80">
            <Shield className="w-4 h-4" />
            <span className="text-sm">100% Confidential</span>
          </div>
          <div className="flex items-center space-x-2 text-white/80">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Licensed Therapists</span>
          </div>
          <div className="flex items-center space-x-2 text-white/80">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Free AI Support 24/7</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}