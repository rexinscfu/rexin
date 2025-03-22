'use client';

import { motion } from 'framer-motion';
import { 
  CodeBracketIcon, 
  CpuChipIcon, 
  ServerIcon, 
  CommandLineIcon, 
  CircleStackIcon,
  CubeIcon
} from '@heroicons/react/24/outline';

interface FloatingIconProps {
  Icon: any;
  delay: number;
  x: number;
  y: number;
}

function FloatingIcon({ Icon, delay, x, y }: FloatingIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 0.8, 1],
        y: [0, -15, 0, -10, 0],
        x: [0, x/2, x, x/2, 0]
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="absolute"
    >
      <Icon className="w-8 h-8 text-blue-500/60 dark:text-blue-400/60" />
    </motion.div>
  );
}

export function FloatingIcons() {
  return (
    <div className="relative h-40 w-full my-10">
      <FloatingIcon Icon={CodeBracketIcon} delay={0} x={20} y={-20} />
      <FloatingIcon Icon={CpuChipIcon} delay={1.5} x={-30} y={-10} />
      <FloatingIcon Icon={ServerIcon} delay={3} x={40} y={-30} />
      <FloatingIcon Icon={CommandLineIcon} delay={2} x={-50} y={-15} />
      <FloatingIcon Icon={CircleStackIcon} delay={2.5} x={30} y={-25} />
      <FloatingIcon Icon={CubeIcon} delay={4} x={-20} y={-20} />
    </div>
  );
} 