import matter from 'gray-matter';
import type { BlogPost, PostMetadata } from '@/types/blog'

/*
 * Lazy markdown glob: WITHOUT `eager: true`, Vite gives each .md its own async
 * chunk (`() => Promise<string>`) instead of inlining every post's raw prose into
 * whatever imports this module. The `/blog/$slug` route loader lives in the entry
 * bundle, so an eager glob here previously shipped ALL post content in the
 * homepage's main.js. Now only the requested post's chunk loads on demand (and is
 * inlined into that post's prerendered HTML at build time).
 */
const blogModules = import.meta.glob<string>(
  '../content/*.md',
  {
    query: '?raw',
    import: 'default',
  }
)

function slugFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? '';
}

function parsePost(slug: string, rawContent: string): BlogPost {
  const { data: metadata, content: mdContent } = matter(rawContent);
  return {
    slug,
    metadata: metadata as PostMetadata,
    content: mdContent.trim(),
  };
}

export const getAllBlogs = async (): Promise<BlogPost[]> => {
  const posts = await Promise.all(
    Object.entries(blogModules).map(async ([path, load]) =>
      parsePost(slugFromPath(path), await load()),
    ),
  );

  // Sort: pinned first, then newest first (mirrors generate-blog-index.ts).
  return posts.sort((a, b) => {
    if (a.metadata.pinned !== b.metadata.pinned) {
      return a.metadata.pinned ? -1 : 1;
    }
    return getPostDate(b.metadata) - getPostDate(a.metadata);
  });
};

export const getBlogBySlug = async (
  slug: string,
): Promise<BlogPost | undefined> => {
  const entry = Object.entries(blogModules).find(
    ([path]) => slugFromPath(path) === slug,
  );
  if (!entry) return undefined;
  return parsePost(slug, await entry[1]());
};

function getPostDate(fm: PostMetadata): number {
  const dateStr = fm.createdAt ?? fm.updatedAt ?? '1970-01-01';
  const timestamp = new Date(dateStr).getTime();
  return isNaN(timestamp) ? 0 : timestamp;
}

// Only reads `.slug`, so it accepts full posts or lightweight summaries alike.
export function findNeighbour<T extends { slug: string }>(
  posts: T[],
  slug: string,
) {
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
