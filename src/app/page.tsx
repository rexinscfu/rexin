'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          Firmware Engineer & Hardware Creator
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
          Crafting elegant solutions at the intersection of hardware and software.
          Specializing in firmware development, low-level programming, and electronic repair.
        </p>
      </motion.div>
    </section>
  );
}
