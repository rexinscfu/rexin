'use client';

import { motion } from 'framer-motion';
import { StarIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';

// Repository type from GitHub API
type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
};

// Language colors for visual identification
const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-500',
  Python: 'bg-green-500',
  'C++': 'bg-purple-500',
  C: 'bg-gray-500',
  'C#': 'bg-green-600',
  HTML: 'bg-orange-500',
  CSS: 'bg-blue-400',
  Rust: 'bg-orange-600',
  Go: 'bg-cyan-500',
  Ruby: 'bg-red-500',
  Java: 'bg-red-600',
  Swift: 'bg-orange-400',
  Kotlin: 'bg-purple-400',
  Shell: 'bg-green-400',
  PHP: 'bg-indigo-500',
  Dart: 'bg-blue-300',
  Assembly: 'bg-gray-600',
};

interface ProjectCardProps {
  repository: Repository;
  className?: string;
}

export function ProjectCard({ repository, className }: ProjectCardProps) {
  // Format repository name for display (remove dashes, capitalize)
  const formattedName = repository.name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
  
  // Get language color or default
  const languageColor = repository.language 
    ? languageColors[repository.language] || 'bg-gray-500'
    : 'bg-gray-500';
    
  return (
    <div 
      className={cn(
        "bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <CodeBracketIcon className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-white truncate">{formattedName}</h3>
        </div>
        <motion.a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowTopRightOnSquareIcon className="h-5 w-5" />
        </motion.a>
      </div>
      
      <p className="text-zinc-400 mb-4 flex-grow line-clamp-3">
        {repository.description || `A project named ${formattedName}.`}
      </p>
      
      <div className="space-y-4 mt-auto">
        {repository.topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {repository.topics.slice(0, 3).map((topic) => (
              <span 
                key={topic} 
                className="px-2 py-1 bg-zinc-800 text-xs rounded-full text-zinc-300"
              >
                {topic}
              </span>
            ))}
            {repository.topics.length > 3 && (
              <span className="px-2 py-1 bg-zinc-800 text-xs rounded-full text-zinc-300">
                +{repository.topics.length - 3}
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm">
          {repository.language && (
            <div className="flex items-center">
              <span className={cn("h-3 w-3 rounded-full mr-1", languageColor)}></span>
              <span className="text-zinc-400">{repository.language}</span>
            </div>
          )}
          
          {repository.stargazers_count > 0 && (
            <div className="flex items-center text-zinc-400">
              <StarIcon className="h-4 w-4 mr-1" />
              <span>{repository.stargazers_count}</span>
            </div>
          )}
          
          {repository.homepage && (
            <a
              href={repository.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-xs"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 