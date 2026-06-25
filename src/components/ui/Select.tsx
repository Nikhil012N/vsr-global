import { useEffect, useRef } from "react";
import { FaChevronDown as ChevronDown } from "react-icons/fa";

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function CustomSelect({
  label,
  value,
  options,
  onChange,
  isOpen,
  onToggle,
}: CustomSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (isOpen) onToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const triggerBg = "bg-card border-input";
  const triggerHeight = "h-12";
  const triggerText = "text-muted-foreground";
  const triggerHover = "hover:border-primary";
  
  const menuBg = "bg-popover border-border";
  const menuItemHover = "hover:bg-muted hover:text-foreground text-foreground";

  return (
    <div ref={containerRef} className="relative select-none w-full">
      <div
        onClick={onToggle}
        className={`w-full ${triggerHeight} flex items-center justify-between px-3 border rounded-sm  ${triggerBg} rounded cursor-pointer ${triggerHover} transition-all duration-150`}
      >
        <span className={`text-[12px] ${triggerText} font-normal`}>
          {value || label}
        </span>
        <ChevronDown
          size={12}
          className="text-muted-foreground transition-transform duration-200"
        />
      </div>
      {isOpen && (
        <div className={`absolute left-0 right-0 mt-1 ${menuBg} border rounded shadow-lg py-1 z-50 max-h-60 overflow-y-auto`}>
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                onToggle();
              }}
              className={`px-3 py-2 text-[12px] cursor-pointer transition-colors ${menuItemHover}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
