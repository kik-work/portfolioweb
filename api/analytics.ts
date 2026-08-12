import type { VercelRequest, VercelResponse } from "@vercel/node";

const VERCEL_API_BASE = "https://api.vercel.com/v1/query/web-analytics";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId || !teamId) {
    return res.status(500).json({ error: "Missing Vercel Analytics configuration" });
  }

  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const until = new Date().toISOString();

    const aggregateParams = new URLSearchParams({
      teamId,
      projectId,
      by: "day",
      since,
      until,
      limit: "30",
    });

    const visitorsRes = await fetch(
      `${VERCEL_API_BASE}/visits/aggregate?${aggregateParams}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const dailyRaw = await visitorsRes.text();

    if (!visitorsRes.ok) {
      console.error("aggregate error:", dailyRaw);
      return res.status(502).json({ error: "Failed to fetch analytics data" });
    }

    const daily: { data: { timestamp: string; visitors: number; pageviews: number }[] } =
      JSON.parse(dailyRaw);

    const rows = daily.data ?? [];

    // Sum totals directly from the daily rows — avoids the unreliable /count endpoint
    const totalPageviews = rows.reduce((sum, d) => sum + (d.pageviews ?? 0), 0);
    const totalVisitors = rows.reduce((sum, d) => sum + (d.visitors ?? 0), 0);

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");

    return res.status(200).json({
      total: totalPageviews,
      visitors: totalVisitors,
      daily: rows,
    });
  } catch (err) {
    console.error("Analytics handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
