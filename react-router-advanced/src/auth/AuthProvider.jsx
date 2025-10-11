import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // restore from localStorage (demo only)
  useEffect(() => {
    const raw = localStorage.getItem("demo_auth");
    if (raw) {
      const parsed = JSON.parse(raw);
      setIsAuthenticated(!!parsed.isAuthenticated);
      setUser(parsed.user || null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("demo_auth", JSON.stringify({ isAuthenticated, user }));
  }, [isAuthenticated, user]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login: (name = "Demo User") => {
        setUser({ name });
        setIsAuthenticated(true);
      },
      logout: () => {
        setUser(null);
        setIsAuthenticated(false);
      },
    }),
    [isAuthenticated, user]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
