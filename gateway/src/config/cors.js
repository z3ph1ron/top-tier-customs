import cors from "cors";
import { env } from "./env.js";

export const corsMw = cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
});
