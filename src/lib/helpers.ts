import {
  CATEGORY_CONFIG,
  COMPLAINT_TYPES,
  DP_NUMBERS,
  SEVERITY_CONFIG,
  SUBSTATIONS,
} from "./constants";

export type ComplaintCategory =
  | "supply"
  | "infrastructure"
  | "safety"
  | "scheduled";

export type Severity = "minor" | "moderate" | "critical" | "emergency";

export type OutageStatus =
  | "reported"
  | "acknowledged"
  | "in_progress"
  | "resolved";

export {
  CATEGORY_CONFIG,
  COMPLAINT_TYPES,
  DP_NUMBERS,
  SEVERITY_CONFIG,
  SUBSTATIONS,
};

export function getStatusColor(status: OutageStatus | string): string {
  const map: Record<string, string> = {
    reported: "bg-red-500/15 text-red-600 border-red-500/30",
    acknowledged: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
    in_progress: "bg-blue-500/15 text-blue-700 border-blue-500/30",
    resolved: "bg-green-500/15 text-green-700 border-green-500/30",
  };
  return map[status] || "bg-gray-500/15 text-gray-400 border-gray-500/30";
}

export function getStatusLabel(status: OutageStatus | string): string {
  const map: Record<string, string> = {
    reported: "Reported",
    acknowledged: "Acknowledged",
    in_progress: "In Progress",
    resolved: "Resolved",
  };
  return map[status] || status;
}

const TYPE_STYLES = [
  "bg-sky-500/15 text-sky-700 border-sky-500/30",
  "bg-violet-500/15 text-violet-700 border-violet-500/30",
  "bg-amber-500/15 text-amber-700 border-amber-500/30",
  "bg-rose-500/15 text-rose-700 border-rose-500/30",
];

const getTypeStyleIndex = (value: string): number => {
  let hash = 0;
  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) | 0;
  }
  return Math.abs(hash) % TYPE_STYLES.length;
};

export function getTypeColor(type: string): string {
  if (!type) return "bg-gray-500/15 text-gray-400 border-gray-500/30";
  return TYPE_STYLES[getTypeStyleIndex(type)];
}

export function getTypeLabel(type: string): string {
  if (!type) return "";
  return type
    .split(/[_-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getSeverityFromType(complaintTypeId: string): Severity {
  for (const category of Object.values(COMPLAINT_TYPES)) {
    for (const complaintType of category) {
      if (complaintType.id === complaintTypeId) {
        return complaintType.severity as Severity;
      }
    }
  }
  return "moderate";
}

export function formatTimestamp(isoString: string | null | undefined): string {
  if (!isoString) return "";
  const now = new Date();
  const date = new Date(isoString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export function getConfirmationCount(
  confirmations: readonly string[] | null | undefined,
): number {
  return Array.isArray(confirmations) ? confirmations.length : 0;
}

export function getPinSize(
  confirmations: readonly string[] | null | undefined,
): "small" | "medium" | "large" {
  const count = getConfirmationCount(confirmations);
  if (count >= 6) return "large";
  if (count >= 3) return "medium";
  return "small";
}
