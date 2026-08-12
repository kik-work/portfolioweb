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

    const countParams = new URLSearchParams({ teamId, projectId });

    const [visitorsRes, totalRes] = await Promise.all([
      fetch(`${VERCEL_API_BASE}/visits/aggregate?${aggregateParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${VERCEL_API_BASE}/visits/count?${countParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    const [dailyRaw, totalRaw] = await Promise.all([
      visitorsRes.text(),
      totalRes.text(),
    ]);

    if (!visitorsRes.ok || !totalRes.ok) {
      console.error("aggregate:", dailyRaw);
      console.error("count:", totalRaw);
      return res.status(502).json({ error: "Failed to fetch analytics data" });
    }

    const daily = JSON.parse(dailyRaw);
    const total = JSON.parse(totalRaw);

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

    return res.status(200).json({
      total: total.data?.pageviews ?? 0,
      visitors: total.data?.visitors ?? 0,
      daily: daily.data ?? [],
    });
  } catch (err) {
    console.error("Analytics handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
