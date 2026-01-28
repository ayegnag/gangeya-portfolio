import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { fileURLToPath } from 'node:url';
import type { PostMetadata, BlogSummary } from '../types/blog';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../features/blog/content');
const outputPath = path.join(__dirname, '../features/blog/data/blog-index.json');

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

// Helper function
function estimateReadingTime(rawMarkdown: string, wordsPerMinute = 250): { minutes: number; words: number; images: number; } {
  // Strip frontmatter (everything before first --- ... ---)
  const contentWithoutFrontmatter = rawMarkdown.replace(/^---[\s\S]*?---\s*/, '').trim();

  // Very rough word count (splits on whitespace, ignores some markdown noise)
  const words = contentWithoutFrontmatter
    .replace(/```[\s\S]*?```/g, '')          // remove code blocks
    .replace(/`[^`]+`/g, '')                 // remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, ' image ')  // count images as 1 "word" placeholder
    .replace(/[#*_\[\]]/g, '')               // strip some markdown
    .split(/\s+/).filter(Boolean).length;

  let minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  // Optional: add 12 seconds per image (Medium-style)
  const imageCount = (contentWithoutFrontmatter.match(/!\[.*?\]\(.*?\)/g) || []).length;
  minutes += Math.ceil((imageCount * 12) / 60);

  return { minutes, words, images: imageCount };
}

const summaries: BlogSummary[] = files.map(file => {
  const fullPath = path.join(blogDir, file);
  const rawContent = fs.readFileSync(fullPath, 'utf-8');
  const { data: frontmatter } = matter(rawContent);
  const slug = file.replace(/\.md$/, '');

  const readingTime = estimateReadingTime(rawContent);

  return {
    slug,
    metadata: frontmatter as PostMetadata,
    readingTime,
  };
});

// Same sorting logic as before
summaries.sort((a, b) => {
  if (a.metadata.pinned !== b.metadata.pinned) {
    return a.metadata.pinned ? -1 : 1;
  }
  const dateA = a.metadata.createdAt ?? a.metadata.updatedAt ?? '1970-01-01';
  const dateB = b.metadata.createdAt ?? b.metadata.updatedAt ?? '1970-01-01';
  return new Date(dateB).getTime() - new Date(dateA).getTime();
});

fs.writeFileSync(outputPath, JSON.stringify(summaries, null, 2));
console.log(`Generated blog-index.json with ${summaries.length} posts`);