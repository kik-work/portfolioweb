import sharp from "sharp";
import { readdirSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const PUBLIC_DIR = new URL("../public", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const EXTS = new Set([".png", ".jpg", ".jpeg", ".JPG", ".PNG", ".JPEG"]);

const files = readdirSync(PUBLIC_DIR).filter((f) => EXTS.has(extname(f)));

console.log(`Converting ${files.length} images to WebP...\n`);

let saved = 0;
for (const file of files) {
  const src = join(PUBLIC_DIR, file);
  const out = join(PUBLIC_DIR, basename(file, extname(file)) + ".webp");

  if (existsSync(out)) {
    console.log(`  SKIP  ${file} (webp already exists)`);
    continue;
  }

  try {
    const info = await sharp(src).webp({ quality: 82 }).toFile(out);
    const orig = (await import("fs")).statSync(src).size;
    const pct = Math.round((1 - info.size / orig) * 100);
    saved += orig - info.size;
    console.log(`  OK    ${file} → ${basename(out)}  (${pct}% smaller)`);
  } catch (e) {
    console.error(`  ERR   ${file}: ${e.message}`);
  }
}

console.log(`\nDone. Total saved: ${(saved / 1024 / 1024).toFixed(1)} MB`);
