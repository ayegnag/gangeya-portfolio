// src/components/BlogPostRenderer.tsx

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeExternalLinks from 'rehype-external-links'
import { cn } from '@/lib/utils' // your cn utility

// shadcn/ui components (import what you have)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Optional: your Heading component from shadcn/ui or custom
// If you don't have it, use simple h1-h6 with classes
import { Heading } from '@/components/ui/typography' // adjust path if needed

// Copy button component (simple version; expand as needed)
const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 rounded bg-muted p-1 text-xs hover:bg-muted/80"
      aria-label="Copy code"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

interface BlogPostRendererProps {
  content: string
  className?: string // optional extra classes
}

export const BlogPostRenderer: React.FC<BlogPostRendererProps> = ({
  content,
  className,
}) => {
  return (
    <div
      className={cn(
        // Core prose styling – matches most shadcn/MDX examples
        'prose prose-slate dark:prose-invert',
        'prose-headings:scroll-m-20 prose-headings:font-bold prose-headings:tracking-tight',
        'max-w-none', // full width, or remove for constrained
        'prose-lg', // larger text, adjust to prose-base / prose-xl
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          [rehypeExternalLinks, { target: '_blank', rel: 'noopener noreferrer' }],
        ]}
        components={{
          // Headings – match shadcn/ui Heading component or use classes
          h1: (props) => <Heading as="h1" className="scroll-m-20 text-4xl" {...props} />,
          h2: (props) => (
            <Heading
              as="h2"
              className="scroll-m-20 border-b pb-2 text-3xl first:mt-0"
              {...props}
            />
          ),
          h3: (props) => <Heading as="h3" className="scroll-m-20 text-2xl" {...props} />,
          h4: (props) => <Heading as="h4" className="scroll-m-20 text-xl" {...props} />,
          // Tables – full shadcn/ui Table
          table: (props) => (
            <div className="my-6 w-full overflow-y-auto">
              <Table {...props} />
            </div>
          ),
          thead: TableHeader,
          tbody: TableBody,
          tr: TableRow,
          th: TableHead,
          td: TableCell,

          // Code blocks – add copy button + styling
          pre: ({ children, ...props }) => {
            const codeEl = React.Children.only(children) as React.ReactElement<{ children: string }>
            const codeString = String(codeEl.props.children).replace(/\n$/, '')

            return (
              <div className="group relative my-4">
                <pre className="overflow-x-auto rounded-lg bg-muted p-4" {...props}>
                  {children}
                </pre>
                <CopyButton value={codeString} />
              </div>
            )
          },

          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <code className={cn(className, 'text-sm')} {...props}>
                {children}
              </code>
            ) : (
              <code
                className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
                {...props}
              >
                {children}
              </code>
            )
          },

          // Images – keep your resolver
          img: ({ src, alt, ...props }) => {
            let finalSrc = src ?? ''
            if (finalSrc && !finalSrc.startsWith('http') && !finalSrc.startsWith('/')) {
              finalSrc = `/images/blog/${finalSrc.replace(/^\.\//, '')}`
            }
            return <img src={finalSrc} alt={alt} className="rounded-lg" {...props} />
          },

          // Add more overrides as needed (blockquote, ul/ol, etc.)
          blockquote: (props) => (
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}