import { defineConfig, Plugin, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { compression } from "vite-plugin-compression2";
import type { IncomingMessage, ServerResponse } from "http";

/**
 * Inlines the entry stylesheet into index.html so it no longer blocks first
 * paint with an extra request. Lazy-chunk CSS (e.g. the carousel) stays separate.
 */
function inlineEntryCss(): Plugin {
  return {
    name: "inline-entry-css",
    apply: "build",
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        return html.replace(
          /<link rel="stylesheet"[^>]*href="\/?(assets\/[^"]+\.css)"[^>]*>/g,
          (tag, file: string) => {
            const asset = ctx.bundle?.[file];
            if (!asset || asset.type !== "asset") return tag;
            return `<style>${String(asset.source)}</style>`;
          }
        );
      },
    },
  };
}

/**
 * Vite dev-only plugin that handles /api/analytics locally.
 * In production this route is served by the Vercel serverless function in /api/analytics.ts.
 */
function analyticsDevPlugin(): Plugin {
  return {
    name: "analytics-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(
        "/api/analytics",
        async (_req: IncomingMessage, res: ServerResponse) => {
          const token = process.env.VERCEL_API_TOKEN;
          const projectId = process.env.VERCEL_PROJECT_ID;
          const teamId = process.env.VERCEL_TEAM_ID;

          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "no-store");

          if (!token || !projectId || !teamId) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Missing Vercel Analytics configuration" }));
            return;
          }

          try {
            const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
            const until = new Date().toISOString();
            const params = new URLSearchParams({ teamId, projectId, by: "day", since, until, limit: "30" });

            const upstream = await fetch(
              `https://api.vercel.com/v1/query/web-analytics/visits/aggregate?${params}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const raw = await upstream.text();

            if (!upstream.ok) {
              console.error("[analytics-dev] upstream error:", raw);
              res.statusCode = 502;
              res.end(JSON.stringify({ error: "Failed to fetch analytics data" }));
              return;
            }

            const daily: { data: { timestamp: string; visitors: number; pageviews: number }[] } =
              JSON.parse(raw);
            const rows = daily.data ?? [];
            const total = rows.reduce((s, d) => s + (d.pageviews ?? 0), 0);
            const visitors = rows.reduce((s, d) => s + (d.visitors ?? 0), 0);

            res.statusCode = 200;
            res.end(JSON.stringify({ total, visitors, daily: rows }));
          } catch (err) {
            console.error("[analytics-dev] error:", err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Internal server error" }));
          }
        }
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env vars (including non-VITE_ ones) so the dev middleware can read them
  const env = loadEnv(mode, process.cwd(), "");
  // Merge into process.env so the plugin middleware can access them via process.env
  Object.assign(process.env, env);

  return {
  plugins: [
    react(),
    tailwindcss(),
    analyticsDevPlugin(),
    inlineEntryCss(),
    compression({ algorithm: "gzip", exclude: [/\.(br)$/, /\.(gz)$/, /\.(png|jpg|webp|gif|mp4|pdf|woff2?)$/] }),
    compression({ algorithm: "brotliCompress", exclude: [/\.(br)$/, /\.(gz)$/, /\.(png|jpg|webp|gif|mp4|pdf|woff2?)$/], deleteOriginalAssets: false }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",          // modern JS
    sourcemap: false,          // no source maps in production
    chunkSizeWarningLimit: 500, 
    outDir: "dist",            // Netlify publish folder
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
        },
      },
    },
  },
  };
});
