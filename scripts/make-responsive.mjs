import sharp from "sharp";
import { statSync } from "fs";
import { join } from "path";

// Generates width-variants for the large photos used by the redesign so the
// browser can pick the smallest file through srcset.
const PUBLIC_DIR = new URL("../public", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");

const jobs = [
  { src: "kakon_new_pp.png", name: "kakon_new_pp", widths: [960] },
  { src: "mine4.webp", name: "mine4", widths: [480, 800, 1200] },
  { src: "cricket1.webp", name: "cricket1", widths: [480, 800] },
  { src: "football1.webp", name: "football1", widths: [480, 800] },
  { src: "covidvol.webp", name: "covidvol", widths: [480] },
  { src: "cisco-1.webp", name: "cisco-1", widths: [800, 1400] },
];

for (const job of jobs) {
  for (const width of job.widths) {
    const out = join(PUBLIC_DIR, `${job.name}-${width}.webp`);
    const info = await sharp(join(PUBLIC_DIR, job.src))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(out);
    console.log(`  OK  ${job.name}-${width}.webp  ${info.width}x${info.height}  ${(statSync(out).size / 1024).toFixed(0)} KB`);
  }
}
