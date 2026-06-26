import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { compression } from "vite-plugin-compression2";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
          "vendor-motion": ["framer-motion"],
          "vendor-charts": ["recharts"],
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-select",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
          ],
        },
      },
    },
  },
});
