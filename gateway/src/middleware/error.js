export function notFound(_req, res) {
  res.status(404).json({ error: "route_not_found" });
}

export function errorHandler(err, _req, res, _next) {
  console.error("[gateway]", err);

  if (res.headersSent) {
    return;
  }

  return res.status(500).json({ error: "internal_error" });
}
