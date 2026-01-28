export interface BlogPost {
  slug: string;
  metadata: PostMetadata;
  content: string;  // Raw Markdown content
}

export interface BlogPostRendererProps {
  content: string;
  basePath?: string;  // For resolving relative images
}

export interface BlogSummary {
  slug: string;
  metadata: PostMetadata;
  readingTime: { minutes: number; words: number; images?: number; };
}

export type PostMetadata = {
  title: string;
  description: string;
  /**
   * Social/OG image URL for the post.
   * Use an absolute URL or a path under /public. Recommended size: 1200x630.
   */
  image?: string;
  /**
   * Category identifier/slug used for filtering (see getPostsByCategory).
   */
  category?: string;
  /**
   * Custom icon name or a Lucide icon name.
   * Used to visually represent the post in lists or navigation.
   */
  icon?: string;
  /**
   * Flag to show a "New" badge/highlight in the UI.
   */
  new?: boolean;
  /**
   * Flag to pin the post to the top of the list.
   */
  pinned?: boolean;
  /**
   * Post creation date as an ISO date string (e.g. YYYY-MM-DD). Used for sorting.
   */
  createdAt: string;
  /**
   * Last updated date as an ISO date string (e.g. YYYY-MM-DD).
   */
  updatedAt: string;
};

export type Post = {
  /** Parsed metadata metadata from the MDX file. */
  metadata: PostMetadata;
  /** Slug derived from the MDX filename (without extension). */
  slug: string;
  /** MDX content body without metadata. */
  content: string;
};
