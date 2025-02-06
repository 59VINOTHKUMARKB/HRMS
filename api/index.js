import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

dotenv.config();

// MongoDB connection setup
// mongoose
//   .connect(process.env.MONGO, {
//     serverSelectionTimeoutMS: 30000, // 30 seconds
//     socketTimeoutMS: 45000, // 45 seconds
//   })
//   .then(() => {
//     console.log("DB 🚀");
//   })
//   .catch((err) => {
//     console.log("DB ❌", err);
//   });

const __dirname = path.resolve();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files from React build (ensure 'client/dist' exists)
app.use(express.static(path.join(__dirname, "client", "dist")));

// Fallback to index.html for other routes (SPA behavior)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Global error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`VCET 🚀 on port ${port}`);
});