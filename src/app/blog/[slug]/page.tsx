import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarIcon, ClockIcon, TagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getAllPostSlugs, getPostBySlug, getAllPosts } from '@/lib/mdx';
import { BlogCard } from '@/components/ui/BlogCard';
import { slugify } from '@/utils/slugify';
import MDXContent from '@/components/ui/MDXContent';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist'
    };
  }
  
  return {
    title: `${post.title} - Rexin Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export const revalidate = 3600; // revalidate every hour

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Slugify the category for the link
  const categorySlug = slugify(post.category);

  return (
    <div className="py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Back to blog link */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            <span>Back to all posts</span>
          </Link>
        </div>
        
        <article>
          {/* Post Header */}
          <header className="mb-10">
            {/* Category */}
            <Link 
              href={`/blog/category/${categorySlug}`}
              className="inline-flex items-center bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full text-sm mb-4"
            >
              <TagIcon className="w-4 h-4 mr-1" />
              {post.category}
            </Link>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-800 dark:text-white mb-4">
              {post.title}
            </h1>
            
            {/* Meta info */}
            <div className="flex items-center gap-x-6 text-sm text-zinc-600 dark:text-zinc-400 mb-8">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>{post.formattedDate}</span>
              </div>
              
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </header>
          
          {/* Post Content */}
          <div className="blog-content text-zinc-800 dark:text-zinc-200">
            <MDXContent content={post.content} />
          </div>
          
          {/* Author bio with image */}
          <div className="border-t border-gray-200 dark:border-zinc-800 py-8 mt-12 mb-12">
            <div className="flex items-center gap-4">
              <img 
                src={post.author.image}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
                width={48}
                height={48}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-2">
                  Written by {post.author.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Firmware developer and hardware creator with a passion for low-level programming and electronic repairs.
                </p>
              </div>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-gray-200 dark:border-zinc-800 pt-12">
              <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} index={index} />
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
} 