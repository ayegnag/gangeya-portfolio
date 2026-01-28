import { useFilteredPosts } from "../hooks/use-filtered-posts";
import type { Post } from "../types/post";
import { PostList } from "./post-list";
import { BlogSummary } from "@/types/blog";

export function PostListWithSearch({ posts }: { posts: BlogSummary[] }) {
  const filteredPosts = useFilteredPosts(posts);
  return <PostList posts={filteredPosts} />;
}
