import type { ComplaintCategory, OutageStatus, Severity } from "./helpers";

export type { ComplaintCategory, OutageStatus, Severity } from "./helpers";

export type UserRole = "citizen" | "admin";

export interface Outage {
  id: string;
  lat: number;
  lng: number;
  area: string;
  complaintCategory: ComplaintCategory;
  complaintType: string;
  severity: Severity;
  substationName?: string;
  feederName?: string;
  dpNumber?: string;
  poleNumber?: string;
  type?: string;
  status: OutageStatus;
  reportedBy: string;
  timestamp: string;
  confirmations: string[];
  adminMessage: string | null;
  description: string;
  resolvedAt?: string;
}

export interface UserAccount {
  uid: string;
  phone: string;
  consumerId: string;
  role: UserRole;
}

export interface AreaStat {
  area: string;
  total: number;
  unplanned: number;
  planned: number;
  resolved: number;
  avgConfirms: number;
}
