"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiSend, FiArrowDownCircle } from "react-icons/fi";
import VioletAIAvatar from "./VioletAIAvatar";
import { useAnalysis } from "@/context/AnalysisContext";
import axiosInstance from "@/lib/axiosInstance";
import { getSession } from "@/lib/sessionApi";

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
}) => {
  const [input, setInput] = useState("");
  const { addNewChart, setLoading } = useAnalysis();

  const [userImage, setUserImage] = useState("/user.jpg");
  const [aiTyping, setAiTyping] = useState(false);

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const sessionId =
    typeof window !== "undefined"
      ? localStorage.getItem("currentSessionId")
      : null;

  useEffect(() => {
    if (!sessionId) return;

    (async () => {
      try {
        const session = await getSession(sessionId);

        const restored = session.messages.flatMap((m) => {
          const arr: { role: "user" | "ai"; text: string }[] = [];

          if (m.user && m.user.trim() !== "") {
            arr.push({ role: "user", text: m.user });
          }

          if (m.ai && m.ai.trim() !== "") {
            arr.push({ role: "ai", text: m.ai });
          }

          return arr;
        });

        setMessages(restored);
      } catch (err) {
        console.log("Failed to load past messages:", err);
      }
    })();
  }, [sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    let decoded: any;
    try {
      decoded = JSON.parse(atob(token.split(".")[1]));
    } catch {
      return;
    }

    const id = decoded.id || decoded.googleId || decoded.userId;
    if (!id) return;

    (async () => {
      try {
        const res = await axiosInstance.get(`/user/${id}`);
        if (res.data.user?.picture) setUserImage(res.data.user.picture);
      } catch {}
    })();
  }, []);

  const handleScroll = () => {
    if (!messagesRef.current) return;
    const el = messagesRef.current;

    const isAtBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 20;

    setShowScrollButton(!isAtBottom);
  };

  const scrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  const sendMessage = async () => {
    if (!input.trim() || aiTyping) return;
    if (!sessionId) return alert("No active session found!");

    const text = input.trim();
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "34px";
    }

    setMessages((prev) => [...prev, { role: "user", text }]);
    setAiTyping(true);

    try {
      setLoading(true);

      const res = await axiosInstance.post(
        `/session/${sessionId}/message`,
        { user: text }
      );

      const reply = res.data.reply || "";
      const chart = res.data.chart?.chart || null;

      setMessages((prev) => [...prev, { role: "ai", text: reply }]);

      if (chart) addNewChart(chart);
    } catch (err) {
      console.log(err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error communicating with server." },
      ]);
    } finally {
      setAiTyping(false);
      setLoading(false);
    }
  };

  if (!dataUploaded) {
    return (
      <aside
        className={`${
          mobile ? "h-[55vh]" : "h-[93vh] md:w-96"
        } w-full fixed ${
          mobile ? "bottom-0" : "top-12 right-0"
        } bg-white p-4 flex flex-col border-t md:border-l border-gray-200`}
      >
        <div className="text-center mt-40">
          <h2 className="text-lg font-semibold primary mb-2">
            Upload a file to chat with InstaviZ AI
          </h2>
          <p className="text-sm text-gray-500">
            InstaviZ AI is ready — upload your CSV to get started.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`flex flex-col bg-white ${
        mobile
          ? "h-[55vh] fixed bottom-0 left-0 right-0 rounded-t-2xl"
          : "h-[93vh] fixed right-0 top-12 md:w-96"
      } p-4 border-t md:border-l border-gray-200`}
    >
      <h1 className="text-lg font-semibold primary mt-4">Ask InstaviZ AI</h1>
      <div
        ref={messagesRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto space-y-3 pr-1"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            } gap-2`}
          >
            {msg.role === "ai" && (
              <>
                <VioletAIAvatar />
                <div
                  className="
                    px-3 py-1.5 bg-gray-50 text-gray-800 rounded-xl text-xs shadow-sm
                    max-w-[75%] break-words whitespace-pre-wrap
                  "
                >
                  {msg.text}
                </div>
              </>
            )}

            {msg.role === "user" && (
              <>
                <div
                  className="
                    px-3 py-1.5 bg-[#f7edff] primary rounded-xl text-xs shadow-sm
                    max-w-[75%] break-words whitespace-pre-wrap
                  "
                >
                  {msg.text}
                </div>
                <img
                  src={userImage}
                  className="w-6 h-6 rounded-full border object-cover shrink-0"
                />
              </>
            )}
          </div>
        ))}

        {aiTyping && (
          <div className="flex items-center gap-2">
            <VioletAIAvatar />
            <div className="flex gap-1">
              <span className="dot" />
              <span className="dot delay-150" />
              <span className="dot delay-300" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute right-4 bottom-20 bg-white shadow px-2 py-1 rounded-full border"
        >
          <FiArrowDownCircle size={20} className="primary" />
        </button>
      )}

      <div className="relative mt-2 flex items-end gap-2">
        <textarea
          ref={textareaRef}
          disabled={aiTyping}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            const el = e.target;
            el.style.height = "34px";
            el.style.height =
              Math.min(el.scrollHeight, 110) + "px";
          }}
          onKeyDown={(e) => {
            if (!aiTyping && e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask anything about your data…"
          className="
            w-full px-3 py-2
            border rounded-xl text-sm
            shadow-sm leading-5
            resize-none overflow-hidden
            transition-colors duration-150
            focus:border-[#AD49E1]
            outline-none
            placeholder-gray-400
          "
          style={{
            height: "34px",
            maxHeight: "110px",
          }}
        />

        <button
          disabled={aiTyping}
          onClick={sendMessage}
          className={`p-3 rounded-full shrink-0 ${
            aiTyping ? "bg-gray-200" : "primary hover:bg-[#f4e9ff]"
          } transition`}
        >
          <FiSend size={16} />
        </button>
      </div>
    </aside>
  );
};
