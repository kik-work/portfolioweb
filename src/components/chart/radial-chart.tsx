"use client"

import { LabelList, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A radial chart displaying skill ratings"

const chartData = [
  { skill: "Skills", rating: 10, fill: "var(--card-foreground)" },
  { skill: "JavaScript", rating: 9, fill: "var(--chart-1)" },
  { skill: "PHP", rating: 8, fill: "var(--chart-2)" },
  { skill: "C++", rating: 8, fill: "var(--chart-3)" },
  { skill: "Python", rating: 7.5, fill: "var(--chart-4)" },
  { skill: "Java", rating: 7, fill: "var(--chart-5)" },
]

const chartConfig: ChartConfig = {
  Skills: { label: "Skills", color: "var(--card-foreground)" },
  JavaScript: { label: "JavaScript", color: "var(--chart-1)" },
  PHP: { label: "PHP", color: "var(--chart-2)" },
  "C++": { label: "C++", color: "var(--chart-3)" },
  Python: { label: "Python", color: "var(--chart-4)" },
  Java: { label: "Java", color: "var(--chart-5)" },
}

export function ChartRadialSimple() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Programming Language Rating</CardTitle>
        <CardDescription>Basic predictions on skills</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={360}
            innerRadius={20}
            outerRadius={135}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="skill" />}
            />
            <RadialBar dataKey="rating" background>
              <LabelList
                position="insideStart"
                dataKey="skill"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
       
        <div className="text-muted-foreground leading-none">
          Showing skill ratings out of 10
        </div>
      </CardFooter>
    </Card>
  )
}
