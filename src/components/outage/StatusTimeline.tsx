interface StatusTimelineProps {
  currentStatus: string;
}

const STEPS = ["reported", "acknowledged", "in_progress", "resolved"] as const;
const getStepIndex = (status: string): number =>
  STEPS.indexOf(status as (typeof STEPS)[number]);

export default function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const currentIndex = getStepIndex(currentStatus);
  const labels = ["Reported", "Acknowledged", "In Progress", "Resolved"];

  return (
    <div className="flex w-full items-center">
      {STEPS.map((step, index) => {
        const active = index <= currentIndex;
        const next = index === currentIndex + 1;

        return (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`h-3 w-3 shrink-0 rounded-full ${
                  active
                    ? "bg-[#2563eb]"
                    : next
                      ? "bg-[#f59e0b] ring-2 ring-[#f59e0b]/30"
                      : "border border-[#334155] bg-[#e2e8f0]"
                }`}
              />
              <span
                className={`mt-1 w-16 overflow-hidden text-center text-[10px] font-mono ${active ? "text-[#1d4ed8]" : "text-[#334155]"}`}
              >
                {labels[index]}
              </span>
            </div>
            {index < STEPS.length - 1 ? (
              <div
                className={`mx-1 h-px flex-1 ${index < currentIndex ? "bg-[#2563eb]" : "bg-[#e2e8f0]"}`}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
