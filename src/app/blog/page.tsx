import type { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FeaturedPosts } from '@/components/ui/FeaturedPosts';
import { BlogGrid } from '@/components/ui/BlogGrid';
import BlogCategories from '@/components/ui/BlogCategories';
import { getAllPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Blog | Rexin',
  description: 'Explore our latest articles on firmware development, hardware design, and electronics.',
};

export const revalidate = 3600; // revalidate every hour

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const featuredPosts = allPosts.filter(post => post.featured);
  
  return (
    <div className="container py-12">
      <SectionHeading
        title="Blog"
        description="Explore our latest articles on firmware development, hardware design, and electronics."
      />
      
      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <FeaturedPosts posts={featuredPosts} />
        </div>
      )}
      
      <BlogCategories />
      
      <BlogGrid posts={allPosts} />
    </div>
  );
} 