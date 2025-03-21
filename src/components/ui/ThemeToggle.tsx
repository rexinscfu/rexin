'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/utils/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-zinc-800/50 dark:bg-zinc-800/50 border border-zinc-700/50 dark:border-zinc-700/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-10 h-5 bg-zinc-700 dark:bg-zinc-600 rounded-full overflow-hidden transition-colors duration-300">
        {/* Background gradient for toggle */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${
            isDark 
              ? 'opacity-100 bg-gradient-to-r from-blue-900/30 to-blue-600/30' 
              : 'opacity-100 bg-gradient-to-r from-orange-400/30 to-yellow-300/30'
          }`}
        />
        
        {/* Toggle circle with Moroccan Hat (Fez) */}
        <motion.div
          className="absolute top-0.5 w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300"
          initial={false}
          animate={{
            x: isDark ? 'calc(100% + 0.5rem - 1rem)' : '0.25rem',
            backgroundColor: isDark ? '#3B82F6' : '#FB923C',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {/* Fez Hat SVG that changes orientation based on theme */}
          <svg
            viewBox="0 0 24 24"
            className={`w-5 h-5 absolute transition-transform duration-500 ${
              isDark 
                ? '-rotate-12 -translate-y-1/4 translate-x-0' 
                : 'rotate-12 -translate-y-1/4 -translate-x-0'
            }`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fez Hat for Light Mode */}
            {!isDark && (
              <>
                {/* Base of the Fez */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  d="M12 5.5C8.5 5.5 7 9 7 11.5H17C17 9 15.5 5.5 12 5.5Z"
                  fill="#C2410C"
                />
                {/* Band of the Fez */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  d="M7 11.5C7 11.5 7 13 7.5 13H16.5C17 13 17 11.5 17 11.5H7Z"
                  fill="#0C4A6E"
                />
                {/* Tassel of the Fez */}
                <motion.path
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  d="M12 5.5L12 3M12 3L11 2M12 3L13 2"
                  stroke="#FACC15"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                {/* Decorative accent */}
                <motion.circle
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  cx="12"
                  cy="12"
                  r="0.5"
                  fill="#FACC15"
                />
              </>
            )}
            
            {/* Fez Hat for Dark Mode */}
            {isDark && (
              <>
                {/* Base of the Fez */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  d="M12 5.5C8.5 5.5 7 9 7 11.5H17C17 9 15.5 5.5 12 5.5Z"
                  fill="#991B1B"
                />
                {/* Band of the Fez */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  d="M7 11.5C7 11.5 7 13 7.5 13H16.5C17 13 17 11.5 17 11.5H7Z"
                  fill="#1E40AF"
                />
                {/* Tassel of the Fez */}
                <motion.path
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  d="M12 5.5L12 3M12 3L11 2M12 3L13 2"
                  stroke="#60A5FA"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                {/* Decorative accent */}
                <motion.circle
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  cx="12"
                  cy="12"
                  r="0.5"
                  fill="#60A5FA"
                />
              </>
            )}
            
            {/* Stars visible only in dark mode */}
            {isDark && (
              <>
                <motion.circle
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                  cx="19"
                  cy="8"
                  r="0.5"
                  fill="white"
                />
                <motion.circle
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  cx="17"
                  cy="6"
                  r="0.3"
                  fill="white"
                />
              </>
            )}
            
            {/* Sun rays visible only in light mode */}
            {!isDark && (
              <>
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  d="M19 11L21 11"
                  stroke="#FACC15"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  d="M18 8L20 6"
                  stroke="#FACC15"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </motion.div>
      </div>
    </button>
  );
} 