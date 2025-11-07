"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Landing page inspired by DevXtra layout.
 * Colors strictly: #AD49E1 and #9929d5 (primary & primary-dark)
 */

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [testiIndex, setTestiIndex] = useState(0);

  const PRIMARY = "#AD49E1";
  const PRIMARY_DARK = "#9929d5";

  const testimonials = [
    {
      name: "Priya R.",
      role: "Product Manager",
      quote:
        "This platform turned raw CSVs into presentation-ready charts in minutes. Incredible UX and speed.",
    },
    {
      name: "Amit K.",
      role: "Data Analyst",
      quote:
        "The insights engine is legit — saved me hours in prep for stakeholder reports.",
    },
    {
      name: "Sana M.",
      role: "Researcher",
      quote:
        "Beautiful UI and very intuitive. I recommend it to every teammate.",
    },
  ];
  // ✅ correct placement
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
      title: "Instant Uploads",
      desc: "Drag & drop CSV, Excel or JSON — we parse it instantly and suggest visualizations.",
      icon: "📤",
    },
    {
      title: "AI Insights",
      desc: "Automated summaries, anomaly detection and natural-language Q&A on your data.",
      icon: "🤖",
    },
    {
      title: "Publish & Share",
      desc: "Export charts, share links or embed interactive visuals in reports.",
      icon: "🔗",
    },
  ];

  const faqs = [
    {
      q: "How secure is my data?",
      a: "We use industry-standard encryption in transit and at rest. You control who can access your links and exports.",
    },
    {
      q: "What file types are supported?",
      a: "CSV, TSV, XLSX, JSON and Google Sheets (via import).",
    },
    {
      q: "Can I export visuals?",
      a: "Yes — PNG, SVG and embeddable iframe exports are supported.",
    },
  ];

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
          <div className="flex items-center gap-2">
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
                <span className="text-xs font-semibold text-slate-700">🚀</span>
                <span className="text-xs text-slate-600">No-install, cloud-first</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-slate-100 rounded-full px-3 py-2 shadow-sm">
                <span className="text-xs font-semibold text-slate-700">🔒</span>
                <span className="text-xs text-slate-600">Enterprise-ready</span>
              </div>
            </div>
          </div>

          {/* Right visual: stacked cards like DevXtra */}
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
                    <div className="bg-white rounded-lg p-3 shadow-sm text-xs">Line Chart</div>
                    <div className="bg-white rounded-lg p-3 shadow-sm text-xs">Pie Chart</div>
                    <div className="bg-white rounded-lg p-3 shadow-sm text-xs">Bar Chart</div>
                    <div className="bg-white rounded-lg p-3 shadow-sm text-xs">Map</div>
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

        {/* Features */}
        <section id="features" className="mt-20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h3 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-2xl font-bold">
              Powerful features, built for speed
            </motion.h3>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((f, idx) => (
                <motion.div key={idx} whileHover={{ translateY: -6 }} className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="text-3xl">{f.icon}</div>
                  <h4 className="mt-3 font-semibold">{f.title}</h4>
                  <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
                  <div className="mt-4">
                    <a className="text-sm inline-flex items-center gap-2 font-medium" href="#">
                      Learn more <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats / Impact */}
        <section className="mt-16 bg-gradient-to-b from-[#fff7ff] to-white py-14">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h4 className="text-xl font-semibold">Trusted by teams worldwide</h4>
              <p className="mt-2 text-slate-600">From startups to enterprises — fast, secure, and reliable.</p>
            </div>

            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-extrabold" style={{ color: PRIMARY }}>10K+</div>
                <div className="text-sm text-slate-600">Active users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-extrabold" style={{ color: PRIMARY }}>50+</div>
                <div className="text-sm text-slate-600">Data types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-extrabold" style={{ color: PRIMARY }}>1M+</div>
                <div className="text-sm text-slate-600">Visualizations</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-14">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-semibold">What our users say</h3>

            <div className="mt-6 relative">
              <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-md">
                <motion.blockquote
                  key={testiIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-slate-700"
                >
                  <p className="text-lg">“{testimonials[testiIndex].quote}”</p>
                  <footer className="mt-4 text-sm text-slate-500">
                    — {testimonials[testiIndex].name}, {testimonials[testiIndex].role}
                  </footer>
                </motion.blockquote>
              </div>

              <div className="mt-4 flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestiIndex(i)}
                    className={`w-2 h-2 rounded-full ${i === testiIndex ? "bg-[#AD49E1]" : "bg-slate-300"} transition`}
                    aria-label={`Show testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-12 mb-20">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-2xl font-semibold">Frequently asked questions</h3>
            <div className="mt-6 space-y-4">
              {faqs.map((f, idx) => (
                <details key={idx} className="bg-white p-4 rounded-xl shadow-sm">
                  <summary className="font-medium cursor-pointer list-none">{f.q}</summary>
                  <p className="mt-3 text-slate-600 text-sm">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* CTA Footer */}
      <footer className="bg-gradient-to-r from-[#fff0fb] to-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-lg font-bold">Ready to get clarity from your data?</div>
            <div className="text-sm text-slate-600 mt-1">Start a free trial — no credit card required.</div>
          </div>

          <div className="flex gap-3">
            <Link href="/ourplans">
              <button style={{ background: PRIMARY }} className="text-white px-4 py-3 rounded-md">Start Free</button>
            </Link>
            <Link href="/contact">
              <button className="px-4 py-3 rounded-md border border-slate-200">Contact Sales</button>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <div>© {new Date().getFullYear()} YourBrand — All rights reserved</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#AD49E1]">Terms</a>
            <a href="#" className="hover:text-[#AD49E1]">Privacy</a>
          </div>
        </div>
      </footer>
    </div >
  );
};

