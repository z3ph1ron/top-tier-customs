import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),
  nodeENV: process.env.NODE_ENV,
  mongoURL: process.env.MONGO_URL,
  REDIS: {
    URL: process.env.REDIS_URL,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTTL: process.env.ACCESS_TOKEN_TTL,
  refreshTTL: process.env.REFRESH_TOKEN_TTL,
  refreshCookie: process.env.REFRESH_COOKIE_NAME,
  corsOrigin: process.env.CORS_ORIGIN,
};
