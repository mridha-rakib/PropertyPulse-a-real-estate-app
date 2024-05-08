import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
connectDB();
const app = express();

app.listen(4000, () => {
  console.log(`Server is listening on port 4000`);
});
