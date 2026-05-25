/**
 * Pre-publish check: verifies expected files exist in public/lovable-uploads.
 * Edit EXPECTED_FILES below to add/remove tracked assets.
 * Run manually: `node scripts/check-uploads.mjs`
 * Also runs automatically at the start of `vite build` (see vite.config.ts).
 */
import { existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.resolve(__dirname, "..", "public", "lovable-uploads");

export const EXPECTED_FILES = [
  "Alex-Avatar.png",
  "pomogusha.png",
  "linkedin-engine.png",
  "qa-lifecycle.png",
  "github-repo.png",
  "therapist-site.png",
];

export function checkUploads() {
  const missing = [];
  const present = [];
  for (const file of EXPECTED_FILES) {
    const full = path.join(UPLOADS_DIR, file);
    (existsSync(full) ? present : missing).push(file);
  }

  let extras = [];
  if (existsSync(UPLOADS_DIR)) {
    const actual = readdirSync(UPLOADS_DIR);
    extras = actual.filter((f) => !EXPECTED_FILES.includes(f));
  }

  return { missing, present, extras };
}

function format({ missing, present, extras }) {
  const lines = [];
  lines.push(`\n[check-uploads] Verifying ${EXPECTED_FILES.length} expected file(s) in public/lovable-uploads/`);
  if (missing.length === 0) {
    lines.push(`  ✓ All ${present.length} expected files present.`);
  } else {
    lines.push(`  ✗ MISSING ${missing.length} file(s):`);
    for (const f of missing) lines.push(`      - ${f}`);
    lines.push(`  ✓ Present: ${present.length}`);
  }
  if (extras.length) {
    lines.push(`  ℹ Untracked files in uploads dir (${extras.length}): ${extras.join(", ")}`);
  }
  return lines.join("\n");
}

// Run as a CLI when executed directly.
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const result = checkUploads();
  console.log(format(result));
  // Warn (non-zero) when missing — useful for manual runs / CI.
  process.exit(result.missing.length > 0 ? 1 : 0);
}

export { format };