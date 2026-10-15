// Renders scripts/mockups/scenes/*.html to public/work/<slug>[-night]-{800,1600}.{avif,webp}
// and writes blur placeholders to src/data/workImages.json.
// Usage: node scripts/mockups/render.mjs [scene ...]   (no args = all scenes)
import { constants } from "node:fs";
import { access, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const outDir = path.join(root, "public/work");
const jsonPath = path.join(root, "src/data/workImages.json");

const SCENES = {
  compliance: "ai-compliance-platform",
  voice: "voice-agents-suite",
  postura: "postura",
  coach: "coach",
  realestate: "ai-real-estate-marketplace",
  ccm: "claude-code-mastery",
  travel: "b2b-travel-saas",
  craftsmen: "ai-craftsmen-marketplace",
  aitools: "ai-tools-suite",
  video: "ai-video-pipeline",
  dietapp: "dietapp",
  "before-site": "before-site",
  "after-site": "after-site",
  "before-phone": "before-phone",
  "after-phone": "after-phone",
};
/** Scenes that are not 1600×1000 (the phone scenes are 4:5). */
const SIZES = { "before-phone": { width: 800, height: 1000 }, "after-phone": { width: 800, height: 1000 } };
const THEMES = { light: "", night: "-night" };
const WIDTHS = [800, 1600];
const VIEWPORT = { width: 1600, height: 1000 };
const DPR = 2;
const QUALITY = { avif: { quality: 50, effort: 6 }, webp: { quality: 80, effort: 6 } };

const chromePath =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

try {
  await access(chromePath, constants.X_OK);
} catch {
  throw new Error(`Chrome not found or not executable at "${chromePath}". Set CHROME_PATH to your Chrome/Chromium binary.`);
}

const requested = process.argv.slice(2);
const unknown = requested.filter((s) => !(s in SCENES));
if (unknown.length) throw new Error(`Unknown scene(s): ${unknown.join(", ")}`);
const names = requested.length ? requested : Object.keys(SCENES);

async function blur(png) {
  const buf = await sharp(png).resize(10, 6).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

await mkdir(outDir, { recursive: true });
let meta = {};
try {
  meta = JSON.parse(await readFile(jsonPath, "utf8"));
} catch {
  meta = {};
}

const browser = await puppeteer.launch({ executablePath: chromePath, headless: true });
try {
  const page = await browser.newPage();
  page.on("console", (m) => m.type() === "error" && console.error(`  [page] ${m.text()}`));
  page.on("pageerror", (e) => console.error(`  [page] ${e.message}`));

  for (const name of names) {
    const slug = SCENES[name];
    const size = SIZES[name] ?? VIEWPORT;
    await page.setViewport({ ...size, deviceScaleFactor: DPR });
    const entry = { w: size.width, h: size.height };
    for (const [theme, suffix] of Object.entries(THEMES)) {
      const url = `${pathToFileURL(path.join(here, "scenes", `${name}.html`)).href}?theme=${theme}`;
      await page.goto(url, { waitUntil: "networkidle0" });
      const missing = await page.evaluate(async () => {
        await Promise.all(
          ['600 16px "Space Grotesk"', '400 16px "Inter"', '400 16px "JetBrains Mono"'].map((f) =>
            document.fonts.load(f),
          ),
        );
        await document.fonts.ready;
        const loaded = new Set(
          [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/"/g, "")),
        );
        return ["Space Grotesk", "Inter", "JetBrains Mono"].filter((f) => !loaded.has(f));
      });
      if (missing.length) {
        throw new Error(`${name}: web fonts not loaded (${missing.join(", ")}); is fonts.googleapis.com reachable?`);
      }
      if (!(await page.evaluate(() => window.__sceneReady === true))) {
        throw new Error(`${name}: _base.js did not run`);
      }
      const png = await page.screenshot({ type: "png" });

      for (const width of WIDTHS) {
        const base = path.join(outDir, `${slug}${suffix}-${width}`);
        const resized = sharp(png).resize(width);
        await resized.clone().avif(QUALITY.avif).toFile(`${base}.avif`);
        await resized.clone().webp(QUALITY.webp).toFile(`${base}.webp`);
      }
      entry[theme === "light" ? "blur" : "nightBlur"] = await blur(png);
      console.log(`rendered ${slug}${suffix}`);
    }
    meta[slug] = entry;
  }
} finally {
  await browser.close();
}

const ordered = Object.fromEntries(
  Object.values(SCENES)
    .filter((slug) => meta[slug])
    .map((slug) => [slug, meta[slug]]),
);
await writeFile(jsonPath, `${JSON.stringify(ordered, null, 2)}\n`);

let total = 0;
for (const f of await readdir(outDir)) total += (await stat(path.join(outDir, f))).size;
console.log(`public/work total: ${(total / 1024 / 1024).toFixed(2)} MB`);
