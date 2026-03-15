import express from "express";
import { getGeminiResponse } from "../services/gemini.js";

// In-memory logs (ok for dev). Later store in MongoDB.
export const chatLogs = [];

const router = express.Router();

/**
 * OLD simple echo endpoint (keep if you want)
 * POST /api/chatbot { message }
 */
router.post("/", (req, res) => {
  const { message } = req.body;
  const response = `Received: ${message}`;
  const log = { sender: "user", message, response, timestamp: new Date() };
  chatLogs.push(log);
  res.json({ response });
});

/**
 * NEW Gemini endpoint
 * POST /api/chatbot/ai { message, context }
 */
router.post("/ai", async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required (string)" });
    }

    const ai = await getGeminiResponse({ message, context });

    // Save log
    chatLogs.push({
      sender: "user",
      message,
      context: context || null,
      ai,
      timestamp: new Date(),
    });

    return res.json(ai);
  } catch (err) {
    console.error("❌ Gemini error:", err);
    return res.status(500).json({
      reply: "Server error while generating response. Please try again.",
      intent: "GENERAL",
      urgency: "NORMAL",
      actions: [],
    });
  }
});

/**
 * GET /api/chatbot/logs
 */
router.get("/logs", (req, res) => {
  res.json(chatLogs);
});

export default router;