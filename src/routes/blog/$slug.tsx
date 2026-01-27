
// export const Route = createFileRoute('/blog/$slug')({
//   component: RouteComponent,
// })

// function RouteComponent() {
//   return <div>Hello "/blog/$slug"!</div>
// }

import { createFileRoute, notFound, rootRouteId } from '@tanstack/react-router'
import { BlogPostRenderer } from '@/components/blog-post-renderer' // adjust alias/path
import { getBlogBySlug } from '@/utils/loadBlogs'               // adjust alias/path
import type { BlogPost } from '@/types/blog'                     // adjust alias/path

export const Route = createFileRoute('/blog/$slug')({
  // Loader runs before render — great place to fetch data
  loader: async ({ params }) => {
    const post = getBlogBySlug(params.slug)

    if (!post) {
      // You can throw response / redirect here, or handle in component
      throw notFound({ routeId: rootRouteId })    // throw new Response('Blog post not found', { status: 404 })
      // or: redirect({ to: '/', search: true }) if you prefer redirect
    }

    return post
  },

  // Optional: error handling per-route
  errorComponent: ({ error }) => (
    <div>
      <h1>Error</h1>
      <p>{error?.message || 'Something went wrong'}</p>
    </div>
  ),

  component: BlogPostPage,
})

function BlogPostPage() {
  const post = Route.useLoaderData() as BlogPost

  return (
    <article className="prose prose-lg mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">{post.metadata.title}</h1>
        {post.metadata.updatedAt && (
          <time className="text-gray-500">
            {new Date(post.metadata.updatedAt).toLocaleDateString()}
          </time>
        )}
      </header>

      <BlogPostRenderer
        content={post.content}
        basePath="/blog/" // adjust if your images are served from different public path
      />
    </article>
  )
}