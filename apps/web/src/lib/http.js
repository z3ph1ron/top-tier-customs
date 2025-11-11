import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  withCredentials: true,
});

let accessToken = null;
export function setAccessToken(tok) {
  accessToken = tok;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let isRefreshing = false;
let pending = [];
function flushPending(err, token) {
  pending.forEach(({ resolve, reject, cfg }) => {
    if (err) {
      reject(err);
    } else {
      cfg.headers.Authorization = `Bearer ${token}`;
      resolve(api(cfg));
    }
  });

  pending = [];
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const { config, response } = err || {};
    if (!response || response.status !== 401 || config.__retry) {
      throw err;
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) =>
        pending.push({ resolve, reject, cfg: { ...config, __retry: true } })
      );
    }

    try {
      isRefreshing = true;
      const r = await api.post("/auth/refresh");
      const newTok = r.data?.accessToken;
      setAccessToken(newTok);
      flushPending(null, newTok);

      return api({
        ...config,
        __retry: true,
        headers: { ...config.headers, Authorization: `Bearer ${newTok}` },
      });
    } catch (e) {
      flushPending(e);
      throw e;
    } finally {
      isRefreshing = false;
    }
  }
);
