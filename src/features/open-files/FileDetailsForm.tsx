import {
  LuX as X,
  LuPlus as Plus,
} from "react-icons/lu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { CustomSelect } from "@/components/ui/Select";
import { FileInput } from "@/components/ui/FileInput";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const fileDetailsSchema = z.object({
  fileType: z.string().min(1, "File Type is required"),
  fileStatus: z.string().min(1, "File Status is required"),
  fileNo: z.string().optional(),
  teraviewFileNo: z.string().optional(),
  conflictSearchDate: z.string().optional(),
  actingFor: z.string().optional(),
  uploadAps: z.string().optional(),
  apsDate: z.string().optional(),
  requisitionsDate: z.string().optional(),
  depositDate: z.string().optional(),
  amount: z.string().optional(),
  totalDeposit: z.string().optional(),
  totalSalePrice: z.string().optional(),
  addDepositToSoa: z.string().optional(),
  solicitorName: z.string().optional(),
  clerkName: z.string().optional(),
  witnessName: z.string().optional(),
  commissionerName: z.string().optional(),
  otherSideFileNo: z.string().optional(),
});

type FileDetailsFormValues = z.infer<typeof fileDetailsSchema>;

export function FileDetailsForm() {
  const navigate = useNavigate();
  const [activeNode, setActiveNode] = useState("details");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FileDetailsFormValues>({
    resolver: zodResolver(fileDetailsSchema),
    defaultValues: {
      fileType: "Sale",
      fileStatus: "",
      fileNo: "",
      teraviewFileNo: "",
      conflictSearchDate: "",
      actingFor: "",
      uploadAps: "",
      apsDate: "",
      requisitionsDate: "",
      depositDate: "",
      amount: "",
      totalDeposit: "",
      totalSalePrice: "",
      addDepositToSoa: "",
      solicitorName: "",
      clerkName: "",
      witnessName: "",
      commissionerName: "",
      otherSideFileNo: "",
    },
  });

  const [openTabs, setOpenTabs] = useState([
    { id: 1, name: "File Name Here", isActive: true },
    { id: 2, name: "File Name Here", isActive: false },
  ]);

  useEffect(() => {
    setOpenDropdown(null);
  }, []);

  const handleSelectNode = (node: string) => {
    setActiveNode(node);
  };

  const handleCloseTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTabs((prev) => prev.filter((t) => t.id !== id));
  };

  const onSubmit = (data: FileDetailsFormValues) => {
    console.log("Form Submitted:", data);
    alert("File saved successfully!");
    navigate("/search-files");
  };

  const toggleDropdown = (field: string) => {
    setOpenDropdown((prev) => (prev === field ? null : field));
  };

  return (
    <div className="max-h-screen md:overflow-hidden bg-background text-foreground font-sans flex flex-col">
      <Topbar handleSubmit={handleSubmit(onSubmit)} />
      <div className="flex flex-col lg:flex-row items-stretch flex-1 w-full min-h-0">
        <div className="w-full overflow-y-auto h-screen md:max-h-[calc(100vh-138px)] lg:w-[300px] flex-shrink-0 lg:border-r border-border py-4 px-4 lg:py-2 bg-card shadow-sm lg:shadow-none z-10">
          <Sidebar
            handleSelectNode={handleSelectNode}
            activeNode={activeNode}
          />
        </div>
        <div
          className={`flex-1 flex flex-col lg:overflow-hidden bg-transparent min-w-0 min-h-[500px] lg:min-h-0 relative z-20 ${openTabs?.length == 0 ? "lg:translate-y-0" : " lg:translate-y-[-45px]"}`}
        >
          <div className="flex items-end gap-2 relative z-10  w-full">
            {openTabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => {
                  if (tab.id === 1) navigate("/open-files");
                }}
                className={`h-11 px-5 flex items-center gap-3 overflow-hidden rounded-t-xl border border-border text-[13px] font-semibold cursor-pointer transition-all ${
                  tab.isActive
                    ? "bg-card text-primary border-b-card z-10 -mb-[1px] pt-1"
                    : "bg-muted/30 text-muted-foreground border-b-transparent hover:bg-muted/50"
                }`}
              >
                <span>{tab.name}</span>
                <X
                  size={12}
                  className={`${tab.isActive ? "text-primary" : "text-muted-foreground"} hover:text-destructive cursor-pointer transition-colors`}
                  onClick={(e) => handleCloseTab(tab.id, e)}
                />
              </div>
            ))}
          </div>

          {/* Right Side Main Details Card */}
          <div className="details-box flex flex-col relative rounded-md bg-card shadow-sm m-4 lg:m-6 mt-8 flex-1 z-0 min-h-0">
            {/* Details Ribbon Tag */}
            <div className="card-title text-[12px] uppercase tracking-wider">
              {activeNode === "details"
                ? "Details"
                : activeNode === "property"
                  ? "Property"
                  : activeNode}
            </div>
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 h-full">
            {activeNode === "details" ? (
              <div className="space-y-4 animate-slide-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Controller
                      name="fileType"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          label="File Type"
                          value={field.value}
                          options={["Purchase", "Sale", "Mortgage"]}
                          onChange={field.onChange}
                          isOpen={openDropdown === "fileType"}
                          onToggle={() => toggleDropdown("fileType")}
                        />
                      )}
                    />
                    {errors.fileType && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fileType.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Controller
                      name="fileStatus"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          label="File Status"
                          value={field.value}
                          options={["Active", "Pending", "Completed"]}
                          onChange={field.onChange}
                          isOpen={openDropdown === "fileStatus"}
                          onToggle={() => toggleDropdown("fileStatus")}
                        />
                      )}
                    />
                    {errors.fileStatus && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fileStatus.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="File no."
                      {...register("fileNo")}
                      className="w-full h-12 px-4 border rounded-sm border-input focus:outline-none focus:border-primary text-[14px] text-muted-foreground transition-all bg-card"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Teraview file no."
                      {...register("teraviewFileNo")}
                      className="w-full h-12 px-4 border rounded-sm  border-input focus:outline-none focus:border-primary text-[14px] text-muted-foreground transition-all bg-card"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                    <input
                      type="text"
                      placeholder="Conflict Search date"
                      {...register("conflictSearchDate")}
                      onFocus={(e) => {
                        e.target.type = "date";
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                        register("conflictSearchDate").onBlur(e);
                      }}
                      className="w-full h-12 px-4 pr-10 border rounded-sm  border-input focus:outline-none focus:border-primary text-[14px] text-muted-foreground transition-all appearance-none bg-card"
                    />

                  <Controller
                    name="actingFor"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        label="Acting for"
                        value={field.value || ""}
                        options={["Buyer", "Seller", "Both"]}
                        onChange={field.onChange}
                        isOpen={openDropdown === "actingFor"}
                        onToggle={() => toggleDropdown("actingFor")}
                      />
                    )}
                  />

                  <div className="md:col-span-2">
                    <FileInput
                      placeholder="Upload APS"
                      {...register("uploadAps")}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="md:col-span-2 relative">
                    <input
                      type="text"
                      placeholder="APS date"
                      {...register("apsDate")}
                      onFocus={(e) => {
                        e.target.type = "date";
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                        register("apsDate").onBlur(e);
                      }}
                      className="w-full h-12 px-4 pr-10 border rounded-sm  border-input focus:outline-none focus:border-primary text-[14px] text-muted-foreground transition-all appearance-none bg-card"
                    />
                  
                  </div>

                  <div className="md:col-span-2 relative">
                    <input
                      type="text"
                      placeholder="Requisitions / Title search date"
                      {...register("requisitionsDate")}
                      onFocus={(e) => {
                        e.target.type = "date";
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                        register("requisitionsDate").onBlur(e);
                      }}
                      className="w-full h-12 px-4 pr-10 border rounded-sm  border-input focus:outline-none focus:border-primary text-[14px] text-muted-foreground transition-all appearance-none bg-card"
                    />
                   
                  </div>
                </div>

                {/* Deposit Section Header */}
                <div className="pt-2 pb-1 text-foreground font-bold text-[15px]">
                  Deposit
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="md:col-span-2 relative">
                    <input
                      type="text"
                      placeholder="Deposit date"
                      {...register("depositDate")}
                      onFocus={(e) => {
                        e.target.type = "date";
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = "text";
                        register("depositDate").onBlur(e);
                      }}
                      className="w-full h-12 px-4 pr-10 border rounded-sm  border-input focus:outline-none focus:border-primary text-[14px] text-muted-foreground transition-all appearance-none bg-card"
                    />
                   
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Amount"
                      {...register("amount")}
                      className="w-full h-12 px-4 pr-10 border rounded-sm  border-input focus:outline-none focus:border-primary text-[14px] text-muted-foreground transition-all bg-card"
                    />
                  
                  </div>

                  <div>
                    <button
                      type="button"
                      className="h-12 px-4 w-full rounded-sm bg-primary/10 text-primary font-bold text-[13px] flex items-center justify-center gap-2 transition-all hover:bg-primary/20 cursor-pointer"
                    >
                      <Plus size={16} className="font-bold" /> Another deposit
                    </button>
                  </div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Total Deposit"
                      {...register("totalDeposit")}
                      className="w-full h-12 px-4 border rounded-sm border-input focus:outline-none focus:border-primary text-[14px] text-muted-foreground transition-all bg-card"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Total Sale Price"
                      {...register("totalSalePrice")}
                      className="w-full h-12 px-4 border rounded-sm  border-input focus:outline-none focus:border-primary text-[14px] text-muted-foreground transition-all bg-card"
                    />
                  </div>

                  <Controller
                    name="addDepositToSoa"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        label="Add deposit to SOA"
                        value={field.value || ""}
                        options={["Yes", "No"]}
                        onChange={field.onChange}
                        isOpen={openDropdown === "addDepositToSoa"}
                        onToggle={() => toggleDropdown("addDepositToSoa")}
                      />
                    )}
                  />

                  <Controller
                    name="solicitorName"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        label="Barrister & Solicitor Name"
                        value={field.value || ""}
                        options={["John Smith", "Emily Davis", "Alex Mercer"]}
                        onChange={field.onChange}
                        isOpen={openDropdown === "solicitorName"}
                        onToggle={() => toggleDropdown("solicitorName")}
                      />
                    )}
                  />
                </div>

                {/* Row 6 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Controller
                    name="clerkName"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        label="Clerk Name"
                        value={field.value || ""}
                        options={[
                          "Sarah Johnson",
                          "James Wilson",
                          "Clara Oswald",
                        ]}
                        onChange={field.onChange}
                        isOpen={openDropdown === "clerkName"}
                        onToggle={() => toggleDropdown("clerkName")}
                      />
                    )}
                  />

                  <Controller
                    name="witnessName"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        label="Witness/Notary Name"
                        value={field.value || ""}
                        options={[
                          "Michael Brown",
                          "Patricia Miller",
                          "Robert Langdon",
                        ]}
                        onChange={field.onChange}
                        isOpen={openDropdown === "witnessName"}
                        onToggle={() => toggleDropdown("witnessName")}
                      />
                    )}
                  />

                  <div>
                    <input
                      type="text"
                      placeholder="Commissioner Name"
                      {...register("commissionerName")}
                      className="w-full h-12 px-4 border rounded-sm  border-input focus:outline-none focus:border-primary text-[14px] text-muted-foreground transition-all bg-card"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Other Side File no."
                      {...register("otherSideFileNo")}
                      className="w-full h-12 px-4 border rounded-sm  border-input focus:outline-none focus:border-primary text-[14px] text-muted-foreground transition-all bg-card"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-slide-up text-[14px] font-medium text-muted-foreground">
                <p>Other details and checklist screens render here.</p>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
