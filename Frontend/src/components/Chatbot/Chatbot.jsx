import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Bot, User } from "lucide-react";

const API_BASE = "http://localhost:4000";

/**
 * Reads last known context from localStorage (optional)
 * We'll store it when user clicks important buttons/pages.
 */
function getChatContext() {
  try {
    const raw = localStorage.getItem("chat_context");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * If backend (or model) still returns JSON as a string, this keeps UI clean:
 * - If it contains { reply: "..."} or { response: "..."} -> show only that
 * - Otherwise pretty-print it (so it's still readable)
 */
function formatIfJson(text) {
  if (typeof text !== "string") return String(text ?? "");

  const trimmed = text.trim();
  if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) return text;

  try {
    const obj = JSON.parse(trimmed);

    if (obj.reply) return obj.reply;
    if (obj.response) return obj.response;
    if (obj.message) return obj.message;

    return JSON.stringify(obj, null, 2);
  } catch {
    return text;
  }
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m Sharanam Assistant. Do you need help with rescue, first-aid, or finding a nearby vet?",
      actions: [
        { type: "OPEN_ROUTE", route: "/vetlocator", label: "Find nearby vets" },
        { type: "OPEN_ROUTE", route: "/report-rescue", label: "Report a rescue" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  const addMsg = (msg) => setMessages((prev) => [...prev, msg]);

  const runAction = (a) => {
    if (!a) return;

    if (a.type === "OPEN_ROUTE" && a.route) {
      window.location.href = a.route;
      return;
    }

    if (a.type === "SHOW_HELPLINE" && a.phone) {
      window.location.href = `tel:${a.phone}`;
      return;
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    // 1) Show user message immediately
    addMsg({ sender: "user", text });
    setInput("");

    // 2) Call Gemini through backend
    setIsTyping(true);
    try {
      const context = getChatContext();

      const res = await fetch(`${API_BASE}/api/chatbot/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, context }),
      });

      // Safety: handle non-JSON errors gracefully
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Chatbot API failed: ${res.status} ${errText}`);
      }

      const data = await res.json();

      // Normalize bot text
      const rawBotText =
        typeof data === "string"
          ? data
          : data?.reply || data?.response || data?.message || "No reply from bot.";

      const botText = formatIfJson(rawBotText);

      // Normalize actions (optional)
      const actions = Array.isArray(data?.actions) ? data.actions : [];

      addMsg({ sender: "bot", text: botText, actions });
    } catch (err) {
      console.error("Chatbot error:", err);
      addMsg({
        sender: "bot",
        text: "Sorry, I’m having trouble replying right now. Please try again in a moment.",
        actions: [
          { type: "OPEN_ROUTE", route: "/vetlocator", label: "Open VetLocator" },
          { type: "OPEN_ROUTE", route: "/report-rescue", label: "Report Rescue" },
        ],
      });
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-500 p-4 rounded-full shadow-lg"
          aria-label="Open chatbot"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-300 overflow-hidden">
          {/* Header */}
          <div className="bg-yellow-400 text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <h2 className="text-lg font-semibold">Sharanam Assistant</h2>
                <p className="text-xs text-white/90">
                  Rescue • First-aid • Nearby vets
                </p>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} aria-label="Close chatbot">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 flex flex-col bg-gradient-to-b from-white to-yellow-50">
            {messages.map((msg, i) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={i}
                  className={`max-w-xs ${isUser ? "self-end ml-auto" : "self-start mr-auto"}`}
                >
                  <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        isUser ? "bg-yellow-200" : "bg-gray-200"
                      }`}
                      title={isUser ? "You" : "Bot"}
                    >
                      {isUser ? (
                        <User className="w-4 h-4 text-gray-700" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-700" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`p-2.5 rounded-2xl text-sm shadow-sm border whitespace-pre-wrap ${
                        isUser
                          ? "bg-yellow-100 text-gray-900 border-yellow-200 rounded-br-md"
                          : "bg-white text-gray-900 border-gray-200 rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>

                  {/* Action chips under bot messages */}
                  {!isUser && Array.isArray(msg.actions) && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-9">
                      {msg.actions.map((a, idx) => (
                        <button
                          key={idx}
                          onClick={() => runAction(a)}
                          className="text-xs px-3 py-1 rounded-full border border-yellow-300 bg-yellow-50 hover:bg-yellow-100"
                        >
                          {a.label ||
                            (a.type === "OPEN_ROUTE" ? "Open page" : "Call helpline")}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="max-w-xs self-start mr-auto">
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="px-3 py-2 rounded-2xl bg-white border border-gray-200 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.1s]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about rescue, first-aid, vets..."
              className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-yellow-300"
            />
            <button
              onClick={handleSend}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl font-medium"
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