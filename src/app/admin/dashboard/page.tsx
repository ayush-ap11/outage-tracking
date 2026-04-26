"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  ShieldCheck,
} from "lucide-react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import OutageManagePanel from "@/components/admin/OutageManagePanel";
import useAuth from "@/hooks/useAuth";
import useOutages from "@/hooks/useOutages";
import { mockHistory, mockOutages, type OutageStatus } from "@/lib/mockData";

const OutageMap = dynamic(() => import("@/components/map/OutageMap"), {
  ssr: false,
});

type TileFilter = "emergency" | "pending" | "resolved";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { outages, updateOutageStatus, deleteOutage } = useOutages();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<"list" | "map" | "manage">(
    "list",
  );
  const [activeFilter, setActiveFilter] = useState<TileFilter | null>(null);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  const selectedOutage =
    outages.find((outage) => outage.id === selectedId) || null;
  const sidebarFilter =
    activeFilter === "pending" ? "needs_action" : (activeFilter ?? "all");
  const emergencyCount = mockOutages.filter(
    (outage) => outage.severity === "emergency",
  ).length;
  const pendingCount = mockOutages.filter(
    (outage) => outage.status !== "resolved",
  ).length;
  const resolvedTodayCount = mockHistory.filter(
    (outage) => outage.status === "resolved",
  ).length;

  const handleStatusUpdate = (id: string, status: string, message: string) => {
    updateOutageStatus(id, status as OutageStatus, message);
    setFlashMessage("Update posted");
  };
  const handleDelete = (id: string) => {
    deleteOutage(id);
    setSelectedId(null);
  };
  const toggleTileFilter = (next: TileFilter) =>
    setActiveFilter((current) => (current === next ? null : next));
  const onSidebarFilterChange = (value: string) =>
    setActiveFilter(
      value === "all"
        ? null
        : value === "needs_action"
          ? "pending"
          : (value as "emergency" | "resolved"),
    );
  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  useEffect(() => {
    if (!flashMessage) return;
    const timeout = window.setTimeout(() => setFlashMessage(null), 2000);
    return () => window.clearTimeout(timeout);
  }, [flashMessage]);

  return (
    <ProtectedRoute adminOnly>
      <div className="flex h-[calc(100vh-64px)] flex-col bg-[#f8fafc]">
        <div className="flex items-center justify-between border-b border-[#e2e8f0] bg-[#ffffff] px-6 py-3">
          <div>
            <div className="flex items-center gap-2 font-mono font-bold text-[#0f172a]">
              <ShieldCheck className="text-[#3b82f6]" size={16} /> Urja Mitra —
              Admin
            </div>
            <div className="text-xs text-[#475569]">Pune Control Center</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 text-sm text-[#ef4444] md:flex">
              <Phone size={14} /> Emergency: 1800-212-3435
            </div>
            <div className="hidden text-xs text-[#475569] md:block">
              {user?.consumerId ?? "Admin"}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-xs font-semibold text-[#475569] hover:bg-[#f8fafc]"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3 md:mb-6">
          <button
            type="button"
            onClick={() => toggleTileFilter("emergency")}
            className={`cursor-pointer rounded-xl border-l-4 border-[#ef4444] bg-[#fee2e2] p-5 text-left ${emergencyCount > 0 ? "animate-pulse" : ""}`}
          >
            <div className="flex items-center justify-between">
              <AlertTriangle size={28} color="#ef4444" />
              <div className="text-4xl font-bold text-[#ef4444]">
                {emergencyCount}
              </div>
            </div>
            <div className="mt-2 text-sm font-semibold text-[#991b1b]">
              Emergencies
            </div>
            <div className="text-xs text-[#475569]">Tap to view</div>
          </button>
          <button
            type="button"
            onClick={() => toggleTileFilter("pending")}
            className="cursor-pointer rounded-xl border-l-4 border-[#f59e0b] bg-[#fef3c7] p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <Clock size={28} color="#f59e0b" />
              <div className="text-4xl font-bold text-[#92400e]">
                {pendingCount}
              </div>
            </div>
            <div className="mt-2 text-sm font-semibold text-[#92400e]">
              Need Action
            </div>
            <div className="text-xs text-[#475569]">Tap to view</div>
          </button>
          <button
            type="button"
            onClick={() => toggleTileFilter("resolved")}
            className="cursor-pointer rounded-xl border-l-4 border-[#22c55e] bg-[#dcfce7] p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <CheckCircle size={28} color="#22c55e" />
              <div className="text-4xl font-bold text-[#166534]">
                {resolvedTodayCount}
              </div>
            </div>
            <div className="mt-2 text-sm font-semibold text-[#166534]">
              Resolved Today
            </div>
            <div className="text-xs text-[#475569]">Good work!</div>
          </button>
        </div>

        {flashMessage ? (
          <div className="px-4 pb-2 text-center text-sm text-green-700 md:px-6">
            {flashMessage}
          </div>
        ) : null}

        <div className="border-b border-[#e2e8f0] bg-[#ffffff] px-4 py-2 md:hidden">
          <div className="flex gap-2">
            {(["list", "map", "manage"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePanel(tab)}
                className={`cursor-pointer rounded-full px-3 py-1 text-xs font-mono ${activePanel === tab ? "bg-[#2563eb] text-white" : "bg-[#ffffff] text-[#475569]"}`}
              >
                {tab === "manage" ? "Manage" : tab === "map" ? "Map" : "List"}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden flex-1 overflow-hidden md:flex">
          <div className="animate-slide-in-left opacity-0">
            <AdminSidebar
              outages={outages}
              selectedId={selectedId}
              onSelect={setSelectedId}
              filter={sidebarFilter}
              activeFilter={activeFilter}
              onFilterChange={onSidebarFilterChange}
            />
          </div>
          <div className="animate-fade-in delay-200 flex-1 opacity-0">
            <OutageMap filter="all" />
          </div>
          <div className="hidden w-96 animate-slide-in-right border-l border-[#e2e8f0] bg-[#ffffff] opacity-0 lg:block">
            <OutageManagePanel
              outage={selectedOutage}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
            />
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden pb-14 md:hidden">
          {activePanel === "list" ? (
            <AdminSidebar
              outages={outages}
              selectedId={selectedId}
              onSelect={setSelectedId}
              filter={sidebarFilter}
              activeFilter={activeFilter}
              onFilterChange={onSidebarFilterChange}
            />
          ) : activePanel === "map" ? (
            <div className="flex-1 p-4">
              <OutageMap filter="all" />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4">
              <OutageManagePanel
                outage={selectedOutage}
                onStatusUpdate={handleStatusUpdate}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#e2e8f0] bg-[#ffffff] md:hidden">
          <div className="grid grid-cols-3">
            {(["list", "map", "manage"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePanel(tab)}
                className={`cursor-pointer py-3 text-xs font-mono ${activePanel === tab ? "bg-[#2563eb] text-white" : "text-[#475569]"}`}
              >
                {tab === "manage" ? "Manage" : tab === "map" ? "Map" : "List"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
