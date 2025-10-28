"use client";

import { useState } from "react";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            console.log("Form submitted:", formData);
        }, 1500);
    };

    return (
        <div className="h-screen w-full flex overflow-hidden bg-white text-gray-900">
            {/* ---------- LEFT PANEL ---------- */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-[#AD49E1] via-purple-500 to-[#AD49E1] text-white">
                {/* Glow Blurs */}
                <div className="absolute top-16 left-24 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-start p-14">
                    <h1 className="text-5xl font-extrabold mb-3 tracking-tight drop-shadow-lg">InstaviZ</h1>
                    <h2 className="text-3xl font-semibold mb-4 leading-tight">
                        Transform Your Data Into Powerful Insights
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-md leading-relaxed">
                        Turn your raw data into beautiful visual stories powered by AI analytics.
                    </p>

                    {/* Glass Card */}
                    <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 w-[430px] shadow-lg hover:shadow-2xl transition">
                        <h3 className="font-semibold text-lg mb-1 text-white">Analytics Dashboard</h3>
                        <p className="text-sm text-white/60 mb-4">
                            Real-time insights powered by AI
                        </p>
                        <div className="h-32 bg-linear-to-r from-white/10 to-white/5 rounded-xl flex items-center justify-center">
                            <img
                                src="/robot-with-books.png"
                                alt="AI Data Visualization"
                                className="w-64 h-auto opacity-90"
                            />
                        </div>
                        <div className="flex justify-between mt-5 text-sm">
                            <div className="flex flex-col items-center">
                                <span className="text-white/70">Processed</span>
                                <span className="text-lg font-semibold">2.4M</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-white/70">Accuracy</span>
                                <span className="text-lg font-semibold">98.5%</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-white/70">Speed</span>
                                <span className="text-lg font-semibold">2.1s</span>
                            </div>
                        </div>
                    </div>

                    <p className="mt-10 text-white/70 text-sm">
                        Join <span className="text-white font-semibold">5,000+</span> teams turning data into insights 🚀
                    </p>
                </div>
            </div>

            {/* ---------- RIGHT PANEL ---------- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 py-8 bg-white relative">
                {/* Mobile Header (smaller + top fixed) */}
                {/* <div className="lg:hidden absolute top-33 left-1/2 -translate-x-1/2">
                    <h1 className="text-3xl font-bold text-[#AD49E1]">InstaviZ</h1>
                </div> */}

                <div className="max-w-md w-full mt-20 sm:mt-10">
                    {/* Header */}
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-3xl font-bold mb-2">Create your account</h2>
                        <p className="text-[#9B5DE0] text-base">
                            Let's get started with your 30-day free trial.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-semibold">
                                NAME
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full h-11 pl-10 border border-purple-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-semibold">
                                EMAIL
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full h-11 pl-10 border border-purple-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-semibold">
                                PASSWORD
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full h-11 pl-10 border border-purple-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2 pt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-0.5 w-4 h-4 rounded border-gray-300 cursor-pointer"
                                required
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                                I agree to the{" "}
                                <a href="#" className="text-[#AD49E1] hover:underline">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-[#AD49E1] hover:underline">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11 bg-[#AD49E1] text-white font-semibold rounded-md hover:bg-purple-600 transition transform duration-150 ease-in-out flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Get Started
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign In */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-indigo-600 hover:underline font-semibold">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-xs text-gray-400">OR</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Social Sign Up */}
                    <div className="w-full">
                        <button
                            type="button"
                            className="h-10 border border-gray-300 rounded-md w-full flex items-center justify-center gap-2 hover:bg-gray-100 transition"
                        >
                            <img src="./google.png" className="w-5 h-5 mr-1" alt="" />
                            Sign up with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
