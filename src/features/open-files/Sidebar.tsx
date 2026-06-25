import { useState,memo } from 'react';
import { 
  LuFolder as Folder, 
  LuFileText as FileText, 
  LuUser as User, 
  LuPlus as Plus, 
  LuX as X, 
  LuChevronDown as ChevronDown, 
  LuChevronUp as ChevronUp 
} from 'react-icons/lu';

interface SidebarProps {
  handleSelectNode: (node: string) => void;
  activeNode: string;
  isDark?: boolean;
}

const Sidebar=({ handleSelectNode, activeNode }: SidebarProps) =>{
  // Tree state
  const [openNodes, setOpenNodes] = useState<Record<string, boolean>>({
    parties: true,
    buyer: true,
    vendor: false,
    solicitor: true,
    brokerage: true,
  });

  const toggleNode = (node: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenNodes(prev => ({ ...prev, [node]: !prev[node] }));
  };

  const textStyle = 'text-muted-foreground';
  const headerStyle = 'font-semibold text-foreground';

  const itemActiveStyle = 'bg-primary/10 text-primary font-semibold';
  const itemHoverStyle = 'hover:bg-muted';

  return (
    <div className={`space-y-2 text-[13px] font-medium font-sans select-none pl-2 `}>
      
      {/* File Information's Section */}
      <div className="space-y-1.5 relative">
        <div className="flex items-center gap-1.5 py-1 text-foreground relative z-10 bg-transparent">
          <Folder size={18} className="text-[#EFA328] fill-[#EFA328]/10" />
          <span className={headerStyle}>File Information's</span>
          <span className="text-muted-foreground text-[10px] font-bold ml-0.5 border border-border rounded px-1 flex items-center justify-center">-</span>
        </div>
        
        {/* Main Tree Container with Vertical Line */}
        <div className="relative pl-5 space-y-1 ml-[9px] border-l border-border">
          
          {/* Details Node */}
          <div className="relative">
            {/* Horizontal branch line */}
            <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
            <button 
              onClick={() => handleSelectNode('details')}
              className={`flex items-center gap-2 w-full text-left py-1.5 px-3 rounded-lg transition-all ${
                activeNode === 'details' ? itemActiveStyle : `${itemHoverStyle} ${textStyle}`
              }`}
            >
              <FileText 
                size={15} 
                className={activeNode === 'details' ? 'text-primary' : 'text-muted-foreground'} 
              />
              <span>Details</span>
            </button>
          </div>

          {/* Parties Node */}
          <div className="relative w-full">
            <div className="absolute w-3 h-px bg-border left-0 top-[18px] -translate-x-full"></div>
            
            <div 
              className={`flex items-center gap-2 w-full text-left py-1.5 px-3 rounded-lg cursor-pointer transition-all ${
                activeNode === 'parties' ? itemActiveStyle : `${itemHoverStyle} ${textStyle}`
              }`}
              onClick={() => handleSelectNode('parties')}
            >
              <Folder 
                size={15} 
                className={activeNode === 'parties' ? 'text-primary' : 'text-accent fill-accent/10'} 
              />
              <span>Parties</span>
              <div 
                className="ml-auto text-muted-foreground hover:text-muted-foreground p-1 rounded-md"
                onClick={(e) => toggleNode('parties', e)}
              >
                {openNodes.parties ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
            </div>

            {/* Parties Children */}
            {openNodes.parties && (
              <div className="pl-6 space-y-1 mt-1 relative border-l border-border ml-[18px]">
                
                {/* Buyer Node */}
                <div className="relative">
                  <div className="absolute w-3 h-px bg-border left-0 top-[14px] -translate-x-full"></div>
                  <div 
                    className="flex items-center gap-2 py-1 px-2 text-muted-foreground hover:bg-muted/50 rounded-lg cursor-pointer"
                    onClick={(e) => toggleNode('buyer', e)}
                  >
                    <Folder size={15} className="text-[#EFA328] fill-[#EFA328]/10" />
                    <span>Buyer</span>
                    <span className="ml-auto text-muted-foreground">
                      {openNodes.buyer ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </span>
                  </div>

                  {/* Buyer Children */}
                  {openNodes.buyer && (
                    <div className="pl-5 space-y-1 mt-1 relative border-l border-border ml-3.5 pb-2">
                      <div className="relative flex items-center gap-1.5 py-1 px-2 text-[#1F9AA2] font-semibold cursor-pointer text-[12px] hover:bg-muted/50 rounded-lg">
                        <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                        <Plus size={12} />
                        <span>Add New</span>
                      </div>
                      
                      {/* Amrik Singh (Expanded) */}
                      <div className="space-y-0.5">
                        <div className="relative flex items-center justify-between py-1 px-2 hover:bg-muted/50 rounded-lg cursor-pointer group">
                          <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User size={13} className="text-muted-foreground" />
                            <span>Amrik Singh</span>
                          </div>
                          <X size={12} className="text-muted-foreground/50 opacity-0 group-hover:opacity-100 hover:text-red-500" />
                        </div>
                        
                        {/* Nested under Amrik Singh */}
                        <div className="pl-6 space-y-1 relative border-l border-border ml-[18px] py-1 text-[12px] text-muted-foreground">
                          <div className="relative flex items-center gap-2 py-0.5 px-2 hover:text-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
                            <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                            <FileText size={12} className="text-muted-foreground" />
                            <span>Client Info</span>
                          </div>
                          <div className="relative flex items-center gap-2 py-0.5 px-2 hover:text-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
                            <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                            <FileText size={12} className="text-muted-foreground" />
                            <span>Identification</span>
                          </div>
                          <div className="relative flex items-center gap-2 py-0.5 px-2 hover:text-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
                            <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                            <FileText size={12} className="text-muted-foreground" />
                            <span>Capactiy</span>
                          </div>
                        </div>
                      </div>

                      {/* Navneet Jagga */}
                      <div className="relative flex items-center justify-between py-1 px-2 hover:bg-muted/50 rounded-lg cursor-pointer group">
                        <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User size={13} className="text-muted-foreground" />
                          <span>Navneet Jagga</span>
                        </div>
                        <X size={12} className="text-muted-foreground/50 opacity-0 group-hover:opacity-100 hover:text-red-500" />
                      </div>

                      {/* Amrik Singh 2 */}
                      <div className="relative flex items-center justify-between py-1 px-2 hover:bg-muted/50 rounded-lg cursor-pointer group">
                        <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User size={13} className="text-muted-foreground" />
                          <span>Amrik Singh</span>
                        </div>
                        <X size={12} className="text-muted-foreground/50 opacity-0 group-hover:opacity-100 hover:text-red-500" />
                      </div>

                      {/* Navneet Jagga 2 */}
                      <div className="relative flex items-center justify-between py-1 px-2 hover:bg-muted/50 rounded-lg cursor-pointer group">
                        <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User size={13} className="text-muted-foreground" />
                          <span>Navneet Jagga</span>
                        </div>
                        <X size={12} className="text-muted-foreground/50 opacity-0 group-hover:opacity-100 hover:text-red-500" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Vendor Node */}
                <div className="relative">
                  <div className="absolute w-3 h-px bg-border left-0 top-[14px] -translate-x-full"></div>
                  <div 
                    className="flex items-center gap-2 py-1 px-2 text-muted-foreground hover:bg-muted/50 rounded-lg cursor-pointer mt-1"
                    onClick={(e) => toggleNode('vendor', e)}
                  >
                    <Folder size={15} className="text-[#EFA328] fill-[#EFA328]/10" />
                    <span>Vendor</span>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Property Node */}
          <div className="relative">
            <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
            <button 
              onClick={() => handleSelectNode('property')}
              className={`flex items-center gap-2 w-full text-left py-1.5 px-3 rounded-lg transition-all ${
                activeNode === 'property' ? itemActiveStyle : `${itemHoverStyle} ${textStyle}`
              }`}
            >
              <FileText 
                size={15} 
                className={activeNode === 'property' ? 'text-primary' : 'text-muted-foreground'} 
              />
              <span>Property</span>
            </button>
          </div>

          {/* Solicitor Node */}
          <div className="relative">
            <div className="absolute w-3 h-px bg-border left-0 top-[18px] -translate-x-full"></div>
            <div 
              onClick={() => handleSelectNode('solicitor')}
              className={`flex items-center gap-2 py-1.5 px-3 rounded-lg cursor-pointer transition-all ${
                activeNode === 'solicitor' ? itemActiveStyle : `${itemHoverStyle} ${textStyle}`
              }`}
            >
              <Folder size={15} className="text-[#EFA328] fill-[#EFA328]/10" />
              <span>Solicitor</span>
              <span 
                className="text-muted-foreground text-[10px] font-bold ml-auto border border-border rounded px-1 flex items-center justify-center hover:bg-muted cursor-pointer"
                onClick={(e) => toggleNode('solicitor', e)}
              >
                {openNodes.solicitor ? '-' : '+'}
              </span>
            </div>

            {/* Solicitor Children */}
            {openNodes.solicitor && (
              <div className="pl-6 space-y-1 mt-1 relative border-l border-border ml-[18px] pb-1 text-[13px]">
                <div className="relative flex items-center gap-2 py-1 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
                  <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                  <FileText size={14} className="text-muted-foreground" />
                  <span>Our Details</span>
                </div>
                <div className="relative flex items-center gap-2 py-1 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
                  <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                  <FileText size={14} className="text-muted-foreground" />
                  <span>Other Solicitor</span>
                </div>
              </div>
            )}
          </div>

          {/* Brokerage & Referral Node */}
          <div className="relative">
            <div className="absolute w-3 h-px bg-border left-0 top-[18px] -translate-x-full"></div>
            <div 
              onClick={() => handleSelectNode('brokerage')}
              className={`flex items-center gap-2 py-1.5 px-3 rounded-lg cursor-pointer transition-all ${
                activeNode === 'brokerage' ? itemActiveStyle : `${itemHoverStyle} ${textStyle}`
              }`}
            >
              <Folder size={15} className="text-[#EFA328] fill-[#EFA328]/10" />
              <span>Brokerage & Referral</span>
              <span 
                className="text-muted-foreground text-[10px] font-bold ml-auto border border-border rounded px-1 flex items-center justify-center hover:bg-muted cursor-pointer"
                onClick={(e) => toggleNode('brokerage', e)}
              >
                {openNodes.brokerage ? '-' : '+'}
              </span>
            </div>

            {/* Brokerage & Referral Children */}
            {openNodes.brokerage && (
              <div className="pl-6 space-y-1 mt-1 relative border-l border-border ml-[18px] pb-1 text-[13px]">
                <div className="relative flex items-center gap-2 py-1 px-2 text-[#0E7C85] bg-[#E2F2F3] font-semibold rounded-lg cursor-pointer">
                  <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                  <FileText size={14} className="text-[#1F9AA2]" />
                  <span>Buyer Brokerage</span>
                </div>
                <div className="relative flex items-center gap-2 py-1 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
                  <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                  <FileText size={14} className="text-muted-foreground" />
                  <span>Seller Brokerage</span>
                </div>
                <div className="relative flex items-center gap-2 py-1 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg cursor-pointer">
                  <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
                  <FileText size={14} className="text-muted-foreground" />
                  <span>Refferal</span>
                </div>
              </div>
            )}
          </div>

          {/* Checklist Node */}
          <div className="relative">
            <div className="absolute w-3 h-px bg-border left-0 top-1/2 -translate-x-full"></div>
            <div 
              onClick={() => handleSelectNode('checklist')}
              className={`flex items-center gap-2 py-1.5 px-3 rounded-lg cursor-pointer transition-all ${
                activeNode === 'checklist' ? itemActiveStyle : `${itemHoverStyle} ${textStyle}`
              }`}
            >
              <FileText size={15} className="text-muted-foreground" />
              <span>Checklist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mortgagee Section */}
      <div className="pt-2">
        <div className="flex items-center gap-1.5 py-1 text-foreground cursor-pointer hover:bg-muted/50 rounded-lg px-2">
          <Folder size={18} className="text-[#EFA328] fill-[#EFA328]/10" />
          <span className={headerStyle}>Mortgagee</span>
        </div>
      </div>
      
    </div>
  );
}
export default memo(Sidebar)