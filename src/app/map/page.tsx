"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
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

export default function MapPage() {
  const router = useRouter();
  const { outages } = useOutages();
  const visibleOutages = useMemo(() => outages, [outages]);

  return (
    <ProtectedRoute>
      <div className="animate-fade-in h-[calc(100vh-64px)] bg-[#f8fafc]">
        <div className="flex h-full flex-col lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col p-4">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-mono text-lg font-bold text-[#0f172a]">
                    Live Outage Map
                  </h1>
                  <span className="flex items-center gap-2 font-mono text-xs text-[#ef4444]">
                    <span className="live-dot inline-block h-2 w-2 rounded-full bg-red-500" />
                    LIVE
                  </span>
                </div>
                <p className="text-sm text-[#475569]">Pune, Maharashtra</p>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-[#e2e8f0] bg-[#ffffff]">
              <OutageMap />
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
                <h2 className="font-mono text-sm text-[#475569] transition-all duration-300">
                  Active Outages ({visibleOutages.length})
                </h2>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {visibleOutages.length ? (
                  visibleOutages.map((outage, index) => (
                    <div
                      key={outage.id}
                      className="min-w-64 shrink-0 animate-fade-in opacity-0"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <OutageCard outage={outage} compact />
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 text-sm text-[#475569]">
                    No active outages
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="hidden w-80 shrink-0 border-l border-[#e2e8f0] bg-[#ffffff] p-4 lg:block">
            <h2 className="font-mono text-sm text-[#334155] transition-all duration-300">
              Active Outages ({visibleOutages.length})
            </h2>
            <div
              className="mt-4 space-y-3 overflow-y-auto pr-1"
              style={{ height: "calc(100% - 2rem)" }}
            >
              {visibleOutages.length ? (
                visibleOutages.map((outage, index) => (
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
