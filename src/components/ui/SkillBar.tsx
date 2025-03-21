'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface SkillBarProps {
  name: string;
  level: number;
  index?: number;
  inView: boolean;
  colorClass?: string;
}

export function SkillBar({
  name,
  level,
  index = 0,
  inView,
  colorClass = 'bg-gradient-to-r from-blue-500 to-cyan-500'
}: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-zinc-300">{name}</span>
        <span className="text-zinc-500">{level}%</span>
      </div>
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          className={cn('h-full', colorClass)}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.1 * index }}
        />
      </div>
    </div>
  );
} 