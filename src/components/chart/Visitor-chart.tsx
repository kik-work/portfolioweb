"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import { Eye, Users } from "lucide-react";

type DayData = {
  timestamp: string;
  visitors: number;
  pageviews: number;
};

type ApiResponse = {
  total: number;
  visitors: number;
  daily: DayData[];
};

type ChartRow = {
  date: string;
  // cumulative value plotted on the chart
  cumulative: number;
  // raw daily values shown in tooltip
  dailyVisitors: number;
  dailyPageviews: number;
};

function formatDate(isoDate: string) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("default", { month: "short", day: "numeric" });
}

/** Custom tooltip — shows daily visitors & pageviews on hover */
function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload as ChartRow;
  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 12,
        lineHeight: "1.6",
        color: "var(--card-foreground)",
        minWidth: 160,
      }}
    >
      <p style={{ fontWeight: 600, marginBottom: 6 }}>{label}</p>
      <p style={{ color: "var(--primary)", display: "flex", justifyContent: "space-between", gap: 16 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Users size={11} /> Visitors
        </span>
        <span style={{ fontWeight: 700 }}>{row.dailyVisitors}</span>
      </p>
      <p style={{ color: "var(--muted-foreground)", display: "flex", justifyContent: "space-between", gap: 16 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Eye size={11} /> Page Views
        </span>
        <span style={{ fontWeight: 700 }}>{row.dailyPageviews}</span>
      </p>
      <p style={{
        marginTop: 6,
        paddingTop: 6,
        borderTop: "1px solid var(--border)",
        color: "var(--muted-foreground)",
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
      }}>
        <span>Total visitors</span>
        <span style={{ fontWeight: 700, color: "var(--card-foreground)" }}>{row.cumulative}</span>
      </p>
    </div>
  );
}

export function VisitorChart() {
  const [data, setData] = React.useState<ApiResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/analytics")
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((json: ApiResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading || error || !data) return null;

  // Build cumulative visitor totals — chart always grows (or stays flat)
  let running = 0;
  const allRows: ChartRow[] = data.daily.map((d) => {
    running += d.visitors ?? 0;
    return {
      date: formatDate(d.timestamp),
      cumulative: running,
      dailyVisitors: d.visitors ?? 0,
      dailyPageviews: d.pageviews ?? 0,
    };
  });

  // Trim leading days where nothing happened yet
  const firstActiveIndex = allRows.findIndex((r) => r.cumulative > 0);
  const startIndex = firstActiveIndex <= 0 ? 0 : Math.max(0, firstActiveIndex - 3);
  const chartData = allRows.slice(startIndex);

  if (chartData.length === 0) return null;

  const maxCumulative = chartData[chartData.length - 1].cumulative;

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle className="flex items-center gap-1">
            Portfolio Visitors
            <Users className="h-4 w-4 ml-1 text-primary" />
          </CardTitle>
          <CardDescription>Cumulative visitors — last 30 days (hover for daily breakdown)</CardDescription>
        </div>

        {/* Stats */}
        <div className="flex divide-x">
          <div className="flex flex-col justify-center gap-1 px-6 py-4 sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs flex items-center gap-1">
              <Users className="h-3 w-3" /> Visitors
            </span>
            <TypographyH1 className="text-primary text-lg sm:text-3xl leading-none font-bold">
              {data.visitors.toLocaleString()}
            </TypographyH1>
            <span className="text-xs text-muted-foreground">last 30 days</span>
          </div>
          <div className="flex flex-col justify-center gap-1 px-6 py-4 sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs flex items-center gap-1">
              <Eye className="h-3 w-3" /> Page Views
            </span>
            <TypographyH1 className="text-primary text-lg sm:text-3xl leading-none font-bold">
              {data.total.toLocaleString()}
            </TypographyH1>
            <span className="text-xs text-muted-foreground">last 30 days</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 pb-4">
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />

            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              domain={[0, Math.ceil(maxCumulative * 1.15) || 10]}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border)", strokeWidth: 1 }} />

            <Area
              type="monotone"
              dataKey="cumulative"
              name="Total Visitors"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fill="url(#growthGrad)"
              dot={false}
              activeDot={{ r: 5, fill: "var(--primary)", stroke: "var(--card)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
