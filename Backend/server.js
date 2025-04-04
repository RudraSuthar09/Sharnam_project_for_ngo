// server.js

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import http from "http";
import { connectDB } from "./config/db.js";
import { setupWebSocket } from "./config/websocket.js"; // ✅ WebSocket handler using ws
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import chatbotRouter from "./routes/chatbotRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/chatbot", chatbotRouter);

// Test route
app.get("/", (req, res) => {
  res.send("✅ API Working");
});

// Create HTTP server
const server = http.createServer(app);

// ✅ Attach WebSocket server
setupWebSocket(server);

// Start the server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      console.log(`🚀 Server started on http://localhost:${port}`);
      console.log(`📡 WebSocket running on ws://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Server startup error:", error);
  }
};

startServer();
