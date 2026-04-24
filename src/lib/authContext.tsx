"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { mockAdmin, mockUser, type UserAccount } from "./mockData";

export interface AuthContextValue {
  user: UserAccount | null;
  loading: boolean;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  loginWithPhone: (phone: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("urja_mitra_theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
        return;
      }

      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    } catch {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("urja_mitra_theme", theme);
  }, [theme]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("urja_mitra_user");
      if (saved) setUser(JSON.parse(saved) as UserAccount);
    } catch {
      /* corrupted storage — ignore */
    }
    setLoading(false);
  }, []);

  const loginWithPhone = (phone: string): void => {
    const account = phone === "admin" ? mockAdmin : mockUser;
    localStorage.setItem("urja_mitra_user", JSON.stringify(account));
    setUser(account);
  };

  const toggleTheme = (): void => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const logout = (): void => {
    localStorage.removeItem("urja_mitra_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        theme,
        setTheme,
        toggleTheme,
        loginWithPhone,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
