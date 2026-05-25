import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { checkUploads, format } from "./scripts/check-uploads.mjs";

// Pre-build check: warn (don't fail) if expected /lovable-uploads files are missing.
function uploadsCheckPlugin() {
  return {
    name: "lovable-uploads-check",
    apply: "build" as const,
    buildStart() {
      const result = checkUploads();
      const msg = format(result);
      if (result.missing.length > 0) {
        this.warn(msg);
      } else {
        console.log(msg);
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
