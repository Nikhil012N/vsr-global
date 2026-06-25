'use client'

interface SkeletonLoaderProps {
  rows?: number
  columns?: number
}

export function SkeletonLoader({ rows = 5, columns = 4 }: SkeletonLoaderProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div
              key={colIdx}
              className="animate-shimmer flex-1 rounded bg-gradient-to-r from-muted via-background to-muted"
              style={{
                backgroundSize: '200% 100%',
                height: colIdx === 0 ? '20px' : '16px',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
