import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  fetchMe,
  login as loginReq,
  logout as logoutReq,
  signup as signupReq,
  refresh,
} from "../lib/authApi";
import { setAccessToken } from "../lib/http";

const AuthCTX = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    async () => {
      try {
        const r = await refresh();
        if (r?.accessToken) {
          const me = await fetchMe();
          setUser({ id: me.id, roles: me.roles });
        }
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setBooted(true);
      }
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const d = await loginReq({ email, password });
    console.log("d:", d);

    const me = await fetchMe();
    // setUser({ id: me.id, roles: me.roles });
    setUser({ id: d.user.id, email: d.user.email, roles: d.user.roles });

    return d;
  }, []);

  const signup = useCallback(async (email, password, firstName, lastName) => {
    return signupReq({ email, password, firstName, lastName });
  }, []);

  const logout = useCallback(async () => {
    await logoutReq();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, booted, login, signup, logout }),
    [user, booted, login, signup, logout]
  );

  return <AuthCTX.Provider value={value}>{children}</AuthCTX.Provider>;
}

export function useAuth() {
  return useContext(AuthCTX);
}
