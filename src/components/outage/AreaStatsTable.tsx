import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { Flame } from "lucide-react";

export interface AreaStat {
  area: string;
  total: number;
  unplanned: number;
  planned: number;
  resolved: number;
  avgConfirms: number;
}
interface AreaStatsTableProps {
  stats: AreaStat[];
}

export default function AreaStatsTable({ stats }: AreaStatsTableProps) {
  const mostAffectedArea = stats[0]?.area;
  return (
    <div className="space-y-2">
      {stats.map((stat, index) => (
        <Card
          key={stat.area}
          className="animate-slide-in-right px-4 py-3 opacity-0"
          style={{ animationDelay: `${Math.min(index * 80, 400)}ms` }}
        >
          <div className="flex items-center gap-3 text-sm transition-colors duration-150 hover:bg-[#e2e8f0]">
            <div className="flex-1 overflow-hidden font-mono text-sm font-semibold text-[#0f172a]">
              {stat.area}{" "}
              {stat.area === mostAffectedArea ? (
                <Badge variant="unplanned" className="ml-2">
                  <Flame className="mr-1 inline-block align-[-2px]" size={12} />{" "}
                  Most Affected
                </Badge>
              ) : null}
            </div>
            <div className="w-14 overflow-hidden font-mono text-[#0f172a]">
              {stat.total}
            </div>
            <div className="w-20 overflow-hidden font-mono text-red-600">
              {stat.unplanned}
            </div>
            <div className="w-16 overflow-hidden font-mono text-[#1d4ed8]">
              {stat.planned}
            </div>
            <div className="w-16 overflow-hidden font-mono text-green-700">
              {stat.resolved}
            </div>
            <div className="w-24 overflow-hidden font-mono text-[#334155]">
              {stat.avgConfirms}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
