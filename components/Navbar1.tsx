"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const PRIMARY = "#AD49E1";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-4 left-0 w-full flex justify-center z-50">
        <nav
          className="w-[90%] max-w-6xl flex items-center justify-between gap-4 px-8 py-3
          rounded-full border border-white/40 shadow-md
          bg-white/30 backdrop-blur-lg"
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
              { label: "Contact", href: "#contact" },
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
            <Link
              href="/login"
              className="hidden md:block text-[15px] font-medium text-gray-800 hover:text-[#AD49E1] transition"
            >
              Log in
            </Link>

            <Link href="/signup" className="hidden md:inline-block">
              <button
                style={{ background: "linear-gradient(90deg, #AD49E1, #9929d5)" }}
                className="text-white px-5 py-2 font-medium rounded-full shadow-sm hover:brightness-95 transition"
              >
                Sign up
              </button>
            </Link>

            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="md:hidden p-2 rounded-md hover:bg-white/30 transition"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-[70px] left-1/2 -translate-x-1/2 z-50 w-[90%] md:hidden"
        >
          <div className="bg-white rounded-2xl shadow-xl p-5 flex flex-col gap-3 border border-slate-100">
            {[
              { label: "Home", href: "/home" },
              { label: "Pricing", href: "/ourplans" },
              { label: "Features", href: "#features" },
              { label: "FAQ", href: "#faq" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-2 px-3 rounded hover:bg-slate-50 transition"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/signup" onClick={() => setMenuOpen(false)}>
              <button
                style={{ background: PRIMARY }}
                className="w-full text-white py-2 rounded-xl shadow-md hover:brightness-95 transition"
              >
                Get Started
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
