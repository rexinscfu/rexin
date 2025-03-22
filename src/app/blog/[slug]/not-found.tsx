'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PostNotFound() {
  return (
    <div className="container py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-xl"></div>
          </div>
          <div className="relative">
            <svg 
              className="h-24 w-24 mx-auto text-blue-500" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" 
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-white mb-4">
          Blog Post Not Found
        </h1>
        
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          The article you're looking for doesn't exist or may have been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-300"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Browse All Articles
          </Link>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-300"
          >
            Go to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 