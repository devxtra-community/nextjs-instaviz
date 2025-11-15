"use client";
import { motion } from "framer-motion";

export default function Stats() {
  const stats = [
    { label: "Active users", value: "10+" },
    { label: "AI models powered", value: "5+" },
    { label: "Visualizations created", value: "30+" },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 blur-3xl"></div>
      <div className="relative max-w-6xl mx-auto px-6 text-center flex flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Trusted by teams <span className="primary">worldwide</span>
          </h4>
          <p className="mt-3 text-gray-600 text-base max-w-2xl mx-auto">
            From startups to enterprises — delivering fast, secure, and reliable
            performance globally.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16 justify-items-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex flex-col items-center text-center space-y-2"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#AD49E1]/20 to-[#9929d5]/20 blur-xl"></div>
                <div className="relative text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AD49E1] to-[#9929d5]">
                  {stat.value}
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-600 font-medium tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
