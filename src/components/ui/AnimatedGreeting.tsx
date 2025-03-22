'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedGreetingProps {
  text?: string;
}

export function AnimatedGreeting({ text = "Hello!" }: AnimatedGreetingProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const letters = text.split('');

  return (
    <div className="py-10 flex items-center justify-center">
      <div className="flex overflow-hidden">
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: index * 0.08,
            }}
            className="inline-block"
          >
            <span className={`
              text-5xl md:text-7xl font-bold mx-1
              ${letter === " " ? "mr-3" : ""}
              ${index % 3 === 0 ? "text-blue-500" : ""}
              ${index % 3 === 1 ? "text-cyan-400" : ""}
              ${index % 3 === 2 ? "text-indigo-500" : ""}
            `}>
              {letter}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 