"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, Eye, Trash2, Wrench } from "lucide-react";
import type { Outage, OutageStatus } from "@/lib/mockData";
import {
  CATEGORY_CONFIG,
  COMPLAINT_TYPES,
  SEVERITY_CONFIG,
  formatTimestamp,
  getConfirmationCount,
} from "@/lib/helpers";

type StatusChangeFn = (id: string, status: OutageStatus) => void;
type MessageSaveFn = (id: string, message: string) => void;
type StatusUpdateFn = (id: string, status: string, message: string) => void;

interface OutageManagePanelProps {
  outage: Outage | null;
  onStatusChange?: StatusChangeFn;
  onMessageSave?: MessageSaveFn;
  onStatusUpdate?: StatusUpdateFn;
  onDelete: (id: string) => void;
}

const DEFAULT_CATEGORY = "supply" as const;
const DEFAULT_SEVERITY = "moderate" as const;

const getComplaintLabel = (outage: Outage): string =>
  (COMPLAINT_TYPES[outage.complaintCategory] ?? []).find(
    (item) => item.id === outage.complaintType,
  )?.label ?? outage.complaintType;

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <>
    <div className="text-[#475569]">{label}</div>
    <div className="font-medium text-[#0f172a]">{value}</div>
  </>
);

export default function OutageManagePanel({
  outage,
  onStatusChange,
  onMessageSave,
  onStatusUpdate,
  onDelete,
}: OutageManagePanelProps) {
  const [message, setMessage] = useState(outage?.adminMessage || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setMessage(outage?.adminMessage || "");
    setShowDeleteConfirm(false);
  }, [outage]);

  if (!outage) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center">
        <div>
          <Wrench className="mx-auto text-[#e2e8f0]" size={48} />
          <div className="mt-3 text-[#475569]">
            Select a complaint to manage
          </div>
        </div>
      </div>
    );
  }

  const complaintLabel = getComplaintLabel(outage);
  const severity =
    SEVERITY_CONFIG[outage.severity] ?? SEVERITY_CONFIG[DEFAULT_SEVERITY];
  const category =
    CATEGORY_CONFIG[outage.complaintCategory] ??
    CATEGORY_CONFIG[DEFAULT_CATEGORY];
  const updateStatus = (status: OutageStatus) => {
    if (onStatusUpdate) onStatusUpdate(outage.id, status, message);
    else onStatusChange?.(outage.id, status);
  };
  const saveMessage = () => {
    if (onMessageSave) onMessageSave(outage.id, message);
    else if (onStatusUpdate) onStatusUpdate(outage.id, outage.status, message);
  };

  return (
    <div className="h-full max-h-full overflow-y-auto p-4">
      {outage.severity === "emergency" ? (
        <div className="mb-4 rounded-xl bg-[#ef4444] p-4 text-white">
          <div className="flex items-center gap-2 text-lg font-bold">
            <AlertTriangle size={18} /> EMERGENCY ALERT
          </div>
          <div className="mt-1 text-sm">{complaintLabel}</div>
          <div className="mt-1 text-sm">
            MSEDCL Emergency Helpline: 1800-212-3435
          </div>
        </div>
      ) : null}

      <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold text-[#475569]">
          Complaint Details
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
          <InfoRow label="Problem" value={complaintLabel} />
          <InfoRow label="Category" value={category.label} />
          <div className="contents">
            <div className="text-[#475569]">Severity</div>
            <div className="flex items-center gap-2 font-medium text-[#0f172a]">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: severity.color }}
              />
              {severity.label}
            </div>
          </div>
          <InfoRow label="Area" value={outage.area} />
          <InfoRow label="Reported" value={formatTimestamp(outage.timestamp)} />
          <InfoRow label="Reported By" value={outage.reportedBy} />
          <InfoRow
            label="Confirmations"
            value={String(getConfirmationCount(outage.confirmations))}
          />
        </div>
      </div>

      <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold text-[#475569]">
          Power Source Info
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
          <InfoRow label="Sub-Station" value={outage.substationName || "—"} />
          <InfoRow label="Feeder" value={outage.feederName || "—"} />
          <InfoRow label="DP Number" value={outage.dpNumber || "—"} />
          <InfoRow label="Pole Number" value={outage.poleNumber || "—"} />
        </div>
      </div>

      <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold text-[#475569]">
          Update Status
        </div>
        {outage.status === "reported" ? (
          <button
            type="button"
            onClick={() => updateStatus("acknowledged")}
            className="mb-3 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#dbeafe] text-base font-bold text-[#1d4ed8]"
          >
            <Eye size={20} />
            Mark as Seen
          </button>
        ) : null}
        {outage.status === "reported" || outage.status === "acknowledged" ? (
          <button
            type="button"
            onClick={() => updateStatus("in_progress")}
            className="mb-3 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#fef3c7] text-base font-bold text-[#92400e]"
          >
            <Wrench size={20} />
            Work Started
          </button>
        ) : null}
        {outage.status !== "resolved" ? (
          <button
            type="button"
            onClick={() => updateStatus("resolved")}
            className="mb-3 flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#dcfce7] text-base font-bold text-[#166534]"
          >
            <CheckCircle size={20} />
            Mark as Fixed
          </button>
        ) : null}
      </div>

      <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-2 text-sm font-semibold text-[#475569]">
          Message to Citizens
        </div>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={3}
          placeholder="e.g. Team dispatched, work in progress..."
          className="w-full rounded-lg border border-[#e2e8f0] p-3 text-sm text-[#0f172a] outline-none focus:border-[#2563eb]"
        />
        <button
          type="button"
          onClick={saveMessage}
          className="mt-3 h-10 w-full cursor-pointer rounded-lg bg-[#2563eb] text-white"
        >
          Save Message
        </button>
      </div>

      <button
        type="button"
        onClick={() => setShowDeleteConfirm((value) => !value)}
        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#ef4444] bg-white text-[#ef4444]"
      >
        <Trash2 size={16} />
        Delete Report
      </button>
      {showDeleteConfirm ? (
        <div className="mt-3 rounded-lg border border-[#ef4444]/30 bg-[#fee2e2] p-3">
          <div className="mb-2 text-sm text-[#991b1b]">
            Are you sure? This cannot be undone.
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onDelete(outage.id)}
              className="cursor-pointer rounded-lg bg-[#ef4444] px-3 py-2 text-white"
            >
              Yes, Delete
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="cursor-pointer rounded-lg border border-[#e2e8f0] px-3 py-2 text-[#475569]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
