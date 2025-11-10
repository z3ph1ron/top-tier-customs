import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  JWT_SECRET: process.env.JWT_SECRET,

  UPSTREAM: {
    AUTH: process.env.AUTH_SERVICE_URL,
  },
};
