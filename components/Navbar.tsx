"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  // Function to highlight active link
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/10">
      <div className="flex items-center justify-between px-6 py-3 mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold primary tracking-tight hover:opacity-90 transition"
        >
          InstaviZ
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {[
            { label: "Dashboard", href: "/home" },
            { label: "Pricing", href: "/ourplans" },
          ].map((link) => (
            <div key={link.href} className="relative group">
              <Link
                href={link.href}
                className={`relative text-base font-medium transition duration-200 ${isActive(link.href)
                    ? "primary"
                    : "text-gray-700 hover:primary"
                  }`}
              >
                {link.label}
                {/* Underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 ${isActive(link.href)
                      ? "w-full primarybg"
                      : "w-0 group-hover:w-full primarybg"
                    }`}
                ></span>
              </Link>
            </div>
          ))}

          {/* Profile / Auth Buttons */}
          {isLoggedIn ? (
            <div className="relative">
              <Image
                src="/google.png"
                alt="User Profile"
                width={35}
                height={35}
                className="rounded-full border p-1 border-gray-300 cursor-pointer hover:brightness-105 transition"
                onClick={() => setIsProfile(true)}
              />

              {isProfile && (
                <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-3 w-40 z-50">
                  <div className="flex justify-between items-center pl-2 mb-2">
                    <p className="font-mono font-bold text-gray-700 cursor-pointer">
                      Profile
                    </p>
                    <X
                      size={16}
                      className="text-gray-600 hover:text-black cursor-pointer"
                      onClick={() => setIsProfile(false)}
                    />
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      setIsLoggedIn(false);
                      setIsProfile(false);
                    }}
                    className="w-full text-left font-mono font-bold cursor-pointer text-red-600 hover:bg-red-50 rounded-md px-2 py-1"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <div className="relative group">
                <Link
                  href="/login"
                  className={`relative text-base font-medium transition duration-200 ${isActive("/login") ? "primary" : "text-gray-700 hover:primary"
                    }`}
                >
                  Login
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 ${isActive("/login")
                        ? "w-full primarybg"
                        : "w-0 group-hover:w-full primarybg"
                      }`}
                  ></span>
                </Link>
              </div>

              <Link
                href="/signup"
                className="text-base font-medium text-white primarybg hover:brightness-110 rounded px-3 py-1.5 transition duration-200"
              >
                Signup
              </Link>
            </div>

          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden primary hover:brightness-110 focus:outline-none"
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
              {[
                { label: "Dashboard", href: "/home" },
                { label: "Pricing", href: "/ourplans" },
                { label: "Login", href: "/login" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-base font-medium transition duration-200 ${isActive(link.href)
                      ? "primary"
                      : "hover:primary text-gray-700"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-white primarybg hover:brightness-110 rounded px-3 py-1.5 transition"
              >
                Signup
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
