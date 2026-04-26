"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CreditCard,
  Gauge,
  Home,
  Loader2,
  LocateFixed,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import OutageFormStepThree from "@/components/outage/OutageFormStepThree";
import ReportSuccess from "@/components/outage/ReportSuccess";
import StepIndicator from "@/components/report/StepIndicator";
import StepTwo from "@/components/report/StepTwo";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import useGeoLocation from "@/hooks/useGeoLocation";
import useOutages from "@/hooks/useOutages";
import {
  type ComplaintCategory,
  type Severity,
  getSeverityFromType,
} from "@/lib/helpers";

type Step = 1 | 2 | 3;
type IdentifierType = "phone" | "address" | "esi" | "meter";

export default function ReportPage() {
  const router = useRouter();
  const { addOutage } = useOutages();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [identifierType, setIdentifierType] = useState<IdentifierType>("phone");
  const [identifierValue, setIdentifierValue] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [gpsLocation, setGpsLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [substationName, setSubstationName] = useState("");
  const [feederZone, setFeederZone] = useState("");
  const [dpTransformerNumber, setDpTransformerNumber] = useState("");
  const [poleNumber, setPoleNumber] = useState("");
  const [complaintCategory, setComplaintCategory] = useState<
    ComplaintCategory | ""
  >("");
  const [complaintType, setComplaintType] = useState("");
  const [severity, setSeverity] = useState<Severity | null>(null);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const { location, error, loading, getLocation } = useGeoLocation();

  useEffect(() => setGpsLocation(location), [location]);
  useEffect(() => setGpsError(error), [error]);
  useEffect(() => setGpsLoading(loading), [loading]);

  const options = {
    phone: {
      title: "Phone Number",
      subtitle: "Use the phone number associated with your account",
      icon: Phone,
      label: "Phone Number *",
      placeholder: "e.g., +91 98XXXXXXXX",
      type: "tel",
    },
    address: {
      title: "Address",
      subtitle: "Provide the complete street address",
      icon: Home,
      label: "Address *",
      placeholder: "Enter street address",
      type: "text",
    },
    esi: {
      title: "ESI ID",
      subtitle: "Found on your electricity bill",
      icon: CreditCard,
      label: "ESI ID *",
      placeholder: "Found on your electricity bill",
      type: "text",
    },
    meter: {
      title: "Meter Number",
      subtitle: "Located on your electric meter",
      icon: Gauge,
      label: "Meter Number *",
      placeholder: "Located on your electric meter",
      type: "text",
    },
  } as const;

  const current = options[identifierType];
  const hasManualLocation = manualLat.trim() !== "" && manualLng.trim() !== "";
  const hasLocation = !!gpsLocation || hasManualLocation;
  const nextDisabled = !identifierValue.trim() && !hasLocation;

  const submitReport = () => {
    const manualLocation =
      manualLat.trim() && manualLng.trim()
        ? { lat: Number(manualLat), lng: Number(manualLng) }
        : null;
    const finalLocation =
      gpsLocation ||
      (manualLocation &&
      Number.isFinite(manualLocation.lat) &&
      Number.isFinite(manualLocation.lng)
        ? manualLocation
        : null);
    if (!finalLocation || submitting) return;
    const normalizedSeverity = complaintType
      ? getSeverityFromType(complaintType)
      : severity;
    const trimmedDetails = additionalDetails.trim();
    const description =
      [
        complaintCategory ? `Category: ${complaintCategory}` : "",
        trimmedDetails,
      ]
        .filter(Boolean)
        .join(" - ") || "No additional details provided";

    setSubmitting(true);
    addOutage({
      lat: finalLocation.lat,
      lng: finalLocation.lng,
      area: zipCode.trim() || "Pune",
      complaintCategory: complaintCategory || "supply",
      complaintType: complaintType || "complete_cut",
      severity: normalizedSeverity || "moderate",
      substationName,
      feederName: feederZone,
      dpNumber: dpTransformerNumber,
      poleNumber,
      description,
      reportedBy: identifierValue.trim() || "anonymous",
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-[calc(100vh-64px)] bg-[#f8fafc] p-4 lg:p-6">
        <div className="mx-auto max-w-2xl">
          {submitted ? (
            <ReportSuccess
              onViewMap={() => router.push("/map")}
              onReportAnother={() => {
                setSubmitted(false);
                setCurrentStep(1);
              }}
            />
          ) : (
            <>
              <StepIndicator currentStep={currentStep} />
              <Card className="w-full space-y-6 p-6">
                {currentStep === 1 ? (
                  <>
                    <div>
                      <h1 className="text-xl font-bold text-[#0f172a]">
                        What do you know about the location?
                      </h1>
                      <p className="text-sm text-[#64748b]">Select One</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(
                        Object.entries(options) as Array<
                          [IdentifierType, (typeof options)[IdentifierType]]
                        >
                      ).map(([key, cfg]) => {
                        const selected = identifierType === key;
                        const Icon = cfg.icon;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => {
                              setIdentifierType(key);
                              setIdentifierValue("");
                              setZipCode("");
                            }}
                            className={`cursor-pointer rounded-xl border p-4 text-left transition-all hover:border-[#93c5fd] ${selected ? "border-[#2563eb] bg-blue-50" : "border-[#e2e8f0] bg-white"}`}
                          >
                            <div className="flex items-start gap-3">
                              <Icon
                                size={20}
                                className={
                                  selected
                                    ? "text-electric-blue"
                                    : "text-[#64748b]"
                                }
                              />
                              <div>
                                <p className="font-semibold text-[#0f172a]">
                                  {cfg.title}
                                </p>
                                <p className="text-xs text-[#64748b]">
                                  {cfg.subtitle}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-[#0f172a]">
                        {current.label}
                      </label>
                      <input
                        type={current.type}
                        value={identifierValue}
                        onChange={(e) => setIdentifierValue(e.target.value)}
                        placeholder={current.placeholder}
                        className="w-full rounded-lg border border-[#e2e8f0] px-4 py-3 font-mono text-sm focus:border-[#2563eb] focus:outline-none"
                      />
                      {identifierType === "address" ? (
                        <>
                          <label className="block text-sm font-medium text-[#0f172a]">
                            Zip Code *
                          </label>
                          <input
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="Enter zip code"
                            className="w-full rounded-lg border border-[#e2e8f0] px-4 py-3 font-mono text-sm focus:border-[#2563eb] focus:outline-none"
                          />
                        </>
                      ) : null}
                    </div>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full justify-center"
                        onClick={getLocation}
                        disabled={gpsLoading}
                      >
                        <LocateFixed size={18} />
                        {gpsLoading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Detecting location...
                          </>
                        ) : (
                          "Detect My Location"
                        )}
                      </Button>
                      {gpsLocation ? (
                        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-green-700">
                          <div className="flex items-center gap-2 font-medium">
                            <CheckCircle size={16} />
                            Location detected
                          </div>
                          <p className="mt-1 font-mono text-xs">
                            {gpsLocation.lat.toFixed(6)},{" "}
                            {gpsLocation.lng.toFixed(6)}
                          </p>
                        </div>
                      ) : null}
                      {gpsError ? (
                        <p className="text-sm text-red-600">{gpsError}</p>
                      ) : null}
                      <div className="flex justify-center items-center gap-1">
                        <span className="text-xs text-[#475569]">
                          Want to add exact coordinates?
                        </span>
                        <span
                          className="cursor-pointer border-[#2563eb] underline font-bold text-[12px] text-[#2563eb]"
                          onClick={() => setShowManualInput((v) => !v)}
                        >
                          {/* <MapPin size={10} /> */}
                          Enter Coordinates
                        </span>
                      </div>
                      {showManualInput ? (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <input
                            type="number"
                            value={manualLat}
                            onChange={(e) => setManualLat(e.target.value)}
                            placeholder="Latitude"
                            className="w-full rounded-lg border border-[#e2e8f0] px-4 py-3 font-mono text-sm focus:border-[#2563eb] focus:outline-none"
                          />
                          <input
                            type="number"
                            value={manualLng}
                            onChange={(e) => setManualLng(e.target.value)}
                            placeholder="Longitude"
                            className="w-full rounded-lg border border-[#e2e8f0] px-4 py-3 font-mono text-sm focus:border-[#2563eb] focus:outline-none"
                          />
                        </div>
                      ) : null}
                    </div>
                    <Button
                      size="lg"
                      className="w-full justify-center"
                      disabled={nextDisabled}
                      onClick={() => setCurrentStep(2)}
                    >
                      Next: Verify Information <ArrowRight size={18} />
                    </Button>
                  </>
                ) : currentStep === 2 ? (
                  <StepTwo
                    substationName={substationName}
                    feederZone={feederZone}
                    dpTransformerNumber={dpTransformerNumber}
                    poleNumber={poleNumber}
                    onSubstationNameChange={setSubstationName}
                    onFeederZoneChange={setFeederZone}
                    onDpTransformerNumberChange={setDpTransformerNumber}
                    onPoleNumberChange={setPoleNumber}
                    onBack={() => setCurrentStep(1)}
                    onNext={() => setCurrentStep(3)}
                  />
                ) : (
                  <div className="space-y-4">
                    <Button
                      variant="ghost"
                      className="cursor-pointer justify-start px-0"
                      onClick={() => setCurrentStep(2)}
                    >
                      <ArrowLeft size={16} />
                      Back
                    </Button>
                    <OutageFormStepThree
                      complaintCategory={complaintCategory}
                      complaintType={complaintType}
                      severity={severity}
                      onCategoryChange={(value) => {
                        setComplaintCategory(value);
                        setComplaintType("");
                        setSeverity(null);
                      }}
                      onComplaintTypeChange={(value) => {
                        setComplaintType(value);
                        setSeverity(value ? getSeverityFromType(value) : null);
                      }}
                    />
                    <div>
                      <label className="mb-1 block text-sm text-[#475569]">
                        Additional Details (Optional)
                      </label>
                      <textarea
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                        maxLength={200}
                        placeholder="e.g. Power cut since 7 AM, affects 3 buildings..."
                        className="h-28 w-full resize-none rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-[#0f172a] outline-none focus:ring-2 focus:ring-[#2563eb]"
                      />
                      <p className="mt-1 text-xs text-[#475569]">
                        {additionalDetails.length}/200 characters
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="w-full cursor-pointer justify-center"
                      disabled={submitting}
                      onClick={submitReport}
                    >
                      {submitting ? "Submitting..." : "Submit Report"}
                      <Send size={16} />
                    </Button>
                  </div>
                )}
              </Card>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
