'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { FolderIcon } from '@heroicons/react/24/outline';

// GitHub repository type
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
  updated_at: string;
};

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const projectsRef = useRef(null);
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    async function fetchRepositories() {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/rexinscfu/repos?sort=updated&per_page=100');
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data: Repository[] = await response.json();
        
        // Filter out forked repositories and sort by updated date
        const filteredRepos = data
          .filter(repo => !repo.fork && !repo.name.includes('.github.io'))
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 6); // Limit to 6 projects
        
        setRepos(filteredRepos);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching repositories:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub repositories');
        setLoading(false);
      }
    }

    fetchRepositories();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-16 h-16">
            <motion.div
              className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-zinc-400 text-lg">Loading projects...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-lg text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-500">Error Loading Projects</h2>
          <p className="text-zinc-400">{error}</p>
          <p className="text-zinc-400">
            Please try again later or visit my{' '}
            <a 
              href="https://github.com/rexinscfu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              GitHub profile
            </a>{' '}
            directly.
          </p>
        </div>
      </div>
    );
  }

  // Render empty state
  if (repos.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-lg text-center space-y-4">
          <FolderIcon className="h-16 w-16 mx-auto text-zinc-600" />
          <h2 className="text-2xl font-bold text-white">No Projects Found</h2>
          <p className="text-zinc-400">
            Couldn't find any public repositories. Please visit my{' '}
            <a 
              href="https://github.com/rexinscfu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              GitHub profile
            </a>{' '}
            to see all my work.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 space-y-20">
      <SectionHeading 
        title="My Projects" 
        description="A collection of my open source projects, focusing on firmware development, hardware interfaces, and electronic tools."
      />

      <section ref={projectsRef} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <ProjectCard repository={repo} />
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-10">
          <a 
            href="https://github.com/rexinscfu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
          >
            View All Projects
          </a>
        </div>
      </section>
    </div>
  );
} 