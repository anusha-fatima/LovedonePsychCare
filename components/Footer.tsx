// components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Heart, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Footer() {
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

  // ✅ LIGHT THEME
  const lightColors = {
    bgColor: "rgb(237, 242, 251)",
    textPrimary: "#0f172a",
    textSecondary: "#334155",
    textTertiary: "#475569",
    iconBg: "rgba(15, 23, 42, 0.08)",
    iconBorder: "1px solid rgba(15, 23, 42, 0.1)",
    heartColor: "rgb(120, 137, 179)",
    dividerGradient: "linear-gradient(90deg, transparent, rgba(15, 23, 42, 0.15), transparent)",
    bottomGradient: "linear-gradient(90deg, transparent, rgb(120,137,179), rgb(85,98,127), transparent)",
  };

  // ✅ DARK THEME
  const darkColors = {
    bgColor: "rgb(15, 23, 42)",
    textPrimary: "#f1f5f9",
    textSecondary: "#cbd5e1",
    textTertiary: "#94a3b8",
    iconBg: "rgba(241, 245, 249, 0.1)",
    iconBorder: "1px solid rgba(241, 245, 249, 0.15)",
    heartColor: "rgb(171, 196, 255)",
    dividerGradient: "linear-gradient(90deg, transparent, rgba(241, 245, 249, 0.2), transparent)",
    bottomGradient: "linear-gradient(90deg, transparent, rgb(171,196,255), rgb(204,219,253), transparent)",
  };

  const colors = isDark ? darkColors : lightColors;

  const socials = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const contactInfo = [
    { icon: Mail, text: "support@lovedonepsycare.com", href: "mailto:support@lovedonepsycare.com" },
    { icon: Phone, text: "phone no", href: "phone no" },
    { icon: MapPin, text: "Karachi, Pakistan", href: "#" },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Psychologists", href: "/psychologists" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer
      className="w-full mt-auto relative overflow-hidden transition-colors duration-300"
      style={{ background: colors.bgColor }}
    >
      {/* Decorative top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: colors.bottomGradient }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Centered Large Logo */}
          <div className="mb-8 flex flex-col items-center justify-center">
            <Link href="/" className="flex flex-col items-center group">
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
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
              
              <div className="text-center mt-3">
                <p 
                  className="text-sm md:text-base tracking-wide font-medium transition-colors duration-300"
                  style={{ color: colors.textSecondary }}
                >
                  Mental Health & Wellness Platform
                </p>
              </div>
            </Link>

            <div className="mt-6 flex items-center justify-center space-x-3">
              <Heart 
                className="w-5 h-5 animate-pulse transition-colors duration-300" 
                style={{ color: colors.heartColor }}
              />
              <p
                className="uppercase tracking-[0.3em] text-xs md:text-sm font-light transition-colors duration-300"
                style={{ color: colors.textTertiary }}
              >
                Healing • Guidance • Support
              </p>
              <Heart 
                className="w-5 h-5 animate-pulse transition-colors duration-300" 
                style={{ color: colors.heartColor }}
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
                  className="flex items-center space-x-2 text-sm md:text-base transition-all duration-300 hover:opacity-70 group"
                  style={{ color: colors.textSecondary }}
                >
                  <Icon 
                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" 
                    style={{ color: colors.heartColor }} 
                  />
                  <span>{info.text}</span>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div
            className="w-full h-px my-8 transition-all duration-300"
            style={{ background: colors.dividerGradient }}
          />

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm md:text-base transition-all duration-300 hover:opacity-70 hover:translate-y-[-2px]"
                style={{ color: colors.textSecondary }}
              >
                {link.name}
              </Link>
            ))}
          </div>

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
                    background: colors.iconBg,
                    border: colors.iconBorder,
                  }}
                >
                  <Icon 
                    size={18} 
                    className="transition-all duration-300 group-hover:scale-110"
                    style={{ color: colors.textSecondary }} 
                  />
                  <span 
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 rounded-full"
                    style={{ 
                      color: colors.textTertiary,
                      background: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(237, 242, 251, 0.9)',
                      backdropFilter: 'blur(4px)',
                    }}
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
              className="transition-all duration-300 hover:opacity-70 hover:translate-y-[-1px]"
              style={{ color: colors.textTertiary }}
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy"
              className="transition-all duration-300 hover:opacity-70 hover:translate-y-[-1px]"
              style={{ color: colors.textTertiary }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="transition-all duration-300 hover:opacity-70 hover:translate-y-[-1px]"
              style={{ color: colors.textTertiary }}
            >
              Cookie Policy
            </Link>
            <Link
              href="/sitemap"
              className="transition-all duration-300 hover:opacity-70 hover:translate-y-[-1px]"
              style={{ color: colors.textTertiary }}
            >
              Sitemap
            </Link>
          </div>

          {/* Copyright */}
          <div className="space-y-2">
            <p
              className="text-xs transition-colors duration-300"
              style={{ color: colors.textTertiary }}
            >
              © {new Date().getFullYear()} LovedOne PsyCare. All rights reserved.
            </p>
            <p
              className="text-[10px] transition-colors duration-300"
              style={{ color: colors.textTertiary }}
            >
              Making mental health accessible to everyone in Pakistan
            </p>
          </div>

          {/* Decorative Bottom Gradient */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: colors.bottomGradient }}
          />
        </motion.div>
      </div>
    </footer>
  );
}