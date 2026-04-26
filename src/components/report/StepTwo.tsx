"use client";

import {
  AlignVerticalJustifyStart,
  ArrowLeft,
  ArrowRight,
  Building2,
  GitBranch,
  Info,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const inputClass =
  "w-full rounded-lg border border-[#e2e8f0] bg-[#ffffff] px-4 py-3 pl-10 font-mono text-sm text-[#0f172a] placeholder-[#94a3b8] focus:border-[#2563eb] focus:outline-none";

interface StepTwoProps {
  substationName: string;
  feederZone: string;
  dpTransformerNumber: string;
  poleNumber: string;
  onSubstationNameChange: (value: string) => void;
  onFeederZoneChange: (value: string) => void;
  onDpTransformerNumberChange: (value: string) => void;
  onPoleNumberChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  Icon: LucideIcon;
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
  Icon,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs text-[#475569]">{label}</label>
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
          className={inputClass}
        />
      </div>
    </div>
  );
}

export default function StepTwo({
  substationName,
  feederZone,
  dpTransformerNumber,
  poleNumber,
  onSubstationNameChange,
  onFeederZoneChange,
  onDpTransformerNumberChange,
  onPoleNumberChange,
  onBack,
  onNext,
}: StepTwoProps) {
  return (
    <div className="space-y-3">
      <Button
        variant="ghost"
        className="cursor-pointer justify-start px-0"
        onClick={onBack}
      >
        <ArrowLeft size={16} />
        Back
      </Button>
      <Card className="space-y-4 p-6">
        <div className="inline-flex items-center gap-1.5 rounded-md bg-[#f1f5f9] px-2 py-1 text-xs text-[#64748b]">
          <Info size={13} />
          Fill what you know - all fields optional
        </div>
        <div className="space-y-3">
          <InputField
            label="Substation Name"
            placeholder="e.g. Kothrud Substation"
            value={substationName}
            onChange={onSubstationNameChange}
            Icon={Building2}
          />
          <InputField
            label="Feeder / Zone"
            placeholder="e.g. Feeder 3 / Zone B"
            value={feederZone}
            onChange={onFeederZoneChange}
            Icon={GitBranch}
          />
          <InputField
            label="DP Transformer Number"
            placeholder="e.g. DT-4521"
            value={dpTransformerNumber}
            onChange={onDpTransformerNumberChange}
            Icon={Zap}
          />
          <InputField
            label="Pole Number"
            placeholder="e.g. P-112"
            value={poleNumber}
            onChange={onPoleNumberChange}
            Icon={AlignVerticalJustifyStart}
          />
        </div>
        <Button
          className="w-full cursor-pointer justify-center"
          size="lg"
          onClick={onNext}
        >
          Next: Report Outage
          <ArrowRight size={16} />
        </Button>
      </Card>
    </div>
  );
}
