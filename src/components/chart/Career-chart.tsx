"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu } from "lucide-react"
import { cn } from "@/lib/utils"

const careerTimeline = [
  { role: "Software Development", duration: "2023-2024" },
  { role: "Backend Web Development", duration: "2024-2025" },
  { role: "Full Stack Development", duration: "2025-2026" },
  { role: "AI Full Stack Development", duration: "2026-present" },
]

export default function CareerTimelineChart() {
  return (
    <Card className="h-full gap-8 py-7 md:py-8">
      <CardHeader className="px-7 md:px-8">
        <CardTitle className="flex items-center gap-2">
          Career Progression Timeline <Cpu className="size-4 text-link" aria-hidden="true" />
        </CardTitle>
        <CardDescription>Journey to Full Stack Development</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-7 md:px-8">
        <ol className="relative ml-[7px] space-y-10 border-l border-hairline py-1">
          {careerTimeline.map((item, index) => {
            const current = index === careerTimeline.length - 1
            return (
              <li key={item.role} className="relative pl-7">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1 -left-[8px] size-[15px] rounded-full border-[3px] border-card",
                    current ? "live-dot bg-success" : "bg-link"
                  )}
                />
                <p className="text-[1.0625rem] leading-tight font-semibold tracking-[-0.015em]">{item.role}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.duration}</p>
              </li>
            )
          })}
        </ol>
      </CardContent>
      <CardFooter className="px-7 text-sm text-muted-foreground md:px-8">
        Continuously enhancing full-stack development proficiency.
      </CardFooter>
    </Card>
  )
}
