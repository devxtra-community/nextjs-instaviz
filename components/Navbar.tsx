"use client";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/10">
      <div className="flex items-center justify-between px-6 py-3  mx-auto">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-violet-700 tracking-tight">
          InstaviZ
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/home" className="relative text-base font-medium text-gray-700 hover:text-violet-700 transition duration-200 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-violet-700 before:transition-all before:duration-300 hover:before:w-full">
            Dashboard
          </Link>
          <Link href="/ourplans" className="relative text-base font-medium text-gray-700 hover:text-violet-700 transition duration-200 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-violet-700 before:transition-all before:duration-300 hover:before:w-full">
            Pricing
          </Link>
          <Link href="/login" className="relative text-base font-medium text-gray-700 hover:text-violet-700 transition duration-200 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-violet-700 before:transition-all before:duration-300 hover:before:w-full">
            Login
          </Link>
          <Link href="/signup" className="text-base font-medium text-white bg-violet-700 hover:bg-violet-800 rounded px-3 py-1.5 transition duration-200">
            Signup
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="md:hidden text-violet-700 hover:text-violet-800 focus:outline-none"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-sm overflow-hidden w-full"
          >
            <div className="flex flex-col space-y-3 py-4 px-6 text-gray-700">
              <Link href="/home" onClick={() => setMenuOpen(false)} className="text-base font-medium hover:text-violet-700 transition">
                Dashboard
              </Link>
              <Link href="/ourplans" onClick={() => setMenuOpen(false)} className="text-base font-medium hover:text-violet-700 transition">
                Pricing
              </Link>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-base font-medium hover:text-violet-700 transition">
                Login
              </Link>
              <Link href="/signup" onClick={() => setMenuOpen(false)} className="text-base font-medium text-white bg-violet-700 hover:bg-violet-800 rounded px-3 py-1.5 transition">
                Signup
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
