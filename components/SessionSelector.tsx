"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { ChevronDown, Pencil, Trash2, Check, X } from "lucide-react";
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
  refreshTrigger?: number;
}

export default function SessionSelector({ onSessionChange, onNewFile, refreshTrigger }: Props) {
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [initialSelectDone, setInitialSelectDone] = useState(false);


  const loadSessions = async () => {
    try {
      const res = await axiosInstance.get("/session");
      if (!res.data.session) {
        console.log(res.data.session)
      }

      const allSessions = res.data.sessions || [];
      setSessions(allSessions);

      const saved = localStorage.getItem("currentSessionId");

      if (!initialSelectDone && saved) {
        setInitialSelectDone(true);
        setCurrentSession(saved);
        onSessionChange(saved);
        return;
      }


      if (allSessions.length > 0) {
        const latest = allSessions[0]._id;
        localStorage.setItem("currentSessionId", latest);
        setCurrentSession(latest);
        onSessionChange(latest);
      }

    } catch (err) {
      console.error("Failed to load sessions:", err);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (!refreshTrigger) return;
    loadSessions();
  }, [refreshTrigger]);



  const handleSelect = (id: string) => {
    localStorage.setItem("currentSessionId", id);
    setCurrentSession(id);

    setDropdownOpen(false);
    onSessionChange(id);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/session/${id}`);

      const updated = sessions.filter((s) => s._id !== id);
      setSessions(updated);

      if (currentSession === id) {
        localStorage.removeItem("currentSessionId");
        setCurrentSession(null);
        onNewFile();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startEditing = (session: SessionItem) => {
    setEditingId(session._id);
    setEditValue(session.title);
  };

  const saveEdit = async (id: string) => {
    const newName = editValue.trim();
    if (!newName) return;

    try {
      await axiosInstance.patch(`/session/${id}`, { title: newName });

      const updated = sessions.map((s) =>
        s._id === id ? { ...s, title: newName } : s
      );
      setSessions(updated);
    } catch (err) {
      console.error("Rename failed:", err);
    }

    setEditingId(null);
  };

  const formatTitle = (title: string) => {
    if (!title) return "";
    const cleaned = title.replace(/^\d+_/, "");
    return cleaned.length > 25 ? cleaned.substring(0, 25) + "..." : cleaned;
  };
  return (
  <div className="relative w-[260px]">

    {/* DROPDOWN BUTTON */}
    <button
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className="
        w-full flex items-center justify-between
        px-4 py-2 bg-white border border-gray-300 
        rounded-lg shadow-sm hover:border-[#ad49e1]
        transition text-sm font-medium
      "
    >
      {/* FIXED WIDTH TITLE BOX */}
      <span className="text-gray-700 block w-[180px] truncate">
        {formatTitle(
          sessions.find((s) => s._id === currentSession)?.title ||
          "Select Session"
        )}
      </span>

      <ChevronDown
        className={`w-4 h-4 flex-shrink-0 transition-transform ${
          dropdownOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    {/* DROPDOWN LIST */}
    {dropdownOpen && (
      <div
        className="
          absolute mt-2 w-full bg-white rounded-lg shadow-lg
          border border-gray-200 max-h-64 overflow-y-auto z-20
        "
      >
        {sessions.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-3">
            No sessions yet
          </p>
        ) : (
          sessions.map((session) => {
            const isEditing = editingId === session._id;

            return (
              <div
                key={session._id}
                className={`
                  px-4 py-2 border-b last:border-none
                  hover:bg-purple-50 transition cursor-pointer
                  ${currentSession === session._id ? "bg-purple-100" : ""}
                `}
              >
                <div className="flex items-center justify-between w-full">

                  {/* LEFT SIDE — TITLE / EDIT */}
                  <div className="flex-1 overflow-hidden pr-3">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit(session._id);
                            if (e.key === "Escape") setEditingId(null);
                          }}
                          onBlur={() => saveEdit(session._id)}
                          className="
                            px-2 py-1 border border-gray-300 rounded
                            text-xs w-full outline-none focus:border-[#ad49e1]
                          "
                          autoFocus
                        />
                        <Check
                          size={16}
                          className="text-green-600 cursor-pointer"
                          onClick={() => saveEdit(session._id)}
                        />
                        <X
                          size={16}
                          className="text-gray-500 cursor-pointer"
                          onClick={() => setEditingId(null)}
                        />
                      </div>
                    ) : (
                      <div onClick={() => handleSelect(session._id)}>
                        <p className="text-sm font-medium text-gray-700 truncate">
                          {formatTitle(session.title)}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          updated {new Date(session.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* RIGHT SIDE ICONS */}
                  {!isEditing && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Pencil
                        size={16}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={() => startEditing(session)}
                      />
                      <Trash2
                        size={16}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(session._id);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    )}
  </div>
);


}
