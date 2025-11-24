"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiSend, FiArrowDownCircle } from "react-icons/fi";
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
  mobile?: boolean;
  onClose?: () => void;
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
  const [userImage, setUserImage] = useState("/user.jpg");
  const [aiTyping, setAiTyping] = useState(false);



  const messagesRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [showScrollButton, setShowScrollButton] = useState(false);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const finalToken = localStorage.getItem("accessToken");


    if (!finalToken) return;

    let decoded: any;
    try {
      decoded = JSON.parse(atob(finalToken.split(".")[1])); // lightweight decode
    } catch {
      return;
    }

    const id = decoded.id || decoded.googleId || decoded.userId;
    if (!id) return;

    (async () => {
      try {
        const res = await axiosInstance.get(`/user/${id}`);
        if (res.data.user?.picture) setUserImage(res.data.user.picture);
      } catch {
        console.log("Failed to load user picture");
      }
    })();
  }, []);


  // Detect if user has scrolled up
  const handleScroll = () => {
    if (!messagesRef.current) return;
    const el = messagesRef.current;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    setShowScrollButton(!atBottom);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (aiTyping) return;
    if (!input.trim()) return;

    const text = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text }]);
    setAiTyping(true);

    try {
      setLoading(true);
      const res = await axiosInstance.post("/chat", { message: text });
      const data = res.data;

      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
      if (data.chart) addNewChart(data.chart);

    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error communicating with server." }
      ]);
    } finally {
      setAiTyping(false);
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
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-lg font-semibold primary mt-2">
            InstaviZ AI Chat
          </h1>
          {mobile && (
            <button onClick={onClose} className="primary text-xl font-bold">
              ×
            </button>
          )}
        </div>

        <div className="text-center mt-40">
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
        <h1 className="text-lg font-semibold primary">Ask InstaviZ AI</h1>
        {mobile && (
          <button onClick={onClose} className="primary text-xl">
            ×
          </button>
        )}
      </div>

      {/* CHAT MESSAGES */}
      <div
        ref={messagesRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto space-y-3 pr-1 "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
              } items-end gap-2`}
          >

            {/* AI SIDE (avatar left, bubble right) */}
            {m.role === "ai" && (
              <>
                <VioletAIAvatar />

                <div
                  className="px-3 py-1.5 rounded-xl text-xs shadow-sm max-w-[80%] bg-gray-50 text-gray-800"
                >
                  {m.text}
                </div>
              </>
            )}

            {/* USER SIDE (bubble left, avatar right) */}
            {m.role === "user" && (
              <>
                <div
                  className="px-3 py-1.5 rounded-xl text-xs shadow-sm max-w-[80%] bg-[#f7edff] primary"
                >
                  {m.text}
                </div>

                <img
                  src={userImage}
                  className="w-6 h-6 rounded-full border object-cover"
                  alt="User"
                />
              </>
            )}

          </div>
        ))}

        {aiTyping && (
          <div className="flex justify-start items-center gap-2 pl-1">
            <VioletAIAvatar />

            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
            </div>
          </div>
        )}



        {/* Scroll Anchor */}
        <div ref={bottomRef} />
      </div>

      {/* SCROLL TO BOTTOM BUTTON */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute right-4 bottom-20 bg-white shadow-md p-2 rounded-full border hover:cursor-pointer"
        >
          <FiArrowDownCircle size={20} className="primary" />
        </button>
      )}

      {/* INPUT SECTION */}
      <div className="relative mt-2 flex">
        <textarea
          disabled={aiTyping}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
          }}
          onKeyDown={(e) => {
            if (aiTyping) return;
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder={aiTyping ? "AI is thinking..." : "Ask questions about your data..."}
          className="w-full px-3 py-2 rounded-lg border border-[#e9e0f8]
          text-gray-700 shadow text-xs resize-none leading-snug
          max-h-[120px] overflow-hidden focus:border-[#ad49e1] 
          focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          rows={1}
        />


        <button
          disabled={aiTyping}
          onClick={sendMessage}
          className={`
    right-2 top-3 rounded-full p-2 transition
    ${aiTyping ? "bg-gray-200 cursor-not-allowed" : "primary hover:bg-[#f4e9ff]"}
  `}
        >
          {aiTyping ? (
            <div className="flex gap-1 px-1">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
            </div>
          ) : (
            <FiSend size={15} />
          )}
        </button>

      </div>
    </aside>
  );
};
