// src/lib/auth.jsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api, setAccessToken } from "../lib/http";

// tiny helpers (or import your real ones)
async function callRefresh() {
  return api.post("/auth/refresh").then((r) => r.data);
}
async function callMe() {
  return api.get("/auth/me").then((r) => r.data);
}
async function callLogin(email, password) {
  return api.post("/auth/login", { email, password }).then((r) => r.data);
}
async function callLogout() {
  return api.post("/auth/logout");
}

const AuthCTX = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // optional: timeout so we never hang forever
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);

    (async () => {
      try {
        // try silent refresh on first load (okay if it 401s)
        const r = await callRefresh().catch(() => null);
        if (r?.accessToken) setAccessToken(r.accessToken);

        // if we got a token, ask who we are
        if (r?.accessToken) {
          const me = await callMe().catch(() => null);
          if (!cancelled && me?.id)
            setUser({
              id: me.id,
              email: me.email,
              roles: me.roles || [],
              profile: me.profile,
            });
        }
      } finally {
        if (!cancelled) setBooted(true);
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(t);
      ctrl.abort();
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await callLogin(email, password); // 200 or throws
    if (data?.accessToken) {
      setAccessToken(data.accessToken); // attach for /auth/me
      const me = await callMe(); // should be 200 now
      setUser({ id: me.id, roles: me.roles || [] }); // set BEFORE navigate
    }
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await callLogout();
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, booted, login, logout, setUser }),
    [user, booted, login, logout]
  );

  return <AuthCTX.Provider value={value}>{children}</AuthCTX.Provider>;
}

export function useAuth() {
  return useContext(AuthCTX);
}
