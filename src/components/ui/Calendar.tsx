import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState, useEffect } from "react";
import { Button } from "./Button";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 16)); // September 16, 2024
  const [selectedDay, setSelectedDay] = useState<number>(16);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = [];
  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }

  if (!mounted) return null;

  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
    setSelectedDay(1);
  };

  return (
    <div className="rounded-3xl border h-[stretch] border-border bg-card p-4 sm:p-6 shadow-sm animate-slide-up select-none min-h-[330px] flex flex-col justify-between">
      <div className="gap-4">
        <div className="mb-4 flex items-center justify-between">
          <Button
            onClick={handlePrevMonth}
            variant={"ghost"}
            className="cursor-pointer"
          >
            <LuChevronLeft size={14} />
          </Button>
          <h4 className="text-xs xs:text-sm font-semibold text-foreground tracking-tight">
            {monthName}
          </h4>

          <Button
            onClick={handleNextMonth}
            variant={"ghost"}
            className="cursor-pointer"
          >
            <LuChevronRight size={14} />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-4 mb-2">
          {days.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-foreground py-1"
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-2 sm:gap-y-4 gap-x-1">
        {dates.map((date, idx) => {
          if (date === null) {
            return (
              <div
                key={`empty-${idx}`}
                className="h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9"
              />
            );
          }
          const isSelected = date === selectedDay;
          return (
            <button
              key={date}
              onClick={() => setSelectedDay(date)}
              className={`h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9 mx-auto flex items-center justify-center rounded-full text-[10px] xs:text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isSelected
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm shadow-primary/20 scale-105"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {date}
            </button>
          );
        })}
      </div>
    </div>
  );
}
