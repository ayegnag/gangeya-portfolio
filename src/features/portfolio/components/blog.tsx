import { ArrowRightIcon } from "lucide-react";
import { Link } from '@tanstack/react-router'

import { Button } from "@/components/ui/button";
import { PostItem } from "@/features/blog/components/post-item";
import { getRecentPosts } from "@/features/blog/data/posts";

import { Panel, PanelHeader, PanelTitle } from "./panel";

export function Blog() {
const recentPosts = getRecentPosts();

  return (
    <Panel id="blog">
      <PanelHeader>
        <PanelTitle>Blog</PanelTitle>
      </PanelHeader>

      <div className="relative py-4">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recentPosts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      </div>

      <div className="screen-line-before flex justify-center py-2">
        <Button variant="default" asChild>
          <Link to="/blog">
            All Posts
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </Panel>
  );
}
