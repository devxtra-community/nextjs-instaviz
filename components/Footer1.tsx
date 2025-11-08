"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Send } from "lucide-react";

export default function Footer() {
    return (
        <footer id="contact" className="relative bg-gradient-to-br from-[#fad0ff] via-white to-[#e3cefa] border-t border-black/10 backdrop-blur-xl">
            {/* Call to Action Section */}
            <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                {/* CTA Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center md:text-left flex-1 space-y-5"
                >
                    {/* Main Heading */}
                    <h4 className="text-3xl font-bold text-gray-900 leading-snug">
                        Ready to get <span className="primary">clarity</span> from your data?
                    </h4>

                    {/* Subheading */}
                    <p className="text-gray-600 text-base leading-relaxed max-w-md mx-auto md:mx-0">
                        Upload your files, visualize trends instantly, and get AI-powered insights
                        — all in one unified dashboard. No setup. No code. Just results.
                    </p>



                    {/* CTA Button */}
                    <div className="flex justify-center md:justify-start mt-6">
                        <Link href="/home">
                            <button className="relative overflow-hidden text-white font-medium px-8 py-3 rounded-xl shadow-md transition-all duration-300  hover:brightness-110 bg-gradient-to-r from-[#AD49E1] to-[#9929d5]">
                                Start Free
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                            </button>
                        </Link>
                    </div>
                </motion.div>


                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full md:w-[50%] rounded-[28px] "
                >
                    {/* Inner glass card */}
                    <div className="bg-white/70 backdrop-blur-2xl rounded-[26px] p-8 md:p-10 border border-white/40 ">
                        <h5 className="text-2xl font-semibold text-gray-900 mb-8 text-center md:text-left">
                            Let’s Connect
                        </h5>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Message sent successfully!");
                            }}
                            className="flex flex-col gap-5"
                        >
                            {/* Name Field */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    required
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/60 border border-slate-200 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#AD49E1]/50 peer"
                                />
                                <label
                                    className="absolute left-4 top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-[-10px] peer-focus:text-xs peer-focus:primary bg-white/60 px-1"
                                >
                                    Your Name
                                </label>
                            </motion.div>

                            {/* Email Field */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.15 }}
                                className="relative"
                            >
                                <input
                                    type="email"
                                    required
                                    placeholder="Your Email"
                                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/60 border border-slate-200 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#AD49E1]/50 peer"
                                />
                                <label
                                    className="absolute left-4 top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-[-10px] peer-focus:text-xs peer-focus:primary bg-white/60 px-1"
                                >
                                    Your Email
                                </label>
                            </motion.div>

                            {/* Message Field */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="relative"
                            >
                                <textarea
                                    rows={4}
                                    required
                                    placeholder="Your Message"
                                    className="w-full px-4 py-3 rounded-xl text-sm bg-white/60 border border-slate-200 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#AD49E1]/50 peer resize-none"
                                />
                                <label
                                    className="absolute  left-4 top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-[-10px] peer-focus:text-xs peer-focus:primary bg-white/60 px-1"
                                >
                                    Your Message
                                </label>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                className="flex items-center hover:brightness-110  justify-center gap-2 text-white font-medium mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#AD49E1] to-[#9929d5] shadow-[0_6px_25px_rgba(173,73,225,0.25)] transition-all duration-300 hover:cursor-pointer"
                            >
                                Send Message
                                <Send size={18} />
                            </motion.button>
                        </form>
                    </div>

                </motion.div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#AD49E1]/20 to-transparent"></div>

            {/* Bottom Bar */}
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                <p className="text-center md:text-left">
                    © {new Date().getFullYear()} <span className="font-semibold primary">InstaviZ</span> — All rights reserved.
                </p>

                <div className="flex gap-6 mt-3 md:mt-0">
                    <Link href="#" className="hover:primary transition">
                        Terms
                    </Link>
                    <Link href="#" className="hover:primary transition">
                        Privacy
                    </Link>
                    <Link href="#" className="hover:primary transition">
                        Security
                    </Link>
                </div>
            </div>

        </footer>
    );
}
