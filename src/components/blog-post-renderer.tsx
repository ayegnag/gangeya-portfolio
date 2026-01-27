import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { BlogPostRendererProps } from '@/types/blog';

export const BlogPostRenderer: React.FC<BlogPostRendererProps> = ({ content, basePath = '' }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // Customize img to resolve relative paths (e.g., ./images/my-image.jpg → /blog/images/my-image.jpg)
        // img: ({ src, alt, ...props }) => {
        //   const resolvedSrc = src?.startsWith('http') ? src : `${basePath}${src}`;
        //   return <img src={resolvedSrc} alt={alt} {...props} style={{ maxWidth: '100%' }} />;
        // },
        img: ({ src, alt, title, ...props }) => {
          // Optional safety: if someone still uses relative path, you could prefix here
          // But with the rule above, src should already start with '/'
          let finalSrc = src ?? '';

          if (finalSrc && !finalSrc.startsWith('http') && !finalSrc.startsWith('/')) {
            // Fallback for old relative paths (you can remove this after migration)
            finalSrc = `/images/blogs/${finalSrc.replace(/^\.\//, '')}`;
          }

          return (
            <img
              src={finalSrc}
              alt={alt}
              title={title}
              {...props}
              loading="lazy"          // nice for perf
              decoding="async"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          );
        },
        // Add more custom components if needed (e.g., for code blocks, iframes)
        iframe: ({ src, width, height, ...props }) => (
          <iframe src={src} width={width} height={height} {...props} style={{ border: 'none' }} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};