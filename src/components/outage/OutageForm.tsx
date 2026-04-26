"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/authContext";
import {
  type ComplaintCategory,
  type Severity,
  getSeverityFromType,
} from "@/lib/helpers";
import useGeoLocation from "@/hooks/useGeoLocation";
import useOutages from "@/hooks/useOutages";
import OutageFormStepFour from "./OutageFormStepFour";
import OutageFormStepOne from "./OutageFormStepOne";
import OutageFormStepThree from "./OutageFormStepThree";
import OutageFormStepTwo from "./OutageFormStepTwo";
import type { OutageFormProps, OutageFormValues } from "./OutageForm.types";

export type { OutageFormValues } from "./OutageForm.types";

const parseLocation = (lat: string, lng: string) => {
  if (lat.trim() === "" || lng.trim() === "") return null;
  const parsedLat = Number(lat);
  const parsedLng = Number(lng);
  return Number.isFinite(parsedLat) && Number.isFinite(parsedLng)
    ? { lat: parsedLat, lng: parsedLng }
    : null;
};

export default function OutageForm({ onSubmit }: OutageFormProps) {
  const { user } = useAuth();
  const { addOutage } = useOutages();
  const {
    location: gpsLocation,
    error: gpsError,
    loading: gpsLoading,
    getLocation,
  } = useGeoLocation();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [selectedSubstation, setSelectedSubstation] = useState("");
  const [selectedFeeder, setSelectedFeeder] = useState("");
  const [selectedDP, setSelectedDP] = useState("");
  const [poleNumber, setPoleNumber] = useState("");
  const [complaintCategory, setComplaintCategory] = useState<
    ComplaintCategory | ""
  >("");
  const [complaintType, setComplaintType] = useState("");
  const [severity, setSeverity] = useState<Severity | null>(null);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const currentLocation = useMemo(
    () => parseLocation(manualLat, manualLng) ?? location,
    [manualLat, manualLng, location],
  );

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    if (!gpsLocation) return;
    setLocation(gpsLocation);
    setManualLat(String(gpsLocation.lat));
    setManualLng(String(gpsLocation.lng));
  }, [gpsLocation]);

  const submit = (): void => {
    if (!currentLocation || !complaintCategory) return;
    const normalizedSeverity = complaintType
      ? getSeverityFromType(complaintType)
      : severity;
    const values: OutageFormValues = {
      location: currentLocation,
      manualLat,
      manualLng,
      selectedSubstation,
      selectedFeeder,
      selectedDP,
      poleNumber,
      complaintCategory,
      complaintType,
      severity: normalizedSeverity,
      description: description.trim(),
    };
    setSubmitting(true);
    addOutage({
      lat: currentLocation.lat,
      lng: currentLocation.lng,
      area: "Pune",
      complaintCategory: values.complaintCategory || "supply",
      complaintType: values.complaintType || "complete_cut",
      severity: values.severity || "moderate",
      substationName: values.selectedSubstation,
      feederName: values.selectedFeeder,
      dpNumber: values.selectedDP,
      poleNumber: values.poleNumber,
      description: values.description,
      reportedBy: user?.phone || "anonymous",
    });
    onSubmit?.(values);
    setSubmitting(false);
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <OutageFormStepOne
        location={currentLocation}
        manualLat={manualLat}
        manualLng={manualLng}
        gpsLoading={gpsLoading}
        gpsError={gpsError}
        onManualLatChange={(value) => {
          setManualLat(value);
          setLocation(parseLocation(value, manualLng));
        }}
        onManualLngChange={(value) => {
          setManualLng(value);
          setLocation(parseLocation(manualLat, value));
        }}
        onMapLocationChange={(lat, lng) => {
          setLocation({ lat, lng });
          setManualLat(String(lat));
          setManualLng(String(lng));
        }}
      />
      <OutageFormStepTwo
        selectedSubstation={selectedSubstation}
        selectedFeeder={selectedFeeder}
        selectedDP={selectedDP}
        poleNumber={poleNumber}
        onSubstationChange={(value) => {
          setSelectedSubstation(value);
          setSelectedFeeder("");
        }}
        onFeederChange={setSelectedFeeder}
        onDPChange={setSelectedDP}
        onPoleNumberChange={setPoleNumber}
      />
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
      <OutageFormStepFour
        description={description}
        canSubmit={Boolean(currentLocation) || Boolean(complaintCategory)}
        onDescriptionChange={setDescription}
        onSubmit={submit}
        submitting={submitting}
      />
    </form>
  );
}
