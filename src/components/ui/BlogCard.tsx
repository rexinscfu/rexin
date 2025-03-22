'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, TagIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { slugify } from '@/utils/slugify';
import type { PostMeta } from '@/lib/mdx';

interface BlogCardProps {
  post: PostMeta;
  index?: number;
  featured?: boolean;
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  const categorySlug = slugify(post.category);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group relative overflow-hidden bg-white/90 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col ${featured ? 'shadow-lg' : 'hover:shadow-lg'}`}
    >
      {/* Card Top Accent */}
      <div 
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      />

      <div className="p-6 flex flex-col h-full relative">
        {/* Category Badge */}
        <Link href={`/blog/category/${categorySlug}`} className="z-10 relative">
          <div className="flex items-center space-x-1 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs px-3 py-1.5 rounded-full w-fit mb-4 transition-colors duration-300 hover:bg-blue-500/20 dark:hover:bg-blue-500/30">
            <TagIcon className="w-3 h-3" />
            <span className="font-medium">{post.category}</span>
          </div>
        </Link>
        
        {/* Title and Excerpt */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {post.title}
          </h3>
          
          <p className="text-zinc-600 dark:text-zinc-400 mb-5 text-sm line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        
        {/* Metadata and Read More */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
            <div className="flex items-center">
              <CalendarIcon className="w-3.5 h-3.5 mr-1" />
              <span>{post.formattedDate}</span>
            </div>
            
            <div className="flex items-center">
              <ClockIcon className="w-3.5 h-3.5 mr-1" />
              <span>{post.readingTime}</span>
            </div>
          </div>
          
          <div className="text-sm text-blue-600 dark:text-blue-400 flex items-center font-medium transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
            Read Article
            <ArrowRightIcon className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>
      </div>
      
      {/* Full link overlay */}
      <Link href={`/blog/${post.slug}`} className="absolute inset-0" aria-label={post.title} />
    </motion.div>
  );
} 