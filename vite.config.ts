import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
        // Let Vite handle chunking automatically
        // Removed manualChunks to prevent "Cannot access 'C'" runtime error
      },
    },
  },
});
