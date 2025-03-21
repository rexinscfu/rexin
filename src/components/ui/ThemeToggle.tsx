'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '@/utils/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative h-16 w-16 p-1 rounded-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 border border-gray-300 dark:border-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-300"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-full h-full rounded-full overflow-visible">
        {/* Face background gradient */}
        <div 
          className={`absolute inset-0 transition-colors duration-300 rounded-full ${
            isDark 
              ? 'bg-gradient-to-b from-blue-900 to-blue-950' 
              : 'bg-gradient-to-b from-yellow-300 to-yellow-400'
          }`}
        />
        
        {/* Moroccan hat positioned directly over the face */}
        <Image 
          src="/images/hat.png" 
          alt="Moroccan Hat" 
          width={80} 
          height={60}
          className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 object-contain"
          priority
        />
        
        {/* Face features that change based on light/dark mode */}
        <div className="absolute inset-0 w-full h-full">
          {/* Eyes with eyebrows - moved down a bit to account for hat */}
          <motion.div 
            className="absolute w-full top-6 flex justify-center space-x-5"
            animate={{
              y: isDark ? 0 : -1
            }}
          >
            {/* Left eye with eyebrow */}
            <div className="relative flex flex-col items-center">
              <motion.div 
                className={`w-1.5 h-0.5 mb-1 rounded-full ${isDark ? 'bg-blue-300' : 'bg-gray-800'}`}
                animate={{
                  width: isDark ? 4 : 5,
                  height: isDark ? 1 : 1.5,
                  rotate: isDark ? -10 : 0
                }}
              />
              <motion.div 
                className={`rounded-full ${isDark ? 'bg-blue-300' : 'bg-gray-800'}`}
                animate={{
                  height: isDark ? 5 : 6,
                  width: isDark ? 4 : 5
                }}
              />
            </div>
            
            {/* Right eye with eyebrow */}
            <div className="relative flex flex-col items-center">
              <motion.div 
                className={`w-1.5 h-0.5 mb-1 rounded-full ${isDark ? 'bg-blue-300' : 'bg-gray-800'}`}
                animate={{
                  width: isDark ? 4 : 5,
                  height: isDark ? 1 : 1.5,
                  rotate: isDark ? 10 : 0
                }}
              />
              <motion.div 
                className={`rounded-full ${isDark ? 'bg-blue-300' : 'bg-gray-800'}`}
                animate={{
                  height: isDark ? 5 : 6,
                  width: isDark ? 4 : 5
                }}
              />
            </div>
          </motion.div>
          
          {/* Nose */}
          <motion.div
            className="absolute w-full flex justify-center"
            style={{ top: '58%' }}
          >
            <motion.div
              className={`rounded-full ${isDark ? 'bg-blue-300/70' : 'bg-gray-800/70'}`}
              animate={{
                height: 3,
                width: 3
              }}
            />
          </motion.div>
          
          {/* Mouth */}
          <motion.div 
            className="absolute w-full flex justify-center"
            style={{ top: '70%' }}
            animate={{
              y: isDark ? -1 : 0
            }}
          >
            <motion.div 
              className={`rounded-full ${isDark ? 'bg-blue-300' : 'bg-gray-800'}`} 
              animate={{
                width: isDark ? 8 : 16,
                height: isDark ? 3 : 5,
                borderRadius: isDark ? '9999px' : '9999px 9999px 0 0'
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
        
        {/* Stars visible only in dark mode */}
        {isDark && (
          <>
            <motion.div
              className="absolute top-1 right-1"
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24">
                <path d="M12 2L9.2 8.6L2 9.2L7 14.2L5.8 22L12 18.6L18.2 22L17 14.2L22 9.2L14.8 8.6L12 2Z" fill="white" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute bottom-2 left-2"
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24">
                <path d="M12 2L9.2 8.6L2 9.2L7 14.2L5.8 22L12 18.6L18.2 22L17 14.2L22 9.2L14.8 8.6L12 2Z" fill="white" />
              </svg>
            </motion.div>
          </>
        )}
        
        {/* Sun rays visible only in light mode */}
        {!isDark && (
          <motion.div
            className="absolute right-0 left-0 top-0 bottom-0 flex items-center justify-center z-0"
            initial={false}
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg className="absolute w-full h-full" viewBox="0 0 40 40" fill="none">
              <path d="M20 5V2M20 38V35M5 20H2M38 20H35M32 32L30 30M32 8L30 10M8 32L10 30M8 8L10 10" 
                    stroke="#FB923C" 
                    strokeWidth="1" 
                    strokeLinecap="round" 
                    strokeOpacity="0.5" />
            </svg>
          </motion.div>
        )}
      </div>
    </button>
  );
} 