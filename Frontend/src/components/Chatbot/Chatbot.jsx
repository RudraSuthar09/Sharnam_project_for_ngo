import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:4000");

    socket.current.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    socket.current.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
    };

    return () => {
      socket.current?.close();
    };
  }, []);

  const handleSend = () => {
    if (input.trim() === "") return;
    const message = { sender: "user", text: input };
    socket.current?.send(JSON.stringify(message));
    setMessages((prev) => [...prev, message]);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-500 p-4 rounded-full shadow-lg"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-300">
          {/* Header */}
          <div className="bg-yellow-400 text-white px-4 py-3 rounded-t-2xl flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chat with us</h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 max-w-xs rounded-lg text-sm ${
                  msg.sender === "user"
                    ? "bg-yellow-100 self-end ml-auto text-right"
                    : "bg-gray-100 self-start mr-auto text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-yellow-300"
            />
            <button
              onClick={handleSend}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
