import { mockOutages } from "./mockOutages";
import { mockHistory } from "./mockHistory";
import type { AreaStat, Outage, UserAccount } from "./mockDataTypes";

export type { ComplaintCategory, OutageStatus, Severity } from "./helpers";
export type { AreaStat, Outage, UserAccount, UserRole } from "./mockDataTypes";

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

export { mockHistory, mockOutages };
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
    if (outage.complaintCategory === "scheduled") current.planned += 1;
    else current.unplanned += 1;
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
