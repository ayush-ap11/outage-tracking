import { useEffect, useState } from "react";
import { ArrowLeft, Megaphone, Settings, Trash2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import OutageDetail from "@/components/outage/OutageDetail";
import type { Outage, OutageStatus } from "@/lib/mockData";
import { formatTimestamp, getStatusLabel, getTypeLabel } from "@/lib/helpers";

interface OutageManagePanelProps {
  outage: Outage | null;
  onStatusUpdate: (id: string, status: string, message: string) => void;
  onDelete: (id: string) => void;
}

const STATUSES: OutageStatus[] = [
  "reported",
  "acknowledged",
  "in_progress",
  "resolved",
];
const STATUS_STYLES: Record<OutageStatus, string> = {
  reported: "border-red-500/30 text-red-600",
  acknowledged: "border-yellow-500/30 text-yellow-600",
  in_progress: "border-blue-500/30 text-blue-700",
  resolved: "border-green-500/30 text-green-700",
};

export default function OutageManagePanel({
  outage,
  onStatusUpdate,
  onDelete,
}: OutageManagePanelProps) {
  const [selectedStatus, setSelectedStatus] = useState<OutageStatus>(
    outage?.status || "reported",
  );
  const [message, setMessage] = useState(outage?.adminMessage || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (outage) {
      setSelectedStatus(outage.status);
      setMessage(outage.adminMessage || "");
      setShowDeleteConfirm(false);
    }
  }, [outage]);
  if (!outage)
    return (
      <div className="flex h-full items-center justify-center p-6 text-center">
        <div>
          <ArrowLeft className="mx-auto text-[#475569]" size={40} />
          <div className="mt-2 overflow-hidden font-mono text-sm text-[#475569]">
            Select an outage from the list
          </div>
        </div>
      </div>
    );

  return (
    <div className="h-full max-h-full overflow-y-auto p-4">
      <div className="mb-3">
        <h2 className="truncate overflow-hidden text-ellipsis font-mono text-xl font-bold text-[#0f172a]">
          {outage.area}
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant={outage.type}>{getTypeLabel(outage.type)}</Badge>
          <Badge variant={outage.status}>{getStatusLabel(outage.status)}</Badge>
        </div>
        <p className="mt-2 overflow-hidden text-xs text-[#475569]">
          Reported {formatTimestamp(outage.timestamp)}
        </p>
      </div>
      <OutageDetail outage={outage} showConfirmButton={false} />
      <Card className="mt-4">
        <div className="mb-3 text-sm font-mono text-[#475569]">
          <Settings className="mr-1 inline-block align-[-2px]" size={14} />{" "}
          Admin Actions
        </div>
        <div className="mb-2 text-xs text-[#475569]">Update Status</div>
        <div className="grid grid-cols-2 gap-2">
          {STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-mono transition-all duration-150 ${selectedStatus === status ? `${STATUS_STYLES[status]} bg-current/15` : `border ${STATUS_STYLES[status]} bg-transparent`}`}
            >
              {getStatusLabel(status)}
            </button>
          ))}
        </div>
        <div className="mb-2 mt-4 text-xs text-[#475569]">
          Public Update Message
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. Our team is on site, power will be restored by 4 PM..."
          className="h-20 w-full resize-none rounded-lg border border-[#e2e8f0] bg-[#ffffff] px-4 py-3 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:border-[#2563eb] focus:outline-none"
        />
        <Button
          className="mt-3 w-full justify-center"
          onClick={() => onStatusUpdate(outage.id, selectedStatus, message)}
        >
          <Megaphone size={14} /> Post Update
        </Button>
        <hr className="my-4 border-[#e2e8f0]" />
        <div className="mb-2 font-mono text-xs uppercase tracking-widest text-red-700/70">
          Danger Zone
        </div>
        {showDeleteConfirm ? (
          <div className="animate-fade-in-scale rounded-lg border border-red-500/30 bg-red-500/10 p-3">
            <p className="text-sm text-red-600">
              Are you sure? This cannot be undone.
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(outage.id)}
              >
                Yes, Delete
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            size="sm"
            variant="danger"
            className="w-full justify-center"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 size={14} /> Delete Report
          </Button>
        )}
      </Card>
    </div>
  );
}
