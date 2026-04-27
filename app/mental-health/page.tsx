// app/mental-health/page.tsx
"use client";

import { motion } from "framer-motion";
import { Brain, Heart, Sparkles, Shield } from "lucide-react";

export default function MentalHealthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-white to-soft-sand pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-light text-muted-taupe mb-4">
            Mental Health & Well-being
          </h1>
          <p className="text-xl text-muted-taupe/70">
            Comprehensive mental health support for your emotional wellness journey
          </p>
        </motion.div>
      </div>
    </div>
  );
}