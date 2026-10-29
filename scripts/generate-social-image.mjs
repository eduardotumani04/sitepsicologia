import { chromium } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { site } from "../src/lib/site.ts";

const font = await readFile(new URL("../src/app/fonts/manrope-latin-variable.woff2", import.meta.url));
const escape = value => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
    @font-face { font-family: Manrope; src: url(data:font/woff2;base64,${font.toString("base64")}); font-weight: 200 800; }
    * { box-sizing: border-box; } body { margin: 0; width: 1200px; height: 630px; padding: 72px 80px; background: #303C37; color: #F7F5F0; font-family: Manrope, sans-serif; }
    .label { margin: 0 0 66px; color: #E7E2D8; font-size: 21px; font-weight: 500; }
    h1 { margin: 0; max-width: 1040px; font-size: 62px; font-weight: 700; line-height: 1.15; letter-spacing: -.035em; }
    .registration { margin-top: 23px; font-size: 26px; font-weight: 500; }
    .rule { margin-top: 56px; width: 100%; height: 1px; background: #69766B; }
    .tagline { margin: 27px 0 0; color: #E7E2D8; font-size: 23px; line-height: 1.5; }
  </style></head><body><p class="label">Psicologia fundamentada em ciência</p><h1>${escape(site.name)}.</h1><p class="registration">${escape(site.profession)} — ${escape(site.registration)}</p><div class="rule"></div><p class="tagline">Ciência para compreender. Cuidado para acolher.</p></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: new URL("../public/opengraph.png", import.meta.url).pathname });
} finally {
  await browser.close();
}
