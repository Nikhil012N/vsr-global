import { Link, useLocation } from "react-router";
import { MdHomeFilled as Home } from "react-icons/md";
import { FaUsers as Users } from "react-icons/fa";
import {
  LuChevronRight as ChevronRight,
  LuSettings as Settings,
  LuMenu as Menu,
  LuX as X,
} from "react-icons/lu";
import FilesBoltIcon from "@/assets/files-bolt-sidebar-icon.svg?react";
import { useState, useEffect } from "react";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: FilesBoltIcon, label: "Integrations", path: "/integrations" },
    { icon: Users, label: "Users", path: "/users" },
  ];

  // Mobile hamburger button
  const MobileToggleButton = () => (
    <button
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="md:hidden fixed top-4 left-4 z-90 p-2 bg-card hover:bg-muted rounded-lg shadow-md border border-border transition-colors"
      aria-label="Toggle menu"
    >
      {isMobileOpen ? (
        <X size={24} className="text-primary" />
      ) : (
        <Menu size={24} className="text-primary" />
      )}
    </button>
  );

  // Mobile overlay
  const MobileOverlay = () => (
    <div
      className={`md:hidden fixed inset-0 bg-black/50 z-90 transition-opacity duration-300 ${
        isMobileOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setIsMobileOpen(false)}
    />
  );

  // Sidebar content
  const SidebarContent = () => (
    <>
      {/* Menu Items */}
      <nav className="flex-1 flex flex-col gap-2 px-3 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 min-h-16 rounded-xl transition-all duration-200 group hover:bg-white/5 ${
                isActive ? "bg-white/10" : ""
              }`}
              title={item.label}
            >
              <Icon
                size={26}
                width={26}
                height={26}
                className={`flex-shrink-0 transition-all ${
                  isActive
                    ? "bg-white text-primary rounded-full p-1"
                    : "text-white"
                }`}
              />
              {(!isCollapsed || isMobile) && (
                <span className="text-md">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings Icon at Bottom */}
      <div className="p-4 border-t border-white/10">
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
            pathname === "/settings"
              ? "bg-white/20 font-semibold text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
          title="Settings"
        >
          <Settings size={20} className="flex-shrink-0" />
          {(!isCollapsed || isMobile) && (
            <span className="text-sm">Settings</span>
          )}
        </Link>
      </div>
    </>
  );

  return (
    <>
      <MobileToggleButton />
      <MobileOverlay />

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex bg-sidebar text-white flex-col my-4 ml-4   relative transition-all  duration-300 shadow-sm flex-shrink-0 ${
          isCollapsed ? "w-20 rounded-full ease-out" : "w-64 rounded-3xl ease-in"
        }`}
      >
        {/* Toggle Button - Desktop only */}
        <button
          onClick={onToggle}
          className="absolute right-0 top-[50%] transform translate-x-1/2 p-1.5 bg-card hover:bg-muted rounded-full transition-colors z-50 shadow-md border border-border"
          aria-label="Toggle sidebar"
        >
          <ChevronRight
            size={26}
            className={`text-primary transition-transform duration-300 ${
              isCollapsed ? "" : "rotate-180"
            }`}
          />
        </button>

        <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Slide-in) */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full bg-sidebar text-white flex flex-col transition-transform duration-300 shadow-2xl z-90 w-72 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button inside mobile sidebar */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute right-4 top-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <X size={24} className="text-white" />
        </button>

        {/* Mobile Header */}
        <div className="p-6 pt-16 border-b border-white/10">
          <h2 className="text-xl font-bold">Menu</h2>
        </div>

        <SidebarContent />
      </aside>
    </>
  );
}
