'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  gradient?: boolean;
  children?: ReactNode;
}

export function SectionHeading({
  title,
  description,
  className,
  align = 'center',
  gradient = true,
  children
}: SectionHeadingProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('space-y-4 mb-12', alignClasses[align], className)}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
        className={cn(
          'text-3xl md:text-4xl font-bold',
          gradient ? 'bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent' : 'text-white'
        )}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-zinc-400 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}
      
      {children}
    </div>
  );
} 