import Button from "../ui/Button";
import { CheckCircle2 } from "lucide-react";

export interface ReportSuccessProps {
  onViewMap: () => void;
  onReportAnother: () => void;
}

export default function ReportSuccess({
  onViewMap,
  onReportAnother,
}: ReportSuccessProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <style jsx global>{`
        @keyframes fadeInScale {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
      <CheckCircle2
        className="animate-[fadeInScale_0.5s_ease-out] text-green-400"
        size={56}
      />
      <h2 className="mt-4 text-2xl font-mono font-bold text-green-400">
        Report Submitted!
      </h2>
      <p className="mt-2 text-sm text-[#94a3b8]">
        Your outage is now visible on the live map
      </p>
      <p className="mt-1 text-xs text-[#475569]">
        Community members nearby can now confirm it
      </p>
      <div className="mt-6 flex w-full max-w-sm divide-x divide-[#1e2a3a] rounded-lg border border-[#1e2a3a]">
        {[
          ["0", "Confirmations"],
          ["Live", "Status"],
          ["Pune", "Area"],
        ].map(([value, label]) => (
          <div key={label} className="flex-1 px-4 py-3 text-center">
            <div className="font-mono text-lg font-bold text-white">
              {value}
            </div>
            <div className="mt-0.5 text-xs text-[#475569]">{label}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 w-full max-w-sm">
        <Button className="w-full justify-center" onClick={onViewMap}>
          View on Map
        </Button>
        <Button
          variant="outline"
          className="mt-2 w-full justify-center"
          onClick={onReportAnother}
        >
          Report Another
        </Button>
      </div>
    </div>
  );
}
