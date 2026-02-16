import { useState, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import chatbotIcon from "../assets/chatbot-icon.jpg";
import api from "../api/axios";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm WorkSure Agent. How can I help you today?",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  
  useEffect(() => {
    api.post("/api/chat/reset").catch(() => {
    });
  }, []);

  async function sendMessage(text) {
    if (!text.trim() || isTyping) return;

    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await api.post(
        "/api/chat",
        { message: text },
        { headers: { "Content-Type": "application/json" } }
      );

      setTimeout(() => {
        setMessages([
          ...newMessages,
          {
            sender: "bot",
            text: response.data.reply,
          },
        ]);
        setIsTyping(false);
      }, 800);
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: "⚠️ Unable to connect to server.",
        },
      ]);
      setIsTyping(false);
    }
  }

  return (
    <div
      className="
        fixed bottom-24 right-6
        w-[380px] h-[520px]
        bg-white dark:bg-gray-900
        rounded-2xl shadow-2xl
        flex flex-col overflow-hidden
        animate-slideUp
      "
    >
      
      <div
        className="flex items-center justify-between px-4 py-3 text-white"
        style={{ backgroundColor: "#f59e0b" }}
      >
        <div className="flex items-center gap-2 font-semibold">
          <img
            src={chatbotIcon}
            alt="Chatbot"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>WorkSure Agent</span>
        </div>

        <button onClick={onClose} className="text-xl hover:opacity-80">
          ✕
        </button>
      </div>

      
      <ChatMessages
        messages={messages}
        isTyping={isTyping}
        onQuickSend={sendMessage}
      />

      
      <ChatInput sendMessage={sendMessage} isTyping={isTyping} />
    </div>
  );
}
