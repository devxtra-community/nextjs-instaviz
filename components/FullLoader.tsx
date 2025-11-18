"use client";

import { motion } from "framer-motion";

export default function FullLoader() {
  return (
    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 top-10">
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
        className="w-12 h-12 border-4 border-[#AD49E1] border-t-transparent rounded-full"
      />

      <p className="mt-4 text-gray-700 font-medium text-[15px]">
        Processing your file… generating insights…
      </p>
    </div>
  );
}
