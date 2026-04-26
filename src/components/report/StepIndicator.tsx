import { Check, FileText, MapPin, Send } from "lucide-react";

type Step = 1 | 2 | 3;

interface StepIndicatorProps {
  currentStep: Step;
}

const STEPS = [
  { id: 1 as Step, label: "Identify Location", Icon: MapPin },
  { id: 2 as Step, label: "Verify Information", Icon: FileText },
  { id: 3 as Step, label: "Report Outage", Icon: Send },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8 flex items-center justify-center">
      <div className="flex w-full max-w-2xl items-start">
        {STEPS.map(({ id, label, Icon }, index) => {
          const active = currentStep === id;
          const completed = currentStep > id;
          const lineBlue = currentStep > id;
          const DisplayIcon = completed ? Check : Icon;

          return (
            <div
              key={id}
              className="relative flex flex-1 flex-col items-center"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  active
                    ? "border-electric-blue bg-electric-blue text-white"
                    : completed
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-[#94a3b8] bg-white text-[#94a3b8]"
                }`}
              >
                <DisplayIcon size={18} />
              </div>
              <p
                className={`mt-2 text-center text-sm ${
                  active
                    ? "font-bold text-electric-blue"
                    : "font-medium text-[#64748b]"
                }`}
              >
                {label}
              </p>
              {index < STEPS.length - 1 ? (
                <span
                  className={`absolute left-1/2 top-5 ml-7 h-0.5 w-[calc(100%-3.5rem)] ${
                    lineBlue ? "bg-electric-blue" : "bg-[#cbd5e1]"
                  }`}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
