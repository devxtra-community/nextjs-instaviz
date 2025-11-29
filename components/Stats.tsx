"use client";
import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { label: "Active users", value: "10+" },
    { label: "AI models powered", value: "5+" },
    { label: "Visualizations created", value: "30+" },
  ];

  return (
    <section className="relative py-20 overflow-hidden">

      {/* Soft background glow */}
      <div
        className="absolute inset-0 blur-[120px]"
        style={{
          background: `linear-gradient(
            135deg,
            var(--primary-color) 0%,
            var(--accent) 70%
          )`,
          opacity: 0.10,
        }}
      ></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center flex flex-col gap-16">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h4
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: "var(--text-dark)" }}
          >
            Trusted by teams{" "}
            <span style={{ color: "var(--primary-color)" }}>worldwide</span>
          </h4>

          <p
            className="mt-3 text-base max-w-2xl mx-auto"
            style={{ color: "var(--text-light)" }}
          >
            From startups to enterprises — delivering fast, secure, and reliable
            performance globally.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16 justify-items-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex flex-col items-center text-center space-y-3"
            >
              {/* LARGE NUMBER (VISIBLE ALWAYS) */}
              <div
                className="relative text-5xl font-extrabold"
                style={{ color: "var(--primary-color)" }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <p
                className="text-sm md:text-base font-medium tracking-wide"
                style={{ color: "var(--text-light)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
