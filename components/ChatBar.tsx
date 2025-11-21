"use client";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import VioletAIAvatar from "./VioletAIAvatar";
import { useAnalysis } from "@/context/AnalysisContext";
import axiosInstance from "@/lib/axiosInstance";

type ChatBarProps = {
  dataUploaded: boolean;
  setDataUploaded: (val: boolean) => void;
  messages: { role: "user" | "ai"; text: string }[];
  setMessages: React.Dispatch<
    React.SetStateAction<{ role: "user" | "ai"; text: string }[]>
  >;
  mobile?: boolean; // NEW → detect mobile version
  onClose?: () => void; // NEW → close button for mobile
};

export const ChatBar: React.FC<ChatBarProps> = ({
  dataUploaded,
  messages,
  setMessages,
  mobile = false,
  onClose,
}) => {
  const [input, setInput] = useState("");
  const { addNewChart, setLoading } = useAnalysis();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const text = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text }]);

    try {
      setLoading(true);

      const res = await axiosInstance.post("/chat", { message: text });
      const data = res.data;

      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);

      if (data.chart) addNewChart(data.chart);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error communicating with server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

 // BEFORE UPLOAD
if (!dataUploaded) {
  return (
    <aside
      className={`
        ${mobile ? "h-[55vh]" : "h-[93vh] md:w-96"}
        w-full fixed
        ${mobile ? "bottom-0" : "top-12 right-0"}
        bg-white p-4 flex flex-col
        border-t md:border-l border-gray-200
      `}
    >
      {/* Header Row */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-lg font-semibold primary mt-2">
          InstaviZ AI Chat
        </h1>

        {mobile && (
          <button
            onClick={onClose}
            className="primary hover:text-gray-700 text-xl font-bold mr-2"
          >
            ×
          </button>
        )}
      </div>

      {/* Message */}
      <div className="text-center mt-40 ">
        <h2 className="text-lg font-semibold primary mb-2">
            Upload a file to chat with InstaviZ AI
          </h2>
          <p className="text-sm text-gray-500">
            InstaviZ AI is ready to answer — upload your CSV to begin.
          </p>
      </div>
    </aside>
  );
}


  return (
    <aside
      className={`
        flex flex-col bg-white
        ${mobile ? "h-[55vh] fixed bottom-0 left-0 right-0 rounded-t-2xl" : "h-[93vh] fixed right-0 top-12 md:w-96"}
        p-4 border-t md:border-l border-gray-200
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-semibold primary">
          Ask InstaviZ AI
        </h1>

        {mobile && (
          <button onClick={onClose} className="primary text-xl">
            ×
          </button>
        )}
      </div>

      {/* CHAT MESSAGES */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-hide">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}
          >
            {m.role === "ai" && <VioletAIAvatar />}
            <div
              className={`px-3 py-1.5 rounded-xl text-xs shadow-sm max-w-[80%] ${
                m.role === "user"
                  ? "bg-[#f7edff] primary"
                  : "bg-gray-50 text-gray-800"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="relative flex items-center mt-2">
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
