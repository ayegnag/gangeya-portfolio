import { createFileRoute, Link } from '@tanstack/react-router'
import { getAllBlogs } from '@/features/blog/data/posts';

import { Suspense } from 'react';
import { PostList } from "@/features/blog/components/post-list";
import { PostListWithSearch } from "@/features/blog/components/post-list-with-search";
import { PostSearchInput } from "@/features/blog/components/post-search-input";
import { z } from 'zod'
import { cn } from '@/lib/utils';

const searchSchema = z.object({
  q: z.string().optional().default(''),
})

export const Route = createFileRoute('/blog/')(
  {
    validateSearch: (search) => searchSchema.parse(search),
    loader: () => getAllBlogs(), // or sort/filter here

    component: BlogIndexPage,
  })

const metadata = {
  title: "Blog",
  description: "Read the latest articles and notes from what I've learned - through my own work and from the experiences of others.",
};


function BlogIndexPage() {
  const blogs = Route.useLoaderData()

  // Optional: sort newest first
  const sorted = [...blogs].sort((a, b) =>
    new Date(b.metadata.updatedAt || 0).getTime() - new Date(a.metadata.updatedAt || 0).getTime()
  )

  return (
    <div className="mx-auto border-x border-edge md:max-w-3xl">
      <div
        className={cn(
          "h-8 px-2",
          "screen-line-after",
          "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
          "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
        )}
      />
      <div className="min-h-svh">
        <div className="screen-line-after px-4">
          <h1 className="text-3xl font-semibold">Blog</h1>
        </div>

        <div className="p-4">
          <p className="font-mono text-sm text-balance text-muted-foreground">
            {metadata.description}
          </p>
        </div>

        <div className="screen-line-before screen-line-after p-2">
          <Suspense
            fallback={
              <div className="flex h-9 w-full rounded-lg border border-input shadow-xs dark:bg-input/30" />
            }
          >
            <PostSearchInput />
          </Suspense>
        </div>

        <Suspense fallback={<PostList posts={sorted} />}>
          <PostListWithSearch posts={sorted} />
        </Suspense>

        <div className="h-4" />
      </div>
    </div>
  );
  // return (
  //   <div className="mx-auto max-w-3xl px-4 py-12">
  //     <h1 className="text-3xl font-bold mb-8">Blog</h1>
  //     <div className="space-y-8">
  //       {sorted.map((post) => (
  //         <article key={post.slug} className="border-b pb-6">
  //           <Link
  //             to="/blog/$slug"
  //             params={{ slug: post.slug }}
  //             className="block group"
  //           >
  //             <h2 className="text-2xl font-semibold group-hover:underline">
  //               {post.metadata.title}
  //             </h2>
  //           </Link>
  //           {post.metadata.excerpt && (
  //             <p className="mt-2 text-gray-600">{post.metadata.excerpt}</p>
  //           )}
  //           {post.metadata.updatedAt && (
  //             <time className="text-sm text-gray-500 mt-1 block">
  //               {new Date(post.metadata.updatedAt).toLocaleDateString()}
  //             </time>
  //           )}
  //         </article>
  //       ))}
  //     </div>
  //   </div>
  // )
}