'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { BlogCard } from './BlogCard';
import type { PostMeta } from '@/lib/mdx';

interface FeaturedPostsProps {
  posts: PostMeta[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;
  
  // Display up to 3 featured posts
  const displayPosts = posts.slice(0, 3);
  
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-zinc-800 dark:text-white"
        >
          Featured Articles
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            <span>View all</span>
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </motion.div>
      </div>
      
      {displayPosts.length === 1 ? (
        <BlogCard post={displayPosts[0]} featured={true} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} featured={true} />
          ))}
        </div>
      )}
    </div>
  );
} 