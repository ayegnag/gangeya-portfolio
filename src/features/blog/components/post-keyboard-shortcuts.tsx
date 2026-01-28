// import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

import { useRouter } from '@tanstack/react-router'

import type { Post } from "@/features/blog/types/post";

export function PostKeyboardShortcuts({
  basePath,
  previous,
  next,
}: {
  basePath: string;
  previous: Post | null;
  next: Post | null;
}) {
  const router = useRouter();

  const navigate = (post: Post | null) => {
    if (post) {
      // router.push(`${basePath}/${post.slug}`);
      router.navigate({ to: `${basePath}/${post.slug}` });
    }
  };

  useHotkeys("ArrowRight", () => navigate(next));
  useHotkeys("ArrowLeft", () => navigate(previous));

  return null;
}
