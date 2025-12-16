import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { month: "Jan", mobile: 420, desktop: 300 },
  { month: "Feb", mobile: 380, desktop: 280 },
  { month: "Mar", mobile: 510, desktop: 390 },
  { month: "Apr", mobile: 460, desktop: 340 },
  { month: "May", mobile: 600, desktop: 420 },
]

export default function AnalyticsAreaChart() {
  return (
    <ChartContainer
      config={{
        mobile: { label: "Mobile", color: "hsl(var(--chart-1))" },
        desktop: { label: "Desktop", color: "hsl(var(--chart-2))" },
      }}
      className="h-[300px] w-full"
    >
      <AreaChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="mobile"
          type="monotone"
          fillOpacity={0.35}
        />
        <Area
          dataKey="desktop"
          type="monotone"
          fillOpacity={0.35}
        />
      </AreaChart>
    </ChartContainer>
  )
}
