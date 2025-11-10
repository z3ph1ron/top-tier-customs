import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  if (!env.mongoURL) {
    throw new Error("MONGO_URL not found.");
  }

  await mongoose.connect(env.mongoURL);
  console.log("[auth] -> MongoDB connected.");
}
