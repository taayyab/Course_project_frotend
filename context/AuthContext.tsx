"use client";

import { logout as apiLogout } from "@/lib/auth.api";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/lib/auth.api";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string, userData: any) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);


  // Effect to load token and user from client-side storage on mount
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Error parsing user from localStorage:", e);
          localStorage.removeItem("user");
        }
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token && !user) {
      fetch(`${API_BASE_URL}/api/v1/users/refresh-token`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch(() => {
          const storedUser = localStorage.getItem("user");
          if (!storedUser) {
            logout();
          }
        });
    }
  }, [token, user]);

  const login = (token: string, userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    Cookies.set("token", token, { expires: 7});
    Cookies.set("user", userData.role, { expires: 7, path: "/" }); // <-- Add this line
    console.log("Response Data:", userData)
    setToken(token);
    setUser(userData);
  };

const logout = async () => {
  console.log("Logout function called");
  try {
    await apiLogout(token); // <-- Pass the token here
  } catch (err) {
    console.error("Logout error:", err);
  }
  Cookies.remove("token");
  Cookies.remove("user");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setToken(null);
  setUser(null);
  window.location.href = "/";
};

  return (
    <AuthContext.Provider value={{ user, token, login, logout ,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
