import blogIndex from "@/features/blog/data/blog-index.json" with { type: 'json' };

import type { BlogSummary } from "@/types/blog";

/*
 * Index-only blog helpers (title/description/image summaries from
 * blog-index.json). These live OUTSIDE posts.ts on purpose: posts.ts runs a
 * top-level eager `import.meta.glob('../content/*.md')`, so importing anything
 * from it drags the full raw markdown of every post into the bundle. The
 * homepage only needs these summaries, so importing from here keeps all post
 * prose out of the homepage's main.js.
 */
export function getRecentPosts(): BlogSummary[] {
  return (blogIndex as BlogSummary[]).slice(0, 5);
}

export function getAllBlogIndex(): BlogSummary[] {
  return blogIndex as BlogSummary[];
}
