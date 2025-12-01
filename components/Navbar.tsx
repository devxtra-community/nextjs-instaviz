"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CircleArrowOutUpRight, LogOutIcon } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id?: string;
  userId?: string;
  googleId?: string;
  email?: string;
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [profilePic, setProfilePic] = useState("/user.jpg");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const extracted =
        decoded.id || decoded.userId || decoded.googleId || null;

      if (extracted) setUserId(extracted.toString());
    } catch (err) {
      console.log("Token decode failed", err);
      setIsLoggedIn(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!userId) return;

    const loadProfile = async () => {
      try {
        const res = await axiosInstance.get(`/user/${userId}`);

        setName(res.data.user.name);
        setEmail(res.data.user.email);

        if (res.data.user?.picture) {
          setProfilePic(res.data.user.picture);
        }
      } catch (err) {
        console.log("Profile fetch failed → token may be refreshing...");
        setTimeout(loadProfile, 400);
        return;
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [userId]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.clear();
      setIsLoggedIn(false);
      router.push("/home");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const navigateToProfile = () => {
    router.push("/userprofile");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/10">
      <div className="flex items-center justify-between px-6 py-3 mx-auto">

        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold primary tracking-tight">
          InstaviZ
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">

          <Link
            href="/home"
            className="relative text-base font-medium text-gray-700 group hover:text-[var(--primary)]"
          >
            Dashboard
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></span>
          </Link>

          <Link
            href="/ourplans"
            className="relative text-base font-medium text-gray-700 group hover:text-[var(--primary)]"
          >
            Pricing
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></span>
          </Link>

          {/* AUTH */}
          {isLoggedIn ? (
            <div className="relative">

              {loadingProfile ? (
                <div className="w-[45px] h-[45px] rounded-full bg-gray-200 animate-pulse border" />
              ) : (
                <Image
                  src={profilePic}
                  alt="User"
                  width={45}
                  height={45}
                  className="rounded-full border border-violet-300 cursor-pointer hover:scale-105 transition"
                  onClick={navigateToProfile}
                />
              )}
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link
                href="/login"
                className="relative text-base font-medium text-gray-700 group hover:text-[var(--primary)]"
              >
                Login
                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[var(--primary)] scale-x-0 group-hover:scale-x-100"></span>
              </Link>

              <Link
                href="/signup"
                className="text-base font-medium bg-[var(--card)] rounded px-3 py-1.5 primarybg transition"
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white shadow-lg border-t"
          >
            <div className="flex flex-col p-5 space-y-4">

              <Link
                href="/home"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium hover:text-[#ad49e1]"
              >
                Dashboard
              </Link>

              <Link
                href="/ourplans"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium hover:text-[#ad49e1]"
              >
                Pricing
              </Link>

              {isLoggedIn && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigateToProfile();
                  }}
                  className="flex items-center gap-4 bg-gray-100 py-3 px-2 rounded-xl"
                >
                  <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                    {loadingProfile ? (
                      <div className="w-full h-full bg-gray-200 animate-pulse" />
                    ) : (
                      <Image
                        src={profilePic}
                        alt="Profile"
                        width={50}
                        height={50}
                        className="rounded-full border"
                      />
                    )}
                  </div>

                  <span className="text-lg font-medium">
                    {email.length > 10 ? email.slice(0, 13) + "..." : email}
                  </span>
                  <CircleArrowOutUpRight size={22} />
                </button>
              )}

              {!isLoggedIn && (
                <div className="flex flex-col gap-3">
                  <Link href="/login" className="text-lg font-medium">
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-lg w-28 text-center rounded-xl py-2 bg-[var(--primary)]"
                  >
                    Signup
                  </Link>
                </div>
              )}

              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 text-lg font-semibold flex items-center justify-center gap-2"
                >
                  <LogOutIcon size={20} /> Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
