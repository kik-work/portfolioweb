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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import { Users } from "lucide-react";

type DayData = {
  key: string; // ISO date string from Vercel API
  total: number;
};

type ApiResponse = {
  total: number;
  daily: DayData[];
};

const CACHE_KEY = "visitor_chart_cache";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function getCached(): ApiResponse | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}

function setCache(data: ApiResponse) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, ts: Date.now() })
    );
  } catch {
    // quota exceeded — skip silently
  }
}

function formatDate(isoDate: string) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("default", { month: "short", day: "numeric" });
}

export function VisitorChart() {
  const [data, setData] = React.useState<ApiResponse | null>(
    () => getCached()
  );
  const [loading, setLoading] = React.useState(() => getCached() === null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!loading) return;

    fetch("/api/analytics")
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((json: ApiResponse) => {
        setCache(json);
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading || error || !data) {
    return null;
  }

  const chartData = data.daily.map((d) => ({
    date: formatDate(d.key),
    visitors: d.total,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle className="flex items-center gap-1">
            Portfolio Visitors
            <Users className="h-4 w-4 ml-1 text-primary" />
          </CardTitle>
          <CardDescription>Daily unique visitors — last 30 days</CardDescription>
        </div>

        {/* Total count stat */}
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs flex items-center gap-1">
              Total Visits
            </span>
            <TypographyH1 className="text-primary text-lg sm:text-3xl leading-none font-bold">
              {data.total.toLocaleString()}
            </TypographyH1>
            <span className="text-xs text-muted-foreground">all time</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 pb-4">
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={chartData}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
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
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "var(--card-foreground)" }}
                itemStyle={{ color: "var(--primary)" }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#visitorGrad)"
                dot={false}
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
