import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),
  nodeENV: process.env.NODE_ENV,
  mongoURL: process.env.MONGO_URL,
  corsOrigin: process.env.CORS_ORIGIN,
};
