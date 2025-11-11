import cors from "cors";
import { env } from "./env.js";

export const corsMW = cors({
  origin: env.corsOrigin,
  credentials: true,
});
