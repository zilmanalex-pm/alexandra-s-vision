import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { existsSync } from "node:fs";
import { componentTagger } from "lovable-tagger";

// Keep this list in sync with scripts/check-uploads.mjs
const EXPECTED_UPLOADS = [
  "alex-avatar.png",
  "pomogusha.png",
  "linkedin-engine.png",
  "qa-lifecycle.png",
  "github-repo.png",
  "therapist-site.png",
];

// Pre-build check: warn (don't fail) if expected /lovable-uploads files are missing.
function uploadsCheckPlugin() {
  return {
    name: "lovable-uploads-check",
    apply: "build" as const,
    buildStart() {
      const dir = path.resolve(__dirname, "public", "lovable-uploads");
      const missing = EXPECTED_UPLOADS.filter((f) => !existsSync(path.join(dir, f)));
      if (missing.length) {
        const msg =
          `[check-uploads] Missing ${missing.length} expected file(s) in public/lovable-uploads/:\n` +
          missing.map((f) => `  - ${f}`).join("\n");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).warn(msg);
      } else {
        console.log(
          `[check-uploads] ✓ All ${EXPECTED_UPLOADS.length} expected files present in public/lovable-uploads/`
        );
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    uploadsCheckPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@tanstack/react-query", "framer-motion"],
  },
}));
