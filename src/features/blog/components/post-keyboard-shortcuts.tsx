// import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

import { useRouter } from '@tanstack/react-router'

// Only the slug is needed for navigation, so accept anything with a slug
// (full posts or lightweight summaries).
type PostRef = { slug: string };

export function PostKeyboardShortcuts({
  basePath,
  previous,
  next,
}: {
  basePath: string;
  previous: PostRef | null;
  next: PostRef | null;
}) {
  const router = useRouter();

  const navigate = (post: PostRef | null) => {
    if (post) {
      // router.push(`${basePath}/${post.slug}`);
      router.navigate({ to: `${basePath}/${post.slug}` });
    }
  };

  useHotkeys("ArrowRight", () => navigate(next));
  useHotkeys("ArrowLeft", () => navigate(previous));

  return null;
}
