"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Outage } from "@/lib/mockData";
import OutagePopup from "./OutagePopup";
import { getPinSize, getConfirmationCount } from "@/lib/helpers";

const SEVERITY_COLORS: Record<string, string> = {
  emergency: "#ef4444",
  critical: "#f97316",
  moderate: "#f59e0b",
  minor: "#22c55e",
  resolved: "#94a3b8",
};

const getPinColor = (outage: Outage): string =>
  SEVERITY_COLORS[
    outage.status === "resolved" ? "resolved" : outage.severity
  ] || "#f59e0b";

export interface OutagePinProps {
  outage: Outage;
  onConfirm: (id: string) => void;
}

function createCustomIcon(outage: Outage): L.DivIcon {
  const sizeMap = { small: 24, medium: 32, large: 42 } as const;
  const size = sizeMap[getPinSize(outage.confirmations)];
  const color = getPinColor(outage);
  const isEmergency =
    outage.status !== "resolved" && outage.severity === "emergency";
  const ring = isEmergency
    ? `<div class="animate-ping" style="position:absolute;inset:-6px;border-radius:9999px;border:2px solid ${color};opacity:.5;"></div>`
    : "";
  const pulse = isEmergency ? "animation:pinPulse 1.5s infinite;" : "";

  return L.divIcon({
    html: `<div style="position:relative;width:${size}px;height:${size}px;cursor:pointer;">${ring}<div style="position:relative;width:${size}px;height:${size}px;background:${color};border-radius:50%;border:2px solid white;box-shadow:0 0 ${size / 2}px ${color}80;display:flex;align-items:center;justify-content:center;font-size:${size / 2.5}px;${pulse}">&#9889;</div></div>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function OutagePin({ outage, onConfirm }: OutagePinProps) {
  const position: [number, number] = [outage.lat, outage.lng];
  const confirmationCount = getConfirmationCount(outage.confirmations);
  void confirmationCount;

  return (
    <>
      <style jsx global>{`
        @keyframes pinPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.4);
          }
        }
      `}</style>
      <Marker position={position} icon={createCustomIcon(outage)}>
        <Popup>
          <OutagePopup outage={outage} onConfirm={onConfirm} />
        </Popup>
      </Marker>
    </>
  );
}
