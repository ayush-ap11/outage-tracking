"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  CheckCircle,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AreaStatsTable from "@/components/outage/AreaStatsTable";
import OutageDetail from "@/components/outage/OutageDetail";
import Card from "@/components/ui/Card";
import { getAllOutages, getAreaStats } from "@/lib/mockData";

type Tab = "history" | "stats";
type TypeFilter = "all" | "planned" | "unplanned";
type StatusFilter =
  | "all"
  | "reported"
  | "acknowledged"
  | "in_progress"
  | "resolved";
type SortOrder = "newest" | "oldest";

const selectClass =
  "appearance-none rounded-lg border border-[#e2e8f0] bg-[#ffffff] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke-width=%222%22 stroke=%22%2394a3b8%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22m19 9-7 7-7-7%22/%3E%3C/svg%3E')] bg-[length:14px_14px] bg-[right_0.75rem_center] bg-no-repeat px-3 py-2 pr-10 font-mono text-sm text-[#334155] outline-none focus:border-[#2563eb]";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("history");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const outages = useMemo(() => getAllOutages(), []);
  const filteredOutages = useMemo(
    () =>
      outages
        .filter(
          (outage) =>
            (typeFilter === "all" || outage.type === typeFilter) &&
            (statusFilter === "all" || outage.status === statusFilter),
        )
        .sort((a, b) =>
          sortOrder === "newest"
            ? +new Date(b.timestamp) - +new Date(a.timestamp)
            : +new Date(a.timestamp) - +new Date(b.timestamp),
        ),
    [outages, typeFilter, statusFilter, sortOrder],
  );
  const stats = useMemo(() => getAreaStats(outages), [outages]);
  const summary = useMemo(
    () => ({
      total: outages.length,
      resolved: outages.filter((item) => item.status === "resolved").length,
      active: outages.filter((item) => item.status !== "resolved").length,
      avg: outages.length
        ? Number(
            (
              outages.reduce(
                (sum, item) => sum + item.confirmations.length,
                0,
              ) / outages.length
            ).toFixed(1),
          )
        : 0,
    }),
    [outages],
  );

  return (
    <ProtectedRoute>
      <div className="animate-fade-in min-h-[calc(100vh-64px)] bg-[#f8fafc] p-4 lg:p-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-mono text-2xl font-bold text-[#0f172a]">
            Outage History
          </h1>
          <p className="mt-1 text-sm text-[#475569]">
            Past 30 days — Pune, Maharashtra
          </p>
          <div className="mt-5 flex gap-2">
            {(["history", "stats"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer rounded-lg px-5 py-2 font-mono text-sm transition ${activeTab === tab ? "bg-[#2563eb] text-white" : "border border-[#e2e8f0] bg-[#ffffff] text-[#475569]"}`}
              >
                {tab === "history" ? "History Log" : "Area Stats"}
              </button>
            ))}
          </div>

          <div key={activeTab} className="animate-fade-in-scale mt-5 opacity-0">
            {activeTab === "history" ? (
              <div className="space-y-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <select
                    className={selectClass}
                    value={typeFilter}
                    onChange={(e) =>
                      setTypeFilter(e.target.value as TypeFilter)
                    }
                  >
                    <option value="all">All Types</option>
                    <option value="planned">Planned</option>
                    <option value="unplanned">Unplanned</option>
                  </select>
                  <select
                    className={selectClass}
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value as StatusFilter)
                    }
                  >
                    <option value="all">All Status</option>
                    <option value="reported">Reported</option>
                    <option value="acknowledged">Acknowledged</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <select
                    className={selectClass}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {(
                    [
                      [Zap, summary.total, "Total Outages"],
                      [CheckCircle, summary.resolved, "Resolved"],
                      [AlertCircle, summary.active, "Active"],
                      [Users, summary.avg, "Avg Confirmations"],
                    ] as Array<[LucideIcon, number, string]>
                  ).map(([Icon, value, label], index) => (
                    <Card
                      key={String(label)}
                      className={
                        `animate-fade-in opacity-0 delay-${(index + 1) * 100}` as string
                      }
                    >
                      <Icon className="mb-1 text-[#3b82f6]" size={20} />
                      <div className="font-mono text-xl font-bold text-[#0f172a]">
                        {value as any}
                      </div>
                      <div className="mt-0.5 text-xs text-[#475569]">
                        {label as string}
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="space-y-3">
                  {filteredOutages.length ? (
                    filteredOutages.map((outage, index) => (
                      <div
                        key={outage.id}
                        className="animate-slide-in-left opacity-0"
                        style={{
                          animationDelay: `${Math.min(index * 80, 400)}ms`,
                        }}
                      >
                        <OutageDetail
                          outage={outage}
                          showConfirmButton={false}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="py-16 text-center">
                      <Zap
                        className="animate-pulse-slow mx-auto text-[#3b82f6]"
                        size={40}
                      />
                      <p className="mt-2 font-mono text-[#0f172a]">
                        No outages found
                      </p>
                      <p className="mt-1 text-sm text-[#475569]">
                        Try adjusting the filters.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3 overflow-x-auto">
                <div className="min-w-190">
                  <div className="mb-2 rounded-lg bg-[#ffffff] px-4 py-2">
                    <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-[#94a3b8]">
                      <span className="flex-1">Area</span>
                      <span className="w-14">Total</span>
                      <span className="w-20">Unplanned</span>
                      <span className="w-16">Planned</span>
                      <span className="w-16">Resolved</span>
                      <span className="w-24">Avg Confirms</span>
                    </div>
                  </div>
                  <AreaStatsTable stats={stats} />
                </div>
                <div className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-4 text-center text-xs text-[#94a3b8]">
                  <div className="inline-flex items-center gap-2">
                    <BarChart3 size={12} /> Showing data for last 30 days
                  </div>
                  <div className="mt-1 text-[#94a3b8]/50">
                    Export feature coming in v2
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
