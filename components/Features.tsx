"use client";
import { motion } from "framer-motion";
import { Zap, BarChart3, ShieldCheck, ArrowRight } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 primary" />,
      title: "Instant Data Uploads",
      desc: "Upload datasets securely and visualize results instantly, powered by our optimized AI engine.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 primary" />,
      title: "Smart Visualizations",
      desc: "AI automatically suggests charts for your data. Visual clarity, zero setup.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 primary" />,
      title: "Secure & Reliable",
      desc: "Your data is protected with enterprise-grade encryption and privacy-first design.",
    },
  ];

  return (
    <section id="features" className="relative py-24  overflow-hidden">
          {/* Subtle gradient background glow */}
          <div className="absolute inset-0 blur-3xl"></div>

          <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
            {/* Heading */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight"
            >
              Powerful features, built for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AD49E1] to-[#9929d5]">
                speed
              </span>
            </motion.h3>

            <p className="max-w-2xl mx-auto mt-3 text-gray-600 text-sm md:text-base leading-relaxed">
              Everything you need to transform data into insight — engineered for speed, accuracy, and simplicity.
            </p>

            {/* Features grid */}
            <div className="mt-16  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="group relative rounded-2xl p-8 bg-white/70 border border-slate-200/70 
                         backdrop-blur-md transition-all duration-300 hover:bg-white"
                >
                  {/* Icon container */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl 
                              bg-gradient-to-tr from-[#AD49E1]/10 to-[#9929d5]/10 
                              group-hover:from-[#AD49E1]/20 group-hover:to-[#9929d5]/20 
                              transition-all duration-300">
                    {f.icon}
                  </div>

                  {/* Text */}
                  <h4 className="mt-5 text-lg font-semibold text-gray-900">{f.title}</h4>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.desc}</p>

                  {/* Learn more link */}
                  <div className="mt-5">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-medium 
                             primary hover:text-[#9929d5] transition-all duration-200"
                    >
                      Learn more <ArrowRight size={14} />
                    </a>
                  </div>

                  {/* Subtle gradient hover border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                              group-hover:border-[#AD49E1]/40 transition-all duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  );
}
