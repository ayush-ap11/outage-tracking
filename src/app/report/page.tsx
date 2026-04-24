"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  FileText,
  LocateFixed,
  LoaderCircle,
  MapPin,
  Zap,
} from "lucide-react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ReportSuccess from "@/components/outage/ReportSuccess";
import { useAuth } from "@/lib/authContext";
import useGeoLocation from "@/hooks/useGeoLocation";
import useOutages from "@/hooks/useOutages";

const ReportMap = dynamic(() => import("@/components/map/ReportMap"), {
  ssr: false,
  loading: () => <LoadingScreen message="Loading map..." />,
});

type OutageTypeChoice = "planned" | "unplanned" | null;

export default function ReportPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addOutage } = useOutages();
  const {
    location: gpsLocation,
    error: gpsError,
    loading,
    getLocation,
  } = useGeoLocation();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [type, setType] = useState<OutageTypeChoice>(null);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (gpsLocation) setLocation(gpsLocation);
  }, [gpsLocation]);

  const submitReport = (): void => {
    if (!location) return setError("Please select a location");
    if (!type) return setError("Please select outage type");
    setSubmitting(true);
    window.setTimeout(() => {
      addOutage({
        lat: location.lat,
        lng: location.lng,
        type,
        description: description.trim(),
        reportedBy: user?.phone || "anonymous",
        area: "Pune",
      });
      setSubmitted(true);
      setError(null);
      setSubmitting(false);
    }, 350);
  };

  return (
    <ProtectedRoute>
      <div className="animate-fade-in min-h-[calc(100vh-64px)] bg-[#f8fafc] p-4 lg:p-6">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => router.back()}
            type="button"
            className="self-start cursor-pointer text-2xl text-[#475569] transition hover:text-[#0f172a]"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="mt-2">
            <h1 className="font-mono text-2xl font-bold text-[#0f172a]">
              Report Outage
            </h1>
            <p className="mt-1 text-sm text-[#475569]">
              Help your community by reporting power cuts
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-4 lg:flex-row">
            <div className="order-1 w-full shrink-0 lg:w-96">
              {submitted ? (
                <ReportSuccess
                  onViewMap={() => router.push("/map")}
                  onReportAnother={() => {
                    setSubmitted(false);
                    setLocation(null);
                    setType(null);
                    setDescription("");
                    setError(null);
                  }}
                />
              ) : (
                <div className="space-y-4">
                  <Card className="animate-fade-in opacity-0 delay-100">
                    <div className="mb-3 font-mono text-sm text-[#475569]">
                      <MapPin
                        className="mr-1 inline-block align-[-2px]"
                        size={14}
                      />{" "}
                      Location
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={getLocation}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          <LoaderCircle className="animate-spin" size={16} />
                          Detecting location...
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <LocateFixed size={16} />
                          Use My GPS Location
                        </span>
                      )}
                    </Button>
                    {gpsError ? (
                      <p className="mt-2 text-xs text-red-600">{gpsError}</p>
                    ) : null}
                    {location ? (
                      <div className="mt-3 rounded-lg border border-green-500/30 bg-green-500/20 p-3">
                        <div className="text-sm text-green-700">
                          <CheckCircle
                            className="mr-1 inline-block align-[-2px]"
                            size={14}
                          />{" "}
                          Location detected
                        </div>
                        <div className="mt-1 font-mono text-xs text-[#1d4ed8]">
                          Lat: {location.lat.toFixed(4)} | Lng:{" "}
                          {location.lng.toFixed(4)}
                        </div>
                      </div>
                    ) : null}
                  </Card>

                  <Card className="animate-fade-in opacity-0 delay-200">
                    <div className="mb-3 font-mono text-sm text-[#475569]">
                      <Zap
                        className="mr-1 inline-block align-[-2px]"
                        size={14}
                      />{" "}
                      Outage Type
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setType("planned")}
                        className={`active:scale-95 cursor-pointer w-full rounded-lg border p-3 font-mono text-sm transition-all duration-200 ${type === "planned" ? "border-[#2563eb] bg-[#2563eb] text-white" : "border-[#e2e8f0] bg-[#ffffff] text-[#475569] hover:border-[#2563eb]/50"}`}
                      >
                        <div className="inline-flex items-center gap-2">
                          <Calendar size={14} /> Planned
                        </div>
                        <div className="text-xs opacity-70">
                          Scheduled maintenance
                        </div>
                      </button>
                      <button
                        onClick={() => setType("unplanned")}
                        className={`active:scale-95 cursor-pointer w-full rounded-lg border p-3 font-mono text-sm transition-all duration-200 ${type === "unplanned" ? "border-red-600 bg-red-600 text-white" : "border-[#e2e8f0] bg-[#ffffff] text-[#475569] hover:border-[#2563eb]/50"}`}
                      >
                        <div className="inline-flex items-center gap-2">
                          <Zap size={14} /> Unplanned
                        </div>
                        <div className="text-xs opacity-70">
                          Sudden power cut
                        </div>
                      </button>
                    </div>
                  </Card>

                  <Card className="animate-fade-in opacity-0 delay-300">
                    <div className="mb-3 font-mono text-sm text-[#475569]">
                      <FileText
                        className="mr-1 inline-block align-[-2px]"
                        size={14}
                      />{" "}
                      Description (Optional)
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={200}
                      placeholder="e.g. Complete power cut since 7 AM, transformer issue near main road..."
                      className="h-24 w-full resize-none rounded-lg border border-[#e2e8f0] bg-[#ffffff] px-4 py-3 text-sm text-[#0f172a] transition-all duration-200 placeholder-[#94a3b8] focus:border-[#2563eb] focus:outline-none focus:shadow-[0_0_0_2px_rgba(37,99,235,0.2)]"
                    />
                    <div className="mt-1 text-right text-xs text-[#475569]">
                      {description.length}/200
                    </div>
                  </Card>

                  {error ? (
                    <div className="text-center text-sm text-red-600">
                      {error}
                    </div>
                  ) : null}

                  <Button
                    size="lg"
                    className="animate-fade-in w-full justify-center opacity-0 delay-400"
                    onClick={submitReport}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <LoaderCircle className="animate-spin" size={16} />
                        Submitting...
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <Zap size={16} /> Submit Report
                      </span>
                    )}
                  </Button>
                </div>
              )}
            </div>

            <div className="order-2 flex-1 lg:min-h-0">
              <div
                className="rounded-xl border border-[#e2e8f0] bg-[#ffffff] p-3 lg:h-[min(70vh,680px)]"
                style={{ height: 280 }}
              >
                <ReportMap
                  location={location}
                  onLocationChange={(lat, lng) => {
                    setLocation({ lat, lng });
                    setError(null);
                  }}
                />
                <p className="mt-2 text-center text-xs text-[#475569]">
                  Tap the map to place your outage pin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
