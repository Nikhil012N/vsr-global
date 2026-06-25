import { useState, useEffect } from "react";
import { Sidebar } from "@/features/dashboard/Sidebar";
import { Calendar } from "@/components/ui/Calendar";
import { SupportPanel } from "@/features/dashboard/SupportPanel";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import mockData from "@/data/mock-data.json";
import { Table } from "@/features/dashboard/DashboardTable";
import { ActionItems } from "@/features/dashboard/ActionItems";
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [closingsData] = useState(mockData.closings);
  const [requisitionsData] = useState(mockData.requisitions);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <ActionItems screen="lg" />
      <div className="flex-1 flex flex-col xl:flex-row overflow-y-auto p-4 gap-4">
        <div className="flex-1 space-y-4 min-w-0">
          <ActionItems screen="sm" />
          <Table heading="Closings" data={closingsData} isLoading={false} />
          <Table
            heading="Requisitions"
            data={requisitionsData}
            isLoading={false}
          />
        </div>
        <div className="w-full xl:w-80 flex flex-col sm:flex-row lg:flex-col gap-4 flex-shrink-0">
          <div className="flex-1 min-w-0 w-full ">
            <Calendar />
          </div>
          <div className="flex-1 min-w-0 w-full ">
            <SupportPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
