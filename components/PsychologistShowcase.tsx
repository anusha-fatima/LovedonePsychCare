'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Video,
  MessageCircle,
  Award,
  Sparkles,
  ShieldCheck,
  Globe2,
  Star,
  Heart,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Brain,
  Calendar,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';


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

  const gradientPrimary = 'linear-gradient(135deg, rgb(var(--periwinkle-3)), rgb(var(--periwinkle-2)), rgb(var(--baby-blue-ice)))';

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(237,242,251,0.95)] via-[rgba(226,234,252,0.9)] to-[rgba(215,227,252,0.95)]" />
      
      {/* Floating animated shapes */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(171,196,255,0.4) 0%, transparent 70%)' }}
      />
      
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(204,219,253,0.4) 0%, transparent 70%)' }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-6"
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6"
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(171,196,255,0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: 'rgb(var(--periwinkle-3))' }} />
            <span className="text-sm font-medium" style={{ color: 'rgb(var(--periwinkle-3))' }}>
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
            <span style={{ color: 'rgb(var(--periwinkle-3))' }}>
              Right Where You Are
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-lg"
            style={{ color: 'rgba(60,70,120,0.75)' }}
          >
            Connect with licensed psychologists who understand Pakistani culture.
            Evidence-based care, confidential, and accessible from anywhere.
          </motion.p>
        </div>

     

        {/* Expertise Areas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-semibold mb-3" style={{ color: 'rgb(var(--periwinkle-3))' }}>
              Areas of Expertise
            </h3>
            <p className="text-sm" style={{ color: 'rgba(60,70,120,0.7)' }}>
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
                  className="relative rounded-2xl p-6 text-center group cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(171,196,255,0.2)',
                  }}
                >
                  <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ background: gradientPrimary }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: 'rgb(var(--periwinkle-3))' }}>
                    {area.name}
                  </h4>
                  <p className="text-xs" style={{ color: 'rgba(60,70,120,0.7)' }}>
                    {area.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-16"
        >
          <div className="absolute inset-0" style={{ background: gradientPrimary, opacity: 0.9 }} />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          
          <div className="relative p-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white opacity-80" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find Your Perfect Match
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Answer a few questions and we'll match you with the psychologist best suited to your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/psychologists">
                <Button size="lg" className="  hover:bg-white/90 shadow-xl group" style={{ background: 'rgba(60,70,120,0.85)' }}>
                  Browse All Psychologists
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/booking">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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
            <ShieldCheck className="w-5 h-5" style={{ color: 'rgb(var(--baby-blue-ice))' }} />
            <span className="text-sm" style={{ color: 'rgba(60,70,120,0.7)' }}>100% Confidential</span>
          </div>
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5" style={{ color: 'rgb(var(--baby-blue-ice))' }} />
            <span className="text-sm" style={{ color: 'rgba(60,70,120,0.7)' }}>Secure Video Sessions</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" style={{ color: 'rgb(var(--baby-blue-ice))' }} />
            <span className="text-sm" style={{ color: 'rgba(60,70,120,0.7)' }}>24/7 AI Support</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" style={{ color: 'rgb(var(--baby-blue-ice))' }} />
            <span className="text-sm" style={{ color: 'rgba(60,70,120,0.7)' }}>Licensed Professionals</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};