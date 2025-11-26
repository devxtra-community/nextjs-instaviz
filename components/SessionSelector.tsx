"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { ChevronDown, PlusCircle } from "lucide-react";
import type { AxiosResponse } from "axios";

interface SessionItem {
  _id: string;
  title: string;
  updatedAt: string;
  data_id?: any;
}

interface SessionResponse {
  sessions: SessionItem[];
  session_token?: string;
}

interface Props {
  onSessionChange: (sessionId: string) => void;
  onNewFile: () => void;
}

export default function SessionSelector({ onSessionChange, onNewFile }: Props) {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const res: AxiosResponse<SessionResponse> = await axiosInstance.get("/session");
        setSessions(res.data.sessions || []);
        if (!localStorage.getItem("accessToken") && res.data.session_token) {
          localStorage.setItem("session_token", res.data.session_token);
        }
        const saved = localStorage.getItem("currentSessionId");
        if (saved) setCurrentSession(saved);
      } catch (err) {
        console.error("Failed to load sessions:", err);
      }
    };
    loadSessions();
  }, []);

  const handleSelect = (id: string) => {
    localStorage.setItem("currentSessionId", id);
    localStorage.setItem("sessionId", id);
    setCurrentSession(id);
    setDropdownOpen(false);
    onSessionChange(id);
  };

  return (
    <div className="relative w-full max-w-xs">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-teal-500 transition"
      >
        <span className="text-gray-700 font-medium">
          {sessions.find((s) => s._id === currentSession)?.title ||
            "Select Session"}
        </span>

        <ChevronDown
          className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {dropdownOpen ? (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto z-20">
          {sessions.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-3">
              No sessions yet
            </p>
          ) : null}

          {sessions.map((session) => (
            <button
              key={session._id}
              onClick={() => handleSelect(session._id)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${currentSession === session._id
                  ? "bg-gray-100 font-semibold"
                  : ""
                }`}
            >
              {session.title}
              <span className="block text-[11px] text-gray-400">
                updated {new Date(session.updatedAt).toLocaleDateString()}
              </span>
            </button>
          ))}

          <div className="border-t border-gray-200 my-1" />

          <button
            onClick={() => {
              setDropdownOpen(false);
              localStorage.removeItem("currentSessionId");
              localStorage.removeItem("sessionId");
              onNewFile();
            }}
            className="flex items-center justify-center gap-2 w-full py-2 text-teal-700 font-medium hover:bg-teal-50 text-sm"
          >
            <PlusCircle className="w-4 h-4" /> Start New File
          </button>
        </div>
      ) : null}
    </div>
  );
}