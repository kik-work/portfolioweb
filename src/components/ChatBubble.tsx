import React from "react";

interface ChatBubbleProps {
  message: string;
  sender: "user" | "bot";
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender }) => {
  return (
    <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`
          max-w-[80%] px-4 py-2 rounded-2xl wrap-break-word
          ${sender === "user" ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-gray-900 rounded-bl-none"}
        `}
      >
        {message}
      </div>
    </div>
  );
};
