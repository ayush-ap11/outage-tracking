import type { OutageStatus, OutageType } from "./mockData";

export function getStatusColor(status: OutageStatus | string): string {
  const map: Record<string, string> = {
    reported: "bg-red-500/15 text-red-400 border-red-500/30",
    acknowledged: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    in_progress: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    resolved: "bg-green-500/15 text-green-400 border-green-500/30",
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

export function getTypeColor(type: OutageType | string): string {
  const map: Record<string, string> = {
    planned: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    unplanned: "bg-red-500/15 text-red-400 border-red-500/30",
  };
  return map[type] || "bg-gray-500/15 text-gray-400 border-gray-500/30";
}

export function getTypeLabel(type: OutageType | string): string {
  return type === "planned" ? "Planned" : "Unplanned";
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
