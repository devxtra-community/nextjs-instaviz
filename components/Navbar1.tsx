"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "/home" },
    { label: "Pricing", href: "/ourplans" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="sticky top-4 left-0 w-full flex justify-center z-50 px-4">
        <nav
          className="w-full max-w-6xl flex items-center justify-between px-5 py-3
          rounded-full border border-white/40 shadow-md  
          bg-white/30 backdrop-blur-lg"
        >
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-8 h-8" />
            <span className="font-semibold primary text-lg">InstaviZ</span>
          </div>

          <ul className="hidden md:flex items-center gap-7 font-medium text-[15px] text-gray-700">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative group transition-colors duration-300 hover:text-[#AD49E1]"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 primarybg transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:block text-[15px] font-medium text-gray-800 hover:primary transition"
            >
              Log in
            </Link>

            <Link href="/signup" className="hidden md:block">
              <button
                className="text-white px-5 py-2 font-medium rounded-full shadow-sm hover:brightness-95 transition cursor-pointer"
                style={{
                  background: "linear-gradient(90deg, #AD49E1, #9929d5)",
                }}
              >
                Sign up
              </button>
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-white/40 transition"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 w-[92%] md:hidden z-50"
        >
          <div className="bg-white rounded-2xl shadow-xl p-5 flex flex-col gap-3 border border-slate-200">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 px-4 rounded-lg hover:bg-slate-100 text-gray-700 text-[16px] font-medium transition"
              >
                {link.label}
              </Link>
            ))}

            <Link href="/signup" onClick={() => setMenuOpen(false)}>
              <button className="w-full py-3 rounded-xl primarybg text-white font-medium shadow-sm">
                Get Started
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
