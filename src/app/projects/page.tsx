'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';

// Manually defined repositories based on github.com/rexinscfu
const repositories = [
  {
    id: 1,
    name: 'rexus',
    description: 'A minimalist, high-performance kernel for embedded systems and DIY OS projects.',
    html_url: 'https://github.com/rexinscfu/rexus',
    homepage: null,
    topics: ['embedded-systems', 'operating-system', 'os-dev', 'low-level-programming', 'hardware-abstraction', 'kernel-development', 'firmware-engineering'],
    language: 'C',
    stargazers_count: 1,
    forks_count: 0,
    license: { name: 'GNU General Public License v3.0' }
  },
  {
    id: 2,
    name: 'syscall_interceptor',
    description: 'Low-level system call interceptor for debugging and security analysis',
    html_url: 'https://github.com/rexinscfu/syscall_interceptor',
    homepage: null,
    topics: ['system-calls', 'security', 'debugging'],
    language: 'Assembly',
    stargazers_count: 2,
    forks_count: 0,
    license: { name: 'MIT License' }
  },
  {
    id: 3,
    name: 'rexinengine',
    description: 'Modern Vulkan-based game engine with a focus on high performance and extensibility.',
    html_url: 'https://github.com/rexinscfu/rexinengine',
    homepage: null,
    topics: ['game-engine', 'vulkan', 'graphics', 'rendering'],
    language: 'C++',
    stargazers_count: 3,
    forks_count: 0
  },
  {
    id: 4,
    name: 'Wi-Fi-6E-7',
    description: 'High-performance Linux kernel driver for next-generation Wi-Fi 6E/7 devices with advanced features including MLO (Multi-Link Operation), 320MHz channels, and 4K QAM support.',
    html_url: 'https://github.com/rexinscfu/Wi-Fi-6E-7',
    homepage: null,
    topics: ['linux', 'driver', 'kernel-driver', 'kernel-modules', 'kernel-source', 'wifi6e'],
    language: 'C',
    stargazers_count: 14,
    forks_count: 1,
    license: { name: 'MIT License' }
  },
  {
    id: 5,
    name: 'ATmega128_Firmware',
    description: 'Rust-based firmware for the MikroElektronika BigAVR2 development board featuring the ATmega128 microcontroller.',
    html_url: 'https://github.com/rexinscfu/ATmega128_Firmware',
    homepage: null,
    topics: ['rust', 'embedded-systems', 'atmega'],
    language: 'Rust',
    stargazers_count: 4,
    forks_count: 0,
    license: { name: 'MIT License' }
  },
  {
    id: 6,
    name: 'cant',
    description: 'A specialized programming language and runtime system for automotive diagnostics and therapeutic operations.',
    html_url: 'https://github.com/rexinscfu/cant',
    homepage: null,
    topics: ['programming-language', 'automotive', 'diagnostics'],
    language: 'C',
    stargazers_count: 3,
    forks_count: 0
  }
];

export default function ProjectsPage() {
  const projectsRef = useRef(null);
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });

  return (
    <div className="py-16 space-y-20">
      <SectionHeading 
        title="My Projects" 
        description="A collection of my open source projects, focusing on firmware development, hardware interfaces, and electronic tools."
      />

      <section ref={projectsRef} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repositories.map((repo, index) => (
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