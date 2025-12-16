"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Sector } from "recharts"

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
} from "@/components/ui/chart"

// ✅ Updated chart data based on your skills
const chartData = [
  { skill: "Backend", value: 40 },
  { skill: "Frontend", value: 30 },
  { skill: "Databases", value: 15 },
  { skill: "Dev Tools", value: 15 },
]

export function ChartPieDonutActive() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Skills Distribution</CardTitle>
        <CardDescription>Self-assessed proficiency</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer config={{}} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            {/* ✅ FIXED TOOLTIP */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="skill"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={5}
              activeIndex={0}
              activeShape={(props: any) => (
                <Sector
                  {...props}
                  outerRadius={(props.outerRadius ?? 0) + 10}
                />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing skill distribution
        </div>
      </CardFooter>
    </Card>
  )
}
