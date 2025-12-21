import React, { useState, useEffect, useRef } from "react";
import { ChatBubble } from "./ChatBubble";
import cvData from "@/data/cvMockData.json";

type Sender = "user" | "bot";

interface Message {
  sender: Sender;
  text: string;
}

const badges = ["Summary", "Experience", "Education", "Skills", "Projects", "Contact"];

export const CVChatModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Hi! I'm your CV assistant. Ask a question or click a badge below." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const addBotMessage = async (text: string) => {
    setLoading(true);
    // simulate typing delay
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));
    setMessages((prev) => [...prev, { sender: "bot", text }]);
    setLoading(false);
  };

  const handleBadgeClick = (badge: string) => {
    switch (badge.toLowerCase()) {
      case "summary":
        addBotMessage(cvData.summary);
        break;
      case "experience":
        const expText = cvData.experience
          .map(
            (e) =>
              `${e.role} at ${e.company} (${e.period})\n- ${e.details.join("\n- ")}`
          )
          .join("\n\n");
        addBotMessage(expText);
        break;
      case "education":
        const eduText = cvData.education
          .map(
            (e) =>
              `${e.degree}, ${e.university} (${e.session})\nMajor: ${e.major}, CGPA: ${e.cgpa}`
          )
          .join("\n\n");
        addBotMessage(eduText);
        break;
      case "skills":
        addBotMessage(cvData.skills.join(", "));
        break;
      case "projects":
        const projText = cvData.projects
          .map((p) => `${p.title}: ${p.description} (${p.link})`)
          .join("\n\n");
        addBotMessage(projText);
        break;
      case "contact":
        const c = cvData.contact;
        addBotMessage(`Name: ${c.name}\nPhone: ${c.phone}\nEmail: ${c.email}\nLinkedIn: ${c.linkedin}\nPortfolio: ${c.portfolio}\nGitHub: ${c.github}`);
        break;
      default:
        addBotMessage("I don't have information on that.");
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    // Keyword matching
    const keyword = userMessage.toLowerCase();
    if (keyword.includes("experience")) handleBadgeClick("experience");
    else if (keyword.includes("skill")) handleBadgeClick("skills");
    else if (keyword.includes("education")) handleBadgeClick("education");
    else if (keyword.includes("project")) handleBadgeClick("projects");
    else if (keyword.includes("contact")) handleBadgeClick("contact");
    else if (keyword.includes("summary")) handleBadgeClick("summary");
    else addBotMessage("Sorry, I couldn't find that. Try selecting a badge below.");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="w-full max-w-md h-full bg-white dark:bg-gray-800 flex flex-col p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">CV Chat Assistant</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">Close</button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto mb-2">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} message={msg.text} sender={msg.sender} />
          ))}
          {loading && <div className="flex justify-start mb-3"><div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-2xl animate-pulse">Typing...</div></div>}
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {badges.map((b) => (
            <button
              key={b}
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => handleBadgeClick(b)}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-xl px-3 py-2 dark:bg-gray-700 dark:text-white"
            placeholder="Type a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
