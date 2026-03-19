import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  Bot,
  Image as ImageIcon,
  Send,
  Trash2,
  ShieldAlert,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const InjuryAssistant = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      type: "text",
      text:
        "Hi! I’m Sharanam Injury Assistant.\nUpload an injury photo and I’ll suggest severity + first-aid.\n\nTips:\n• Good lighting\n• Close-up, less blur\n• Keep wound centered",
      time: new Date().toISOString(),
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  const previewUrl = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const push = (msg) => setMessages((prev) => [...prev, msg]);

  const resetChat = () => {
    setMessages([
      {
        role: "bot",
        type: "text",
        text:
          "Chat cleared ✅\nUpload a new photo when you are ready.\n\nIf severe bleeding / unconsciousness / breathing issues → contact a vet/rescue immediately.",
        time: new Date().toISOString(),
      },
    ]);
    setSelectedFile(null);
    setNote("");
  };

  const severityBadge = (severity) => {
    const s = (severity || "").toLowerCase();
    if (s.includes("high") || s.includes("severe"))
      return "bg-red-50 text-red-700 ring-1 ring-red-200";
    if (s.includes("medium") || s.includes("moderate"))
      return "bg-amber-50 text-amber-800 ring-1 ring-amber-200";
    if (s.includes("low") || s.includes("mild"))
      return "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200";
    return "bg-slate-100 text-slate-800 ring-1 ring-slate-200";
  };

  const analyze = async () => {
    if (!selectedFile || loading) return;

    // user bubble with local image preview
    push({
      role: "user",
      type: "image",
      imageUrl: previewUrl,
      text: note?.trim() ? note.trim() : "Please analyze this image.",
      time: new Date().toISOString(),
    });

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("image", selectedFile);

      const res = await axios.post(`${url}/api/injury/analyze`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });

      push({
        role: "bot",
        type: "result",
        data: res.data,
        time: new Date().toISOString(),
      });
    } catch (err) {
      push({
        role: "bot",
        type: "error",
        text:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to analyze. Please try again.",
        time: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
      setSelectedFile(null);
      setNote("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-emerald-50">
      {/* Top Header */}
      <div className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm font-extrabold text-slate-800 shadow-sm hover:bg-slate-50"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-yellow-400 text-black shadow-sm">
                <Bot size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-black text-slate-900">
                    Injury First-Aid Assistant
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-black px-2 py-0.5 text-[10px] font-extrabold text-yellow-300">
                    <Sparkles size={12} />
                    AI
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-600">
                  Upload photo → severity + first-aid suggestion
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={resetChat}
            className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm font-extrabold text-slate-800 shadow-sm hover:bg-slate-50"
          >
            <Trash2 size={16} />
            Clear
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Chat Box */}
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between border-b border-black/5 bg-slate-50 px-4 py-3">
            <div className="text-sm font-black text-slate-900">Conversation</div>
            <div className="text-[11px] font-semibold text-slate-600">
              API: <span className="font-mono">{url}/api/injury/analyze</span>
            </div>
          </div>

          <div className="h-[72vh] min-h-[520px] space-y-3 overflow-y-auto p-4">
            {messages.map((m, idx) => {
              const isUser = m.role === "user";

              if (m.type === "text") {
                return (
                  <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ring-1 ${
                        isUser
                          ? "bg-yellow-100 text-slate-900 ring-yellow-200"
                          : "bg-slate-50 text-slate-900 ring-black/5"
                      }`}
                    >
                      <pre className="whitespace-pre-wrap font-sans">{m.text}</pre>
                    </div>
                  </div>
                );
              }

              if (m.type === "image") {
                return (
                  <div key={idx} className="flex justify-end">
                    <div className="max-w-[86%] rounded-2xl bg-yellow-100 p-3 shadow-sm ring-1 ring-yellow-200">
                      <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
                        <img
                          src={m.imageUrl}
                          alt="upload"
                          className="h-56 w-full object-cover"
                        />
                      </div>
                      <div className="mt-2 text-xs font-extrabold text-slate-800">
                        {m.text}
                      </div>
                    </div>
                  </div>
                );
              }

              if (m.type === "result") {
                const { prediction, severity, advice, confidence } = m.data || {};
                const conf =
                  typeof confidence === "number"
                    ? Math.max(0, Math.min(1, confidence))
                    : null;

                return (
                  <div key={idx} className="flex justify-start">
                    <div className="max-w-[86%] rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/10">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-black text-slate-900">Analysis Result</div>
                          <div className="mt-0.5 text-xs font-semibold text-slate-600">
                            Based on your uploaded photo
                          </div>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${severityBadge(
                            severity
                          )}`}
                        >
                          {severity || "Unknown"}
                        </span>
                      </div>

                      <div className="mt-3 grid gap-2">
                        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-black/5">
                          <span className="text-xs font-bold text-slate-600">Prediction</span>
                          <span className="text-xs font-black text-slate-900">
                            {prediction || "-"}
                          </span>
                        </div>

                        <div className="rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-black/5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-600">Confidence</span>
                            <span className="text-xs font-black text-slate-900">
                              {conf === null ? "-" : `${(conf * 100).toFixed(2)}%`}
                            </span>
                          </div>
                          {conf !== null && (
                            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                              <div
                                className="h-full rounded-full bg-emerald-500"
                                style={{ width: `${conf * 100}%` }}
                              />
                            </div>
                          )}
                        </div>

                        <div className="rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-black/5">
                          <div className="text-xs font-bold text-slate-600">First-aid advice</div>
                          <div className="mt-1 text-sm font-semibold text-slate-900">
                            {advice || "-"}
                          </div>
                        </div>

                        <div className="flex gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 ring-1 ring-amber-200">
                          <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                          <p>
                            This is AI guidance only (not a diagnosis). If heavy bleeding /
                            unconsciousness / breathing issues → contact vet/rescue immediately.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (m.type === "error") {
                return (
                  <div key={idx} className="flex justify-start">
                    <div className="max-w-[86%] rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800 shadow-sm ring-1 ring-red-200">
                      {m.text}
                    </div>
                  </div>
                );
              }

              return null;
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-black/5">
                  Analyzing image…
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
            <div className="text-sm font-black text-slate-900">Upload injury photo</div>
            <p className="mt-1 text-xs font-semibold text-slate-600">
              Better image = better result. Avoid blur.
            </p>

            <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-black/20 bg-yellow-50 px-4 py-4 hover:bg-yellow-100/70">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white ring-1 ring-black/10">
                <ImageIcon size={18} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-black text-slate-900">
                  {selectedFile ? selectedFile.name : "Choose an image"}
                </div>
                <div className="text-xs font-semibold text-slate-600">PNG / JPG / JPEG</div>
              </div>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
            </label>

            {previewUrl && (
              <div className="mt-3 overflow-hidden rounded-2xl border border-black/10 bg-white">
                <img src={previewUrl} alt="preview" className="h-52 w-full object-cover" />
              </div>
            )}

            <div className="mt-3">
              <div className="text-xs font-black text-slate-700">Optional note</div>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Example: bleeding on left leg, found near road"
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-4 focus:ring-yellow-300"
              />
            </div>

            <button
              type="button"
              onClick={analyze}
              disabled={!selectedFile || loading}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-4 py-3 text-sm font-black text-black shadow-sm hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={16} />
              {loading ? "Analyzing..." : "Analyze & Reply"}
            </button>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2 text-sm font-black text-slate-900">
              <ShieldAlert size={16} />
              Emergency quick help
            </div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-semibold text-slate-700">
              <li>Use clean cloth to apply gentle pressure (stop bleeding).</li>
              <li>Keep animal calm + warm.</li>
              <li>If fracture suspected: do not move too much.</li>
              <li>Call NGO/vet for serious conditions.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InjuryAssistant;