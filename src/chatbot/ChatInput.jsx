import { useState, useRef, useEffect } from "react";

export default function ChatInput({ sendMessage, isTyping }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  function handleSend() {
    if (!text.trim() || isTyping) return;

    sendMessage(text);
    setText("");

    
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  
  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  return (
    <div className="flex items-center p-2 border-t border-gray-300 bg-white">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your message..."
        value={text}
        disabled={isTyping}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bg-[#f59e0b] disabled:bg-gray-100 disabled:cursor-not-allowed"
      />

      {/* SEND BUTTON */}
      <button
        onClick={handleSend}
        disabled={isTyping}
        className="ml-2 px-3 py-2 bg-[#f59e0b] text-white rounded hover:bg-[#f59e0b] disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Send
      </button>

      {/* CLEAR BUTTON */}
      <button
        onClick={() => {
          setText("");
          inputRef.current?.focus();
        }}
        disabled={isTyping}
        className="ml-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Clear
      </button>
    </div>
  );
}
