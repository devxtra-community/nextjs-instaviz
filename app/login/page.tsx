"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Toaster,toast } from "sonner";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  async function handleLogin() {
    try{
      console.log("button clicked");
    console.log(email,password);
      const loginData = {
        email,
        password
      }
     const LoginResponse = await axiosInstance.post("/auth/login", loginData)
  
     console.log(LoginResponse);
      if(LoginResponse.data.success){
        localStorage.setItem("accessToken",LoginResponse.data.accessToken)
        router.push("/home")
      }

    }catch(err:any){
      console.log(err.response.data.message);
      toast.error(`${err.response.data.message}`)
      console.log(err);
      
    }
     

  }
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:px-24">
        {/* Logo / Header */}
        <div className="lg:hidden mb-6 flex items-center">
          <h1 className="text-4xl font-semibold primary">Instaviz</h1>
           <Toaster richColors position="top-center" />
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-4xl font-semibold text-gray-900">Welcome back</h2>

          <p className="mt-1 text-base primary">
            Please sign in to continue your analysis.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#AD49E1] focus:ring-1 focus:ring-[#AD49E1]"
                onChange={(e)=>{setEmail(e.target.value)}}
                value={email}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#AD49E1] focus:ring-1 focus:ring-[#AD49E1]"
                onChange={(e)=>{setPassword(e.target.value)}}
                value={password}
              />
            </div>

            <button
             onClick={handleLogin}
              type="submit"
              className="w-full rounded-md primarybg py-2.5 text-white font-medium hover:bg-purple-200 transition"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => window.location.href = "http://localhost:5000/auth/google"}
              className="flex w-full items-center justify-center gap-2 rounded-md border py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
             
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Sign in with Google
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/signup" className="primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section (Enhanced) */}
      <div className="hidden md:flex flex-1 items-center justify-center relative bg-linear-to-br from-[#AD49E1] via-purple-500 to-[#AD49E1] overflow-hidden">
        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-size-[20px_20px]" />

        {/* Floating Illustration */}
        <motion.img
          src="/giphy.gif"
          alt="Data Visualization"
          className="relative z-10 max-w-md w-full md:h-1/3 object-contain drop-shadow-2xl rounded-2xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Motivational Text */}
        <div className="absolute bottom-12 text-center px-4 z-20">
          <h2 className="text-white text-3xl font-semibold drop-shadow-lg">
            Visualize. Analyze. Grow.
          </h2>
          <p className="text-gray-200 text-sm mt-2">
            Transform your data into clear, meaningful insights.
          </p>
        </div>

        {/* Soft Gradient Glow */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent z-0" />
      </div>
    </div>
  );
}