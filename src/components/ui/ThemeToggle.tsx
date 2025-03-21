'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/utils/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative h-12 w-12 p-2 rounded-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 border border-gray-300 dark:border-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-300"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-full h-full rounded-full overflow-hidden">
        {/* Face background gradient */}
        <div 
          className={`absolute inset-0 transition-colors duration-300 rounded-full ${
            isDark 
              ? 'bg-gradient-to-b from-blue-900 to-blue-950' 
              : 'bg-gradient-to-b from-yellow-300 to-yellow-400'
          }`}
        />
        
        {/* Face features that change based on light/dark mode */}
        <div className="absolute inset-0 w-full h-full">
          {/* Eyes */}
          <motion.div 
            className="absolute w-full top-5 flex justify-center space-x-3"
            animate={{
              y: isDark ? 0 : -1
            }}
          >
            {/* Left eye */}
            <motion.div 
              className={`w-1.5 h-${isDark ? '1' : '1.5'} rounded-full ${isDark ? 'bg-blue-300' : 'bg-gray-800'}`}
              animate={{
                height: isDark ? 3 : 4,
                width: isDark ? 2 : 3
              }}
            />
            {/* Right eye */}
            <motion.div 
              className={`w-1.5 h-${isDark ? '1' : '1.5'} rounded-full ${isDark ? 'bg-blue-300' : 'bg-gray-800'}`}
              animate={{
                height: isDark ? 3 : 4,
                width: isDark ? 2 : 3
              }}
            />
          </motion.div>
          
          {/* Mouth */}
          <motion.div 
            className="absolute w-full flex justify-center"
            style={{ top: '60%' }}
            animate={{
              y: isDark ? -1 : 0
            }}
          >
            <motion.div 
              className={`h-1 rounded-full ${isDark ? 'bg-blue-300' : 'bg-gray-800'}`} 
              animate={{
                width: isDark ? 6 : 10,
                height: isDark ? 2 : 3
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
        
        {/* Moroccan hat (Fez) - larger and more detailed */}
        <motion.div
          className="absolute -top-6 left-0 w-full"
          initial={false}
          animate={{
            y: isDark ? 0 : -1,
            rotateZ: isDark ? -5 : 5
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 20 
          }}
        >
          {/* The Fez hat SVG */}
          <svg 
            viewBox="0 0 60 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            {/* Hat base */}
            <path 
              d="M15 25C15 20 22 10 30 10C38 10 45 20 45 25H15Z" 
              fill={isDark ? "#991B1B" : "#C2410C"} 
              stroke={isDark ? "#7F1D1D" : "#9A3412"} 
              strokeWidth="1"
            />
            
            {/* Hat band */}
            <rect 
              x="15" 
              y="25" 
              width="30" 
              height="3" 
              fill={isDark ? "#1E40AF" : "#0C4A6E"} 
              stroke={isDark ? "#1E3A8A" : "#0E7490"} 
              strokeWidth="0.5"
            />
            
            {/* Decorative pattern on hat */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <circle cx="22" cy="18" r="1" fill={isDark ? "#60A5FA" : "#FACC15"} />
              <circle cx="30" cy="15" r="1" fill={isDark ? "#60A5FA" : "#FACC15"} />
              <circle cx="38" cy="18" r="1" fill={isDark ? "#60A5FA" : "#FACC15"} />
              <path 
                d="M22 18C24 16 27 15 30 15C33 15 36 16 38 18" 
                stroke={isDark ? "#60A5FA" : "#FACC15"} 
                strokeWidth="0.5" 
                strokeDasharray="1 1" 
              />
            </motion.g>

            {/* Tassel animated */}
            <motion.g
              animate={{
                y: [0, -1, 0],
                x: isDark ? [-0.5, 0.5, -0.5] : [0.5, -0.5, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <path 
                d="M30 10L30 5M30 5L28 2M30 5L32 2" 
                stroke={isDark ? "#60A5FA" : "#FACC15"} 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
            </motion.g>
          </svg>
        </motion.div>
        
        {/* Stars visible only in dark mode */}
        {isDark && (
          <>
            <motion.div
              className="absolute top-0 right-0"
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
              className="absolute bottom-1 left-1"
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24">
                <path d="M12 2L9.2 8.6L2 9.2L7 14.2L5.8 22L12 18.6L18.2 22L17 14.2L22 9.2L14.8 8.6L12 2Z" fill="white" />
              </svg>
            </motion.div>
          </>
        )}
        
        {/* Sun rays visible only in light mode */}
        {!isDark && (
          <>
            <motion.div
              className="absolute -top-1 right-0"
              animate={{
                rotate: 360
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" fill="#FB923C" />
                <path d="M12 4V2M12 22V20M4 12H2M22 12H20M19.8 19.8L18.4 18.4M19.8 4.2L18.4 5.6M4.2 19.8L5.6 18.4M4.2 4.2L5.6 5.6" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </>
        )}
      </div>
    </button>
  );
} 