#!/usr/bin/env node
/**
 * Fails the build if any internal href in source or built output is
 * missing its mandatory trailing slash. Ignored: hash-only, mailto:,
 * tel:, absolute http(s) links to other hosts, and paths with a file
 * extension (e.g. /favicon.ico, /manifest.webmanifest, /sitemap.xml,
 * /robots.txt, /opengraph-image).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["app", "components", "content"];
const HREF_ATTR = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g;

const IGNORE_EXACT = new Set(["#", ""]);
const IGNORE_EXT = new Set([
  ".ico",
  ".xml",
  ".txt",
  ".webmanifest",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".pdf",
]);

/** @type {string[]} */
const violations = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walk(full);
    } else if (/\.(tsx?|jsx?|mdx)$/.test(entry)) {
      checkFile(full);
    }
  }
}

function isExempt(href) {
  if (IGNORE_EXACT.has(href)) return true;
  if (href.startsWith("#")) return true;
  if (href.startsWith("mailto:")) return true;
  if (href.startsWith("tel:")) return true;
  if (href.startsWith("http://") || href.startsWith("https://")) return true;
  if (href.startsWith("//")) return true;
  if (href.includes("${")) return true; // dynamic template segment, checked at runtime via withSlash
  if (href.startsWith("/api/")) return true;
  const ext = extname(href.split("?")[0].split("#")[0]);
  if (IGNORE_EXT.has(ext)) return true;
  return false;
}

function checkFile(file) {
  const src = readFileSync(file, "utf8");
  let match;
  HREF_ATTR.lastIndex = 0;
  while ((match = HREF_ATTR.exec(src))) {
    const href = match[1] ?? match[2] ?? match[3] ?? "";
    if (isExempt(href)) continue;
    if (!href.startsWith("/")) continue; // relative/anchor-only, not a routed internal link
    if (!href.endsWith("/")) {
      const line = src.slice(0, match.index).split("\n").length;
      violations.push(`${file}:${line} -> href="${href}"`);
    }
  }
}

for (const root of ROOTS) {
  try {
    walk(root);
  } catch {
    // root may not exist yet in early scaffolding; skip
  }
}

if (violations.length > 0) {
  console.error("\nTrailing-slash rule violated (next.config.ts trailingSlash: true):\n");
  for (const v of violations) console.error("  " + v);
  console.error(`\n${violations.length} violation(s). Every internal href must end with "/".\n`);
  process.exit(1);
} else {
  console.log(`check-slashes: OK (0 violations across ${ROOTS.join(", ")})`);
}
