"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: string; // e.g., "admin", "user", etc.
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { token, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait until auth state is loaded
    if (!token) {
      if (role) {
        router.push(`/${role}/login`);
      } else {
        router.push("/login");
      }
    } else {
      if (role && user && user.role && user.role !== role) {
        router.push(`/${user.role}/dashboard`);
      }
    }
  }, [token, user, router, role, loading]);

  if (loading) return null; // Or a loading spinner
  return token ? <>{children}</> : null;
}
