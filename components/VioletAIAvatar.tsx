import { motion } from "framer-motion";

const VioletAIAvatar = () => (
  <motion.div
    
    className="rounded-full flex items-center justify-center border border-[#e9e0f8] bg-white shadow-sm w-8 h-8"
  >
    <svg
      width="28"
      height="28"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      {/* Main sparkle (AI core) */}
      <path
        d="M19 5L21.17 15.83L32 19L21.17 22.17L19 33L16.83 22.17L6 19L16.83 15.83L19 5Z"
        fill="url(#core)"
        stroke="#AD49E1"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Accent sparkle upper left */}
      <path
        d="M31 10.8L31.62 12.62L33.2 13.2L31.62 13.78L31 15.6L30.38 13.78L28.8 13.2L30.38 12.62L31 10.8Z"
        fill="url(#spark1)"
        stroke="#CDA5F2"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      {/* Accent sparkle bottom right */}
      <path
        d="M27 28.2L27.54 29.64L29.2 30.2L27.54 30.76L27 32.2L26.46 30.76L24.8 30.2L26.46 29.64L27 28.2Z"
        fill="url(#spark2)"
        stroke="#CDA5F2"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      <defs>
        {/* Core gradient */}
        <linearGradient id="core" x1="19" y1="5" x2="19" y2="33" gradientUnits="userSpaceOnUse">
          <stop stopColor="#AD49E1" />
          <stop offset="1" stopColor="#9929D5" />
        </linearGradient>
        {/* Sparkle gradients */}
        <linearGradient id="spark1" x1="31" y1="10.8" x2="31" y2="15.6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E9D7FE" />
          <stop offset="1" stopColor="#B46FE9" />
        </linearGradient>
        <linearGradient id="spark2" x1="27" y1="28.2" x2="27" y2="32.2" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EBDCFB" />
          <stop offset="1" stopColor="#B46FE9" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

export default VioletAIAvatar;
