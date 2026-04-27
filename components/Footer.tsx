// components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Heart, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const navLinks = [
    { name: "For Patients", href: "/for-patients" },
    { name: "For Psychologists", href: "/for-psychologists" },
    { name: "AI Support", href: "/ai-chat" },
    { name: "Book Session", href: "/booking" },
    { name: "Psychologists", href: "/psychologists" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
  ];

  const socials = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const contactInfo = [
    { icon: Mail, text: "support@lovedonepsycare.com", href: "mailto:support@lovedonepsycare.com" },
    { icon: Phone, text: "+92 300 1234567", href: "tel:+923001234567" },
    { icon: MapPin, text: "Lahore, Pakistan", href: "#" },
  ];

  // Text color style
  const textColor = isDark ? 'rgba(230,235,255,0.85)' : 'rgba(60,70,120,0.85)';
  const lightTextColor = isDark ? 'rgba(230,235,255,0.65)' : 'rgba(60,70,120,0.65)';
  const lighterTextColor = isDark ? 'rgba(230,235,255,0.45)' : 'rgba(60,70,120,0.45)';

  return (
    <footer
      className="w-full mt-auto"
      style={{ background: 'rgb(182 204 254)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Centered Large Logo */}
          <div className="mb-12 flex flex-col items-center justify-center">
            <Link href="/" className="flex flex-col items-center space-y-4 group">
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
                className="relative w-48 h-48 md:w-56 md:h-56"
              >
                <Image
                  src="/logo.png"
                  alt="LovedOne PsyCare Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              
              <div className="text-center">
                <p 
                  className="text-sm md:text-base mt-2 tracking-wide"
                  style={{ color: 'rgba(60,70,120,0.85)' }}
                >
                  Mental Health & Wellness Platform
                </p>
              </div>
            </Link>

            <div className="mt-8 flex items-center justify-center space-x-3">
              <Heart 
                className="w-5 h-5 animate-pulse" 
                style={{ color: 'rgba(60,70,120,0.85)' }}
              />
              <p
                className="uppercase tracking-[0.3em] text-xs md:text-sm font-light"
               style={{ color: 'rgba(60,70,120,0.85)' }}
              >
                Healing • Guidance • Support
              </p>
              <Heart 
                className="w-5 h-5 animate-pulse" 
                style={{ color: 'rgba(60,70,120,0.85)' }} 
              />
            </div>
          </div>

          {/* Contact Info Row */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Link
                  key={index}
                  href={info.href}
                  className="flex items-center space-x-2 text-sm md:text-base transition-all duration-300 hover:opacity-70"
                 style={{ color: 'rgba(60,70,120,0.85)' }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{info.text}</span>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div
            className="w-full h-px my-8"
            style={{
              background: isDark 
                ? "linear-gradient(90deg, transparent, rgba(51, 65, 85, 0.8), transparent)"
                : "linear-gradient(90deg, transparent, rgba(60, 70, 120, 0.2), transparent)",
            }}
          />

          {/* Nav Links */}
          

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-5 mb-12">
            {socials.map((social, i) => {
              const Icon = social.icon;
              return (
                <Link
                  key={i}
                  href={social.href}
                  className="group relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    background: isDark 
                      ? "rgba(51, 65, 85, 0.5)"
                      : "rgba(60, 70, 120, 0.08)",
                    border: isDark 
                      ? "1px solid rgba(51, 65, 85, 0.5)"
                      : "1px solid rgba(60, 70, 120, 0.15)",
                  }}
                >
                  <Icon 
                    size={18} 
                    className="transition-all duration-300 group-hover:scale-110"
                    style={{ color: 'rgba(60,70,120,0.85)' }} 
                  />
                  <span 
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: 'rgba(60,70,120,0.85)' }}
                  >
                    {social.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs mb-6">
            <Link
              href="/terms"
              className="transition-all duration-300 hover:opacity-70"
              style={{ color: 'rgba(60,70,120,0.85)' }}
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="transition-all duration-300 hover:opacity-70"
              style={{ color: 'rgba(60,70,120,0.85)' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="transition-all duration-300 hover:opacity-70"
              style={{ color: 'rgba(60,70,120,0.85)' }}
            >
              Cookie Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="space-y-2">
            <p
              className="text-xs"
              style={{ color: 'rgba(60,70,120,0.85)' }}
            >
              © {new Date().getFullYear()} LovedOne PsyCare. All rights reserved.
            </p>
            <p
              className="text-[10px]"
              style={{ color: 'rgba(60,70,120,0.85)' }}
            >
              Making mental health accessible to everyone in Pakistan
            </p>
          </div>

          {/* Decorative Bottom Gradient */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: isDark 
                ? "linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, #06b6d4, transparent)"
                : "linear-gradient(90deg, transparent, rgb(var(--baby-blue-ice)), transparent)",
            }}
          />
        </motion.div>
      </div>
    </footer>
  );
}