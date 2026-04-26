"use client";

import { AlertTriangle } from "lucide-react";
import {
  CATEGORY_CONFIG,
  COMPLAINT_TYPES,
  SEVERITY_CONFIG,
  formatTimestamp,
  type ComplaintCategory,
} from "@/lib/helpers";
import type { Outage } from "@/lib/mockData";

export interface OutagePopupProps {
  outage: Outage;
  onConfirm: (id: string) => void;
}

const getComplaintLabel = (category: string, typeId: string): string => {
  const types = COMPLAINT_TYPES[category as ComplaintCategory];
  return types?.find((t) => t.id === typeId)?.label ?? typeId;
};

export default function OutagePopup({ outage, onConfirm }: OutagePopupProps) {
  const severity = SEVERITY_CONFIG[outage.severity] ?? SEVERITY_CONFIG["moderate"];
  const category = CATEGORY_CONFIG[outage.complaintCategory] ?? CATEGORY_CONFIG["supply"];

  const showEmergencyAlert =
    outage.severity === "emergency" || outage.complaintCategory === "safety";

  return (
    <div className="w-[260px] max-w-[260px] overflow-hidden">
      {/* Row 1 - Badges */}
      <div className="flex items-center gap-2">
        <span className="rounded bg-[#f1f5f9] px-2 py-0.5 text-xs text-[#475569]">
          {category.label}
        </span>
        <span
          className="rounded px-2 py-0.5 text-xs"
          style={{ backgroundColor: severity.bgColor, color: severity.color }}
        >
          {severity.label}
        </span>
      </div>

      {/* Row 2 - Time Ago */}
      <div className="mt-1 text-right text-xs text-[#475569]">
        {formatTimestamp(outage.timestamp)}
      </div>

      <div className="my-2 border-t border-[#e2e8f0]" />

      {/* Info Grid */}
      <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-xs">
        <span className="font-medium text-[#475569]">Area</span>
        <span className="text-[#0f172a]">{outage.area}</span>

        <span className="font-medium text-[#475569]">Problem</span>
        <span className="text-[#0f172a]">
          {getComplaintLabel(outage.complaintCategory, outage.complaintType)}
        </span>

        <span className="font-medium text-[#475569]">Status</span>
        <span className="flex items-center gap-1 text-[#0f172a] capitalize">
          <span
            className={`h-2 w-2 rounded-full ${
              outage.status === "resolved"
                ? "bg-green-500"
                : outage.status === "in_progress"
                ? "bg-orange-500"
                : outage.status === "acknowledged"
                ? "bg-blue-500"
                : "bg-yellow-500"
            }`}
          />
          {outage.status.replace("_", " ")}
        </span>

        <span className="font-medium text-[#475569]">DP No.</span>
        <span className="text-[#0f172a]">{outage.dpNumber || "—"}</span>

        <span className="font-medium text-[#475569]">Pole No.</span>
        <span className="text-[#0f172a]">{outage.poleNumber || "—"}</span>
      </div>

      {/* Emergency Block */}
      {showEmergencyAlert && (
        <div className="mt-2 flex items-start gap-1 rounded border-l-4 border-[#ef4444] bg-[#fee2e2] p-2">
          <AlertTriangle size={14} color="#ef4444" className="shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-[#991b1b]">
              EMERGENCY HAZARD
            </div>
            <div className="text-xs text-[#991b1b]">
              MSEDCL: 1800-212-3435
            </div>
          </div>
        </div>
      )}

      {/* Confirm Button */}
      {outage.status !== "resolved" && (
        <button
          onClick={() => onConfirm(outage.id)}
          className="mt-3 w-full cursor-pointer rounded-lg bg-[#2563eb] py-1.5 text-center text-xs text-white transition hover:bg-[#1d4ed8]"
        >
          Confirm Outage ({outage.confirmations.length})
        </button>
      )}
    </div>
  );
}
