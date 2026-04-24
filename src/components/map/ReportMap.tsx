"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

interface ReportMapProps {
  location: { lat: number; lng: number } | null;
  onLocationChange: (lat: number, lng: number) => void;
}

function LocationPicker({
  onLocationChange,
}: {
  onLocationChange: ReportMapProps["onLocationChange"];
}): null {
  useMapEvents({
    click: (event) => onLocationChange(event.latlng.lat, event.latlng.lng),
  });

  return null;
}

function createIcon() {
  return L.divIcon({
    html: '<div style="width:48px;height:48px;background:#f59e0b;border-radius:50%;border:2px solid white;box-shadow:0 0 24px #f59e0b80;display:flex;align-items:center;justify-content:center;font-size:19px;cursor:pointer;">&#9889;</div>',
    className: "",
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
}

export default function ReportMap({
  location,
  onLocationChange,
}: ReportMapProps) {
  const [icon] = useState(createIcon);
  const center: [number, number] = location
    ? [location.lat, location.lng]
    : [18.5204, 73.8567];

  return (
    <div className="relative h-full w-full">
      {!location ? (
        <div className="pointer-events-none absolute left-4 top-4 z-1000 rounded-full border border-[#e2e8f0] bg-[#ffffff]/95 px-3 py-2 text-xs text-[#475569] shadow-lg backdrop-blur">
          <MapPin className="mr-1 inline-block align-[-2px]" size={12} /> Tap
          map to place pin or use GPS button
        </div>
      ) : null}
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap &copy; CartoDB"
        />
        <LocationPicker onLocationChange={onLocationChange} />
        {location ? (
          <Marker
            draggable
            position={[location.lat, location.lng]}
            icon={icon}
            eventHandlers={{
              dragend: (event) => {
                const latLng = event.target.getLatLng();
                onLocationChange(latLng.lat, latLng.lng);
              },
            }}
          />
        ) : null}
      </MapContainer>
    </div>
  );
}
