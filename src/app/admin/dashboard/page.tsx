"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ShieldCheck } from "lucide-react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import OutageManagePanel from "@/components/admin/OutageManagePanel";
import useOutages from "@/hooks/useOutages";
import type { OutageStatus } from "@/lib/mockData";

const OutageMap = dynamic(() => import("@/components/map/OutageMap"), {
  ssr: false,
});

export default function AdminDashboardPage() {
  const { outages, updateOutageStatus, deleteOutage } = useOutages();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<"list" | "map" | "manage">(
    "list",
  );
  const [sidebarFilter, setSidebarFilter] = useState("all");
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const selectedOutage =
    outages.find((outage) => outage.id === selectedId) || null;
  const total = outages.length;
  const active = outages.filter(
    (outage) => outage.status !== "resolved",
  ).length;
  const resolved = outages.filter(
    (outage) => outage.status === "resolved",
  ).length;
  const planned = outages.filter((outage) => outage.type === "planned").length;

  const handleStatusUpdate = (id: string, status: string, message: string) => {
    updateOutageStatus(id, status as OutageStatus, message);
    setFlashMessage("Update posted");
  };

  const handleDelete = (id: string) => {
    deleteOutage(id);
    setSelectedId(null);
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
              <ShieldCheck className="text-[#3b82f6]" size={16} /> Admin
              Dashboard
            </div>
            <div className="text-xs text-[#475569]">
              Light Buddy — Pune Control Center
            </div>
          </div>
          <div className="hidden items-center md:flex">
            <div className="border-r border-[#e2e8f0] px-4 text-center">
              <div className="font-mono text-sm font-bold text-[#0f172a]">
                {total}
              </div>
              <div className="text-xs text-[#475569]">Total</div>
            </div>
            <div className="border-r border-[#e2e8f0] px-4 text-center">
              <div className="font-mono text-sm font-bold text-red-600">
                {active}
              </div>
              <div className="text-xs text-[#475569]">Active</div>
            </div>
            <div className="border-r border-[#e2e8f0] px-4 text-center">
              <div className="font-mono text-sm font-bold text-green-700">
                {resolved}
              </div>
              <div className="text-xs text-[#475569]">Resolved</div>
            </div>
            <div className="pl-4 text-center">
              <div className="font-mono text-sm font-bold text-[#1d4ed8]">
                {planned}
              </div>
              <div className="text-xs text-[#475569]">Planned</div>
            </div>
          </div>
        </div>

        {flashMessage ? (
          <div className="px-4 pt-3 text-center text-sm text-green-700 md:px-6">
            {flashMessage}
          </div>
        ) : null}

        <div className="md:hidden border-b border-[#e2e8f0] bg-[#ffffff] px-4 py-2">
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
              onFilterChange={setSidebarFilter}
            />
          </div>
          <div className="animate-fade-in delay-200 opacity-0 flex-1">
            <OutageMap filter="all" />
          </div>
          <div className="hidden w-96 border-l border-[#e2e8f0] bg-[#ffffff] lg:block animate-slide-in-right opacity-0">
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
              onFilterChange={setSidebarFilter}
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
