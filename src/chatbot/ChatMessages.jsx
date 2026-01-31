import { useEffect, useRef } from "react";

export default function ChatMessages({ messages, isTyping, onQuickSend }) {
  const containerRef = useRef(null);

  
  useEffect(() => {
    containerRef.current.scrollTop =
      containerRef.current.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div
      ref={containerRef}
      className="
        flex-1 overflow-y-auto p-3
        bg-gray-50 dark:bg-gray-800
        space-y-3
      "
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={
            msg.sender === "user"
              ? `
                ml-auto max-w-[75%]
                bg-[#f59e0b] text-white
                px-4 py-2 text-sm
                rounded-2xl rounded-br-none
                shadow
              `
              : `
                max-w-[75%]
                bg-white dark:bg-gray-700
                text-gray-800 dark:text-gray-100
                px-4 py-2 text-sm
                rounded-2xl rounded-bl-none
                shadow
              `
          }
        >
          <p className="whitespace-pre-line">
            {msg.text}
          </p>
        </div>
      ))}

      {isTyping && (
        <div
          className="
            max-w-[75%]
            bg-white dark:bg-gray-700
            text-gray-800 dark:text-gray-100
            px-4 py-2 text-sm
            rounded-2xl rounded-bl-none
            shadow flex items-center gap-1
          "
        >
          typing
          <span className="animate-pulse">.</span>
          <span className="animate-pulse delay-150">.</span>
          <span className="animate-pulse delay-300">.</span>
        </div>
      )}

      {!isTyping && (
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => onQuickSend("I need an electrician")}
            className="px-3 py-1 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] text-sm hover:bg-[#f59e0b]/30"
          >
            ⚡️ Electrician
          </button>

          <button
            onClick={() => onQuickSend("I need a plumber")}
            className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm hover:bg-blue-200"
          >
            🚰 Plumber
          </button>

          <button
            onClick={() => onQuickSend("I need a carpenter")}
            className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm hover:bg-yellow-200"
          >
            🪚 Carpenter
          </button>

          <button
            onClick={() => onQuickSend("I need a painter")}
            className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm hover:bg-purple-200"
          >
            🎨 Painter
          </button>

        </div>
      )}
    </div>
  );
}