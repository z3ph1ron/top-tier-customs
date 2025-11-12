import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import pino from "pino";
import { pinoHttp } from "pino-http";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { corsMW } from "./config/cors.js";
import { productsRouter } from "./routes/products.routes.js";
import { servicesRouter } from "./routes/services.routes.js";
import { categoriesRouter } from "./routes/categories.routes.js";

const app = express();

app.set("trust proxy", true);

app.use(helmet());
app.use(corsMW);
app.use(cookieParser());

const logger = pino({ level: "info" });
app.use(pinoHttp({ logger }));

app.use(express.json());

app.get("/health", (_req, res) => res.status(200).json({ ok: true }));

app.use(productsRouter);
app.use(servicesRouter);
app.use(categoriesRouter);

async function main() {
  await connectDB();
  app.listen(env.PORT, () => {
    logger.info(`api/catalog live on localhost:${env.PORT}`);
  });
}

main().catch((err) => {
  console.error("Fatal startup error", err);
  process.exit(1);
});
