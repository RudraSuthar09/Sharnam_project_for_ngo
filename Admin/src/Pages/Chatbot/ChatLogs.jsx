import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const ChatbotLogs = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    // Fetch previous chat logs from the database
    const fetchLogs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/chatbot/logs");
        const formattedLogs = res.data.map(log => ({
          sender: "user",
          text: log.message
        })).concat(
          res.data.map(log => ({
            sender: "bot",
            text: log.response
          }))
        );
        setMessages(formattedLogs);
      } catch (error) {
        console.error("Error fetching chat logs:", error);
      }
    };

    fetchLogs();

    // Connect to WebSocket
    socket.current = new WebSocket("ws://localhost:4000");

    socket.current.onmessage = (event) => {
      const { sender, text } = JSON.parse(event.data);
      setMessages((prev) => [...prev, { sender, text }]);
    };

    return () => {
      socket.current.close();
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const msg = { sender: "admin", text: input };
    socket.current.send(JSON.stringify(msg));
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">💬 Admin Chat Monitor</h2>

      <div className="h-80 overflow-y-auto border-b mb-4 p-2 bg-gray-50 rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 ${msg.sender === "admin" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.sender === "admin"
                  ? "bg-purple-500 text-white"
                  : msg.sender === "user"
                  ? "bg-blue-200 text-black"
                  : "bg-green-200 text-black"
              }`}
            >
              <strong>{msg.sender.charAt(0).toUpperCase() + msg.sender.slice(1)}:</strong> {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded-lg"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotLogs;
