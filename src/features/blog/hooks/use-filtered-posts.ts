import { BlogSummary } from "@/types/blog";
// import type { Post } from "../types/post";
import { useSearchQuery } from "./use-search-query";

const normalize = (text: string) => text.toLowerCase().replaceAll(" ", "");

const matchesQuery = (post: BlogSummary, normalizedQuery: string) => {
  const normalizedTitle = normalize(post.metadata.title);
  const normalizedDescription = normalize(post.metadata.description);

  return (
    normalizedTitle.includes(normalizedQuery) ||
    normalizedDescription.includes(normalizedQuery)
  );
};

const searchPosts = (posts: BlogSummary[], query: string | null) => {
  if (!query) return posts;

  const normalizedQuery = normalize(query);
  return posts.filter((post) => matchesQuery(post, normalizedQuery));
};

export function useFilteredPosts(posts: BlogSummary[]) {
  const { query } = useSearchQuery();
  return searchPosts(posts, query);
}
