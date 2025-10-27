// components/ChatBox.tsx
import React from "react";

export const ChatBox: React.FC = () => (
  <div className="fixed bottom-2 right-2 md:bottom-8 md:right-8 bg-white shadow rounded-xl px-2 py-2 md:px-4 md:py-3 w-11/12 md:w-80 z-50">
    <div className="font-semibold text-gray-700 mb-2">Chat</div>
    <div className="bg-gray-100 text-gray-500 px-3 py-2 text-sm mb-2 rounded">
      Temporary chat is available. Start a new message.
    </div>
    <input
      type="text"
      placeholder="Start chat..."
      className="w-full px-3 py-2 rounded bg-gray-50 border"
    />
  </div>
);
