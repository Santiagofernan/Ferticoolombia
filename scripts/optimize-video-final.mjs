#!/usr/bin/env node
/**
 * Video Optimization - Final Version
 * Estrategia:
 * - Desktop: VP9 WebM (720p, 1000k)
 * - Mobile: VP9 WebM (360p, 500k) - WebM soporta VP9
 * - Poster: AVIF
 */
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const ffmpegPath = ffmpegInstaller.path;

const sourceVideo = path.join(projectRoot, 'public/about/Video-nosotros.webm');
const desktopOutput = path.join(projectRoot, 'public/about/video-nosotros.720.webm');
const mobileOutput = path.join(projectRoot, 'public/about/video-nosotros.mobile.webm');
const posterOutputJpg = path.join(projectRoot, 'public/about/video-nosotros-poster.jpg');
const posterOutput = path.join(projectRoot, 'public/about/video-nosotros-poster.avif');

console.log('🎥 Video Optimization - Final Version');
console.log('=====================================\n');

if (!fs.existsSync(sourceVideo)) {
  console.error(`❌ Source not found: ${sourceVideo}`);
  process.exit(1);
}

const sourceStats = fs.statSync(sourceVideo);
const sourceSizeKB = (sourceStats.size / 1024).toFixed(2);
console.log(`📊 Source: ${sourceSizeKB} KB\n`);

function runFFmpeg(args, description) {
  return new Promise((resolve, reject) => {
    console.log(`⏳ ${description}`);
    const ffmpeg = spawn(ffmpegPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';

    ffmpeg.stderr.on('data', (data) => {
      stderr += data.toString();
      if (data.toString().includes('frame=')) {
        process.stdout.write('.');
      }
    });

    ffmpeg.on('close', (code) => {
      console.log('');
      if (code !== 0) {
        reject(new Error(`FFmpeg failed:\n${stderr}`));
      } else {
        resolve();
      }
    });

    ffmpeg.on('error', reject);
  });
}

async function main() {
  try {
    // Step 1: Desktop version (720p VP9 WebM)
    console.log('🖥️  Step 1: Desktop 720p (VP9 WebM, no audio)');
    await runFFmpeg([
      '-i', sourceVideo,
      '-c:v', 'libvpx-vp9',
      '-crf', '32',
      '-b:v', '1000k',
      '-maxrate', '1200k',
      '-minrate', '800k',
      '-tile-columns', '2',
      '-tile-rows', '1',
      '-auto-alt-ref', '1',
      '-lag-in-frames', '25',
      '-vf', 'scale=720:720:force_original_aspect_ratio=decrease,pad=720:720:(ow-iw)/2:(oh-ih)/2',
      '-an',
      '-y',
      desktopOutput
    ], 'Processing desktop version...');

    const desktopStats = fs.statSync(desktopOutput);
    console.log(`✅ Desktop: ${(desktopStats.size / 1024).toFixed(0)} KB\n`);

    // Step 2: Mobile version (360p VP9 WebM, lighter)
    console.log('📱 Step 2: Mobile 360p (VP9 WebM, no audio, heavily compressed)');
    await runFFmpeg([
      '-i', sourceVideo,
      '-c:v', 'libvpx-vp9',
      '-crf', '38',
      '-b:v', '500k',
      '-maxrate', '650k',
      '-minrate', '400k',
      '-tile-columns', '1',
      '-tile-rows', '1',
      '-auto-alt-ref', '1',
      '-lag-in-frames', '16',
      '-vf', 'scale=360:360:force_original_aspect_ratio=decrease,pad=360:360:(ow-iw)/2:(oh-ih)/2',
      '-an',
      '-y',
      mobileOutput
    ], 'Processing mobile version...');

    const mobileStats = fs.statSync(mobileOutput);
    const mobileReduction = (100 - (mobileStats.size / sourceStats.size * 100)).toFixed(1);
    console.log(`✅ Mobile: ${(mobileStats.size / 1024).toFixed(0)} KB (${mobileReduction}% reduction)\n`);

    // Step 3: Poster frame (AVIF)
    console.log('📸 Step 3: Poster frame (AVIF)');
    await runFFmpeg([
      '-i', sourceVideo,
      '-ss', '1',
      '-vframes', '1',
      '-q:v', '5',
      '-y',
      posterOutputJpg
    ], 'Extracting poster...');

    const posterJpgStats = fs.statSync(posterOutputJpg);
    console.log(`✅ Poster JPG: ${(posterJpgStats.size / 1024).toFixed(2)} KB`);

    // Convert to AVIF
    await sharp(posterOutputJpg)
      .avif({ quality: 50 })
      .toFile(posterOutput);

    const posterAvifStats = fs.statSync(posterOutput);
    console.log(`✅ Poster AVIF: ${(posterAvifStats.size / 1024).toFixed(2)} KB\n`);

    // Summary
    console.log('📊 Summary');
    console.log('==========');
    console.log(`Source:       ${sourceSizeKB} KB`);
    console.log(`Desktop 720p: ${(desktopStats.size / 1024).toFixed(0)} KB`);
    console.log(`Mobile 360p:  ${(mobileStats.size / 1024).toFixed(0)} KB`);
    console.log(`Poster AVIF:  ${(posterAvifStats.size / 1024).toFixed(2)} KB\n`);

    const totalVideoReduction = ((1 - (desktopStats.size + mobileStats.size) / (sourceStats.size * 2)) * 100).toFixed(1);
    console.log(`🎉 Video reduction: ${totalVideoReduction}%\n`);

  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

main();
