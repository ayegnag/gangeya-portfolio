import blogIndex from "@/features/blog/data/blog-index.json" assert { type: 'json' };

import type { BlogSummary, Post } from "@/types/blog";

import matter from 'gray-matter';
import type { BlogPost, PostMetadata } from '@/types/blog'


const blogModules = import.meta.glob<string>(
  '../content/*.md',
  {
    query: '?raw',
    import: 'default',
    eager: true,
  }
)

export const getAllBlogs = (): BlogPost[] => {
  const posts = Object.entries(blogModules).map(([path, rawContent]) => {
    const slug = path
      .split('/')
      .pop()
      ?.replace(/\.md$/, '') ?? '';

    const { data: metadata, content: mdContent } = matter(rawContent);

    return {
      slug,
      metadata: metadata as PostMetadata,
      content: mdContent.trim(),
    };
  });

  // Sort: pinned first (descending), then newest first
  // return posts.sort((a, b) => {
  //   // 1. Pinned posts come first
  //   if (a.metadata.pinned && !b.metadata.pinned) return -1;
  //   if (!a.metadata.pinned && b.metadata.pinned) return 1;

  //   // 2. Then sort by date descending (newest first)
  //   // Use createdAt if present, fall back to date, fall back to 0 (oldest)
  //   const dateA = a.metadata.createdAt ?? a.metadata.date ?? '1970-01-01';
  //   const dateB = b.metadata.createdAt ?? b.metadata.date ?? '1970-01-01';

  //   return new Date(dateB).getTime() - new Date(dateA).getTime();
  // });
  // console.log('Posts before sorting:', posts);
  return posts.sort((a, b) => {
    if (a.metadata.pinned !== b.metadata.pinned) {
      return a.metadata.pinned ? -1 : 1;
    }
    return getPostDate(b.metadata) - getPostDate(a.metadata);
  });
};

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  console.log('Fetching blog post for slug:', slug);
  return getAllBlogs().find((post) => {
    console.log('Checking post slug:', post.slug);
    return post.slug === slug;
  });
};

function getPostDate(fm: PostMetadata): number {
  const dateStr = fm.createdAt ?? fm.updatedAt ?? '1970-01-01';
  const timestamp = new Date(dateStr).getTime();
  return isNaN(timestamp) ? 0 : timestamp;
}

export function getRecentPosts() {
  const recentBlogs = (blogIndex as BlogSummary[]).slice(0, 5);
  return recentBlogs;
}

export function getAllBlogIndex(): BlogSummary[] {
  return blogIndex as BlogSummary[];
}

export function findNeighbour(posts: Post[], slug: string) {
  const len = posts.length;

  for (let i = 0; i < len; ++i) {
    if (posts[i].slug === slug) {
      return {
        previous: i > 0 ? posts[i - 1] : null,
        next: i < len - 1 ? posts[i + 1] : null,
      };
    }
  }

  return { previous: null, next: null };
}
