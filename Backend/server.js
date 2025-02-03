import dotenv from "dotenv";
dotenv.config();
import 'dotenv/config'
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//App configure
const app = express();
const port = process.env.PORT || 4000; // Use environment variable for port

// Middleware
app.use(express.json());
app.use(cors());


// Start server only after DB connection
const startServer = async () => {
    try {
        await connectDB(); // Wait for DB connection
        
        // API endpoints
        app.use("/api/food", foodRouter);
        app.use("/images", express.static("uploads"));
        app.use("/api/user",userRouter)
        app.use("/api/cart", cartRouter)
        app.use("/api/order",orderRouter);

        app.get("/", (req, res) => {
            res.send("✅ API Working");
        });

        app.listen(port, () => {
            console.log(`🚀 Server started on http://localhost:${port}`);
        });

    } catch (error) {
        console.error("❌ Server startup error:", error);
    }
};

startServer();
 