'use client';

import { useTheme } from '@/utils/ThemeProvider';
import { motion } from 'framer-motion';

export function ZellijBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden pointer-events-none">
      {/* Static background grid */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-16 p-8">
        {Array.from({ length: 24 }).map((_, index) => {
          // Create different types of Moroccan-inspired patterns
          return (
            <div key={index} className="relative">
              <svg 
                viewBox="0 0 100 100" 
                className={`w-full h-full ${isDark ? 'opacity-25' : 'opacity-20'}`}
              >
                {/* Base shape - octagon or star */}
                {index % 3 === 0 ? (
                  // Star pattern
                  <path
                    d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z"
                    fill={isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)'}
                    stroke={isDark ? '#3b82f6' : '#1e40af'}
                    strokeWidth="1"
                  />
                ) : index % 3 === 1 ? (
                  // Octagon
                  <polygon
                    points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30"
                    fill={isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(79, 70, 229, 0.1)'}
                    stroke={isDark ? '#8b5cf6' : '#4338ca'}
                    strokeWidth="1"
                  />
                ) : (
                  // Circle with geometric pattern
                  <>
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill={isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(6, 182, 212, 0.1)'}
                      stroke={isDark ? '#38bdf8' : '#0891b2'}
                      strokeWidth="1"
                    />
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <line 
                        key={i}
                        x1="50" 
                        y1="50" 
                        x2={50 + 40 * Math.cos(angle * Math.PI / 180)} 
                        y2={50 + 40 * Math.sin(angle * Math.PI / 180)}
                        stroke={isDark ? '#a5b4fc' : '#4f46e5'}
                        strokeWidth="0.75"
                      />
                    ))}
                  </>
                )}
                
                {/* Inner decoration - varies based on outer shape */}
                {index % 3 === 0 ? (
                  // Circle inside star
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="15" 
                    fill="none"
                    stroke={isDark ? '#22d3ee' : '#0891b2'} 
                    strokeWidth="1"
                  />
                ) : index % 3 === 1 ? (
                  // Star inside octagon
                  <path
                    d="M50 30 L55 45 L70 50 L55 55 L50 70 L45 55 L30 50 L45 45 Z"
                    fill={isDark ? 'rgba(224, 242, 254, 0.1)' : 'rgba(8, 145, 178, 0.1)'}
                    stroke={isDark ? '#e0f2fe' : '#0891b2'}
                    strokeWidth="0.5"
                  />
                ) : (
                  // Flower inside circle
                  <g>
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <path
                        key={i}
                        d={`M50 50 L${50 + 20 * Math.cos(angle * Math.PI / 180)} ${50 + 20 * Math.sin(angle * Math.PI / 180)} L${50 + 15 * Math.cos((angle + 30) * Math.PI / 180)} ${50 + 15 * Math.sin((angle + 30) * Math.PI / 180)} Z`}
                        fill={isDark ? 'rgba(196, 181, 253, 0.2)' : 'rgba(124, 58, 237, 0.1)'}
                        stroke={isDark ? '#c4b5fd' : '#7c3aed'}
                        strokeWidth="0.5"
                      />
                    ))}
                  </g>
                )}
                
                {/* Center element - common to all */}
                <circle
                  cx="50"
                  cy="50"
                  r="5"
                  fill={isDark ? (index % 2 === 0 ? '#f9a8d4' : '#a5b4fc') : (index % 2 === 0 ? '#ec4899' : '#6366f1')}
                  opacity="0.6"
                />
              </svg>
            </div>
          );
        })}
      </div>
      
      {/* Colored background gradient */}
      <div 
        className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10' 
            : 'bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5'
        }`}
      />
      
      {/* Animated floating elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, index) => {
          const size = Math.random() * 100 + 80; // Larger elements
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 30 + 30;
          
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                fill="none"
                className={isDark ? 'opacity-30' : 'opacity-20'}
              >
                {index % 2 === 0 ? (
                  // Large star
                  <path
                    d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z"
                    fill={isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(37, 99, 235, 0.1)'}
                    stroke={isDark ? '#3b82f6' : '#1e40af'}
                    strokeWidth="1"
                  />
                ) : (
                  // Flower pattern
                  <g>
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="30" 
                      fill={isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(79, 70, 229, 0.05)'}
                      stroke={isDark ? '#8b5cf6' : '#4338ca'}
                      strokeWidth="1"
                    />
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <path
                        key={i}
                        d={`M50 50 L${50 + 40 * Math.cos(angle * Math.PI / 180)} ${50 + 40 * Math.sin(angle * Math.PI / 180)} L${50 + 40 * Math.cos((angle + 30) * Math.PI / 180)} ${50 + 40 * Math.sin((angle + 30) * Math.PI / 180)} Z`}
                        fill={isDark ? 'rgba(196, 181, 253, 0.2)' : 'rgba(124, 58, 237, 0.1)'}
                        stroke={isDark ? '#c4b5fd' : '#7c3aed'}
                        strokeWidth="0.8"
                      />
                    ))}
                    <circle
                      cx="50"
                      cy="50"
                      r="10"
                      fill={isDark ? '#f9a8d4' : '#ec4899'}
                      opacity="0.6"
                    />
                  </g>
                )}
              </svg>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 