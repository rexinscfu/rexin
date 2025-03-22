import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BlogGrid } from '@/components/ui/BlogGrid';
import BlogCategories from '@/components/ui/BlogCategories';
import { getAllPosts } from '@/lib/mdx';
import { getCategoryBySlug, blogCategories } from '@/config/blog';
import { slugify } from '@/utils/slugify';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The requested blog category could not be found.',
    };
  }

  return {
    title: `${category.name} | Blog`,
    description: category.description,
  };
}

export async function generateStaticParams() {
  // Generate paths for all predefined categories
  return blogCategories.map(category => ({
    category: category.slug,
  }));
}

export const revalidate = 3600; // Revalidate every hour

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Check if the category exists
  const category = getCategoryBySlug(params.category);
  if (!category) {
    notFound();
  }
  
  // Get all posts and filter by category
  const allPosts = await getAllPosts();
  const categoryPosts = allPosts.filter(post => {
    const postCategorySlug = slugify(post.category);
    return postCategorySlug === category.slug;
  });

  return (
    <div className="container py-12">
      <SectionHeading
        title={category.name}
        description={category.description}
      />

      <BlogCategories currentCategory={params.category} />

      <BlogGrid posts={categoryPosts} />
    </div>
  );
} 