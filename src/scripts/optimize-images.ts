/*
 * Optimize oversized source images flagged by PageSpeed (est. ~8 MB savings).
 *
 * - Blog images are 1536x1024 PNGs (~1.3–2 MB each) used as og:image, in-article
 *   hero, and homepage thumbnail. We emit an aspect-preserving JPEG capped at
 *   1200px wide (q80, mozjpeg). JPEG keeps universal social/OG compatibility
 *   while cutting ~90%+ of the bytes.
 * - The avatar is a 1024x1024 / 1.6 MB PNG shown at 128px (the LCP element).
 *   It's on-page only, so WebP at 256px (retina) is safe and tiny.
 *
 * Run: pnpm optimize:images   (source PNGs are left in place; remove them once
 * references are updated and the JP/WebP outputs are verified.)
 */
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const BLOG_DIR = 'public/images/blog'
const AVATAR_SRC = 'public/images/profilePic_photo.png'
const AVATAR_OUT = 'public/images/profilePic_photo.webp'

async function optimizeBlogImages() {
  const files = await readdir(BLOG_DIR)
  for (const file of files) {
    if (!/\.png$/i.test(file)) continue
    const src = path.join(BLOG_DIR, file)
    const out = path.join(BLOG_DIR, file.replace(/\.png$/i, '.jpg'))
    const info = await sharp(src)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(out)
    console.log(
      `blog  ${file} -> ${path.basename(out)}  ${(info.size / 1024).toFixed(0)} KB  ${info.width}x${info.height}`,
    )
  }
}

async function optimizeAvatar() {
  if (!existsSync(AVATAR_SRC)) {
    console.log(`avatar source ${AVATAR_SRC} not found — skipping (already optimized).`)
    return
  }
  const info = await sharp(AVATAR_SRC)
    .resize({ width: 256, height: 256, fit: 'cover' })
    .webp({ quality: 82 })
    .toFile(AVATAR_OUT)
  console.log(
    `avatar profilePic_photo.png -> profilePic_photo.webp  ${(info.size / 1024).toFixed(0)} KB  ${info.width}x${info.height}`,
  )
}

await optimizeBlogImages()
await optimizeAvatar()
