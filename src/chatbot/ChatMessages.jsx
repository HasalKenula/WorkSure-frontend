import { useEffect, useRef } from "react";

export default function ChatMessages({ messages, isTyping, onQuickSend }) {
  const containerRef = useRef(null);

  // ✅ AUTO SCROLL
  useEffect(() => {
    containerRef.current.scrollTop =
      containerRef.current.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div className="chatbot-body" ref={containerRef}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.sender}`}
        >
          {msg.text}
        </div>
      ))}

      {/* ⏳ TYPING INDICATOR */}
      {isTyping && (
        <div className="chat-message bot typing">
          WorkSure Assistant is typing<span className="dots">...</span>
        </div>
      )}

{/* ✅ QUICK ACTION BUTTONS */}
{!isTyping && (
  <div className="quick-actions">
    <button onClick={() => onQuickSend("I need an electrician")}>
      ⚡️ Electrician
    </button>

    <button onClick={() => onQuickSend("I need a plumber")}>
      🚰 Plumber
    </button>

    <button onClick={() => onQuickSend("I need a carpenter")}>
      🪚 Carpenter
    </button>

    <button onClick={() => onQuickSend("I need a painter")}>
      🎨 Painter
    </button>

    <button onClick={() => onQuickSend("I need a mason")}>
      🧱 Mason
    </button>
  </div>
)}
    </div>
  );
}