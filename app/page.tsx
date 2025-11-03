"use client";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="bg-dot-fade min-h-screen flex flex-col">
      <div className="flex justify-center px-4">
        <nav className="flex justify-center items-center font-light text-lg mt-6  border-gray-300  gap-7 md:5 rounded-full w-full max-w-lg border bg-white/80 backdrop-blur-md px-6 py-3 shadow-md">
          <img src="/logo.png" className="w-24 h-auto" alt="Logo" />
          <ul className="hidden md:flex items-center gap-8">

            <Link href='/home'>
              <li className="cursor-pointer hover:text-[#AD49E1] transition">Home</li>
            </Link>

            <Link href='/ourplans'>
              <li className="cursor-pointer hover:text-[#AD49E1] transition">Pricing</li>
            </Link>

            <Link href="/signup">
              <li className="bg-[#AD49E1] px-5 py-2 rounded-2xl text-white hover:bg-[#9929d5] cursor-pointer">
                Signup
              </li>
            </Link>

          </ul>
          <div className="md:hidden">
            <Link href="/signup">
              <button className="bg-[#AD49E1] px-4 py-2 text-white rounded-2xl hover:bg-[#9929d5]">
                Sign up
              </button>
            </Link>
          </div>
        </nav>
      </div>

      <div className="flex flex-col justify-center items-center text-center py-15">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            Your <span className="text-[#AD49E1]">Data</span>, Instantly Made{" "}
            <span className="text-[#AD49E1]">Clear</span>
          </h1>
          <h3 className="mt-2 text-base sm:text-lg text-gray-700">
            Data made simple. Upload, explore, visualize—fast and AI-powered insights.
          </h3>
          <Link href="/home">
            <button className="bg-[#AD49E1] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl mt-6 text-base sm:text-lg hover:bg-[#9929d5] transition">
              Get Started
            </button>
          </Link>
        </div>

        <div className="block xl:hidden mt-8">
          <img
            src="/ai.png"
            alt="Data dashboard"
            className="w-1/2 p-6 max-w-md mx-auto rounded-3xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
