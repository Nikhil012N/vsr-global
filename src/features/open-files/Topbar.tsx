import { useNavigate } from "react-router";
import { MdHomeFilled as HomeIcon } from "react-icons/md";
import {
  LuPlus as Plus,
  LuSearch as Search,
  LuSave as Save,
} from "react-icons/lu";

export default function Topbar({ handleSubmit }: { handleSubmit: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between px-4 lg:px-6 py-3 bg-card border-border gap-4 border-b ">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="w-10 h-10 flex items-center justify-center text-primary hover:bg-muted transition-colors cursor-pointer"
        >
          <HomeIcon size={24} />
        </button>
        <button
          type="button"
          onClick={() => navigate("/open-files")}
          className="h-10 px-5 bg-primary text-primary-foreground rounded-full text-[13px] font-bold hover:bg-primary/90 transition-all flex items-center gap-1 cursor-pointer"
        >
          <Plus size={14} /> Add New
        </button>
      </div>

      {/* Search bar and Save button on the right */}
      <div className="flex items-center gap-3 flex-shrink-0 z-50">
        <div className="relative flex-1 sm:flex-none" onClick={() => navigate("/search-files")}>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search from existing files..."

            className="h-10 pl-11 pr-4 w-full sm:w-64 border border-input rounded-full text-[13px] font-medium text-muted-foreground focus:outline-none focus:border-primary bg-card"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="h-10 px-6 bg-primary text-primary-foreground rounded-full text-[13px] font-bold flex items-center gap-1.5 hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
        >
          <Save size={14} /> Save
        </button>
      </div>
    </div>
  );
}
