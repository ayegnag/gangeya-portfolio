import { BlogPostRenderer } from '@/components/blog-post-renderer' // adjust alias/path

import { createFileRoute, notFound, Link, rootRouteId } from '@tanstack/react-router'
import { getTableOfContents } from "fumadocs-core/content/toc"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import type { BlogPosting as PageSchema, WithContext } from "schema-dts"

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

  // Emit per-post title/description/OG/canonical into the prerendered <head>.
  // Previously these were set client-side in a useEffect, so the served HTML
  // carried the generic 'Gangeya' title until hydration — bad for SEO and for
  // readability classifiers (e.g. Chrome "Listen to this page").
  head: ({ loaderData }) => {
    const post = loaderData?.post
    if (!post) return {}

    const { title, description, image, createdAt, updatedAt } = post.metadata
    const postUrl = getPostUrl(post)
    const ogImage = image || `/og/simple?title=${encodeURIComponent(title)}`

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: `${SITE_INFO.url}${postUrl}` },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: ogImage },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: title },
        { property: 'article:published_time', content: new Date(createdAt).toISOString() },
        { property: 'article:modified_time', content: new Date(updatedAt).toISOString() },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
      ],
      links: [{ rel: 'canonical', href: `${SITE_INFO.url}${postUrl}` }],
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

// The route already renders the post title as an <h1> (below), but the markdown
// source repeats it as a `# Title` heading (often after a lead image), producing
// two identical <h1>s per page. Remove the FIRST level-1 ATX heading (`# ` — one
// hash then horizontal whitespace) wherever it appears, leaving a single
// canonical <h1>. The `m` flag anchors `^` to line starts; no `g` flag means
// only the first match is removed. Posts with no `# ` heading are untouched.
function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#[^\S\r\n]+.*(?:\r?\n)+/m, '')
}

// Component
function BlogPostPage() {
  const { post, previous, next } = Route.useLoaderData()
  // console.log('Loaded post:', post)
  const content = stripLeadingH1(post.content)
  // Generate TOC in component (not serializable for loader)
  const toc = getTableOfContents(content)

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

        <Prose className="px-4" asChild>
          <article>
            <h1 className="screen-line-after text-3xl font-semibold">
              {post.metadata.title}
            </h1>

            <p className="text-muted-foreground">{post.metadata.description}</p>

            <InlineTOC items={toc} />

            <div>
              {/* <MDX code={post.content} /> */}
              <BlogPostRenderer
                content={content}
                className='my-8'
              />
            </div>
          </article>
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