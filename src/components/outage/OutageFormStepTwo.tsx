"use client";

import { DP_NUMBERS, SUBSTATIONS } from "@/lib/helpers";
import type { OutageFormStepTwoProps } from "./OutageForm.types";

const inputClass =
  "w-full rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-[#0f172a] outline-none focus:ring-2 focus:ring-[#2563eb] cursor-pointer";

export default function OutageFormStepTwo({
  selectedSubstation,
  selectedFeeder,
  selectedDP,
  poleNumber,
  onSubstationChange,
  onFeederChange,
  onDPChange,
  onPoleNumberChange,
}: OutageFormStepTwoProps) {
  const substation = SUBSTATIONS.find((item) => item.id === selectedSubstation);
  return (
    <section className="rounded-xl bg-[#ffffff] p-6 shadow-sm">
      <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#475569]">
        Step 2: Which power source is affected?
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-[#475569]">
            Sub-Station Name
          </label>
          <select
            value={selectedSubstation}
            onChange={(e) => onSubstationChange(e.target.value)}
            className={inputClass}
          >
            <option value="">Select Sub-Station</option>
            {SUBSTATIONS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} — {item.area}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-[#475569]">
            Feeder / Zone
          </label>
          <select
            value={selectedFeeder}
            onChange={(e) => onFeederChange(e.target.value)}
            disabled={!substation}
            className={inputClass}
          >
            <option value="">Select Feeder</option>
            {substation?.feeders.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.type})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-[#475569]">
            DP / Transformer Number
          </label>
          <select
            value={selectedDP}
            onChange={(e) => onDPChange(e.target.value)}
            className={inputClass}
          >
            <option value="">Select DP / Transformer</option>
            {DP_NUMBERS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id} — {item.area} ({item.capacity})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-[#475569]">
            Pole Number
          </label>
          <input
            type="text"
            placeholder="e.g. AKD-301-P012"
            value={poleNumber}
            onChange={(e) => onPoleNumberChange(e.target.value)}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-[#475569]">
            Format: [SubstationCode]-[FeederNo]-P[Number]
          </p>
        </div>
      </div>
    </section>
  );
}
