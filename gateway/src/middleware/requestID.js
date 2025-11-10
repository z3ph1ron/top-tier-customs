import { v4 as UUID } from "uuid";

export function requestID(req, res, next) {
  req.id = req.headers["x-request-id"] || UUID();

  res.setHeader("x-request-id", req.id);

  next();
}
