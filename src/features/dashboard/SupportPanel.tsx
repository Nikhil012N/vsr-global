'use client'

import { LuHeadset,  LuMoveUpRight } from 'react-icons/lu'
import { useState, useEffect } from 'react'
import chatBgImage from "@/assets/chat-support-baackground.png"
export function SupportPanel() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="rounded-lg bg-primary h-[stretch] text-primary-foreground p-4 sm:p-6 animate-slide-up min-h-[330px] flex flex-col justify-between" style={{ animationDelay: '300ms', backgroundImage: `url(${chatBgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      {/* Top Content Group */}
      <div>
        {/* Icon */}
        <div className="mb-4 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-trasparent">
          <LuHeadset className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>

        {/* Content */}
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Need Help?</h3>
        <p className="text-xs sm:text-sm text-white/80 mb-4">We are always here for your support.</p>
      </div>

      {/* Action Buttons Group */}
      <div className="space-y-3">
        <button className="flex items-center justify-center gap-2 rounded-full bg-card text-primary px-4 py-2 text-xs xs:text-sm font-medium hover:bg-background/90 transition-colors cursor-pointer">
          Remote Support
          < LuMoveUpRight className="h-4 w-4 ml-auto" />
        </button>
        <button className=" flex items-center justify-center gap-2 rounded-full bg-card text-primary px-4 py-2 text-xs xs:text-sm font-medium hover:bg-background/90 transition-colors cursor-pointer">
          Chat with the Support Team
          < LuMoveUpRight className="h-4 w-4 ml-auto" />
        </button>
        <button className=" flex items-center justify-center gap-2 rounded-full bg-card text-primary px-4 py-2 text-xs xs:text-sm font-medium hover:bg-background/90 transition-colors cursor-pointer">
          Chat with Staff Members
          < LuMoveUpRight className="h-4 w-4 ml-auto" />
        </button>
      </div>
    </div>
  )
}
