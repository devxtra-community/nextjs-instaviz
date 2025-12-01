"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
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
  const [userToken, setUserToken] = useState(0);

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
      toast.error("Token decode failed");
      console.log(err);
      setIsLoggedIn(false);
    }
  }, [pathname]);

  useEffect(() => {
    tokenCheck();

    if (!userId) {
      return;
    }

    const loadProfile = async () => {
      try {
        const res = await axiosInstance.get(`/user/${userId}`);
        console.log(res.data);

        setName(res.data.user.name);
        setEmail(res.data.user.email);
        ;

        if (res.data.user?.picture) {
          setProfilePic(res.data.user.picture);
        }
      } catch (err) {
        toast.error("Profile fetch failed token may be refreshing...");
        console.log(err);
        setTimeout(loadProfile, 400);
        return;
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [userId]);

  const tokenCheck = async () => {
    try {
      const token = await axiosInstance.get("/user/token");
      if (typeof token.data.token === "number") {
        setUserToken(token.data.token);
      } else {
        setUserToken(2);
      }
    } catch (err) {
      toast.error("error from the tokencheck at navbar");
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.clear();
      setIsLoggedIn(false);
      router.push("/home");
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  };

  const navigateToProfile = () => {
    router.push("/userprofile");
  };

  const TokenBadge = () => {
    if (userToken <= 0) return null;

    return (
      <div className="flex items-center">
        <div className="relative inline-flex items-center">
          <Toaster richColors position="top-center" />
          <span className="relative flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 text-[11px] font-semibold text-orange-700 shadow-sm">
            <span className="text-[14px] animate-pulse">🔥</span>
            <span>{userToken} Tokens</span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/10">
      <div className="flex items-center justify-between px-6 py-3 mx-auto">
        <Link
          href="/"
          className="text-2xl font-extrabold primary tracking-tight"
        >
          InstaviZ
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <TokenBadge />

          <Link
            href="/home"
            className="relative text-base font-medium text-gray-700 group hover:text-[#ad49e1]"
          >
            Dashboard
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#ad49e1] scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></span>
          </Link>

          <Link
            href="/ourplans"
            className="relative text-base font-medium text-gray-700 group hover:text-[#ad49e1]"
          >
            Pricing
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#ad49e1] scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></span>
          </Link>

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
                className="relative text-base font-medium text-gray-700 group hover:text-[#ad49e1]"
              >
                Login
                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#ad49e1] scale-x-0 group-hover:scale-x-100"></span>
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
          className="md:hidden text-violet-700 hover:text-violet-800"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

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
              <TokenBadge />

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
                    className="text-lg w-28 text-center rounded-xl py-2 primarybg text-white"
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
