import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { Info, Users } from "lucide-react";
import type { Outage } from "@/lib/mockData";
import { formatTimestamp, getConfirmationCount } from "@/lib/helpers";

export interface OutageCardProps {
  outage: Outage;
  onClick?: () => void;
  compact?: boolean;
}

const typeVariant: Record<string, string> = {
  planned: "planned",
  unplanned: "unplanned",
};

export default function OutageCard({
  outage,
  onClick,
  compact,
}: OutageCardProps) {
  const confirmations = getConfirmationCount(outage.confirmations);
  const displayType =
    outage.type ??
    (outage.complaintCategory === "scheduled" ? "planned" : "unplanned");

  return (
    <Card onClick={onClick} className="cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="truncate overflow-hidden text-ellipsis font-mono text-sm font-semibold text-[#0f172a]">
            {outage.area}
          </h3>
          <Badge variant={typeVariant[displayType] || "default"}>
            {displayType}
          </Badge>
        </div>
        <Badge variant={outage.status}>{outage.status}</Badge>
      </div>
      <p className="mt-1 line-clamp-2 overflow-hidden text-ellipsis text-xs text-[#334155]">
        {outage.description}
      </p>
      {!compact && outage.adminMessage ? (
        <p className="mt-2 overflow-hidden text-ellipsis text-xs text-[#1d4ed8]">
          <Info className="mr-1 inline-block align-[-2px]" size={12} />{" "}
          {outage.adminMessage}
        </p>
      ) : null}
      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[#475569]">
        <span className="overflow-hidden text-ellipsis">
          <Users className="mr-1 inline-block align-[-2px]" size={12} />{" "}
          {confirmations} confirmations
        </span>
        <span className="overflow-hidden text-ellipsis">
          {formatTimestamp(outage.timestamp)}
        </span>
      </div>
    </Card>
  );
}
