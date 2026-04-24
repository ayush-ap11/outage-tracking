"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    router.push(user ? "/map" : "/auth");
  }, [user, loading, router]);

  return <LoadingScreen />;
}
