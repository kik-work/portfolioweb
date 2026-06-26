"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ProgressLineLoaderProps {
  /** height of the progress bar */
  height?: number
  /** total time to reach 100 (ms) */
  duration?: number
  /** show background track */
  showTrack?: boolean
  /** show percentage text */
  showLabel?: boolean
  className?: string
}

export function ProgressLineLoader({
  height = 2,
  duration = 1800,
  showTrack = true,
  showLabel = true,
  className,
}: ProgressLineLoaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const intervalTime = duration / 100

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, intervalTime)

    return () => clearInterval(interval)
  }, [duration])

  return (
    <div className={cn("w-full", className)}>
        {showLabel && (
        <p className="mt-2 text-xs text-muted-foreground text-center">
          {progress}%
        </p>
      )}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-full",
          showTrack && "bg-muted",
          height === 2 && "h-2",
          height === 3 && "h-3",
          height === 4 && "h-4"
        )}
      >
        <div
          className="h-full w-full bg-primary rounded-full origin-left will-change-transform"
          style={{
            transform: `scaleX(${progress / 100})`,
            transition: "transform 100ms ease-out",
          }}
        />
      </div>

      
    </div>
  )
}
