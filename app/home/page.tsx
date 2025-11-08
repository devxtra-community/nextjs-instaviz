"use client";
import React, { useState } from "react";
import { ChatBar } from "@/components/ChatBar";
import { DashboardMain } from "@/components/DashboardMain";
import { Navbar } from "@/components/Navbar";
import { FiMessageSquare } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Home: React.FC = () => {
  const [dataUploaded, setDataUploaded] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState<boolean>(false);

  return (
    <>
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        <Navbar />
        {/* Desktop Layout */}
        <div className="pt-13 flex flex-col md:flex-row h-screen">
          <DashboardMain showData={dataUploaded} />
          {/* Desktop Chat visible */}
          <ChatBar
            dataUploaded={dataUploaded}
            setDataUploaded={setDataUploaded}
          />
        </div>

        {/* Mobile Floating Chat Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="fixed bottom-5 right-5 md:hidden bg-violet-600 text-white p-3 rounded-full shadow-lg z-40 hover:bg-violet-700 transition"
        >
          <FiMessageSquare size={22} />
        </button>

        {/* Mobile Chat Slide-up Drawer */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl  p-3 sm:p-4  flex flex-col"
            >
              <div className="flex justify-between items-center  pb-2 mb-2">
                <h2 className="text-violet-700 font-semibold text-sm sm:text-base">
                  InstaviZ AI Chat
                </h2>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-gray-500 hover:text-violet-600 text-sm font-medium"
                >
                  Close
                </button>
              </div>

              <ChatBar
                dataUploaded={dataUploaded}
                setDataUploaded={setDataUploaded}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Home;
