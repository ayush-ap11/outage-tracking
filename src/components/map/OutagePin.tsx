"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Outage } from "@/lib/mockData";
import OutagePopup from "./OutagePopup";
import { getPinSize, getConfirmationCount } from "@/lib/helpers";

export interface OutagePinProps {
  outage: Outage;
  onConfirm: (id: string) => void;
}

function createCustomIcon(outage: Outage): L.DivIcon {
  const sizeMap = { small: 24, medium: 32, large: 42 } as const;
  const size = sizeMap[getPinSize(outage.confirmations)];
  const color =
    outage.status === "resolved"
      ? "#22c55e"
      : outage.type === "unplanned"
        ? "#ef4444"
        : "#3b82f6";

  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;background:${color};border-radius:50%;border:2px solid white;box-shadow:0 0 ${size / 2}px ${color}80;display:flex;align-items:center;justify-content:center;font-size:${size / 2.5}px;cursor:pointer;">&#9889;</div>`,
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
    <Marker position={position} icon={createCustomIcon(outage)}>
      <Popup>
        <OutagePopup outage={outage} onConfirm={onConfirm} />
      </Popup>
    </Marker>
  );
}
