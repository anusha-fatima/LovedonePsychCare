"use client";

import { motion } from "framer-motion";

const steps = [
  "Share how you feel",
  "Get matched",
  "Start healing",
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[var(--beige)]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6 px-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-xl font-semibold">{i + 1}</div>
            <p className="mt-2">{s}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}