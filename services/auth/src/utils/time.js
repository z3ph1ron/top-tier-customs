export function toSeconds(ttl) {
  const m = /^(\d+)([smhd])$/i.exec(ttl || "");

  if (!m) {
    return 900;
  }

  const n = Number(m[1]);
  const u = m[2].toLowerCase();

  return n * (u === "s" ? 1 : u === "m" ? 60 : u === "h" ? 3600 : 86400);
}
