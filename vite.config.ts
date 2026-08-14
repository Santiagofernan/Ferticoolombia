// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Synchronous config: keep build optimizations but avoid importing optional
// build-only plugins during dev to prevent startup errors when they are missing.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: (() => {
      const p: any[] = [];
      const isBuild = process.env.npm_lifecycle_event === "build" || process.env.NODE_ENV === "production";
      if (isBuild) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const { visualizer } = require("rollup-plugin-visualizer");
          p.push(visualizer({ filename: "dist/stats.html", gzipSize: true }));
        } catch (e) {
          // visualizer not installed — skip
        }
      }
      return p;
    })(),
    build: {
      target: "es2017",
      brotliSize: false,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes("node_modules")) {
              if (id.includes("framer-motion")) return "vendor_framer";
              if (id.includes("recharts")) return "vendor_recharts";
              if (id.includes("react") || id.includes("react-dom")) return "vendor_react";
              if (id.includes("lucide-react")) return "vendor_icons";
              return "vendor";
            }
          },
        },
      },
    },
  },
});
