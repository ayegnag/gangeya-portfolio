import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { fileURLToPath } from 'node:url';
import type { PostMetadata, BlogSummary } from '../types/blog';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, '../features/blog/content');
const outputPath = path.join(__dirname, '../../public/blog-index.json');

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

const summaries: BlogSummary[] = files.map(file => {
  const fullPath = path.join(blogDir, file);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const { data: metadata } = matter(content);
  const slug = file.replace(/\.md$/, '');

  return { slug, metadata: metadata as PostMetadata };
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