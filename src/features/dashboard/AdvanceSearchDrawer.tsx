import { useState } from 'react';
import { LuX as X, LuCalendar as Calendar } from 'react-icons/lu';

interface AdvanceSearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdvanceSearchDrawer({ isOpen, onClose }: AdvanceSearchDrawerProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['All']);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['All']);
  const [selectedDuration, setSelectedDuration] = useState<string>('Custom');

  const types = ['All', 'Purchase', 'Sale', 'Mortgage', 'Mortgagee', 'Discharge'];
  const statuses = [
    'All',
    'Requisitions',
    'Closing',
    'Undertaking',
    'Holdback',
    'Fire Insurance',
    'Bank Reporting',
    'Client Reporting',
  ];
  
  const durationsLeft = ['All Time', 'This Month', 'Last Month', 'Custom'];
  const durationsRight = ['This Year', 'Last Year', 'Today'];

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-card shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-card">
          <h2 className="text-xl font-bold text-foreground">Advance Search</h2>
          <button
            onClick={onClose}
            className="text-primary hover:bg-muted p-1 rounded-md transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h3 className="text-sm text-foreground mb-4">Filter By:</h3>
            
            <div className="grid grid-cols-2 gap-8">
              {/* Type Column */}
              <div>
                <h4 className="font-bold text-foreground mb-4">Type</h4>
                <div className="space-y-3">
                  {types.map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => toggleType(type)}
                          className="peer appearance-none w-5 h-5 border border-input rounded cursor-pointer checked:bg-primary checked:border-primary transition-all"
                        />
                        <svg
                          className="absolute w-3.5 h-3.5 text-primary-foreground opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Column */}
              <div>
                <h4 className="font-bold text-foreground mb-4">Status</h4>
                <div className="space-y-3">
                  {statuses.map((status) => (
                    <label key={status} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input
                          type="checkbox"
                          checked={selectedStatuses.includes(status)}
                          onChange={() => toggleStatus(status)}
                          className="peer appearance-none w-5 h-5 border border-input rounded cursor-pointer checked:bg-primary checked:border-primary transition-all"
                        />
                        <svg
                          className="absolute w-3.5 h-3.5 text-primary-foreground opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Duration</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <div className="space-y-3">
                {durationsLeft.map((duration) => (
                  <label key={duration} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <input
                        type="checkbox"
                        checked={selectedDuration === duration}
                        onChange={() => setSelectedDuration(duration)}
                        className="peer appearance-none w-5 h-5 border border-input rounded cursor-pointer checked:bg-primary checked:border-primary transition-all"
                      />
                      <svg
                        className="absolute w-3.5 h-3.5 text-primary-foreground opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {duration}
                    </span>
                  </label>
                ))}
              </div>
              <div className="space-y-3">
                {durationsRight.map((duration) => (
                  <label key={duration} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <input
                        type="checkbox"
                        checked={selectedDuration === duration}
                        onChange={() => setSelectedDuration(duration)}
                        className="peer appearance-none w-5 h-5 border border-input rounded cursor-pointer checked:bg-primary checked:border-primary transition-all"
                      />
                      <svg
                        className="absolute w-3.5 h-3.5 text-primary-foreground opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {duration}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {selectedDuration === 'Custom' && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="From"
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text';
                    }}
                    className="w-full h-11 px-3 pr-10 border border-input rounded-lg focus:outline-none focus:border-primary text-sm text-muted-foreground bg-card transition-all appearance-none"
                  />
                  <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="To"
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text';
                    }}
                    className="w-full h-11 px-3 pr-10 border border-input rounded-lg focus:outline-none focus:border-primary text-sm text-muted-foreground bg-card transition-all appearance-none"
                  />
                  <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border/50 bg-card/50 flex flex-col gap-4">
          <button className="w-full bg-primary text-primary-foreground h-12 rounded-full font-semibold hover:bg-primary/90 transition-colors cursor-pointer">
            Apply
          </button>
          <button 
            className="text-primary text-sm font-medium hover:underline text-center cursor-pointer"
            onClick={() => {
              setSelectedTypes(['All']);
              setSelectedStatuses(['All']);
              setSelectedDuration('Custom');
            }}
          >
            Clear Filter
          </button>
        </div>
      </div>
    </>
  );
}
