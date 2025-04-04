// routes/chatbotRoutes.js
import express from "express";

export const chatLogs = [];

const router = express.Router();

router.post("/", (req, res) => {
  const { message } = req.body;
  const response = `Received: ${message}`;
  const log = { message, response, timestamp: new Date() };
  chatLogs.push(log);
  res.json({ response });
});

router.get("/logs", (req, res) => {
  res.json(chatLogs);
});

export default router;
