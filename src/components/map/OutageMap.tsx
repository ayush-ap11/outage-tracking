"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, Fragment } from "react";
import { Zap, ZapOff } from "lucide-react";
import { MapContainer, Popup, TileLayer, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { PolylineOptions } from "leaflet";
import type { ComponentType, ReactNode } from "react";
import { mockOutages, type Outage } from "@/lib/mockData";
import useOutages from "@/hooks/useOutages";
import { useHtLines, type HtLine } from "@/hooks/useHtLines";
import { SEVERITY_CONFIG, type Severity } from "@/lib/helpers";
import OutagePopup from "./OutagePopup";

type HtPolylineProps = {
  positions: [number, number][];
  pathOptions: PolylineOptions;
  children?: ReactNode;
};

const Polyline = dynamic(
  () =>
    import("react-leaflet").then(
      (mod) => mod.Polyline as unknown as ComponentType<HtPolylineProps>,
    ),
  { ssr: false },
);

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export interface OutageMapProps {
  filter?: "all";
}

function FitCenter(): null {
  const map = useMap();

  useEffect(() => {
    map.setView([18.5204, 73.8567], 12);
  }, [map]);

  return null;
}

function HtLinePopup({ line }: { line: HtLine }) {
  return (
    <div className="w-72 max-w-72 overflow-hidden">
      <div className="text-sm font-bold text-[#991b1b]">High Tension Line</div>
      <div className="mt-2 space-y-1 text-xs text-[#475569]">
        <div>Voltage: {line.voltage}</div>
        <div>Ref: {line.ref}</div>
      </div>
      <div className="mt-2 rounded-lg bg-[#fee2e2] p-2 text-xs text-[#991b1b]">
        <div>Digging within 5m of this line is prohibited.</div>
        <div>MSEDCL helpline: 1800-212-3435</div>
      </div>
    </div>
  );
}

const severityRadius = (severity: Severity): number => {
  switch (severity) {
    case "emergency":
      return 300;
    case "critical":
      return 220;
    case "moderate":
      return 150;
    case "minor":
      return 100;
    default:
      return 150;
  }
};

export default function OutageMap({ filter: _filter }: OutageMapProps) {
  const { outages, confirmOutage } = useOutages();
  const [showHtWires, setShowHtWires] = useState(false);
  const [selectedOutage, setSelectedOutage] = useState<Outage | null>(null);
  void selectedOutage;
  const { htLines, htLoading, htError, fetchHtLines, clearHtLines } =
    useHtLines();
  const filteredOutages =
    outages.length > 0 && outages[0]?.severity ? outages : mockOutages;

  useEffect(() => {
    if (showHtWires) void fetchHtLines();
    else clearHtLines();
  }, [showHtWires, fetchHtLines, clearHtLines]);

  return (
    <div className="relative h-full w-full">
      <button
        type="button"
        onClick={() => setShowHtWires((value) => !value)}
        className={`absolute right-4 top-4 z-1000 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-md ${showHtWires ? "border border-[#ef4444] bg-[#ef4444] text-white" : "border border-[#e2e8f0] bg-white text-[#475569]"}`}
      >
        {showHtWires ? <ZapOff size={16} /> : <Zap size={16} />}
        {showHtWires ? "Hide HT Wires" : "Show HT Wires"}
      </button>
      {showHtWires && htLoading ? (
        <div className="absolute right-4 top-16 z-1000 text-xs text-[#475569]">
          Loading HT wire data...
        </div>
      ) : null}
      {showHtWires && htError ? (
        <div className="absolute right-4 top-16 z-1000 text-xs text-[#ef4444]">
          Could not load HT wire data
        </div>
      ) : null}
      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        className="rounded-xl"
      >
        <FitCenter />
        <TileLayer
          attribution="&copy; OpenStreetMap &copy; CartoDB"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {showHtWires && htLines.length > 0
          ? htLines.map((line) => (
              <Polyline
                key={line.id}
                positions={line.points}
                pathOptions={{
                  color: "#ef4444",
                  weight: 2,
                  dashArray: "8 4",
                  opacity: 0.8,
                }}
              >
                <Popup>
                  <HtLinePopup line={line} />
                </Popup>
              </Polyline>
            ))
          : null}
        {filteredOutages.map((outage) => (
          <Fragment key={outage.id}>
            {outage.severity === "emergency" && (
              <Circle
                center={[outage.lat, outage.lng]}
                radius={severityRadius("emergency") + 100}
                pathOptions={{
                  color: "#ef4444",
                  fillOpacity: 0,
                  weight: 1.5,
                  opacity: 0.4,
                  dashArray: "6 4",
                }}
              />
            )}
            <Circle
              center={[outage.lat, outage.lng]}
              radius={severityRadius(outage.severity)}
              pathOptions={{
                color: SEVERITY_CONFIG[outage.severity]?.color ?? "#f59e0b",
                fillColor: SEVERITY_CONFIG[outage.severity]?.color ?? "#f59e0b",
                fillOpacity: outage.severity === "emergency" ? 0.45 : 0.25,
                weight: 2,
                opacity: 0.9,
              }}
              eventHandlers={{
                click: (e) => {
                  e.target.openPopup();
                  setSelectedOutage(outage);
                },
              }}
            >
              <Popup
                autoPan={true}
                closeButton={true}
                autoClose={false}
                closeOnClick={false}
              >
                <OutagePopup
                  outage={outage}
                  onConfirm={(id) => confirmOutage(id, "local-user")}
                />
              </Popup>
            </Circle>
          </Fragment>
        ))}
      </MapContainer>
    </div>
  );
}
