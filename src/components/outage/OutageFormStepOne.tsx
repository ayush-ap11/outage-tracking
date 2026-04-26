"use client";

import dynamic from "next/dynamic";
import { MapPin, LoaderCircle } from "lucide-react";
import type { OutageFormStepOneProps } from "./OutageForm.types";

const ReportMap = dynamic(() => import("@/components/map/ReportMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-75 w-full items-center justify-center rounded-xl bg-[#f1f5f9] text-sm text-[#475569]">
      Loading map...
    </div>
  ),
});

const inputClass =
  "w-full rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-[#0f172a] outline-none focus:ring-2 focus:ring-[#2563eb]";

export default function OutageFormStepOne({
  location,
  manualLat,
  manualLng,
  gpsLoading,
  gpsError,
  onManualLatChange,
  onManualLngChange,
  onMapLocationChange,
}: OutageFormStepOneProps) {
  return (
    <section className="rounded-xl bg-[#ffffff] p-6 shadow-sm">
      <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#475569]">
        Step 1: Where is the problem?
      </div>
      <div className="space-y-4">
        {gpsLoading ? (
          <div className="flex items-center gap-2 text-sm text-[#475569]">
            <LoaderCircle className="animate-spin" size={16} /> Detecting location...
          </div>
        ) : gpsError ? (
          <p className="text-xs text-red-600">{gpsError}</p>
        ) : null}
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-[#475569]">
              Latitude
            </label>
            <input
              type="number"
              step="0.0001"
              placeholder="e.g. 18.6298"
              value={manualLat}
              onChange={(e) => onManualLatChange(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-[#475569]">
              Longitude
            </label>
            <input
              type="number"
              step="0.0001"
              placeholder="e.g. 73.7997"
              value={manualLng}
              onChange={(e) => onManualLngChange(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div className="h-75 overflow-hidden rounded-xl border border-[#e2e8f0]">
          <ReportMap
            location={location}
            onLocationChange={onMapLocationChange}
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-[#475569]">
          <MapPin size={12} /> Location is auto-detected. You can also type coordinates or drag the map pin to adjust.
        </div>
      </div>
    </section>
  );
}
