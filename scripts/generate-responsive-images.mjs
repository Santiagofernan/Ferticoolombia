import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const group = process.env.RESPONSIVE_GROUP;
const match = process.env.RESPONSIVE_MATCH;

const productNames = [
  "25-4-24",
  "Yurika",
  "Zaneta",
  "bonanza",
  "cplatanate",
  "katiuska",
  "mitakron",
  "spasiva",
];

const jobs = [
  ...productNames.map((name) => ({
    input: `src/assets/products/${name}.avif`,
    outputDir: "src/assets/products/variants",
    widths: [240, 360, 520, 720],
  })),
  ...[
    ["cafe", [640, 960, 1280]],
    ["platano", [640, 844]],
    ["maracuya", [640, 960, 1280]],
    ["tomate", [640, 960, 1280]],
    ["aguacate", [640, 960, 1280]],
    ["limon", [640, 960, 1280]],
    ["caña", [640, 960, 1280]],
    ["papa", [640, 800]],
  ].map(([name, widths]) => ({
    input: `src/assets/crops/${name}.avif`,
    outputDir: "src/assets/crops/variants",
    widths,
  })),
  {
    input: "src/assets/backgrounds/products-bg-coffee.avif",
    outputDir: "src/assets/backgrounds/variants",
    widths: [768, 1280],
  },
  {
    input: "src/assets/parallax/cafe.avif",
    outputDir: "src/assets/parallax/variants",
    widths: [640, 1024],
  },
  ...[
    "plant-interior",
    "plant-4",
    "plant-5",
    "plant-6",
    "plant-7",
    "logistics-1",
    "logistics-2",
    "logistics-4",
    "fertilizer-hold",
  ].map((name) => ({
    input: `src/assets/brands/${name}.avif`,
    outputDir: "src/assets/brands/variants",
    widths: [768, 1280],
  })),
];

for (const job of jobs.filter(
  (job) =>
    (!group || job.input.includes(`/assets/${group}/`)) &&
    (!match || job.input.includes(match)),
)) {
  const input = path.join(root, job.input);
  const outputDir = path.join(root, job.outputDir);
  const base = path.basename(job.input, path.extname(job.input));
  const { width: sourceWidth } = await sharp(input).metadata();
  fs.mkdirSync(outputDir, { recursive: true });

  for (const width of job.widths) {
    if (!sourceWidth || width > sourceWidth) continue;
    const output = path.join(outputDir, `${base}-${width}.avif`);
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 55, effort: 6 })
      .toFile(output);
    console.log(path.relative(root, output));
  }
}

if (!group || group === "brand") {
  const whatsappInput = path.join(root, "src/assets/brand/whatsapp.webp");
  const whatsappOutput = path.join(root, "src/assets/brand/whatsapp-128.webp");
  await sharp(whatsappInput).resize({ width: 128 }).webp({ quality: 82 }).toFile(whatsappOutput);
  console.log(path.relative(root, whatsappOutput));
}
