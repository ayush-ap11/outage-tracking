import { AlertTriangle, CheckCircle, Clock, MapPin } from "lucide-react";
import type { Outage } from "@/lib/mockData";
import {
  CATEGORY_CONFIG,
  COMPLAINT_TYPES,
  SEVERITY_CONFIG,
  formatTimestamp,
} from "@/lib/helpers";

interface AdminSidebarProps {
  outages: Outage[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  filter: string;
  activeFilter?: "emergency" | "pending" | "resolved" | null;
  onFilterChange: (filter: string) => void;
}

const FILTERS = ["all", "emergency", "needs_action", "resolved"] as const;

const DEFAULT_SEVERITY = "moderate" as const;

const getSeverityConfig = (severity: string | undefined) =>
  SEVERITY_CONFIG[severity as keyof typeof SEVERITY_CONFIG] ??
  SEVERITY_CONFIG[DEFAULT_SEVERITY];

const getComplaintLabel = (outage: Outage): string =>
  (COMPLAINT_TYPES[outage.complaintCategory] ?? []).find(
    (item) => item.id === outage.complaintType,
  )?.label ?? outage.complaintType;

const getFilterStyle = (value: string, active: boolean): string => {
  if (value === "emergency") {
    return active
      ? "border-[#ef4444] bg-[#fee2e2] text-[#991b1b]"
      : "border-[#e2e8f0] bg-white text-[#475569] hover:border-[#ef4444]/40";
  }
  if (value === "needs_action") {
    return active
      ? "border-[#f59e0b] bg-[#fef3c7] text-[#92400e]"
      : "border-[#e2e8f0] bg-white text-[#475569] hover:border-[#f59e0b]/40";
  }
  if (value === "resolved") {
    return active
      ? "border-[#22c55e] bg-[#dcfce7] text-[#166534]"
      : "border-[#e2e8f0] bg-white text-[#475569] hover:border-[#22c55e]/40";
  }
  return "border-[#e2e8f0] bg-white text-[#475569] hover:border-[#2563eb]/40";
};

const matchesFilter = (outage: Outage, filter: string): boolean => {
  if (filter === "all") return true;
  if (filter === "emergency") return outage.severity === "emergency";
  if (filter === "needs_action")
    return outage.status !== "resolved" && outage.severity !== "emergency";
  if (filter === "resolved") return outage.status === "resolved";
  return true;
};

const getSeverityBadgeStyle = (severity: Outage["severity"]): string =>
  severity === "emergency"
    ? "bg-[#ef4444] text-white"
    : severity === "critical"
      ? "bg-[#f97316] text-white"
      : severity === "moderate"
        ? "bg-[#f59e0b] text-white"
        : "bg-[#22c55e] text-white";

export default function AdminSidebar({
  outages,
  selectedId,
  onSelect,
  filter,
  activeFilter,
  onFilterChange,
}: AdminSidebarProps) {
  const effectiveFilter =
    activeFilter === "pending" ? "needs_action" : (activeFilter ?? filter);
  const visibleOutages = [...outages]
    .filter((outage) => matchesFilter(outage, effectiveFilter))
    .sort((a, b) => {
      const emergencyA = a.severity === "emergency" ? 0 : 1;
      const emergencyB = b.severity === "emergency" ? 0 : 1;
      if (emergencyA !== emergencyB) return emergencyA - emergencyB;
      return +new Date(b.timestamp) - +new Date(a.timestamp);
    });
  return (
    <div className="flex h-full w-80 shrink-0 flex-col border-r border-[#e2e8f0] bg-[#ffffff]">
      <div className="border-b border-[#e2e8f0] p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-sm font-bold text-[#0f172a]">
            Active Reports
          </h2>
          <span className="rounded-full border border-[#e2e8f0] bg-white px-3 py-1 text-xs font-semibold text-[#475569]">
            {outages.length} total
          </span>
        </div>
        <p className="mt-3 text-xs text-[#475569]">Filter by severity</p>
        <div className="mt-2 flex gap-2">
          {FILTERS.map((value) => (
            <button
              key={value}
              onClick={() => onFilterChange(value)}
              className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold transition-all duration-150 ${getFilterStyle(value, effectiveFilter === value)}`}
            >
              <span className="inline-flex items-center gap-2">
                {value === "emergency" ? (
                  <AlertTriangle size={14} />
                ) : value === "needs_action" ? (
                  <Clock size={14} />
                ) : value === "resolved" ? (
                  <CheckCircle size={14} />
                ) : null}
                {value === "emergency"
                  ? "Emergency"
                  : value === "needs_action"
                    ? "Needs Action"
                    : value === "resolved"
                      ? "Resolved"
                      : "All"}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {visibleOutages.map((outage) =>
          (() => {
            const severityConfig = getSeverityConfig(outage.severity);
            return (
              <button
                key={outage.id}
                onClick={() => onSelect(outage.id)}
                className={`relative mb-3 flex w-full min-h-fit cursor-pointer flex-col overflow-hidden rounded-xl border-l-4 p-4 text-left transition-all duration-150 ${selectedId === outage.id ? "shadow-md" : ""}`}
                style={{
                  borderLeftColor: severityConfig.color,
                  backgroundColor:
                    selectedId === outage.id
                      ? severityConfig.bgColor
                      : `${severityConfig.bgColor}66`,
                }}
              >
                {outage.severity === "emergency" ? (
                  <span className="absolute left-0 top-0 h-full w-1 animate-pulse bg-[#ef4444]" />
                ) : null}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-bold ${getSeverityBadgeStyle(outage.severity)}`}
                  >
                    {severityConfig.label}
                  </span>
                  <span className="text-xs text-[#475569]">
                    {formatTimestamp(outage.timestamp)}
                  </span>
                </div>
                <div className="mt-2 text-sm font-bold text-[#0f172a]">
                  {getComplaintLabel(outage)}
                </div>
                <div className="mt-1 flex items-center gap-1 text-xs text-[#475569]">
                  <MapPin size={12} />
                  {outage.area}
                </div>
                {outage.severity === "emergency" ? (
                  <div className="mt-2 flex items-center gap-2 text-xs font-bold text-[#ef4444]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#ef4444]" />
                    EMERGENCY
                  </div>
                ) : null}
                <div className="mt-2 text-xs text-[#475569]">
                  {outage.complaintCategory === "safety"
                    ? CATEGORY_CONFIG.safety.label
                    : outage.complaintCategory === "scheduled"
                      ? CATEGORY_CONFIG.scheduled.label
                      : outage.complaintCategory === "infrastructure"
                        ? CATEGORY_CONFIG.infrastructure.label
                        : CATEGORY_CONFIG.supply.label}
                </div>
              </button>
            );
          })(),
        )}
      </div>
    </div>
  );
}
