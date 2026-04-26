"use client";

import { useCallback, useState } from "react";

export interface HtLine {
  id: number;
  points: [number, number][];
  voltage: string;
  ref: string;
  name: string;
}

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

export function useHtLines() {
  const [htLines, setHtLines] = useState<HtLine[]>([]);
  const [htLoading, setHtLoading] = useState(false);
  const [htError, setHtError] = useState(false);

  const fetchHtLines = useCallback(async (): Promise<void> => {
    setHtLoading(true);
    setHtError(false);
    try {
      const query = `
        [out:json][timeout:25];
        way["power"="line"](18.45,73.70,18.70,73.90);
        out geom;
      `;
      const response = await fetch(OVERPASS_URL, {
        method: "POST",
        body: query,
      });
      const data = await response.json();
      const lines: HtLine[] = data.elements
        .filter(
          (element: any) => element.geometry && element.geometry.length > 1,
        )
        .map((element: any) => ({
          id: element.id,
          points: element.geometry.map(
            (geo: any) => [geo.lat, geo.lon] as [number, number],
          ),
          voltage: element.tags?.voltage ?? "Unknown",
          ref: element.tags?.ref ?? "—",
          name: element.tags?.name ?? "—",
        }));
      setHtLines(lines);
    } catch {
      setHtError(true);
    } finally {
      setHtLoading(false);
    }
  }, []);

  const clearHtLines = useCallback((): void => setHtLines([]), []);

  return { htLines, htLoading, htError, fetchHtLines, clearHtLines };
}

export default useHtLines;
