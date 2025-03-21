'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center space-y-4"
      >
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="text-zinc-400 text-lg">Loading...</p>
      </motion.div>
    </div>
  );
} 