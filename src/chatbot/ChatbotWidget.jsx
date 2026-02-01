import { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import chatbotIcon from "../assets/chatbot-icon.jpg";
import api from "../api/axios";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      api.post("/api/chat/reset").catch(() => {
      });
    }
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-6 z-50">
          <ChatWindow onClose={() => setOpen(false)} />
        </div>
      )}

      
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center group">
        
        <span className="mb-2 px-2 py-1 text-sm rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          WorkSure Agent
        </span>

        
        <button
          onClick={() => {
            if (!open) {
              setOpen(true); 
            }
          }}
          className={`
            w-14 h-14 rounded-full bg-cyan-500 shadow-lg
            flex items-center justify-center hover:bg-cyan-600
            transition-transform duration-200
            ${!open ? "animate-bounce" : ""}
            active:scale-90
          `}
        >
          <img
            src={chatbotIcon}
            alt="Chatbot"
            className="w-full h-full rounded-full object-cover"
          />
        </button>
      </div>
    </>
  );
}
