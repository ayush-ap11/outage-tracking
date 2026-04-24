import Badge from "../ui/Badge";
import Card from "../ui/Card";
import Button from "../ui/Button";
import StatusTimeline from "./StatusTimeline";
import { CheckCircle2, Clock3, Info, MapPin, Users } from "lucide-react";
import type { Outage } from "@/lib/mockData";
import { formatTimestamp, getConfirmationCount } from "@/lib/helpers";

interface OutageDetailProps {
  outage: Outage;
  onConfirm?: (id: string) => void;
  showConfirmButton?: boolean;
}

export default function OutageDetail({
  outage,
  onConfirm,
  showConfirmButton = true,
}: OutageDetailProps) {
  const count = getConfirmationCount(outage.confirmations);
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="truncate overflow-hidden text-ellipsis font-mono text-base font-bold text-[#0f172a]">
          {outage.area}
        </h2>
        <div className="flex gap-2">
          <Badge variant={outage.type}>{outage.type}</Badge>
          <Badge variant={outage.status}>{outage.status}</Badge>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        <span className="overflow-hidden text-ellipsis text-xs text-[#475569]">
          <Clock3 className="mr-1 inline-block align-[-2px]" size={12} />{" "}
          Reported {formatTimestamp(outage.timestamp)}
        </span>
        {outage.resolvedAt ? (
          <span className="ml-3 overflow-hidden text-ellipsis text-xs text-green-700">
            <CheckCircle2
              className="mr-1 inline-block align-[-2px]"
              size={12}
            />{" "}
            Resolved {formatTimestamp(outage.resolvedAt)}
          </span>
        ) : null}
        <span className="ml-3 truncate overflow-hidden text-ellipsis font-mono text-xs text-[#475569]">
          <MapPin className="mr-1 inline-block align-[-2px]" size={12} />{" "}
          {outage.lat.toFixed(4)}, {outage.lng.toFixed(4)}
        </span>
      </div>
      <hr className="my-3 border-[#e2e8f0]" />
      {outage.description ? (
        <div>
          <div className="mb-1 text-xs uppercase tracking-widest text-[#475569]">
            Description
          </div>
          <p className="line-clamp-3 overflow-hidden text-ellipsis text-sm text-[#334155]">
            {outage.description}
          </p>
        </div>
      ) : null}
      {outage.adminMessage ? (
        <div className="mt-3">
          <div className="mb-1 mt-3 text-xs uppercase tracking-widest text-[#475569]">
            Admin Update
          </div>
          <div className="line-clamp-3 overflow-hidden rounded-lg border border-[#2563eb]/20 bg-[#e2e8f0] p-3 text-sm text-[#1d4ed8]">
            <Info className="mr-1 inline-block align-[-2px]" size={12} />{" "}
            {outage.adminMessage}
          </div>
        </div>
      ) : null}
      <div className="mt-3">
        <div className="mb-2 mt-3 text-xs uppercase tracking-widest text-[#334155]">
          Status Timeline
        </div>
        <StatusTimeline currentStatus={outage.status} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="overflow-hidden text-ellipsis text-sm text-[#334155]">
          <Users className="mr-1 inline-block align-[-2px]" size={12} /> {count}{" "}
          people confirmed this outage
        </span>
        {showConfirmButton && outage.status !== "resolved" && onConfirm ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onConfirm(outage.id)}
          >
            Confirm — Same Issue
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
