"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import LoadingScreen from "@/components/ui/LoadingScreen";

export interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/auth");
      return;
    }
    if (adminOnly && user.role !== "admin") {
      router.push("/map");
    }
  }, [user, loading, adminOnly, router]);

  if (loading || !user) {
    return <LoadingScreen />;
  }

  if (adminOnly && user.role !== "admin") return null;

  return <>{children}</>;
}
