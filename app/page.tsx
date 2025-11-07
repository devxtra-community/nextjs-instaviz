"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, UserCircle, Plus } from "lucide-react";
import { Zap, BarChart3, ShieldCheck } from "lucide-react";
import { Star, Send } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
/**
 * Landing page inspired by DevXtra layout.
 * Colors strictly: #AD49E1 and #9929d5 (primary & primary-dark)
 */

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [testiIndex, setTestiIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [centerIndex, setCenterIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const PRIMARY = "#AD49E1";
  const PRIMARY_DARK = "#9929d5";

  const stats = [
    { label: "Active users", value: "10+" },
    { label: "AI models powered", value: "5+" },
    { label: "Visualizations created", value: "30+" },
  ];

  const testimonials = [
    {
      name: "Mel K",
      role: "Data Analyst",
      quote:
        "I love this platform! It’s fast, clean, and easy to use for visualizing data.",
    },
    {
      name: "Kasi",
      role: "Product Manager",
      quote:
        "The simplicity and speed are incredible — I can upload and see insights instantly.",
    },
    {
      name: "Zander",
      role: "Startup Founder",
      quote:
        "A must-have for any team that values quick, beautiful data visualization.",
    },
    {
      name: "Tara",
      role: "AI Researcher",
      quote:
        "Beautiful UI, powerful AI-driven insights. My go-to dashboard every day!",
    },
    {
      name: "Isha",
      role: "Engineer",
      quote:
        "Love how fast and elegant this tool feels. Visuals are absolutely stunning!",
    },
  ];

  const testiTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    testiTimer.current = setInterval(() => {
      setTestiIndex((i) => (i + 1) % testimonials.length);
    }, 4500);

    return () => {
      if (testiTimer.current) clearInterval(testiTimer.current);
    };
  }, []);



  const features = [
    {
      icon: <Zap className="w-6 h-6 text-[#AD49E1]" />,
      title: "Instant Data Uploads",
      desc: "Upload your datasets securely and visualize results instantly, powered by our optimized processing engine.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#AD49E1]" />,
      title: "Smart Visualizations",
      desc: "AI automatically suggests the best chart types and layouts for your data. Visual clarity, no setup required.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#AD49E1]" />,
      title: "Secure & Reliable",
      desc: "Your data is protected with enterprise-grade encryption and privacy-first architecture.",
    },
  ];

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


  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    afterChange: (current: number) => setCenterIndex(current),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerMode: false } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: false } },
    ],
  };


  return (
    <div className="min-h-screen text-slate-800 bg-gradient-to-b from-white to-[#fff7ff] font-sans">
      {/* Navbar */}
      <header className="sticky top-4 left-0 w-full flex justify-center z-50">
        <nav
          className="w-[90%] max-w-6xl flex items-center justify-between gap-4 px-8 py-3
          rounded-full border border-white/40 shadow-md
        bg-white/30 backdrop-blur-lg"
          role="navigation"
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.png" alt="logo" className="w-8 h-8" />
            <span className="font-semibold text-[#AD49E1] text-lg">InstaviZ</span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-10 font-medium text-[15px] text-gray-700">
            {[
              { label: "Home", href: "/home" },
              { label: "Pricing", href: "/ourplans" },
              { label: "Features", href: "#features" },
              { label: "FAQ", href: "#faq" },
            ].map((link) => (
              <li key={link.href} className="relative group cursor-pointer">
                <Link
                  href={link.href}
                  className="transition-colors duration-300 group-hover:text-[#AD49E1]"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#AD49E1] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Login link with same underline effect */}
            <div className="hidden md:block relative group">
              <Link
                href="/login"
                className="relative text-[15px] font-medium text-gray-800 hover:text-[#AD49E1] transition cursor-pointer"
              >
                Log in
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#AD49E1] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            {/* Signup button */}
            <Link href="/signup" className="hidden md:inline-block">
              <button
                className="text-white px-5 py-2 font-medium rounded-full shadow-sm hover:brightness-95 transition"
                style={{
                  background: "linear-gradient(90deg, #AD49E1, #9929d5)",
                }}
              >
                Sign up
              </button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="md:hidden p-2 rounded-md hover:bg-white/30 transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile dropdown */}
      {
        menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden w-full px-4 mt-3"
          >
            <div className="w-[94%] mx-auto bg-white/95 rounded-xl shadow-lg p-4 flex flex-col gap-3">
              <Link href="/home" className="py-2 px-3 rounded hover:bg-slate-50">Home</Link>
              <Link href="/ourplans" className="py-2 px-3 rounded hover:bg-slate-50">Pricing</Link>
              <Link href="#features" className="py-2 px-3 rounded hover:bg-slate-50">Features</Link>
              <Link href="#faq" className="py-2 px-3 rounded hover:bg-slate-50">FAQ</Link>
              <Link href="/signup" className="mt-2">
                <button style={{ background: PRIMARY }} className="w-full text-white py-2 rounded">Get Started</button>
              </Link>
            </div>
          </motion.div>
        )
      }

      {/* HERO */}
      <main className="mt-12">
        {/* Social proof section under navbar */}
        <div className="flex items-center justify-center my-6">
          <div
            className="flex items-center space-x-3 px-6 py-3"
          >
            {/* Avatar group (Lucide icons) */}
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
              50+ users visualize smarter with{" "}
              InstaviZ.
            </p>
          </div>
        </div>

        <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <motion.h1
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
            >
              Turn messy data into <span style={{ color: PRIMARY }}>actionable visuals</span> in seconds
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mt-4 text-slate-600 max-w-xl"
            >
              Upload CSV, get automatic charts, and ask questions in plain English. Built for speed, clarity, and real-world decisions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 flex flex-wrap gap-3"
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

            {/* small feature badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/80 border border-slate-100 rounded-full px-3 py-2 shadow-sm">
                
                <span className="text-xs text-slate-600">No-install, cloud-first</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-slate-100 rounded-full px-3 py-2 shadow-sm">
                
                <span className="text-xs text-slate-600">Enterprise-ready</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md"
            >
              <div className="relative">
                <div className="absolute -left-6 -top-6 bg-white rounded-2xl shadow-2xl p-6 transform -rotate-6">
                  <img src="/preview-1.png" alt="preview" className="w-56 rounded-lg" />
                </div>

                <div
                  className="bg-gradient-to-br from-white to-[#fff0fb] border border-white rounded-3xl p-6 shadow-xl"
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

                <div className="absolute -right-8 -bottom-6">
                  <div className="bg-white rounded-2xl shadow-lg p-3 text-xs font-medium">
                    <div className="text-sm font-semibold">Preview</div>
                    <div className="text-[11px] text-slate-500">Live, shareable link</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

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
                             text-[#AD49E1] hover:text-[#9929d5] transition-all duration-200"
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

        <section className="relative py-24 overflow-hidden ">
          {/* Decorative glow */}
          <div className="absolute inset-0  blur-3xl"></div>

          <div className="relative max-w-6xl mx-auto px-6 text-center flex flex-col gap-16">
            {/* --- Heading --- */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-3xl md:text-4xl font-semibold text-gray-900">
                Trusted by teams <span className="text-[#AD49E1]">worldwide</span>
              </h4>
              <p className="mt-3 text-gray-600 text-base max-w-2xl mx-auto">
                From startups to enterprises — delivering fast, secure, and reliable performance globally.
              </p>
            </motion.div>

            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16 justify-items-center">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  {/* Number with glow */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#AD49E1]/20 to-[#9929d5]/20 blur-xl"></div>
                    <div className="relative text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#AD49E1] to-[#9929d5]">

                      {stat.value}
                    </div>
                  </div>

                  {/* Label */}
                  <p className="text-sm md:text-base text-gray-600 font-medium tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 ">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-semibold text-gray-900 mb-12">
              What our <span className="text-[#AD49E1]">users</span> say
            </h3>

            <Slider {...settings}>
              {testimonials.map((t, idx) => {
                const isCenter = idx === centerIndex;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0.7, scale: 0.9 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.7,
                      scale: isCenter ? 1.05 : 0.9,
                    }}
                    transition={{ duration: 0.6 }}
                    className=""
                  >
                    <div
                      className={` bg-white px-10 py-10  transition-all duration-500 
                        }`}
                    >
                      {/* Stars */}
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className="text-[#AD49E1] fill-[#AD49E1]"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-gray-700 text-base leading-relaxed italic mb-6">
                        “{t.quote}”
                      </p>

                      {/* Name + Role */}
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900">{t.name}</h4>
                        <p className="text-sm text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </Slider>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 ">
          <div className="max-w-4xl mx-auto px-6">
            {/* Heading */}
            <div className="text-center mb-12">
              <h3 className="text-3xl font-semibold text-gray-900">
                Frequently <span className="text-[#AD49E1]">Asked</span> Questions
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
                          <X size={18} className="text-[#AD49E1]" />
                        ) : (
                          <Plus size={18} className="text-[#AD49E1]" />
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
      </main>

      <footer className="relative bg-gradient-to-br from-[#fad0ff] via-white to-[#e3cefa] border-t border-black/10 backdrop-blur-xl">
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
              Ready to get <span className="text-[#AD49E1]">clarity</span> from your data?
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
                    className="absolute left-4 top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[#AD49E1] bg-white/60 px-1"
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
                    className="absolute left-4 top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[#AD49E1] bg-white/60 px-1"
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
                    className="absolute  left-4 top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[#AD49E1] bg-white/60 px-1"
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
            © {new Date().getFullYear()} <span className="font-semibold text-[#AD49E1]">InstaviZ</span> — All rights reserved.
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="#" className="hover:text-[#AD49E1] transition">
              Terms
            </Link>
            <Link href="#" className="hover:text-[#AD49E1] transition">
              Privacy
            </Link>
            <Link href="#" className="hover:text-[#AD49E1] transition">
              Security
            </Link>
          </div>
        </div>

        {/* Gradient Accent Bottom Strip */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#AD49E1] via-[#9929d5] to-[#AD49E1] opacity-70"></div>
      </footer>
    </div >
  );
};

export default Home;
