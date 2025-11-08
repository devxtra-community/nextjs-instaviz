"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, User, Users, UserCircle } from "lucide-react";

export default function HeroSection() {
    const PRIMARY = "#AD49E1";

    return (
        <main className="mt-7 overflow-hidden flex flex-col items-center justify-center text-center md:text-left">
            <div className="flex items-center justify-center my-6">
                <div className="flex items-center space-x-2 py-3">
                    {/* Avatar group */}
                    <div className="flex -space-x-3">
                        <div className="w-8 h-8 rounded-full border-2 border-white shadow-md bg-[#AD49E1] flex items-center justify-center text-white">
                            <User size={16} />
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-white shadow-md bg-[#9929d5] flex items-center justify-center text-white">
                            <Users size={16} />
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-white shadow-md bg-[#AD49E1] flex items-center justify-center text-white">
                            <UserCircle size={16} />
                        </div>
                    </div>

                    {/* Text beside icons */}
                    <p className="text-sm text-black/50 font-medium tracking-wide">
                        50+ users visualize smarter with InstaviZ.
                    </p>
                </div>
            </div>

            <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-center">
                {/* Left text content */}
                <div className="md:col-span-7 flex flex-col items-center md:items-start justify-center">
                    <motion.h1
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-center md:text-left"
                    >
                        Turn messy data into{" "}
                        <span style={{ color: PRIMARY }}>actionable visuals</span> in seconds
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="mt-4 text-slate-600 max-w-xl text-center md:text-left"
                    >
                        Upload CSV, get automatic charts, and ask questions in plain English. Built for speed, clarity, and real-world decisions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start"
                    >
                        <Link href="/home">
                            <button
                                style={{ background: PRIMARY }}
                                className="px-5 py-3 rounded-md text-white font-medium shadow-md hover:brightness-95 transition flex items-center gap-2"
                            >
                                Try It Free
                                <ArrowRight size={16} />
                            </button>
                        </Link>

                        <a
                            href="#features"
                            className="px-4 py-3 rounded-md border border-slate-200 text-sm font-medium hover:bg-slate-50 transition"
                        >
                            See Features
                        </a>
                    </motion.div>

                    {/* Capsule badges - hidden on mobile */}
                    <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start hidden sm:flex">
                        <div className="flex items-center gap-2 bg-white/80 border border-slate-100 rounded-full px-3 py-2 shadow-sm">
                            <span className="text-xs text-slate-600">No-install, cloud-first</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/80 border border-slate-100 rounded-full px-3 py-2 shadow-sm">
                            <span className="text-xs text-slate-600">Enterprise-ready</span>
                        </div>
                    </div>
                </div>

                {/* Right visual preview section */}
                <div className="md:col-span-5 relative flex justify-center mt-10 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-[90%] sm:w-[85%] md:w-full max-w-md"
                    >
                        <div className="relative">
                            <div className="absolute -left-4 sm:-left-6 -top-4 sm:-top-6 bg-white rounded-2xl shadow-2xl p-5 sm:p-6 transform -rotate-6">
                                <img src="/preview-1.png" alt="preview" className="w-48 sm:w-56 rounded-lg" />
                            </div>

                            <div
                                className="bg-gradient-to-br from-white to-[#fff0fb] border border-white rounded-3xl p-5 sm:p-6 shadow-xl"
                                style={{ transform: "rotate(2deg)" }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-lg bg-[#F9F5FF] flex items-center justify-center text-xl">📊</div>
                                    <div>
                                        <h4 className="font-semibold">Smart charts</h4>
                                        <p className="text-sm text-slate-600">Auto-suggested visuals & quick edits.</p>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <div className="bg-white rounded-lg p-3 shadow-sm text-xs">Bar Chart</div>
                                    <div className="bg-white rounded-lg p-3 shadow-sm text-xs">Insights</div>
                                    <div className="bg-white rounded-lg p-3 shadow-sm text-xs">AI Suggestions</div>
                                    <div className="bg-white rounded-lg p-3 shadow-sm text-xs">Chat Assistance</div>
                                </div>
                            </div>

                            <div className="absolute -right-6 sm:-right-8 -bottom-6">
                                <div className="bg-white rounded-2xl shadow-lg p-3 text-xs font-medium">
                                    <div className="text-sm font-semibold">Preview</div>
                                    <div className="text-[11px] text-slate-500">Live, shareable link</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
