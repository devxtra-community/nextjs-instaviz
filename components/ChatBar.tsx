import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import VioletAIAvatar from "./VioletAIAvatar";

const Sparkle = () => (
  <motion.svg
    width="54"
    height="54"
    viewBox="0 0 54 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.84, opacity: 0.7 }}
    animate={{ scale: [0.84, 1.09, 0.9, 0.84], opacity: [0.7, 1, 0.8, 0.7] }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "loop",
    }}
    className="mx-auto w-14 h-14 sm:w-16 sm:h-16"
  >
    <path
      d="M27 7L30.2877 21.7123L45 25L30.2877 28.2877L27 43L23.7123 28.2877L9 25L23.7123 21.7123L27 7Z"
      fill="#d8b4fe"
      stroke="#AD49E1"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M42 16L43.2462 19.7538L47 21L43.2462 22.2462L42 26L40.7538 22.2462L37 21L40.7538 19.7538L42 16Z"
      fill="#e9d5ff"
      stroke="#AD49E1"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <path
      d="M16 36L17.1231 39.1231L20.2462 40.2462L17.1231 41.3692L16 44.4923L14.8769 41.3692L11.7538 40.2462L14.8769 39.1231L16 36Z"
      fill="#f3e8ff"
      stroke="#c4b5fd"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </motion.svg>
);

type ChatBarProps = {
  dataUploaded: boolean;
  setDataUploaded: (val: boolean) => void;
};

export const ChatBar: React.FC<ChatBarProps> = ({
  dataUploaded,
  setDataUploaded,
}) => {
  if (!dataUploaded) {
    return (
      <aside className="w-full md:w-96 bg-white p-4 flex flex-col items-center justify-center mt-4 md:mt-0 border-t md:border-l border-black/10 md:ml-1 min-h-[220px] sm:min-h-[260px]">
        <Sparkle />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          className="mt-4 text-center px-2"
        >
          <h2 className="text-base sm:text-lg font-semibold primary mb-2">
            Upload a file to chat with InstaviZ AI
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            InstaviZ AI is ready to answer your questions — upload your CSV to begin.
          </p>
        </motion.div>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-96 h-[60vh] md:h-full bg-white p-3 md:p-4 flex flex-col justify-between mt-4 md:mt-0 border-t md:border-l border-gray-200 md:ml-1 rounded-t-2xl md:rounded-none">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto mb-3 space-y-3 pr-1 scrollbar-thin scrollbar-thumb-[#EBDCFB]">
        <div className="text-base md:text-lg font-semibold primary mb-3">
          <h1>Ask InstaviZ AI</h1>
        </div>

        {/* Example user message */}
        <div className="flex items-end justify-end self-end gap-2">
          <div className="bg-[#f7edff] primary px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium max-w-[80%] shadow-sm">
            Can you summarize my data?
          </div>
          <VioletAIAvatar />
        </div>

        {/* Example AI response */}
        <div className="flex items-start gap-2 mt-1">
          <VioletAIAvatar />
          <div className="bg-gray-50 text-gray-800 px-3 py-1.5 rounded-xl shadow-sm text-xs sm:text-sm max-w-[80%] leading-snug">
            Sure! Your uploaded CSV mostly contains sales and engagement metrics. The majority of activity comes from social media and organic search, and your overall conversion improved by 10% this week.
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Ask questions about your data..."
          className="w-full px-3 py-2 rounded-lg border border-[#e9e0f8] text-gray-700 shadow focus:ring-2 focus:ring-[#AD49E1]/40 outline-none text-sm sm:text-base pr-10"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer primary hover:bg-[#f4e9ff] rounded-full p-2 transition"
        >
          <FiSend size={15} />
        </button>
      </div>
    </aside>
  );
};
