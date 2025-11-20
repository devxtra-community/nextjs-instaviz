"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CircleArrowOutUpRight, LogOutIcon, X } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id?: string;
  userId?: string;
  email?: string;
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileProfile, setMobileProfile] = useState(false);
  const [profilePic, setProfilePic] = useState("/user.jpg");
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const googleToken = localStorage.getItem("token");
    const normalToken = localStorage.getItem("accessToken");

    const finalToken = googleToken || normalToken;

    if (!finalToken) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);

    try {
      const decoded = jwtDecode<any>(finalToken);
      const idFromToken =
        decoded.id || decoded.googleId || decoded.userId || null;

      if (idFromToken) {
        setUserId(idFromToken.toString());
      }
    } catch (err) {
      setIsLoggedIn(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const res = await axiosInstance.get(`/user/${userId}`);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        if (res.data?.user?.picture) setProfilePic(res.data.user.picture);
      } catch (err) {
        console.error("Failed to load profile image:", err);
      }
    })();
  }, [userId]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.clear();
      setIsLoggedIn(false);
      setMenuOpen(false);
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
      <Toaster
        richColors
        position="top-center"
        toastOptions={{ className: "z-[9999]" }}
      />

      <div className="flex items-center justify-between px-6 py-3 mx-auto">
        <Link
          href="/"
          className="text-2xl font-extrabold primary tracking-tight"
        >
          InstaviZ
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/home"
            className="relative text-base font-medium text-gray-700 group hover:text-[#ad49e1]"
          >
            Dashboard
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#ad49e1] group-hover:scale-x-100 scale-x-0 origin-left transition-transform duration-300"></span>
          </Link>

          <Link
            href="/ourplans"
            className="relative text-base font-medium text-gray-700 group hover:text-[#ad49e1]"
          >
            Pricing
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#ad49e1] group-hover:scale-x-100 scale-x-0 origin-left transition-transform duration-300"></span>
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <Image
                src={profilePic}
                alt="User Profile"
                width={45}
                height={45}
                className="rounded-full border border-violet-300 cursor-pointer hover:scale-105 transition-all"
                onClick={navigateToProfile}
              />
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link
                href="/login"
                className="relative text-base font-medium text-gray-700 group hover:text-[#ad49e1]"
              >
                Login
                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#ad49e1] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
              <Link
                href="/signup"
                className="text-base font-medium text-white rounded px-3 py-1.5 primarybg transition"
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-violet-700 hover:text-violet-800 focus:outline-none"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* mobile menu */}
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
                  className="flex items-center gap-4 bg-gray-100 py-3 px-2 rounded-2xl text-left"
                >
                  <Image
                    src={profilePic}
                    width={50}
                    height={50}
                    alt="Profile"
                    className="rounded-full"
                  />
                  <span className="text-lg font-medium">
                    {email.length > 10 ? email.substring(0, 13) + "..." : email}
                  </span>
                  <CircleArrowOutUpRight size={22} />
                </button>
              )}

              {!isLoggedIn && (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-lg font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="text-lg w-28 text-center rounded-xl py-2 primarybg text-white"
                  >
                    Signup
                  </Link>
                </div>
              )}

              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 text-lg font-semibold flex items-center justify-center gap-2 transition"
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
