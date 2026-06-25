'use client'

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-brand/20" />
        <div className="absolute inset-0 animate-spin-smooth rounded-full border-4 border-transparent border-t-brand border-r-brand" />
      </div>
      <span className="ml-3 text-sm font-medium text-muted-foreground">Loading...</span>
    </div>
  )
}
