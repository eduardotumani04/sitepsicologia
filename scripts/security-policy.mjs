import { createHash } from "node:crypto";

export function contentSecurityPolicy(documents) {
  const hashes = new Set();
  for (const html of documents) {
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (!/\bsrc\s*=/i.test(match[1]) && match[2].trim()) {
        hashes.add(`'sha256-${createHash("sha256").update(match[2]).digest("base64")}'`);
      }
    }
  }
  return [
    "default-src 'self'",
    `script-src 'self' ${[...hashes].sort().join(" ")}`,
    "script-src-attr 'none'",
    "style-src 'self'",
    "style-src-attr 'none'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
  ].join("; ");
}
