"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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

  const router = useRouter();
  const pathname = usePathname();

  // ✅ Extract userId from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const idFromToken = decoded.id || decoded.userId;
      if (idFromToken) {
        setUserId(idFromToken);
      }
    } catch (err) {
      console.error("JWT decode failed:", err);
      setIsLoggedIn(false);
    }
  }, [pathname]);

  // ✅ Fetch user profile (to get profile image)
  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const res = await axiosInstance.get(`/user/${userId}`);
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
          alert("✅ Profile picture updated!");
        } catch (error: any) {
          console.error(
            "Upload failed:",
            error.response?.data || error.message
          );
          alert("❌ Failed to upload image");
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsProfile(false);
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/10">
      <div className="flex items-center justify-between px-6 py-3 mx-auto">
        <Link
          href="/"
          className="text-2xl font-extrabold text-violet-700 tracking-tight"
        >
          InstaviZ
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/home"
            className="text-base font-medium text-gray-700 hover:text-violet-700 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/ourplans"
            className="text-base font-medium text-gray-700 hover:text-violet-700 transition"
          >
            Pricing
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <Image
                src={profilePic}
                alt="User Profile"
                width={45}
                height={45}
                className="rounded-full border p-1 border-gray-300 cursor-pointer"
                onClick={() => setIsProfile(true)}
              />

              {isProfile && (
                <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-xl shadow-lg p-3 w-80 h-56 z-50">
                  <div className="flex flex-col gap-3 items-center pl-2 mb-2">
                    <Image
                      src={profilePic}
                      alt="User Profile"
                      width={50}
                      height={50}
                      className="rounded-full  cursor-pointer"
                    />
                    <button
                      className="font-light text-lg text-gray-700 hover:text-violet-700 hover:underline"
                      onClick={updateProfile}
                    >
                      Change your profile picture
                    </button>
                    <div className="absolute top-3 right-3">
                      <X
                        size={23}
                        className="text-gray-700 hover:text-black cursor-pointer"
                        onClick={() => setIsProfile(false)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex justify-center gap-2 text-left font-serif font-bold cursor-pointer text-red-600 hover:bg-red-50 rounded-md px-2 py-1"
                  >
                    Sign Out <LogOutIcon size={20} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link
                href="/login"
                className="text-base font-medium text-gray-700 hover:text-violet-700 transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-base font-medium text-white bg-violet-700 hover:bg-violet-800 rounded px-3 py-1.5 transition"
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
