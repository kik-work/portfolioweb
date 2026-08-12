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
import { Eye, Users } from "lucide-react";

type DayData = {
  timestamp: string;
  visitors: number;
  pageviews: number;
};

type ChartRow = {
  date: string;
  visitors: number;
  pageviews: number;
};

type DisplayData = {
  totalPageviews: number;
  totalVisitors: number;
  rows: ChartRow[];
};

const VERCEL_API_BASE = "https://api.vercel.com/v1/query/web-analytics";

function formatDate(isoDate: string) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("default", { month: "short", day: "numeric" });
}

async function fetchAnalytics(): Promise<DisplayData> {
  const token = import.meta.env.VITE_VERCEL_API_TOKEN;
  const projectId = import.meta.env.VITE_VERCEL_PROJECT_ID;
  const teamId = import.meta.env.VITE_VERCEL_TEAM_ID;

  if (!token || !projectId || !teamId) {
    throw new Error("Missing analytics config");
  }

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const until = new Date().toISOString();

  const params = new URLSearchParams({ teamId, projectId, by: "day", since, until, limit: "30" });

  const res = await fetch(`${VERCEL_API_BASE}/visits/aggregate?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Analytics API error");

  const json: { data: DayData[] } = await res.json();
  const rows = (json.data ?? []).map((d) => ({
    date: formatDate(d.timestamp),
    visitors: d.visitors ?? 0,
    pageviews: d.pageviews ?? 0,
  }));

  const totalPageviews = rows.reduce((sum, d) => sum + d.pageviews, 0);
  const totalVisitors = rows.reduce((sum, d) => sum + d.visitors, 0);

  return { totalPageviews, totalVisitors, rows };
}

export function VisitorChart() {
  const [data, setData] = React.useState<DisplayData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    fetchAnalytics()
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading || error || !data) return null;
  if (data.rows.length === 0) return null;

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle className="flex items-center gap-1">
            Portfolio Visitors
            <Users className="h-4 w-4 ml-1 text-primary" />
          </CardTitle>
          <CardDescription>Daily visitors & page views — last 30 days</CardDescription>
        </div>

        {/* Stats */}
        <div className="flex divide-x">
          <div className="flex flex-col justify-center gap-1 px-6 py-4 sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs flex items-center gap-1">
              <Users className="h-3 w-3" /> Visitors
            </span>
            <TypographyH1 className="text-primary text-lg sm:text-3xl leading-none font-bold">
              {data.totalVisitors.toLocaleString()}
            </TypographyH1>
            <span className="text-xs text-muted-foreground">last 30 days</span>
          </div>
          <div className="flex flex-col justify-center gap-1 px-6 py-4 sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs flex items-center gap-1">
              <Eye className="h-3 w-3" /> Page Views
            </span>
            <TypographyH1 className="text-primary text-lg sm:text-3xl leading-none font-bold">
              {data.totalPageviews.toLocaleString()}
            </TypographyH1>
            <span className="text-xs text-muted-foreground">last 30 days</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 pb-4">
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart
            data={data.rows}
            margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pageviewGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-2-github)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--chart-2-github)" stopOpacity={0} />
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
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "var(--card-foreground)" }}
            />
            <Area
              type="monotone"
              dataKey="pageviews"
              name="Page Views"
              stroke="var(--chart-2-github)"
              strokeWidth={2}
              fill="url(#pageviewGrad)"
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              name="Visitors"
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
