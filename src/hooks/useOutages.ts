"use client";

import { useEffect, useState } from "react";
import { mockOutages, type Outage, type OutageStatus } from "@/lib/mockData";

export interface UseOutagesResult {
  outages: Outage[];
  loading: boolean;
  addOutage: (newOutage: NewOutageInput) => void;
  confirmOutage: (outageId: string, userId: string) => void;
  updateOutageStatus: (
    outageId: string,
    status: OutageStatus,
    message?: string | null,
  ) => void;
  deleteOutage: (outageId: string) => void;
}

export type NewOutageInput = Omit<
  Outage,
  "id" | "timestamp" | "status" | "confirmations" | "adminMessage"
>;

const STORAGE_KEY = "urja_mitra_outages";

function getInitialOutages(): Outage[] {
  if (typeof window === "undefined") return mockOutages;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Outage[]) : mockOutages;
  } catch {
    return mockOutages;
  }
}

export default function useOutages(): UseOutagesResult {
  const [outages, setOutages] = useState<Outage[]>(getInitialOutages);
  const [loading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(outages));
  }, [outages]);

  const addOutage = (newOutage: NewOutageInput): void => {
    const outage: Outage = {
      ...newOutage,
      id: `out-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "reported",
      confirmations: [],
      adminMessage: null,
    };
    setOutages((prev) => [outage, ...prev]);
  };

  const confirmOutage = (outageId: string, userId: string): void => {
    setOutages((prev) =>
      prev.map((o) => {
        if (o.id !== outageId) return o;
        if (o.confirmations.includes(userId)) return o;
        return { ...o, confirmations: [...o.confirmations, userId] };
      }),
    );
  };

  const updateOutageStatus = (
    outageId: string,
    status: OutageStatus,
    message?: string | null,
  ): void => {
    setOutages((prev) =>
      prev.map((o) =>
        o.id === outageId
          ? { ...o, status, adminMessage: message ?? o.adminMessage }
          : o,
      ),
    );
  };

  const deleteOutage = (outageId: string): void => {
    setOutages((prev) => prev.filter((o) => o.id !== outageId));
  };

  return {
    outages,
    loading,
    addOutage,
    confirmOutage,
    updateOutageStatus,
    deleteOutage,
  };
}
