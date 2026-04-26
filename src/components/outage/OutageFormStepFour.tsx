"use client";

import type { OutageFormStepFourProps } from "./OutageForm.types";

const inputClass =
  "w-full rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-[#0f172a] outline-none focus:ring-2 focus:ring-[#2563eb]";

export default function OutageFormStepFour({
  description,
  canSubmit,
  onDescriptionChange,
  onSubmit,
  submitting,
}: OutageFormStepFourProps) {
  return (
    <section className="rounded-xl bg-[#ffffff] p-6 shadow-sm">
      <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#475569]">
        Step 4: Additional details
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-[#475569]">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            maxLength={200}
            placeholder="Describe the outage..."
            className="h-28 w-full resize-none rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-[#0f172a] outline-none focus:ring-2 focus:ring-[#2563eb]"
          />
          <p className="mt-1 text-xs text-[#475569]">
            {description.length}/200 characters
          </p>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit || submitting}
          className="w-full rounded-lg bg-[#2563eb] px-4 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-[#93c5fd]"
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </div>
    </section>
  );
}
