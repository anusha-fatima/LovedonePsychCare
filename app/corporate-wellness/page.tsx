// app/corporate-wellness/page.tsx
"use client";

import { motion } from "framer-motion";
import { Building2, Users, TrendingUp, Heart, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CorporateWellnessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-white to-soft-sand pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light text-muted-taupe mb-4">
            Corporate Wellness Program
          </h1>
          <p className="text-xl text-muted-taupe/70 max-w-3xl mx-auto">
            Invest in your employees' mental health and watch your organization thrive
          </p>
        </motion.div>

        {/* Content sections here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Users, title: "Employee Support", desc: "24/7 access to mental health professionals" },
            { icon: TrendingUp, title: "Productivity Boost", desc: "Reduce burnout and increase engagement" },
            { icon: Shield, title: "Confidential Care", desc: "Complete privacy for all employees" },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-warm-nude/20"
            >
              <item.icon className="w-12 h-12 text-accent-sage mb-4" />
              <h3 className="text-xl font-medium text-muted-taupe mb-2">{item.title}</h3>
              <p className="text-muted-taupe/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}