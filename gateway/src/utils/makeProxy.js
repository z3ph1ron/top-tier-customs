import { createProxyMiddleware } from "http-proxy-middleware";

export function makeProxy(target) {
  if (!target) {
    console.warn("[gateway] proxy target missing!");
  }

  return createProxyMiddleware({
    target,
    changeOrigin: true,
    xfwd: true,
    proxyTimeout: 15000,
    timeout: 15000,
    preserveHeaderKeyCase: true,

    onProxyReq(proxyReq, req) {
      const isJSON =
        req.headers["content-type"] &&
        req.headers["content-type"].includes("application/json");

      if (isJSON && req.body && Object.keys(req.body).length) {
        const body = JSON.stringify(req.body);

        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(body));
        proxyReq.write(body);
      }
    },

    onError(err, _req, res) {
      console.error("[proxy]", target, err?.message || err);

      if (!res.headersSent) {
        return res.status(502).json({ error: "upstream_unreachable" });
      }
    },
  });
}
