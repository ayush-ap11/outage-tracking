"use client";

import Badge from "../ui/Badge";
import type { Outage } from "@/lib/mockData";
import { formatTimestamp, getConfirmationCount } from "@/lib/helpers";
import { CheckCircle2, Info, Users } from "lucide-react";

export interface OutagePopupProps {
  outage: Outage;
  onConfirm: (id: string) => void;
}

export default function OutagePopup({ outage, onConfirm }: OutagePopupProps) {
  const confirmations = getConfirmationCount(outage.confirmations);

  return (
    <div className="w-[280px] max-w-[280px] overflow-hidden text-text-primary">
      <div className="flex items-center justify-between gap-2">
        <h3 className="truncate overflow-hidden text-ellipsis font-mono text-sm font-bold text-[#0f172a]">
          {outage.area}
        </h3>
        <div className="flex gap-1">
          <Badge variant={outage.type}>{outage.type}</Badge>
          <Badge variant={outage.status}>{outage.status}</Badge>
        </div>
      </div>
      <p className="mt-2 line-clamp-2 overflow-hidden text-ellipsis text-xs text-[#334155]">
        {outage.description}
      </p>
      <p className="mt-1 overflow-hidden text-ellipsis text-xs text-[#475569]">
        Reported {formatTimestamp(outage.timestamp)}
      </p>
      {outage.adminMessage ? (
        <div className="mt-2 line-clamp-3 overflow-hidden rounded bg-[#e2e8f0] p-2 text-xs text-[#1d4ed8]">
          <Info className="mr-1 inline-block align-[-2px]" size={12} /> Admin:{" "}
          {outage.adminMessage}
        </div>
      ) : null}
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="overflow-hidden text-ellipsis text-xs text-[#475569]">
          <Users className="mr-1 inline-block align-[-2px]" size={12} />{" "}
          {confirmations} confirmations
        </span>
        {outage.status === "resolved" ? (
          <span className="text-xs text-[#22c55e]">
            <CheckCircle2
              className="mr-1 inline-block align-[-2px]"
              size={12}
            />{" "}
            Resolved
          </span>
        ) : (
          <button
            className="cursor-pointer rounded-lg border border-[#2563eb] px-3 py-1 text-xs text-[#3b82f6] transition-colors hover:bg-[#2563eb]/10"
            onClick={() => onConfirm(outage.id)}
          >
            Confirm Outage
          </button>
        )}
      </div>
    </div>
  );
}
