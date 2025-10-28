import { motion } from "framer-motion";

const VioletAIAvatar = () => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8 rounded-full border border-violet-200 shadow bg-white"
  >
    {/* Big main violet sparkle */}
    <path
      d="M19 5L21.17 15.83L32 19L21.17 22.17L19 33L16.83 22.17L6 19L16.83 15.83L19 5Z"
      fill="url(#paint0_linear)"
      stroke="#a78bfa"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Small sparkle upper left */}
    <path
      d="M31 10.8L31.62 12.62L33.2 13.2L31.62 13.78L31 15.6L30.38 13.78L28.8 13.2L30.38 12.62L31 10.8Z"
      fill="url(#paint1_linear)"
      stroke="#c4b5fd"
      strokeWidth="0.7"
      strokeLinejoin="round"
    />
    {/* Small sparkle bottom right */}
    <path
      d="M27 28.2L27.54 29.64L29.2 30.2L27.54 30.76L27 32.2L26.46 30.76L24.8 30.2L26.46 29.64L27 28.2Z"
      fill="url(#paint2_linear)"
      stroke="#c4b5fd"
      strokeWidth="0.7"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="paint0_linear" x1="19" y1="5" x2="19" y2="33" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a78bfa"/>
        <stop offset="1" stopColor="#7c3aed"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="31" y1="10.8" x2="31" y2="15.6" gradientUnits="userSpaceOnUse">
        <stop stopColor="#d8b4fe"/>
        <stop offset="1" stopColor="#a78bfa"/>
      </linearGradient>
      <linearGradient id="paint2_linear" x1="27" y1="28.2" x2="27" y2="32.2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#d8b4fe"/>
        <stop offset="1" stopColor="#a78bfa"/>
      </linearGradient>
    </defs>
  </svg>
);

export default VioletAIAvatar;

