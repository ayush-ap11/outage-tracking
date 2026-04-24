export type OutageStatus =
  | "reported"
  | "acknowledged"
  | "in_progress"
  | "resolved";
export type OutageType = "planned" | "unplanned";
export type UserRole = "citizen" | "admin";

export interface Outage {
  id: string;
  lat: number;
  lng: number;
  area: string;
  type: OutageType;
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

export const mockOutages: Outage[] = [
  {
    id: "out-001",
    lat: 18.5362,
    lng: 73.8941,
    area: "Koregaon Park",
    type: "unplanned",
    status: "reported",
    reportedBy: "+919876543210",
    timestamp: "2026-04-24T02:15:00.000Z",
    confirmations: ["u1", "u2", "u3"],
    adminMessage: null,
    description: "Sudden power cut affecting entire lane near North Main Road.",
  },
  {
    id: "out-002",
    lat: 18.5074,
    lng: 73.8077,
    area: "Kothrud",
    type: "planned",
    status: "acknowledged",
    reportedBy: "+919812345678",
    timestamp: "2026-04-23T18:00:00.000Z",
    confirmations: ["u3", "u4"],
    adminMessage: "Scheduled transformer maintenance from 10 AM to 2 PM.",
    description: "Planned maintenance on Paud Road transformer.",
  },
  {
    id: "out-003",
    lat: 18.5089,
    lng: 73.926,
    area: "Hadapsar",
    type: "unplanned",
    status: "in_progress",
    reportedBy: "+919900112233",
    timestamp: "2026-04-23T14:30:00.000Z",
    confirmations: ["u1", "u5", "u6", "u7"],
    adminMessage: "Repair crew dispatched to the site.",
    description: "Underground cable fault near Magarpatta City entrance.",
  },
  {
    id: "out-004",
    lat: 18.5912,
    lng: 73.7381,
    area: "Hinjawadi",
    type: "unplanned",
    status: "reported",
    reportedBy: "+919988776655",
    timestamp: "2026-04-24T03:45:00.000Z",
    confirmations: ["u2", "u8"],
    adminMessage: null,
    description: "Frequent voltage fluctuation in Phase 2 IT park area.",
  },
  {
    id: "out-005",
    lat: 18.5985,
    lng: 73.7616,
    area: "Wakad",
    type: "planned",
    status: "resolved",
    reportedBy: "+919871234560",
    timestamp: "2026-04-22T08:00:00.000Z",
    confirmations: ["u1", "u3", "u5", "u9", "u10"],
    adminMessage: "Work completed. Power restored at 4 PM.",
    description: "Scheduled feeder line upgrade on Datta Mandir Road.",
  },
  {
    id: "out-006",
    lat: 18.559,
    lng: 73.8078,
    area: "Aundh",
    type: "unplanned",
    status: "acknowledged",
    reportedBy: "+919765432100",
    timestamp: "2026-04-24T01:00:00.000Z",
    confirmations: ["u4", "u6", "u11"],
    adminMessage: "Issue logged. Investigating root cause.",
    description: "Complete blackout near ITI Road junction since midnight.",
  },
  {
    id: "out-007",
    lat: 18.559,
    lng: 73.7868,
    area: "Baner",
    type: "planned",
    status: "in_progress",
    reportedBy: "+919654321098",
    timestamp: "2026-04-23T06:00:00.000Z",
    confirmations: ["u2", "u7", "u12", "u13", "u14", "u15"],
    adminMessage: "Tree trimming near high-tension lines in progress.",
    description: "Tree trimming activity near Baner-Balewadi high street.",
  },
  {
    id: "out-008",
    lat: 18.5308,
    lng: 73.8474,
    area: "Shivajinagar",
    type: "unplanned",
    status: "reported",
    reportedBy: "+919543210987",
    timestamp: "2026-04-24T04:10:00.000Z",
    confirmations: ["u1", "u8"],
    adminMessage: null,
    description: "Sparking observed from pole-mounted transformer on FC Road.",
  },
];

export const mockHistory: Outage[] = [
  {
    id: "hist-001",
    lat: 18.5362,
    lng: 73.8941,
    area: "Koregaon Park",
    type: "unplanned",
    status: "resolved",
    reportedBy: "+919876000001",
    timestamp: "2026-04-18T09:00:00.000Z",
    confirmations: ["u1", "u2"],
    adminMessage: "Fuse replaced. Supply restored.",
    description: "Fuse blowout on Lane 5 near German Bakery.",
    resolvedAt: "2026-04-18T13:30:00.000Z",
  },
  {
    id: "hist-002",
    lat: 18.5074,
    lng: 73.8077,
    area: "Kothrud",
    type: "planned",
    status: "resolved",
    reportedBy: "+919876000002",
    timestamp: "2026-04-15T07:00:00.000Z",
    confirmations: ["u3", "u4", "u5"],
    adminMessage: "Maintenance completed ahead of schedule.",
    description: "Capacitor bank replacement at Karve Nagar substation.",
    resolvedAt: "2026-04-15T14:00:00.000Z",
  },
  {
    id: "hist-003",
    lat: 18.5089,
    lng: 73.926,
    area: "Hadapsar",
    type: "unplanned",
    status: "resolved",
    reportedBy: "+919876000003",
    timestamp: "2026-04-12T22:00:00.000Z",
    confirmations: ["u1", "u6", "u7", "u8"],
    adminMessage: "Cable joint repaired. Monitoring for 24h.",
    description: "Cable joint failure causing intermittent outage in Amanora.",
    resolvedAt: "2026-04-13T06:00:00.000Z",
  },
  {
    id: "hist-004",
    lat: 18.5985,
    lng: 73.7616,
    area: "Wakad",
    type: "planned",
    status: "resolved",
    reportedBy: "+919876000004",
    timestamp: "2026-04-10T06:00:00.000Z",
    confirmations: ["u2", "u9"],
    adminMessage: "New transformer commissioned successfully.",
    description: "Old transformer replacement at Wakad bridge junction.",
    resolvedAt: "2026-04-10T16:00:00.000Z",
  },
  {
    id: "hist-005",
    lat: 18.559,
    lng: 73.7868,
    area: "Baner",
    type: "unplanned",
    status: "resolved",
    reportedBy: "+919876000005",
    timestamp: "2026-04-08T17:00:00.000Z",
    confirmations: ["u3", "u10", "u11", "u12", "u13"],
    adminMessage: "Storm damage cleared. All lines restored.",
    description: "Heavy rain caused tree fall on distribution line.",
    resolvedAt: "2026-04-09T02:00:00.000Z",
  },
];

export const mockUser: UserAccount = {
  uid: "citizen-001",
  phone: "+919876543210",
  consumerId: "MSEDCL-PNQ-78432",
  role: "citizen",
};
export const mockAdmin: UserAccount = {
  uid: "admin-001",
  phone: "+919800000001",
  consumerId: "MSEDCL-ADMIN-001",
  role: "admin",
};

export const getAllOutages = (): Outage[] => [...mockOutages, ...mockHistory];

export const getAreaStats = (outages: Outage[]): AreaStat[] => {
  const map = new Map<string, AreaStat & { confirms: number }>();
  outages.forEach((outage) => {
    const current = map.get(outage.area) || {
      area: outage.area,
      total: 0,
      unplanned: 0,
      planned: 0,
      resolved: 0,
      avgConfirms: 0,
      confirms: 0,
    };
    current.total += 1;
    current[outage.type] += 1;
    if (outage.status === "resolved") current.resolved += 1;
    current.confirms += outage.confirmations.length;
    map.set(outage.area, current);
  });
  return [...map.values()]
    .map(({ confirms, ...stat }) => ({
      ...stat,
      avgConfirms: stat.total ? Number((confirms / stat.total).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.total - a.total);
};
