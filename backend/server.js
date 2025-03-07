const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();

// Configure CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Assuming React's default port
    credentials: true, // Allow credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/todos", require("./src/routes/todoRoutes"));
app.use("/api/notes", require("./src/routes/noteRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/todoApp")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
