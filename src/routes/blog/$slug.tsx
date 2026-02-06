import { BlogPostRenderer } from '@/components/blog-post-renderer' // adjust alias/path

import { createFileRoute, notFound, Link, rootRouteId } from '@tanstack/react-router'
import { getTableOfContents } from "fumadocs-core/content/toc"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import type { BlogPosting as PageSchema, WithContext } from "schema-dts"
import { useEffect } from 'react'

import { InlineTOC } from "@/components/inline-toc"
// import { MDX } from "@/components/mdx"
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Prose } from "@/components/ui/typography"
import { SITE_INFO } from "@/config/site"
import { PostKeyboardShortcuts } from "@/features/blog/components/post-keyboard-shortcuts"
// import { LLMCopyButtonWithViewOptions } from "@/features/blog/components/post-page-actions"
import { PostShareMenu } from "@/features/blog/components/post-share-menu"
import {
  findNeighbour,
  getAllBlogs,
  getBlogBySlug,
} from "@/features/blog/data/posts"
import type { Post } from "@/features/blog/types/post"
import { USER } from "@/features/portfolio/data/user"
import { cn } from "@/lib/utils"
import { AuthorFooter } from '@/components/author-footer'
import { ScrollToTop } from '@/components/scroll-to-top'

// Route definition
export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getBlogBySlug(params.slug)
    // console.log('Loader fetched post for slug:', params.slug, post) 
    if (!post) {
      throw notFound()
    }

    const allPosts = getAllBlogs()
    const { previous, next } = findNeighbour(allPosts, params.slug)

    return {
      post,
      previous,
      next,
    }
  },

  //   // Optional: error handling per-route
  //   errorComponent: ({ error }) => (
  //     <div>
  //       <h1>Error</h1>
  //       <p>{error?.message || 'Something went wrong'}</p>
  //     </div>
  //   ),

  component: BlogPostPage,
})

function getPageJsonLd(post: Post): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    image:
      post.metadata.image ||
      `/og/simple?title=${encodeURIComponent(post.metadata.title)}`,
    url: `${SITE_INFO.url}${getPostUrl(post)}`,
    datePublished: new Date(post.metadata.createdAt).toISOString(),
    dateModified: new Date(post.metadata.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  }
}

function getPostUrl(post: Post) {
  const isComponent = post.metadata.category === "components"
  return isComponent ? `/components/${post.slug}` : `/blog/${post.slug}`
}

// Helper function to update meta tags
function updateMetaTags(post: Post) {
  const { title, description, image, createdAt, updatedAt } = post.metadata
  const postUrl = getPostUrl(post)
  const ogImage = image || `/og/simple?title=${encodeURIComponent(title)}`

  // Update title
  document.title = title

  // Helper to set or create meta tag
  const setMetaTag = (selector: string, content: string) => {
    let element = document.querySelector(selector) as HTMLMetaElement
    if (!element) {
      element = document.createElement('meta')
      const match = selector.match(/\[([^=]+)="([^"]+)"\]/)
      if (match) {
        element.setAttribute(match[1], match[2])
      }
      document.head.appendChild(element)
    }
    element.setAttribute('content', content)
  }

  // Update meta tags
  setMetaTag('meta[name="description"]', description)
  setMetaTag('meta[property="og:url"]', `${SITE_INFO.url}${postUrl}`)
  setMetaTag('meta[property="og:type"]', 'article')
  setMetaTag('meta[property="og:title"]', title)
  setMetaTag('meta[property="og:description"]', description)
  setMetaTag('meta[property="og:image"]', ogImage)
  setMetaTag('meta[property="og:image:width"]', '1200')
  setMetaTag('meta[property="og:image:height"]', '630')
  setMetaTag('meta[property="og:image:alt"]', title)
  setMetaTag('meta[property="article:published_time"]', new Date(createdAt).toISOString())
  setMetaTag('meta[property="article:modified_time"]', new Date(updatedAt).toISOString())
  setMetaTag('meta[name="twitter:card"]', 'summary_large_image')
  setMetaTag('meta[name="twitter:title"]', title)
  setMetaTag('meta[name="twitter:description"]', description)
  setMetaTag('meta[name="twitter:image"]', ogImage)

  // Update canonical link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = `${SITE_INFO.url}${postUrl}`
}

// Component
function BlogPostPage() {
  const { post, previous, next } = Route.useLoaderData()
  // console.log('Loaded post:', post)
  // Generate TOC in component (not serializable for loader)
  const toc = getTableOfContents(post.content)

  // Update meta tags when post changes
  useEffect(() => {
    updateMetaTags(post)
  }, [post])

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(post)).replace(/</g, '\\u003c'),
        }}
      />

      <PostKeyboardShortcuts basePath="/blog" previous={previous} next={next} />
      <div className="mx-auto border-x border-edge md:max-w-3xl">
        <div
          className={cn(
            "h-8 px-2",
            "screen-line-after",
            "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
            "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
          )}
        />
        <div className="flex items-center justify-between p-2 pl-4">
          <Button
            className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
            variant="link"
            asChild
          >
            <Link to="/blog" search={{ q: '' }}>
              <ArrowLeftIcon />
              Blog
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            {/* <LLMCopyButtonWithViewOptions
              markdownUrl={`${getPostUrl(post)}.mdx`}
              isComponent={post.metadata.category === "components"}
            /> */}

            <PostShareMenu url={getPostUrl(post)} />

            {previous && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="icon-sm" asChild>
                    <Link to="/blog/$slug" params={{ slug: previous.slug }}>
                      <ArrowLeftIcon />
                      <span className="sr-only">Previous</span>
                    </Link>
                  </Button>
                </TooltipTrigger>

                <TooltipContent className="pr-2 pl-3">
                  <div className="flex items-center gap-3">
                    Previous Post
                    <KbdGroup>
                      <Kbd>
                        <ArrowLeftIcon />
                      </Kbd>
                    </KbdGroup>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}

            {next && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="icon-sm" asChild>
                    <Link to="/blog/$slug" params={{ slug: next.slug }}>
                      <span className="sr-only">Next</span>
                      <ArrowRightIcon />
                    </Link>
                  </Button>
                </TooltipTrigger>

                <TooltipContent className="pr-2 pl-3">
                  <div className="flex items-center gap-3">
                    Next Post
                    <KbdGroup>
                      <Kbd>
                        <ArrowRightIcon />
                      </Kbd>
                    </KbdGroup>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        <div className="screen-line-before screen-line-after">
          <div
            className={cn(
              "h-8",
              "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
              "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
            )}
          />
        </div>

        <Prose className="px-4">
          <h1 className="screen-line-after text-3xl font-semibold">
            {post.metadata.title}
          </h1>

          <p className="text-muted-foreground">{post.metadata.description}</p>

          <InlineTOC items={toc} />

          <div>
            {/* <MDX code={post.content} /> */}
            <BlogPostRenderer
              content={post.content}
              className='my-8'
            />
          </div>
        </Prose>

        <div className="screen-line-after h-4 w-full" />

        <div className="flex items-center justify-between p-2 pl-4">
          <Button
            className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
            variant="link"
            asChild
          >
            <Link to="/blog" search={{ q: '' }}>
              <ArrowLeftIcon />
              Blog
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            {previous && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="icon-sm" asChild>
                    <Link to="/blog/$slug" params={{ slug: previous.slug }}>
                      <ArrowLeftIcon />
                      <span className="sr-only">Previous</span>
                    </Link>
                  </Button>
                </TooltipTrigger>

                <TooltipContent className="pr-2 pl-3">
                  <div className="flex items-center gap-3">
                    Previous Post
                    <KbdGroup>
                      <Kbd>
                        <ArrowLeftIcon />
                      </Kbd>
                    </KbdGroup>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}

            {next && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="icon-sm" asChild>
                    <Link to="/blog/$slug" params={{ slug: next.slug }}>
                      <span className="sr-only">Next</span>
                      <ArrowRightIcon />
                    </Link>
                  </Button>
                </TooltipTrigger>

                <TooltipContent className="pr-2 pl-3">
                  <div className="flex items-center gap-3">
                    Next Post
                    <KbdGroup>
                      <Kbd>
                        <ArrowRightIcon />
                      </Kbd>
                    </KbdGroup>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      <AuthorFooter />
      <ScrollToTop />
    </>
  )
}