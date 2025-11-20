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
  const [isProfile, setIsProfile] = useState(false);
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
        setEmail(res.data.user.email);
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
      if (!file || !userId) return toast.success("userId is invalid");

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
          toast.success("Profile image is uploaded");
        } catch (error: any) {
          toast.warning(" Failed to upload image");
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.clear();
      setIsLoggedIn(false);
      setIsProfile(false);
      router.push("/home");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/10">
      <Toaster richColors position="top-center" />
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
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#ad49e1] hover:text-[#ad49e1] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
          <Link
            href="/ourplans"
            className="relative text-base font-medium text-gray-700 group hover:text-[#ad49e1]"
          >
            Pricing
            <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#ad49e1] hover:text-[#ad49e1] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>

          {isLoggedIn ? (
            <div className="relative ">
              <Image
                src={profilePic}
                alt="User Profile"
                width={45}
                height={45}
                className="rounded-full border border-violet-300 cursor-pointer hover:scale-105 transition-all w-10 h-10"
                onClick={() => setIsProfile((prev) => !prev)}
              />

              <AnimatePresence>
                {isProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.9 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-13 right-0 w-80 bg-white shadow-xl rounded-2xl border border-gray-200 p-5 z-50 backdrop-blur-xl"
                  >
                    <button
                      onClick={() => setIsProfile(false)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-black transition cursor-pointer"
                    >
                      <X size={21} />
                    </button>

                    <div className="flex flex-col items-center gap-3 mt-3 text-center">
                      <div className="relative group">
                        <Image
                          src={profilePic}
                          alt="User Profile"
                          width={80}
                          height={80}
                          className="rounded-full border border-gray-300 shadow-sm group-hover:brightness-90 transition"
                        />

                        <div
                          onClick={updateProfile}
                          className="absolute bottom-0 right-0 bg-[#ad49e1] text-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-[#9334d3] transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.232 5.232l3.536 3.536m-8.036 8.036H6v-4.732a2 2 0 01.586-1.414l8.646-8.646a2 2 0 012.828 0l1.414 1.414a2 2 0 010 2.828l-8.646 8.646a2 2 0 01-1.414.586z"
                            />
                          </svg>
                        </div>
                      </div>

                      <p className="font-semibold text-xl text-gray-900">
                        {name}
                      </p>

                      <div className="flex flex-col gap-1 w-full text-center">
                        <p className="py-2 text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition cursor-pointer">
                          {email}
                        </p>

                        <button className="py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition cursor-pointer">
                          <span className="text-red-500">Change</span> password
                        </button>
                      </div>
                    </div>

                    <div className="my-4 border-t border-gray-200" />

                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-100 text-red-600 py-2.5 rounded-lg font-semibold hover:bg-red-200  flex items-center justify-center cursor-pointer gap-2 transition transform duration-400 ease-in-out"
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
                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-[#ad49e1]  scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && !mobileProfile && (
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
                className="text-lg font-medium text-gray-700 hover:text-[#ad49e1]"
              >
                Dashboard
              </Link>

              <Link
                href="/ourplans"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-gray-700 hover:text-[#ad49e1]"
              >
                Pricing
              </Link>

              {isLoggedIn && (
                <button
                  className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  <div
                    className="flex relative w-full items-center gap-4 bg-gray-100 py-3 px-2 -ml-4 rounded-3xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileProfile(true);
                    }}
                  >
                    <Image
                      src={profilePic}
                      width={60}
                      height={40}
                      alt="Profile"
                      className="rounded-full"
                    />
                    <span className="text-lg font-medium">
                      {email.length > 10
                        ? email.substring(0, 13) + " . . . . ."
                        : email}
                    </span>

                    <CircleArrowOutUpRight size={22}></CircleArrowOutUpRight>
                  </div>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileProfile && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-0 left-0 w-full h-[75%] primarybg shadow-2xl py-8 z-999 md:hidden"
          >
            <button
              onClick={() => setMobileProfile(false)}
              className="absolute top-5 right-4 text-black"
            >
              <X size={26} />
            </button>

            <div className="w-14 h-1.5 bg-black rounded-full mx-auto mb-5"></div>

            <div className="flex flex-col bg-white w-full items-center gap-3 py-2">
              <div className="relative group ">
                <Image
                  src={profilePic}
                  width={100}
                  height={100}
                  alt="Profile"
                  className="rounded-full shadow border border-gray-300"
                />

                <button
                  onClick={updateProfile}
                  className="absolute bottom-1 right-1 bg-[#ad49e1] text-white p-2 rounded-full text-xs shadow hover:bg-[#9334d3] transition"
                >
                  ✎
                </button>
              </div>

              <p className="text-xl font-semibold">{name}</p>
              <p className="text-gray-600 text-lg">{email}</p>
            </div>

            <div className="flex flex-col items-center gap-4 bg-white py-6 border-b-2 rounded-2xl shadow-sm">
              <button className="w-56 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg font-medium transition">
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="w-56 py-3 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 text-lg font-semibold transition flex items-center justify-center cursor-pointer gap-2"
              >
                <LogOutIcon size={20} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
