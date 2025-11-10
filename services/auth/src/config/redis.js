import Redis from "ioredis";
import { env } from "./env.js";

export const redis = new Redis(env.REDIS.URL, {
  username: env.REDIS.username,
  password: env.REDIS.password,
  lazyConnect: true,
  enableAutoPipelining: true,
});

redis.on("error", (e) =>
  console.log("[auth] x [redis] error:", e?.message || e)
);

export async function connectRedis() {
  await redis.connect();
  await redis.ping();
  console.log("[auth] -> Redis connected.");
}
