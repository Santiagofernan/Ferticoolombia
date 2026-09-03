import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    ...tanstackStart({ server: { entry: "server" } }),
    tsconfigPaths(),
    react(),
    tailwindcss(),
    nitro({ preset: "cloudflare-module" }),
  ],
  build: {
    target: "es2017",
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
});
