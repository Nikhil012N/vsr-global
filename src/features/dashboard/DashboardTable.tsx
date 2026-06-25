import {
  LuFileText as FileText,
  LuArrowUpRight as ArrowUpRight,
} from "react-icons/lu";
import { useState, useEffect } from "react";
import { SkeletonLoader } from "@/components/shared/SkeletonLoader";
import { Link } from "react-router";

interface Closing {
  id: number;
  fileName: string;
  number: string;
  type: string;
}

interface ClosingsTableProps {
  data: Closing[];
  isLoading?: boolean;
  heading: string;
}

export function Table({ data, isLoading, heading }: ClosingsTableProps) {
  const [displayedData, setDisplayedData] = useState<Closing[]>([]);
  const [activeTab, setActiveTab] = useState("Today");

  useEffect(() => {
    setDisplayedData(data.slice(0, 5));
  }, [data]);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <SkeletonLoader rows={3} columns={4} />
      </div>
    );
  }

  const tabs = ["Today", "Weekly", "Monthly"];

  return (
    <div className="rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-sm animate-slide-up flex flex-col gap-4">
      {/* Card Header inside Table Container */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-foreground">{heading}</h3>
          <span className="bg-primary text-primary-foreground font-bold px-2 py-0.5 rounded-full text-xs flex items-center justify-center min-w-[20px] h-5">
            {data?.length}
          </span>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/50">
              <th className="pb-3 text-xs text-muted-foreground uppercase">
                File Name
              </th>
              <th className="pb-3 text-xs text-muted-foreground uppercase">Number</th>
              <th className="pb-3 text-xs text-muted-foreground uppercase ">Type</th>
              <th className="pb-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {displayedData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-xs font-semibold text-foreground truncate max-w-40">
                      {item.fileName}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 text-xs font-semibold text-muted-foreground">
                  {item.number}
                </td>
                <td className="py-3.5 text-xs font-semibold text-muted-foreground ">
                  {item.type}
                </td>
                <td className="py-3.5 text-right">
                  <button className="text-muted-foreground hover:text-primary transition-colors p-1">
                    <ArrowUpRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom View All Link inside card */}
      <div className="flex justify-end mt-1">
        <Link
          to="/search-files"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View All
        </Link>
      </div>
    </div>
  );
}
