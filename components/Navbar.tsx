"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LogOutIcon, X } from "lucide-react";
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
  const [isProfile, setIsProfile] = useState(false);
  const [profilePic, setProfilePic] = useState("/user.jpg");
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const googleToken = localStorage.getItem("token");
    const normalToken = localStorage.getItem("accessToken");

    let finalToken = googleToken || normalToken;

    if (!finalToken) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);

    try {
      const decoded = jwtDecode<any>(finalToken);
      console.log("Decoded token:", decoded);

      const idFromToken =
        decoded.id || decoded.googleId || decoded.userId || null;

      if (idFromToken) {
        setUserId(idFromToken.toString());
      }
    } catch (err) {
      console.error("JWT decode failed:", err);
      setIsLoggedIn(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const res = await axiosInstance.get(`/user/${userId}`);
        setName(res.data.user.name);
        if (res.data?.user?.picture) {
          setProfilePic(res.data.user.picture);
        }
      } catch (err) {
        console.error("Failed to load profile image:", err);
      }
    })();
  }, [userId]);

  async function updateProfile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file || !userId) return alert("User ID not found!");

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        try {
          const response = await axiosInstance.put("/user/upload", {
            userId,
            image: base64Image,
          });
          console.log(response);

          const { imageUrl } = response.data;
          console.log(imageUrl);
          setProfilePic(imageUrl);
          alert("Profile picture updated!");
        } catch (error: any) {
          console.error(
            "Upload failed:",
            error.response?.data || error.message
          );
          alert(" Failed to upload image");
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setIsProfile(false);
      router.push("/home");
    } catch (error) {
      console.log("Logout failed:", error);
    }
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
          <Link
            href="/home"
            className="relative text-base font-medium text-gray-700 group hover:text-[#ad49e1]"
          >
            Dashboard
            <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#ad49e1] hover:text-[#ad49e1] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
          <Link
            href="/ourplans"
            className="relative text-base font-medium text-gray-700 group hover:text-[#ad49e1]"
          >
            Pricing
            <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#ad49e1] hover:text-[#ad49e1] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <Image
                src={profilePic}
                alt="User Profile"
                width={45}
                height={45}
                className="rounded-full border border-violet-300 cursor-pointer hover:scale-105 transition-all"
                onClick={() => setIsProfile((prev) => !prev)}
              />

              <AnimatePresence>
                {isProfile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -5 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-13 right-0 bg-white backdrop-blur-xl border shadow-2xs border-gray-300 rounded-2xl w-72 p-5 z-50"
                  >
                    <button
                      onClick={() => setIsProfile(false)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-black transition cursor-pointer"
                    >
                      <X size={20} />
                    </button>

                    <div className="flex flex-col items-center gap-3 mt-2">
                      <Image
                        src={profilePic}
                        alt="User Profile"
                        width={65}
                        height={65}
                        className="rounded-full border border-gray-300 shadow-sm"
                      />
                      <p className="font-medium">{name}</p>

                      <button
                        onClick={updateProfile}
                        className="text-sm  text-gray-600 hoverColor font-medium hover:underline transition cursor-pointer"
                      >
                        Change profile picture
                      </button>
                    </div>

                    <div className="my-4 border-t border-gray-200" />

                    {/* Logout button */}
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-50  text-red-600 py-2 rounded-lg font-semibold hover:bg-red-100 transition flex items-center justify-center cursor-pointer gap-2"
                    >
                      <LogOutIcon size={18} />
                      Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link
                href="/login"
                className="relative text-base font-medium text-gray-700 group hover:text-[#ad49e1]"
              >
                Login
                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#ad49e1]  scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
              <Link
                href="/signup"
                className="text-base font-medium text-white rounded px-3 py-1.5  primarybg transition"
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-violet-700 hover:text-violet-800 focus:outline-none"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  );
}
