import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, Tag } from 'lucide-react';
import { getAllPostSlugs, getPostBySlug } from '@/lib/mdx';
import { slugify } from '@/lib/utils/slugify';
import MDXContent from '@/components/ui/MDXContent';
import Image from 'next/image';
import { formatDistance } from 'date-fns';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
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

  const datePublished = new Date(post.date);
  const timeAgo = formatDistance(datePublished, new Date(), { addSuffix: true });

  // Slugify the category for the link
  const categorySlug = slugify(post.category);

  return (
    <main className="container px-4 py-12 mx-auto max-w-4xl">
      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors">
          <span>← Back to all posts</span>
        </Link>
      </div>
      
      <article className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <header className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="mb-2">
            <Link 
              href={`/blog/category/${categorySlug}`}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
            >
              {post.category}
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <time dateTime={post.date} title={post.formattedDate}>
                {post.formattedDate} ({timeAgo})
              </time>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{post.readingTime}</span>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex-shrink-0 h-8 w-8 relative overflow-hidden rounded-full">
              <Image
                src={post.author.image}
                alt={post.author.name}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="ml-2 text-sm">
              <p className="font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </p>
            </div>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              {post.tags.map((tag: string) => (
                <Link 
                  key={tag}
                  href={`/blog/tag/${slugify(tag)}`}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>
        
        <div className="p-6">
          <MDXContent content={post.content} />
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <footer className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags:</span>
              {post.tags.map((tag: string) => (
                <Link 
                  key={tag}
                  href={`/blog/tag/${slugify(tag)}`}
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </footer>
        )}
      </article>
    </main>
  );
} 