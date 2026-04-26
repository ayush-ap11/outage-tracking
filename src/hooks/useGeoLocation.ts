"use client";

import { useState, useCallback } from "react";

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface GeoLocationHookResult {
  location: GeoLocation | null;
  error: string | null;
  loading: boolean;
  getLocation: () => void;
}

export default function useGeoLocation(): GeoLocationHookResult {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = useCallback((): void => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  }, []);

  return { location, error, loading, getLocation };
}
