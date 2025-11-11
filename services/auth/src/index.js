import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import pino from "pino";
import PinoHttp, { pinoHttp } from "pino-http";
import { env } from "./config/env.js";
import { corsMW } from "./config/cors.js";
import { connectDB } from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import { authRouter } from "./routes/auth.routes.js";

const app = express();

app.set("trust proxy", true);

app.use(helmet());
app.use(corsMW);
app.use(cookieParser());

// logging
const logger = pino({ level: "info" });
app.use(pinoHttp({ logger }));

// parsers
app.use(express.json());

// routes
app.use(authRouter);

async function main() {
  await connectDB();
  await connectRedis();

  app.listen(env.PORT, () =>
    logger.info(`api/auth live on localhost:${env.PORT}`)
  );
}

main().catch((err) => {
  console.error("Fatal startup error", err);
  process.exit(1);
});
