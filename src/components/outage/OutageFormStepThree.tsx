"use client";

import { AlertTriangle, Zap, Wrench, FileText } from "lucide-react";
import {
  CATEGORY_CONFIG,
  COMPLAINT_TYPES,
  SEVERITY_CONFIG,
  getSeverityFromType,
} from "@/lib/helpers";
import type { OutageFormStepThreeProps } from "./OutageForm.types";

const inputClass =
  "w-full rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-[#0f172a] outline-none focus:ring-2 focus:ring-[#2563eb] cursor-pointer";

const ICONS: Record<string, typeof Zap> = {
  supply: Zap,
  infrastructure: Wrench,
  safety: AlertTriangle,
  scheduled: FileText,
};

export default function OutageFormStepThree({
  complaintCategory,
  complaintType,
  severity,
  onCategoryChange,
  onComplaintTypeChange,
}: OutageFormStepThreeProps) {
  const severityValue = complaintType
    ? getSeverityFromType(complaintType)
    : severity;
  const severityConfig = severityValue ? SEVERITY_CONFIG[severityValue] : null;
  const warningIcon = ICONS.safety;
  return (
    <section className="rounded-xl bg-[#ffffff] p-6 shadow-sm">
      <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#475569]">
        Step 3: What is the problem?
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-[#475569]">Category</label>
          <select
            value={complaintCategory}
            onChange={(e) =>
              onCategoryChange(
                e.target.value as OutageFormStepThreeProps["complaintCategory"],
              )
            }
            className={inputClass}
          >
            <option value="">Select Problem Category</option>
            {Object.entries(CATEGORY_CONFIG).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-[#475569]">
            Specific Problem
          </label>
          <select
            value={complaintType}
            onChange={(e) => onComplaintTypeChange(e.target.value)}
            disabled={!complaintCategory}
            className={inputClass}
          >
            <option value="">Select Specific Problem</option>
            {complaintCategory
              ? COMPLAINT_TYPES[complaintCategory].map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#475569]">Severity</span>
          {severityConfig ? (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${severityConfig.pulse ? "animate-pulse" : ""}`}
              style={{
                backgroundColor: severityConfig.bgColor,
                color: severityConfig.color,
              }}
            >
              {severityConfig.label}
            </span>
          ) : (
            <span className="rounded-full bg-[#f1f5f9] px-3 py-1 text-xs text-[#475569]">
              Select a problem type
            </span>
          )}
        </div>
        {complaintCategory === "safety" ? (
          <div className="flex items-start gap-2 rounded-lg border border-[#ef4444] bg-[#fee2e2] p-3 text-sm text-[#991b1b]">
            <AlertTriangle className="mt-0.5 shrink-0" size={16} />
            This is a safety hazard. MSEDCL Emergency: 1800-212-3435
          </div>
        ) : null}
      </div>
    </section>
  );
}
