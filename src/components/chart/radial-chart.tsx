"use client";

import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { CodeXml } from "lucide-react";

export const description = "A radial chart displaying skill ratings";

const chartData = [
  { skill: "", rating: 10, fill: "var(--card-foreground)" },
  { skill: "JavaScript", rating: 8.7, fill: "var(--chart-1-github)" },
  { skill: "PHP", rating: 8, fill: "var(--chart-2-github)" },
  { skill: "C++", rating: 7, fill: "var(--chart-3-github)" },
  { skill: "Python", rating: 8, fill: "var(--chart-4-github)" },
  { skill: "Java/C#", rating: 6, fill: "var(--chart-5-github)" },
];

const chartConfig: ChartConfig = {
  Skills: { label: "", color: "var(--card-foreground)" },
  JavaScript: { label: "JavaScript", color: "var(--chart-1-global)" },
  PHP: { label: "PHP", color: "var(--chart-2-global)" },
  "C++": { label: "C++", color: "var(--chart-3-global)" },
  Python: { label: "Python", color: "var(--chart-4-global)" },
  "Java/C#": { label: "Java/C#", color: "var(--chart-5-global)" },
};

export function ChartRadialSimple() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex items-center">
          Programming Language Rating{" "}
          <CodeXml className="inline-block h-4 w-4 ml-2 text-primary" />
        </CardTitle>
        <CardDescription>
          Self predictions on programming language skills
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="w-full max-w-[300px] mx-auto aspect-square"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={360}
            innerRadius="20%"
            outerRadius="90%" // Use % for responsive scaling
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
          Showing skill ratings based on self-assessment.
        </div>
      </CardFooter>
    </Card>
  );
}
