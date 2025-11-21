"use client";

import React, { useEffect, useState } from "react";
import { ChatBar } from "@/components/ChatBar";
import DashboardMain from "@/components/DashboardMain";
import { Navbar } from "@/components/Navbar";
import { FiMessageSquare } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "@/components/SkeletonModel";

const ClientHome: React.FC = () => {
  const [dataUploaded, setDataUploaded] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState<boolean>(false);

  // Shared Chat State
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <ProfileCard />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />

      <div className="flex flex-row md:pr-96">

        {/* Dashboard */}
        <DashboardMain
          showData={dataUploaded}
          setDataUploaded={setDataUploaded}
        />

        {/* Desktop ChatBar (ALWAYS mounted) */}
        <div className="hidden md:block">
          <ChatBar
            dataUploaded={dataUploaded}
            setDataUploaded={setDataUploaded}
            messages={messages}
            setMessages={setMessages}
            mobile={false}
          />

        </div>
      </div>

      {/* Mobile Floating Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-5 right-5 md:hidden primarybg text-white p-3 rounded-full shadow-lg z-40"
      >
        <FiMessageSquare size={22} />
      </button>

      {/* Mobile Chat Sheet */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl p-3 md:hidden h-[55vh] shadow-lg"
          >
            <div className="flex justify-between items-center pb-2 border-b">
              <h2 className="text-violet-700 font-semibold">InstaviZ AI Chat</h2>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-500 text-sm"
              >
                ✕
              </button>
            </div>

            {/* Mobile uses same ChatBar component */}
            <ChatBar
              dataUploaded={dataUploaded}
              setDataUploaded={setDataUploaded}
              messages={messages}
              setMessages={setMessages}
              mobile={true}
              onClose={() => setChatOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
};

export default ClientHome;
