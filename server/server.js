import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
connectDB();
const app = express();

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(4000, () => {
  console.log(`Server is listening on port 4000`);
});
