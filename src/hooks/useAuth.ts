"use client";

import {
  useAuth as useAuthContext,
  type AuthContextValue,
} from "@/lib/authContext";

export default function useAuth(): AuthContextValue {
  return useAuthContext();
}
