export class HttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export const errors = {
  badRequest: (m = "bad_request") => new HttpError(400, "bad_request", m),
  unauthorized: (m = "unauthorized") => new HttpError(401, "unauthorized", m),
  conflict: (m = "conflict") => new HttpError(409, "conflict", m),
};
