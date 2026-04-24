"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Button from "@/components/ui/Button";
import LoadingScreen from "@/components/ui/LoadingScreen";
import OutageCard from "@/components/outage/OutageCard";
import useOutages from "@/hooks/useOutages";

const OutageMap = dynamic(() => import("@/components/map/OutageMap"), {
  ssr: false,
  loading: () => <LoadingScreen message="Loading map..." />,
});

type Filter = "all" | "planned" | "unplanned";

export default function MapPage() {
  const router = useRouter();
  const { outages } = useOutages();
  const [filter, setFilter] = useState<Filter>("all");
  const filteredOutages = useMemo(
    () =>
      outages.filter((outage) => filter === "all" || outage.type === filter),
    [outages, filter],
  );

  return (
    <ProtectedRoute>
      <div className="animate-fade-in h-[calc(100vh-64px)] bg-[#0a0a0f]">
        <div className="flex h-full flex-col lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col p-4">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-mono text-lg font-bold text-white">
                    Live Outage Map
                  </h1>
                  <span className="flex items-center gap-2 font-mono text-xs text-[#ef4444]">
                    <span className="live-dot inline-block h-2 w-2 rounded-full bg-red-500" />
                    LIVE
                  </span>
                </div>
                <p className="text-sm text-[#475569]">Pune, Maharashtra</p>
              </div>
              <div className="flex gap-2 rounded-xl border border-[#1e2a3a] bg-[#0f0f1a] p-1">
                {(["all", "planned", "unplanned"] as Filter[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`cursor-pointer rounded-lg px-4 py-1.5 text-sm font-mono transition-all duration-200 ${filter === item ? "bg-[#2563eb] text-white" : "bg-[#13131f] text-[#94a3b8] hover:text-white"}`}
                  >
                    {item === "all"
                      ? "All"
                      : item === "planned"
                        ? "Planned"
                        : "Unplanned"}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-[#1e2a3a] bg-[#0f0f1a]">
              <OutageMap filter={filter} />
              <Button
                size="lg"
                className="animate-pulse-glow absolute bottom-6 right-6 z-1000"
                onClick={() => router.push("/report")}
              >
                <Zap size={18} /> Report Outage
              </Button>
            </div>

            <div className="mt-4 lg:hidden">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="font-mono text-sm text-[#94a3b8] transition-all duration-300">
                  Active Outages ({filteredOutages.length})
                </h2>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {filteredOutages.length ? (
                  filteredOutages.map((outage, index) => (
                    <div
                      key={outage.id}
                      className="min-w-64 shrink-0 animate-fade-in opacity-0"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <OutageCard outage={outage} compact />
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-[#1e2a3a] bg-[#13131f] p-4 text-sm text-[#475569]">
                    No active outages
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="hidden w-80 shrink-0 border-l border-[#1e2a3a] bg-[#0f0f1a] p-4 lg:block">
            <h2 className="font-mono text-sm text-[#94a3b8] transition-all duration-300">
              Active Outages ({filteredOutages.length})
            </h2>
            <div
              className="mt-4 space-y-3 overflow-y-auto pr-1"
              style={{ height: "calc(100% - 2rem)" }}
            >
              {filteredOutages.length ? (
                filteredOutages.map((outage, index) => (
                  <div
                    key={outage.id}
                    className="animate-fade-in opacity-0"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <OutageCard outage={outage} compact />
                  </div>
                ))
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[#475569]">
                  No active outages
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </ProtectedRoute>
  );
}
