import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

function staticSeoPlugin() {
  return {
    name: "ferticolombia-static-seo",
    generateBundle() {
      const siteUrl = (process.env.VITE_SITE_URL ?? "").trim().replace(/\/+$/, "");
      const sitemap = siteUrl
        ? `\nSitemap: ${siteUrl}/sitemap.xml\n`
        : "";
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /${sitemap}`,
      });
      if (siteUrl) {
        const pages = ["/", "/impacto-agronomico"]
          .map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`)
          .join("\n");
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages}\n</urlset>`,
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [
    ...tanstackStart({
      server: { entry: "server" },
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
      pages: [
        { path: "/", prerender: { enabled: true, outputPath: "/index.html" } },
        {
          path: "/impacto-agronomico",
          prerender: { enabled: true, outputPath: "/impacto-agronomico/index.html" },
        },
      ],
    }),
    react(),
    tailwindcss(),
    staticSeoPlugin(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    outDir: "dist",
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
  environments: {
    client: {
      build: { outDir: "dist" },
    },
    server: {
      build: { outDir: ".tanstack/static-server" },
    },
  },
});
