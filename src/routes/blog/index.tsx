// import { createFileRoute } from '@tanstack/react-router'

// export const Route = createFileRoute('/blog/')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/blog/"!</div>
// }

import { createFileRoute, Link } from '@tanstack/react-router'
import { getAllBlogs } from '@/utils/loadBlogs'

export const Route = createFileRoute('/blog/')({
  loader: () => getAllBlogs(), // or sort/filter here

  component: BlogIndexPage,
})

function BlogIndexPage() {
  const blogs = Route.useLoaderData()

  // Optional: sort newest first
  const sorted = [...blogs].sort((a, b) =>
    new Date(b.metadata.updatedAt || 0).getTime() - new Date(a.metadata.updatedAt || 0).getTime()
  )

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-8">
        {sorted.map((post) => (
          <article key={post.slug} className="border-b pb-6">
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="block group"
            >
              <h2 className="text-2xl font-semibold group-hover:underline">
                {post.metadata.title}
              </h2>
            </Link>
            {post.metadata.excerpt && (
              <p className="mt-2 text-gray-600">{post.metadata.excerpt}</p>
            )}
            {post.metadata.updatedAt && (
              <time className="text-sm text-gray-500 mt-1 block">
                {new Date(post.metadata.updatedAt).toLocaleDateString()}
              </time>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}