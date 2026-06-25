import { memo } from "react";
import {
  LuFolder as Folder,
  LuBriefcaseBusiness as Briefcase,
  LuSearch as Search,
  LuTextSearch as TextSearch,
  LuArrowUpRight as ArrowUpRight,
  LuBox as Box,
} from "react-icons/lu";
import HomeBlockIcon from "@/assets/home-block.svg?react";
import { useNavigate } from "react-router";
import AssignTaskIcon from "@/assets/assign-task.svg";
import GenerateReport from "@/assets/generate-report.png";
import BlockBannerImage from "@/assets/second-sidebar-image.png";

export const ActionItems = memo(({ screen="lg" }: { screen: "sm" | "lg" }) => {
  const navigate = useNavigate();
  const actionItems = [
    {
      label: "Run Conflict",
      icon: Box,
      active: false,
      startIcon: "",
      action: () => {},
    },
    {
      label: "Open Files",
      icon: Folder,
      active: true,
      startIcon: HomeBlockIcon,
      action: () => navigate("/open-files"),
    },
    {
      label: "Workstation",
      icon: Briefcase,
      active: false,
      startIcon: HomeBlockIcon,
      action: () => {},
    },
    {
      label: "Quick Search",
      icon: Search,
      active: false,
      startIcon: "",
      action: () => {},
    },
    {
      label: "Advance Search",
      icon: TextSearch,
      active: false,
      startIcon: "",
      action: () => {},
    },
  ];

  if (screen == "sm") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:hidden bg-card border border-border p-4 rounded-3xl shadow-sm">
        {actionItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={item.action}
              className={`flex items-center gap-2.5 p-3 rounded-xl transition-all duration-200 ${
                item.active
                  ? "bg-primary/10  border-primary text-primary"
                  : "bg-muted/30 hover:bg-muted text-foreground"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg ${item.active ? "bg-primary text-primary-foreground" : "bg-card text-primary shadow-sm"}`}
              >
                <Icon size={16} />
              </div>
              <span className="font-semibold text-xs truncate">
                {item.label}
              </span>
            </button>
          );
        })}
        <button
          className="relative overflow-hidden before:absolute before:inset-0 before:bg-primary/80 bg-cover bg-center flex items-center justify-center gap-1.5 p-3 text-primary-foreground font-semibold text-xs rounded-xl hover:opacity-95 transition-opacity shadow-sm"
          style={{ backgroundImage: `url(${BlockBannerImage})` }}
        >
          <img src={AssignTaskIcon} className="relative z-10 " />
          <span className="relative z-10">Assign Task</span>
        </button>
        <button
          className="relative overflow-hidden before:absolute before:inset-0 before:bg-primary/80 bg-cover bg-center flex items-center justify-center gap-1.5 p-3 text-primary-foreground font-semibold text-xs rounded-xl hover:opacity-95 transition-opacity shadow-sm"
          style={{ backgroundImage: `url(${BlockBannerImage})` }}
        >
          <img src={GenerateReport} className="relative z-10 w-10 h-10" />
          <span className="relative z-10">Generate Report</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="w-80 bg-card border border-border m-4 p-4 rounded-3xl flex flex-col justify-between overflow-y-auto hidden lg:flex flex-shrink-0">
        <div className="space-y-4">
          {actionItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={item.action}
                className={`w-full relative flex items-center justify-between p-4 rounded-2xl transition-all duration-200 ${
                  item.active
                    ? "bg-primary/10  "
                    : "bg-muted/30 hover:bg-muted text-foreground"
                }`}
              >
                {item.startIcon && (
                  <item.startIcon
                    className={`absolute left-0 top-3.5 ${item.active ? "text-primary" : "text-muted-foreground"}`}
                  />
                )}
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl bg-primary text-primary-foreground`}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
                <ArrowUpRight
                  size={16}
                  className={
                    item.active ? "text-primary" : "text-muted-foreground"
                  }
                />
              </button>
            );
          })}
        </div>
        {/* Bottom Actions */}
        <div className="mt-8 space-y-3">
          <button
            className="relative overflow-hidden before:absolute justify-start before:inset-0 before:bg-primary/70 bg-cover bg-center w-full flex items-center justify-center gap-2 p-3 h-18 text-primary-foreground font-semibold text-sm rounded-xl hover:opacity-95 transition-opacity shadow-sm"
            style={{ backgroundImage: `url(${BlockBannerImage})` }}
          >
            <img src={AssignTaskIcon} className="relative z-10 " />
            <span className="relative z-10">Assign Task</span>
          </button>
          <button
            className="relative overflow-hidden before:absolute justify-start before:inset-0 before:bg-primary/80 bg-cover bg-center w-full flex items-center justify-center gap-2 p-3 h-18 text-primary-foreground font-semibold text-sm rounded-xl hover:opacity-95 transition-opacity shadow-sm"
            style={{ backgroundImage: `url(${BlockBannerImage})` }}
          >
            <img src={GenerateReport} className="relative z-10 w-10 h-10" />
            <span className="relative z-10">Generate Report</span>
          </button>
        </div>
      </div>
    </>
  );
});
