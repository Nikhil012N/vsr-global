import {
  LuBell as Bell,
  LuSun as Sun,
  LuMoon as Moon,
  LuChevronDown as ChevronDown,
  LuUser as UserIcon,
  LuHeadset as HelpIcon,
  LuLogOut as LogoutIcon,
  LuLayers as LayersIcon,
} from "react-icons/lu";
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import LogoImage from "@/assets/logo.svg?react"
import { Link } from "react-router";
interface HeaderProps {
  userName: string;
  userAvatar: string;
}

export function Header({ userName, userAvatar }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage or document class
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const [volume, setVolume] = useState(70);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Sync dark mode class with document.documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <header className="flex items-center justify-between gap-4 md:gap-6 bg-card border-b border-border pl-16 pr-4 py-4 md:px-6 sticky top-0 z-70">
      {/* Left Section - Logo & Greeting */}
      <div className="flex items-center min-w-0">
       <Link to="/">
        <div className="flex items-center gap-2 mr-4 md:mr-6 flex-shrink-0">
          <LogoImage width={35} height={35} />
          <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight xs:block">
            Logo
          </span>
        </div>
        </Link>
        <div className="hidden md:block h-6 w-px bg-border mr-6" />
        <div className="text-xs md:text-sm font-bold text-foreground truncate">
          Hey {userName},{" "}
          <span className="hidden sm:inline text-muted-foreground font-medium">
            Welcome to 'Your Brand Name Here'
          </span>
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors relative">
          <LayersIcon size={20} className="text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors relative">
          <Bell size={20} className="text-muted-foreground" />
          <span className="absolute top-[6px] right-[10px] w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* Light/Dark Mode Toggle */}
        <div 
          className="hidden sm:flex relative w-[76px] items-center rounded-full bg-secondary   p-1 cursor-pointer"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          <div
            className={`absolute left-1 top-1 h-8 w-8 rounded-full bg-primary shadow-sm transition-transform duration-300 ${
              isDarkMode ? "translate-x-9" : "translate-x-0"
            }`}
          />

          <button
            className={`relative z-10 flex h-8 w-8 items-center justify-center transition-colors ${
              !isDarkMode ? "text-white" : "text-muted-foreground"
            }`}
          >
            <Sun size={18} />
          </button>

          <button
            className={`relative z-10 ml-1 flex h-8 w-8 items-center justify-center transition-colors ${
              isDarkMode ? "text-white" : "text-muted-foreground"
            }`}
          >
            <Moon size={18} />
          </button>
        </div>

        {/* Volume Slider */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 bg-secondary rounded-full px-2 py-1">
            <Button
              variant={"ghost"}
              onClick={() => volume > 0 && setVolume(volume - 1)}
            >
              -
            </Button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-16 h-1 rounded-lg appearance-none cursor-pointer bg-primary/30 bg-border accent-primary"
            />
            <Button
              variant={"ghost"}
              onClick={() => volume < 100 && setVolume(volume + 1)}
            >
              {" "}
              +{" "}
            </Button>
            <span className="text-xs font-medium text-foreground min-w-6">
              {volume}%
            </span>
          </div>
        </div>

        {/* User Avatar + Dropdown Menu */}
        <div className="relative flex items-center">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="relative h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden border-2 border-primary hover:border-primary/80 transition-colors flex-shrink-0 cursor-pointer"
          >
            <img
              src={userAvatar}
              alt={userName}
              className="h-full w-full object-cover"
            />
          </button>

          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="p-1 md:p-2 hover:bg-secondary rounded-lg transition-colors flex-shrink-0 cursor-pointer"
          >
            <ChevronDown
              size={20}
              className={`text-muted-foreground transition-transform duration-200 ${isProfileDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-popover border border-border rounded-2xl shadow-xl py-2 z-50 text-sm font-medium text-foreground animate-fade-in">
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  alert("Navigating to My Profile...");
                }}
                className="w-full flex items-center gap-3 text-left px-4 py-2.5 hover:bg-muted transition-colors cursor-pointer"
              >
                <UserIcon
                  size={16}
                  className="text-muted-foreground"
                />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  alert("Navigating to Help...");
                }}
                className="w-full flex items-center gap-3 text-left px-4 py-2.5 hover:bg-muted transition-colors cursor-pointer"
              >
                <HelpIcon
                  size={16}
                  className="text-muted-foreground"
                />
                <span>Help</span>
              </button>
              <div className="h-px bg-border my-1" />
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  alert("Logging out...");
                }}
                className="w-full flex items-center gap-3 text-left px-4 py-2.5 text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
              >
                <LogoutIcon size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
