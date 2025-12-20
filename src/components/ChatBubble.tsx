import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    sender: "user" | "bot" | "system";
    text: string;
}

const QUICK_QUESTIONS = [
    "What is your tech stack?",
    "Tell me about your projects",
    "Are you a frontend or full-stack developer?",
    "Are you available for remote work?"
];

export default function ChatBubble() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom whenever messages or loading state changes
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async (msgText?: string) => {
        const text = msgText || input.trim();
        if (!text) return;

        const userMessage: Message = { sender: "user", text };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });

            if (!res.ok) throw new Error("Network response was not ok");

            const data = await res.json();
            const botMessage: Message = { sender: "bot", text: data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: Message = {
                sender: "bot",
                text: "Server error. Please try again later.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating toggle button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-4 right-4 z-50 w-16 h-16 rounded-full bg-primary text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
                title="Chat with me"
            >
                💬
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed bottom-24 right-4 z-50 w-80 h-[500px] bg-dark text-white rounded-xl shadow-xl flex flex-col overflow-hidden"
                    >
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded-xl max-w-[80%] wrap-break-word text-sm leading-relaxed
                    ${msg.sender === "user"
                                            ? "bg-primary self-end text-white"
                                            : msg.sender === "bot"
                                                ? "bg-gray-800 self-start text-gray-100"
                                                : "bg-gray-600 self-center text-gray-200 italic"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}

                            {loading && (
                                <div className="p-3 rounded-xl bg-gray-800 self-start italic animate-pulse text-sm">
                                    Typing...
                                </div>
                            )}

                            <div ref={bottomRef} />
                        </div>

                        {/* Quick questions */}
                        <div className="flex flex-wrap gap-2 p-2 border-t border-gray-700">
                            {QUICK_QUESTIONS.map((q, i) => (
                                <button
                                    key={i}
                                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full text-sm transition-colors"
                                    onClick={() => sendMessage(q)}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="flex p-2 border-t border-gray-700">
                            <input
                                type="text"
                                className="flex-1 bg-gray-900 text-white rounded-l-xl px-3 py-2 focus:outline-none placeholder-gray-400"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Ask me something about my CV..."
                            />
                            <button
                                onClick={() => sendMessage()}
                                className="bg-primary px-4 rounded-r-xl text-white font-bold hover:bg-blue-600 transition-colors"
                            >
                                Send
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
