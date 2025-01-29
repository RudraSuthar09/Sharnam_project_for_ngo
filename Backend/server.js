import dotenv from "dotenv";
dotenv.config()
import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";



// mongoose.connect(process.env.MONGO_URI)

//App configure
const app=express()
const port=4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

app.get("/", (req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})