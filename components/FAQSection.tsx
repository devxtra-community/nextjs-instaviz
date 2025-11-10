"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: "What is InstaviZ?",
            a: "InstaviZ is a next-gen AI-powered data visualization platform that transforms raw data into clear, interactive charts within seconds.",
        },
        {
            q: "Do I need to install anything?",
            a: "No installation required — InstaviZ is fully cloud-based. Just sign up, upload your data, and start exploring instantly.",
        },
        {
            q: "Is my data secure?",
            a: "Absolutely. Your data is encrypted both in transit and at rest. We follow enterprise-grade security standards to ensure complete data privacy.",
        },
        {
            q: "Can I get the data insights?",
            a: "Yes! InstaviZ automatically generates actionable insights from your uploaded data using AI — helping you discover trends, patterns, and performance metrics instantly.",
        },
        {
            q: "Is there an option for chat with AI?",
            a: "Yes — our integrated AI chat assistant lets you ask questions about your data in natural language. Simply type what you want to know, and it will explain or visualize results for you.",
        },
        {
            q: "Can I see charts?",
            a: "Of course! InstaviZ automatically creates dynamic, interactive charts from your data — including bar graphs, pie charts, line plots, and more, all customizable in real time.",
        },
    ];

    return (
        <section id="faq" className="py-20 ">
            <div className="max-w-4xl mx-auto px-6">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-semibold text-gray-900">
                        Frequently <span className="primary">Asked</span> Questions
                    </h3>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">
                        Everything you need to know about InstaviZ, all in one place.
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((f, idx) => {
                        const isOpen = openIndex === idx;

                        return (
                            <div
                                key={idx}
                                onClick={() => setOpenIndex(isOpen ? null : idx)}
                                className={`cursor-pointer p-5 border transition-all duration-300
    ${isOpen
                                        ? "border-[#AD49E1]/40 bg-white shadow-[0_8px_25px_rgba(173,73,225,0.1)] rounded-tl-[1.75rem] rounded-tr-[0.75rem] rounded-bl-[0.75rem] rounded-br-[1.75rem]"
                                        : "border-slate-200 hover:border-[#AD49E1]/30 bg-white/90 rounded-tl-[1.5rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[1.5rem]"
                                    }`}
                            >
                                {/* Question Row */}
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-gray-800 text-base md:text-lg">{f.q}</h4>

                                    {/* Animated icon rotation */}
                                    <motion.div
                                        animate={{ rotate: isOpen ? 90 : 0 }}
                                        transition={{ duration: 0.1 }}
                                        className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
                                    >
                                        {isOpen ? (
                                            <X size={18} className="primary" />
                                        ) : (
                                            <Plus size={18} className="primary" />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Answer */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            key="content"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.35, ease: "easeOut" }}
                                        >
                                            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                                                {f.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
