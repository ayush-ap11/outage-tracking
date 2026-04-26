import type { ComplaintCategory, Severity } from "@/lib/helpers";

export interface OutageFormValues {
  location: { lat: number; lng: number } | null;
  manualLat: string;
  manualLng: string;
  selectedSubstation: string;
  selectedFeeder: string;
  selectedDP: string;
  poleNumber: string;
  complaintCategory: ComplaintCategory | "";
  complaintType: string;
  severity: Severity | null;
  description: string;
}

export interface OutageFormProps {
  onSubmit?: (values: OutageFormValues) => void;
}

export interface OutageFormStepOneProps {
  location: { lat: number; lng: number } | null;
  manualLat: string;
  manualLng: string;
  gpsLoading: boolean;
  gpsError: string | null;
  onManualLatChange: (value: string) => void;
  onManualLngChange: (value: string) => void;
  onMapLocationChange: (lat: number, lng: number) => void;
}

export interface OutageFormStepTwoProps {
  selectedSubstation: string;
  selectedFeeder: string;
  selectedDP: string;
  poleNumber: string;
  onSubstationChange: (value: string) => void;
  onFeederChange: (value: string) => void;
  onDPChange: (value: string) => void;
  onPoleNumberChange: (value: string) => void;
}

export interface OutageFormStepThreeProps {
  complaintCategory: ComplaintCategory | "";
  complaintType: string;
  severity: Severity | null;
  onCategoryChange: (value: ComplaintCategory | "") => void;
  onComplaintTypeChange: (value: string) => void;
}

export interface OutageFormStepFourProps {
  description: string;
  canSubmit: boolean;
  onDescriptionChange: (value: string) => void;
  onSubmit: () => void;
  submitting: boolean;
}
