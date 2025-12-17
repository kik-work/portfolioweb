"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Cpu } from "lucide-react"

const careerTimeline = [
  { role: "Software Development", duration: "2023-2024" },
  { role: "Backend Web Development", duration: "2024-2025" },
  { role: "Full Stack Development", duration: "2025-present" },
]

export default function CareerTimelineChart() {
  return (
    <Card >
      <CardHeader>
        <CardTitle>Career Progression Timeline <Cpu className="inline-block h-4 w-4 ml-2 text-primary" /></CardTitle>
        <CardDescription>Journey to Full Stack Development </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative border-l-2 border-primary  pt-4 space-y-16 p-6">
          {careerTimeline.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <CheckCircle className="h-4 w-4" />
              </span>

              <div>
                <h3 className="font-semibold leading-tight">
                  {item.role}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.duration}
                </p>
              </div>
            </div>
          ))}

        </div>
        <CardFooter className=" gap-2 p-4 text-sm">

          <div className="text-muted-foreground leading-none">
            Continuously enhancing full-stack development proficiency.
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
