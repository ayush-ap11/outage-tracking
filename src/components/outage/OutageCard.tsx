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

  return (
    <Card onClick={onClick} className="cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-mono text-sm font-semibold text-white">
            {outage.area}
          </h3>
          <Badge variant={typeVariant[outage.type] || "default"}>
            {outage.type}
          </Badge>
        </div>
        <Badge variant={outage.status}>{outage.status}</Badge>
      </div>
      <p className="mt-1 text-xs text-[#94a3b8]">{outage.description}</p>
      {!compact && outage.adminMessage ? (
        <p className="mt-2 text-xs text-[#60a5fa]">
          <Info className="mr-1 inline-block align-[-2px]" size={12} />{" "}
          {outage.adminMessage}
        </p>
      ) : null}
      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-[#475569]">
        <span>
          <Users className="mr-1 inline-block align-[-2px]" size={12} />{" "}
          {confirmations} confirmations
        </span>
        <span>{formatTimestamp(outage.timestamp)}</span>
      </div>
    </Card>
  );
}
