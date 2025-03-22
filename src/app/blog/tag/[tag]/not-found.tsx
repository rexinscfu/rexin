'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function TagNotFound() {
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
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-white mb-4">
          Tag Not Found
        </h1>
        
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          The blog tag you're looking for doesn't exist or doesn't have any articles yet.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-300"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Blog
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