"use client";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  GitBranch,
  Navigation,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";

interface VerifyInfoStepProps {
  substationName: string;
  feederZone: string;
  dpTransformer: string;
  poleNumber: string;
  onSubstationChange: (value: string) => void;
  onFeederZoneChange: (value: string) => void;
  onDpTransformerChange: (value: string) => void;
  onPoleNumberChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

interface FieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  Icon: LucideIcon;
}

function Field({ label, placeholder, value, onChange, Icon }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[#0f172a]">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[#e2e8f0] px-4 py-3 pl-10 font-mono text-sm focus:border-[#2563eb] focus:outline-none"
        />
      </div>
    </div>
  );
}

export default function VerifyInfoStep({
  substationName,
  feederZone,
  dpTransformer,
  poleNumber,
  onSubstationChange,
  onFeederZoneChange,
  onDpTransformerChange,
  onPoleNumberChange,
  onBack,
  onNext,
}: VerifyInfoStepProps) {
  return (
    <>
      <div>
        <h1 className="font-mono text-xl font-bold text-[#0f172a]">
          Verify Infrastructure Details
        </h1>
        <p className="text-sm text-[#64748b]">
          Help us locate the exact fault point
        </p>
      </div>
      <div className="space-y-3">
        <Field
          label="Substation Name"
          placeholder="e.g., Kothrud Substation"
          value={substationName}
          onChange={onSubstationChange}
          Icon={Building2}
        />
        <Field
          label="Feeder / Zone"
          placeholder="e.g., Feeder 3 / Zone B"
          value={feederZone}
          onChange={onFeederZoneChange}
          Icon={GitBranch}
        />
        <Field
          label="DP Transformer Number"
          placeholder="e.g., DP-204"
          value={dpTransformer}
          onChange={onDpTransformerChange}
          Icon={Zap}
        />
        <Field
          label="Pole Number"
          placeholder="e.g., Pole 12-A"
          value={poleNumber}
          onChange={onPoleNumberChange}
          Icon={Navigation}
        />
        <p className="mt-2 text-center text-xs text-[#475569]">
          All fields are optional but help speed up the repair process
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          variant="ghost"
          className="w-1/3 cursor-pointer justify-center"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        <Button
          className="flex-1 cursor-pointer justify-center"
          onClick={onNext}
        >
          Next: Report Outage
          <ArrowRight size={16} />
        </Button>
      </div>
    </>
  );
}
