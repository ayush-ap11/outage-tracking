import Badge from "@/components/ui/Badge";
import { Users } from "lucide-react";
import type { Outage } from "@/lib/mockData";
import { formatTimestamp, getStatusLabel, getTypeLabel } from "@/lib/helpers";

interface AdminSidebarProps {
  outages: Outage[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}

const FILTERS = ["all", "reported", "acknowledged", "in_progress", "resolved"];

export default function AdminSidebar({
  outages,
  selectedId,
  onSelect,
  filter,
  onFilterChange,
}: AdminSidebarProps) {
  const visibleOutages =
    filter === "all"
      ? outages
      : outages.filter((outage) => outage.status === filter);
  return (
    <div className="flex h-full w-80 shrink-0 flex-col border-r border-[#e2e8f0] bg-[#ffffff]">
      <div className="border-b border-[#e2e8f0] p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-sm font-bold text-[#0f172a]">
            Active Reports
          </h2>
          <Badge variant="admin" className="bg-[#2563eb]/20 text-[#1d4ed8]">
            {outages.length} total
          </Badge>
        </div>
        <p className="mt-3 text-xs text-[#475569]">Filter by status</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {FILTERS.map((value) => (
            <button
              key={value}
              onClick={() => onFilterChange(value)}
              className={`cursor-pointer rounded-full px-3 py-1 text-xs font-mono transition-all duration-150 ${filter === value ? "bg-[#2563eb] text-white" : "border border-[#e2e8f0] bg-[#ffffff] text-[#475569] hover:border-[#2563eb]/40"}`}
            >
              {value === "all" ? "All" : getStatusLabel(value)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {visibleOutages.map((outage) => (
          <button
            key={outage.id}
            onClick={() => onSelect(outage.id)}
            className={`cursor-pointer w-full border-b border-[#e2e8f0] px-4 py-3 text-left transition-colors duration-150 hover:bg-[#f1f5f9] ${selectedId === outage.id ? "border-l-2 border-l-[#2563eb] bg-[#e2e8f0]" : ""}`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="truncate overflow-hidden text-ellipsis font-mono text-sm text-[#0f172a]">
                {outage.area}
              </span>
              <Badge variant={outage.type}>{getTypeLabel(outage.type)}</Badge>
            </div>
            <div className="mt-1 flex items-center justify-between gap-2 text-xs">
              <Badge variant={outage.status}>
                {getStatusLabel(outage.status)}
              </Badge>
              <span className="text-[#475569]">
                {formatTimestamp(outage.timestamp)}
              </span>
            </div>
            <div className="mt-1 overflow-hidden text-xs text-[#475569]">
              <Users className="mr-1 inline-block align-[-2px]" size={12} />{" "}
              {outage.confirmations.length}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
