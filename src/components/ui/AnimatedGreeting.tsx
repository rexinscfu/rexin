'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedGreetingProps {
  text?: string;
}

export function AnimatedGreeting({ text = "Hello World!" }: AnimatedGreetingProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const letters = text.split('');

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  // Letter animation
  const letterVariants = {
    hidden: { y: 50, opacity: 0, rotate: -10 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="py-10 flex items-center justify-center">
      <motion.div 
        className="relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Gradient background */}
        <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl rounded-full" />
        
        {/* Animated text */}
        <div className="flex relative">
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              variants={letterVariants}
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
      </motion.div>
    </div>
  );
} 