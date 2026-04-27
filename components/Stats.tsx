"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Patients Helped" },
  { value: "50+", label: "Verified Psychologists" },
  { value: "24/7", label: "AI Support" },
  { value: "100%", label: "Confidential" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-[var(--beige)]">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-xl shadow text-center"
          >
            <h2 className="text-2xl font-semibold">{s.value}</h2>
            <p className="text-sm opacity-70">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}