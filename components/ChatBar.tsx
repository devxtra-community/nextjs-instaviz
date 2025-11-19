"use client";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import VioletAIAvatar from "./VioletAIAvatar";
import { useAnalysis } from "@/context/AnalysisContext";
import axiosInstance from "@/lib/axiosInstance";

type ChatBarProps = {
  dataUploaded: boolean;
  setDataUploaded: (val: boolean) => void;
};

export const ChatBar: React.FC<ChatBarProps> = ({
  dataUploaded,
  setDataUploaded,
}) => {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");

  const { addNewChart, setLoading } = useAnalysis();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    // Add user bubble
    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    try {
      setLoading(true);

      const res = await axiosInstance.post("/chat", { message: userText });

      const data = res.data;

      // Add AI reply
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);

      // Add chart (if available)
      if (data.chart) {
        addNewChart(data.chart);
      }
    } catch (err) {
      console.error("Chat error:", err);

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Error communicating with server." },
      ]);
    } finally {
      setLoading(false);
    }
  };


  if (!dataUploaded) {
    return (
      <aside className="w-full md:w-96 h-[93vh] fixed right-0 top-12 flex flex-col bg-white p-4 border-t md:border-l border-gray-200">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-60 text-center px-2"
        >
          <h2 className="text-lg font-semibold primary mb-2">
            Upload a file to chat with InstaviZ AI
          </h2>
          <p className="text-sm text-gray-500">
            InstaviZ AI is ready to answer — upload your CSV to begin.
          </p>
        </motion.div>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-96 h-[93vh] fixed right-0 top-12 flex flex-col bg-white p-4 border-t md:border-l border-gray-200">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-hide">
        <h1 className="text-lg font-semibold primary mb-2">Ask InstaviZ AI</h1>

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
              } gap-2`}
          >
            {m.role === "ai" && <VioletAIAvatar />}
            <div
              className={`px-3 py-1.5 rounded-xl text-xs shadow-sm max-w-[80%] ${m.role === "user"
                  ? "bg-[#f7edff] primary"
                  : "bg-gray-50 text-gray-800"
                }`}
            >
              {m.text}
            </div>
            {m.role === "user" && <VioletAIAvatar />}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="relative flex items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask questions about your data..."
          className="w-full px-3 py-2 rounded-lg border border-[#e9e0f8] text-gray-700 shadow pr-10"
        />
        <button
          onClick={sendMessage}
          className="absolute right-2 top-1/2 -translate-y-1/2 primary hover:bg-[#f4e9ff] rounded-full p-2 transition"
        >
          <FiSend size={15} />
        </button>
      </div>
    </aside>
  );
};
