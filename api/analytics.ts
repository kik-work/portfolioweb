import type { VercelRequest, VercelResponse } from "@vercel/node";

const VERCEL_API_BASE = "https://api.vercel.com/v1/query/web-analytics";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET
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
    // Fetch daily visitor counts for the last 30 days
    const params = new URLSearchParams({
      teamId,
      projectId,
      by: "day",
      // last 30 days
      since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      until: new Date().toISOString(),
    });

    const [visitorsRes, totalRes] = await Promise.all([
      fetch(`${VERCEL_API_BASE}/visits/aggregate?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(
        `${VERCEL_API_BASE}/visits/count?${new URLSearchParams({ teamId, projectId })}`,
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    ]);

    if (!visitorsRes.ok || !totalRes.ok) {
      const errText = await visitorsRes.text();
      console.error("Vercel Analytics API error:", errText);
      return res.status(502).json({ error: "Failed to fetch analytics data" });
    }

    const [daily, total] = await Promise.all([
      visitorsRes.json(),
      totalRes.json(),
    ]);

    // Cache for 1 hour on CDN edge
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

    return res.status(200).json({
      total: total.total ?? 0,
      daily: daily.data ?? [],
    });
  } catch (err) {
    console.error("Analytics handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
