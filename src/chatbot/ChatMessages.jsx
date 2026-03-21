import { useEffect, useRef, useState } from "react";

export default function ChatMessages({ messages, isTyping, onQuickSend }) {

  const containerRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight;
    }
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

      {/* Chat Messages */}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={
            msg.sender === "user"
              ? `
                ml-auto max-w-[75%]
                bg-[#f59e0b] text-white
                px-3 py-2 text-sm
                rounded-2xl rounded-br-none
                shadow
              `
              : `
                max-w-[75%]
                bg-white dark:bg-gray-700
                text-gray-800 dark:text-gray-100
                px-3 py-2 text-sm
                rounded-2xl rounded-bl-none
                shadow
              `
          }
        >
          <p className="whitespace-pre-line">{msg.text}</p>
        </div>
      ))}

      {/* Typing Animation */}
      {isTyping && (
        <div
          className="
            max-w-[75%]
            bg-white dark:bg-gray-700
            text-gray-800 dark:text-gray-100
            px-3 py-2 text-sm
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

      {/* Quick Service Buttons */}
      {!isTyping && (
        <div className="pt-2 space-y-2">

          <p className="text-xs text-gray-500">
            🔧 Popular Services
          </p>

          {/* Popular Services */}
          <div className="grid grid-cols-3 gap-2">

            <button
              onClick={() => onQuickSend("I need an electrician")}
              className="px-2 py-1 text-xs rounded-full bg-[#f59e0b]/20 text-[#f59e0b] hover:bg-[#f59e0b]/30 transition"
            >
              ⚡ Electrician
            </button>

            <button
              onClick={() => onQuickSend("I need a plumber")}
              className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              🚰 Plumber
            </button>

            <button
              onClick={() => onQuickSend("I need a carpenter")}
              className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
            >
              🪚 Carpenter
            </button>

            <button
              onClick={() => onQuickSend("I need a painter")}
              className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
            >
              🎨 Painter
            </button>

          </div>

          {/* Show More Button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className="
              text-xs font-medium
              text-[#f59e0b]
              hover:text-white
              hover:bg-[#f59e0b]
              px-2 py-1
              rounded-md
              transition
            "
          >
            {showMore ? "▲ Show Less Services" : "▼ Show More Services"}
          </button>

          {/* Extra Services */}
          {showMore && (
            <div className="grid grid-cols-3 gap-2">

              <button
                onClick={() => onQuickSend("I need a mason")}
                className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 transition"
              >
                🧱 Mason
              </button>

              <button
                onClick={() => onQuickSend("I need a welder")}
                className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
              >
                🔥 Welder
              </button>

              <button
                onClick={() => onQuickSend("I need HVAC service")}
                className="px-2 py-1 text-xs rounded-full bg-cyan-100 text-cyan-700 hover:bg-cyan-200 transition"
              >
                🌬 HVAC
              </button>

              <button
                onClick={() => onQuickSend("I need a landscaper")}
                className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
              >
                🌿 Landscaper
              </button>

              <button
                onClick={() => onQuickSend("I need a contractor")}
                className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
              >
                🏗 Contractor
              </button>

              <button
                onClick={() => onQuickSend("I need a cleaner")}
                className="px-2 py-1 text-xs rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 transition"
              >
                🧹 Cleaner
              </button>

              <button
                onClick={() => onQuickSend("I need equipment repair")}
                className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                🔧 Repair
              </button>

              <button
                onClick={() => onQuickSend("I need general services")}
                className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200 transition"
              >
                ⚙ General
              </button>

            </div>
          )}

        </div>
      )}

    </div>
  );
}