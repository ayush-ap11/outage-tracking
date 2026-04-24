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
          <div className="flex items-center gap-3 text-sm transition-colors duration-150 hover:bg-[#1a1a2e]">
            <div className="flex-1 font-mono text-sm font-semibold text-white">
              {stat.area}{" "}
              {stat.area === mostAffectedArea ? (
                <Badge variant="unplanned" className="ml-2">
                  <Flame className="mr-1 inline-block align-[-2px]" size={12} />{" "}
                  Most Affected
                </Badge>
              ) : null}
            </div>
            <div className="w-14 font-mono text-white">{stat.total}</div>
            <div className="w-20 font-mono text-red-400">{stat.unplanned}</div>
            <div className="w-16 font-mono text-[#60a5fa]">{stat.planned}</div>
            <div className="w-16 font-mono text-green-400">{stat.resolved}</div>
            <div className="w-24 font-mono text-[#94a3b8]">
              {stat.avgConfirms}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
