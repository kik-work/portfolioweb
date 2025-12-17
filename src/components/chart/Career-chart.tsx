"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

const careerTimeline = [
  { role: "Software Development", duration: "2023-2024" },
  { role: "Backend Web Development", duration: "2024-2025" },
  { role: "Full Stack Development", duration: "2025-present" },
]

export default function CareerTimelineChart() {
  return (
    <Card >
      <CardHeader>
        <CardTitle>Career Progression Timeline</CardTitle>
        <CardDescription>Journey to Full Stack Development </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative border-l-2 border-primary ml-4 pl-6 space-y-8">
          {careerTimeline.map((item, index) => (
            <div key={index} className="relative flex items-center">
              <span className="absolute -left-5 bg-primary rounded-full w-4 h-4 flex items-center justify-center text-white">
                <CheckCircle className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-semibold">{item.role}</h3>
                <p className="text-sm text-gray-500">{item.duration}</p>
              </div>
            </div>
          ))}
        </div>
        <CardFooter className=" gap-2 my-5 p-3 text-sm">

          <div className="text-muted-foreground leading-none">
            Continuously enhancing full-stack development proficiency.
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
