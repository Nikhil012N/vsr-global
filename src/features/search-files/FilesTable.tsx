import {
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight,
  LuSearch as Search,
  LuFolderOpen as FolderOpen,
  LuSlidersHorizontal as SlidersHorizontal,
  LuFlag as Flag,
  LuX as X,
} from "react-icons/lu";
import { useState } from "react";
import { AdvanceSearchDrawer } from "../dashboard/AdvanceSearchDrawer";
import { Button } from "@/components/ui/Button";
import ShieldUser from "@/assets/shield-user.svg?react";

interface FileRecord {
  id: number;
  fileNumber: string;
  type: string;
  name: string;
  address: string;
  fileOpening: string;
  requisitions: string;
  closing: string;
  status: string;
}

interface FilesTableProps {
  data: FileRecord[];
  onSelectFile?: (id: number) => void;
  month?: string;
  year?: string;
}

export function FilesTable({
  data,
  onSelectFile,
  month = "Nov",
  year = "2024",
}: FilesTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([2, 3]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map((item) => item.id));
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fileNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getFlagColor = (id: number) => {
    if (id % 3 === 1) return "text-red-500 fill-red-500/20";
    if (id % 3 === 2) return "text-green-500 fill-green-500/20";
    return "text-amber-500 fill-amber-500/20";
  };

  return (
    <>
      {" "}
      <div className="flex flex-col sm:flex-row place-content-center items-stretch sm:items-center gap-3 p-4 md:p-6 bg-card sm:justify-end">
        <div className="relative max-w-5xl w-full sm:flex-1 bg-card rounded-2xl border border-border ">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary"
            size={18}
          />
          <input
            type="text"
            placeholder="Search from existing files..."
            className="pl-10 pr-4 py-3 w-full bg-transparent text-sm focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto">
          <Button
            onClick={() => setIsAdvanceSearchOpen(true)}
            className="rounded-full px-4 h-12 flex-1 sm:flex-none whitespace-nowrap"
          >
            <SlidersHorizontal size={16} className="mr-2 hidden sm:inline-block" />
            <span className="hidden sm:inline">Advance Search</span>
            <span className="sm:hidden flex items-center justify-center gap-2">
              <SlidersHorizontal size={16} /> Advance
            </span>
          </Button>

          {searchTerm && (
            <Button
              variant={"ghost"}
              onClick={() => setSearchTerm("")}
              className="h-12 w-12 flex-shrink-0 text-muted-foreground hover:text-foreground"
            >
              <X size={36} />
            </Button>
          )}
        </div>
      </div>
        <div className="p-3 mx-0 sm:mx-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center justify-between md:justify-start gap-4">
              <span className="text-xl font-bold text-foreground whitespace-nowrap">
                {month} - {year}
              </span>
              <div className="flex items-center gap-2 p-1">
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full md:w-auto">
              <span className="text-sm font-semibold text-primary hover:underline cursor-pointer">
                This Month
              </span>

              <div className="flex items-center gap-3">

                <select className="border border-border rounded-xl bg-card px-3 py-1.5 text-sm font-medium text-foreground focus:outline-none shadow-sm">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Daily</option>
                </select>
                <Button size="lg" className="rounded-full ">
                  <FolderOpen size={14} />
                  Open
                </Button>
              </div>
            </div>
          </div>
        </div>
      <div className="bg-card rounded-2xl sm:rounded-3xl border border-border shadow-sm overflow-hidden m-0 sm:m-4 mt-4 sm:mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/10">
                <th className="px-6 py-4 w-12">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === filteredData.length &&
                      filteredData.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  File Number
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                  Type
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                  Address
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  File Opening
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">
                  Requisitions
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">
                  Closing
                </th>
                <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredData.map((file, i) => {
                const isSelected = selectedIds.includes(file.id);
                return (
                  <tr
                    key={file.id}
                    className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                      isSelected ? "bg-primary/5" : ""
                    }`}
                    onClick={() => onSelectFile?.(file.id)}
                  >
                    <td
                      className="px-2 py-4 "
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="flex place-content-between">
                        <label> {i % 3 == 0 && <ShieldUser />}</label>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(file.id)}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                        />
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      {file.fileNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">
                      {file.type}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary hover:underline">
                      {file.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground max-w-[180px] truncate hidden lg:table-cell">
                      {file.address}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">
                      {file.fileOpening}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground hidden xl:table-cell">
                      {file.requisitions}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground hidden xl:table-cell">
                      {file.closing}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {file.status}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                      variant={"ghost"}
                        className={`p-1 hover:bg-muted rounded-lg transition-colors ${getFlagColor(file.id)}`}
                      >
                        <Flag size={16} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Details */}
        <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <div>
            Showing {filteredData.length} of {data.length} files
          </div>
          <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1 shadow-sm">
            <Button variant="ghost" >
              <ChevronLeft size={16} />
            </Button>
            <span className="px-2 text-foreground">1</span>
            <Button variant={"ghost"} >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>
      <AdvanceSearchDrawer
        isOpen={isAdvanceSearchOpen}
        onClose={() => setIsAdvanceSearchOpen(false)}
      />
    </>
  );
}
