// File: app.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import userRouter from "./routes/user-routes.js"; // User routes (if needed)
import studyMaterialRouter from "./routes/studyMaterialRoutes.js"; // Study material routes

const app = express();

// Middleware to enable CORS and parse JSON bodies
app.use(cors()); 
app.use(express.json()); // Parse incoming JSON request bodies

// API routes
app.use("/api/user", userRouter); // User API routes
app.use("/api/study-material", studyMaterialRouter); // Study material API routes

// MongoDB connection and server start
mongoose
  .connect("mongodb://localhost:27017/Aman") // Your MongoDB connection string
  .then(() => app.listen(5000)) // Start the server after a successful DB connection
  .then(() => console.log("Connected to Database and listening on port 5000")) // Log success
  .catch((err) => console.log("Database connection error:", err)); // Log any errors during connection
