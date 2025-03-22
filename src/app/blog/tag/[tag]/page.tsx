import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BlogGrid } from '@/components/ui/BlogGrid';
import { Tag as TagIcon } from 'lucide-react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { slugify } from '@/utils/slugify';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = params.tag;
  const decodedTag = decodeURIComponent(tag.replace(/-/g, ' '));
  
  return {
    title: `#${decodedTag} | Blog`,
    description: `Browse all articles tagged with #${decodedTag}`,
  };
}

export async function generateStaticParams() {
  // We could pre-render all tags here, but for simplicity, we'll allow dynamic generation
  return [];
}

export const revalidate = 3600; // Revalidate every hour

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag.replace(/-/g, ' '));
  
  // Get all posts and filter by tag
  const allPosts = await getAllPosts();
  const tagPosts = allPosts.filter(post => 
    post.tags?.some(t => slugify(t) === slugify(decodedTag))
  );

  if (tagPosts.length === 0) {
    notFound();
  }

  return (
    <div className="container py-12">
      <SectionHeading
        title={`#${decodedTag}`}
        description={`Browse all articles tagged with #${decodedTag}`}
      />

      <div className="flex items-center mb-8">
        <Link 
          href="/blog" 
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          Back to all posts
        </Link>
      </div>

      <BlogGrid posts={tagPosts} />
    </div>
  );
} 