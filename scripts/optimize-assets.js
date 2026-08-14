#!/usr/bin/env node
/*
 * Optimize images and videos in src/assets
 * - Images: generate .webp and .avif variants (same folder)
 * - Videos: generate webm and mp4 variants + poster JPG
 *
 * Usage: node scripts/optimize-assets.js
 * Requires: Node 16+, sharp, fluent-ffmpeg, @ffmpeg-installer/ffmpeg
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const sharp = require('sharp');
let ffmpeg;
let ffmpegPath;
try {
  ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
  ffmpeg = require('fluent-ffmpeg');
  ffmpeg.setFfmpegPath(ffmpegPath);
} catch (e) {
  console.warn('ffmpeg not available. Skipping video transcode steps. Install @ffmpeg-installer/ffmpeg and fluent-ffmpeg to enable.');
}

const projectRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(projectRoot, 'src', 'assets');

function mkdirIfNeeded(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function processImage(file) {
  try {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.svg') return; // skip svgs
    const dir = path.dirname(file);
    const name = path.basename(file, ext);
    const input = file;

    const webpOut = path.join(dir, `${name}.webp`);
    const avifOut = path.join(dir, `${name}.avif`);

    // only write if missing or input is newer
    const stats = fs.statSync(input);

    const shouldWrite = (out) => {
      if (!fs.existsSync(out)) return true;
      const outStat = fs.statSync(out);
      return stats.mtimeMs > outStat.mtimeMs;
    };

    const img = sharp(input).withMetadata();

    if (shouldWrite(webpOut)) {
      await img.clone().webp({ quality: 80 }).toFile(webpOut);
      console.log('WROTE', path.relative(projectRoot, webpOut));
    }
    if (shouldWrite(avifOut)) {
      await img.clone().avif({ quality: 50 }).toFile(avifOut);
      console.log('WROTE', path.relative(projectRoot, avifOut));
    }
  } catch (err) {
    console.error('IMAGE ERROR', file, err);
  }
}

function processVideo(file) {
  return new Promise((resolve) => {
    const dir = path.dirname(file);
    const name = path.basename(file, path.extname(file));
    const webmOut = path.join(dir, `${name}.webm`);
    const mp4Out = path.join(dir, `${name}.mp4`);
    const posterOut = path.join(dir, `${name}-poster.jpg`);

    // transcode to webm
    ffmpeg(file)
      .outputOptions(['-c:v libvpx-vp9', '-crf 30', '-b:v 0'])
      .size('?x720')
      .save(webmOut)
      .on('end', () => console.log('WROTE', path.relative(projectRoot, webmOut)))
      .on('error', (e) => console.error('FFMPEG WEBM ERROR', file, e));

    // transcode to mp4 h264
    ffmpeg(file)
      .outputOptions(['-c:v libx264', '-crf 23', '-preset medium'])
      .size('?x720')
      .save(mp4Out)
      .on('end', () => console.log('WROTE', path.relative(projectRoot, mp4Out)))
      .on('error', (e) => console.error('FFMPEG MP4 ERROR', file, e));

    // generate poster (first frame)
    ffmpeg(file)
      .screenshots({ count: 1, filename: path.basename(posterOut), folder: dir, size: '1280x?' })
      .on('end', () => {
        console.log('WROTE', path.relative(projectRoot, posterOut));
        resolve();
      })
      .on('error', (e) => {
        console.error('FFMPEG POSTER ERROR', file, e);
        resolve();
      });
  });
}

async function run() {
  console.log('Scanning assets in', assetsDir);

  const imagePatterns = ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.webp'];
  const videoPatterns = ['**/*.mp4', '**/*.mov', '**/*.mkv', '**/*.avi'];

  for (const pat of imagePatterns) {
    const matches = glob.sync(pat, { cwd: assetsDir, absolute: true });
    for (const m of matches) await processImage(m);
  }

  if (ffmpeg) {
    for (const pat of videoPatterns) {
      const matches = glob.sync(pat, { cwd: assetsDir, absolute: true });
      for (const m of matches) await processVideo(m);
    }
  } else {
    console.log('Skipping video processing because ffmpeg is not installed.');
  }

  console.log('Done.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
