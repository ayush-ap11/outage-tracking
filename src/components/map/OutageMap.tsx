"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAuth } from "@/lib/authContext";
import { mockOutages } from "@/lib/mockData";
import OutagePin from "./OutagePin";
import useOutages from "@/hooks/useOutages";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export interface OutageMapProps {
  filter: "all" | "planned" | "unplanned";
}

function FitCenter(): null {
  const map = useMap();

  useEffect(() => {
    map.setView([18.5204, 73.8567], 12);
  }, [map]);

  return null;
}

export default function OutageMap({ filter }: OutageMapProps) {
  const { outages, confirmOutage } = useOutages();
  const source = outages.length > 0 ? outages : mockOutages;
  const filteredOutages = source.filter(
    (outage) => filter === "all" || outage.type === filter,
  );
  const { theme } = useAuth();

  return (
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
        url={
          theme === "light"
            ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        }
      />
      {filteredOutages.map((outage) => (
        <OutagePin
          key={outage.id}
          outage={outage}
          onConfirm={(id) => confirmOutage(id, "local-user")}
        />
      ))}
    </MapContainer>
  );
}
