'use client';

import { useTheme } from '@/utils/ThemeProvider';
import { motion } from 'framer-motion';

export function ZellijBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="opacity-[0.05]">
        <defs>
          <pattern id="zellijPattern" patternUnits="userSpaceOnUse" width="100" height="100">
            <rect width="100" height="100" fill={isDark ? '#1e293b' : '#f8fafc'} />
            
            {/* Moroccan Star */}
            <path 
              d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" 
              fill="none"
              stroke={isDark ? '#3b82f6' : '#0369a1'} 
              strokeWidth="1.5" 
            />
            
            {/* Center Circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="10" 
              fill="none" 
              stroke={isDark ? '#38bdf8' : '#0ea5e9'} 
              strokeWidth="1.5" 
            />
            
            {/* Geometric Flower */}
            <g transform="translate(50, 50)">
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <path 
                  key={i}
                  d={`M0 0 L${15 * Math.cos(angle * Math.PI / 180)} ${15 * Math.sin(angle * Math.PI / 180)} L${25 * Math.cos((angle + 30) * Math.PI / 180)} ${25 * Math.sin((angle + 30) * Math.PI / 180)} L${15 * Math.cos((angle + 60) * Math.PI / 180)} ${15 * Math.sin((angle + 60) * Math.PI / 180)} Z`}
                  fill="none"
                  stroke={isDark ? '#8b5cf6' : '#6366f1'} 
                  strokeWidth="1"
                />
              ))}
            </g>
            
            {/* Corner Decorations */}
            {[
              [0, 0], [100, 0], [0, 100], [100, 100]
            ].map(([x, y], i) => (
              <g key={i} transform={`translate(${x}, ${y})`}>
                <circle 
                  cx="0" 
                  cy="0" 
                  r="8" 
                  fill="none" 
                  stroke={isDark ? '#22d3ee' : '#06b6d4'} 
                  strokeWidth="1.2" 
                />
                <circle 
                  cx="0" 
                  cy="0" 
                  r="4" 
                  fill="none" 
                  stroke={isDark ? '#a855f7' : '#8b5cf6'} 
                  strokeWidth="0.8" 
                />
              </g>
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#zellijPattern)" />
      </svg>
      
      {/* Additional floating geometric shapes */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, index) => {
          const size = Math.random() * 60 + 20;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 20 + 20;
          
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
                y: [0, -20, 0],
                x: [0, 10, 0],
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
                className="opacity-[0.03] transform rotate-45"
              >
                {index % 3 === 0 ? (
                  // Star
                  <path
                    d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z"
                    fill={isDark ? '#60a5fa' : '#3b82f6'}
                  />
                ) : index % 3 === 1 ? (
                  // Octagon
                  <polygon
                    points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30"
                    fill={isDark ? '#a5b4fc' : '#4f46e5'}
                  />
                ) : (
                  // Flower
                  <g>
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <path
                        key={i}
                        d={`M50 50 L${50 + 40 * Math.cos(angle * Math.PI / 180)} ${50 + 40 * Math.sin(angle * Math.PI / 180)} L${50 + 40 * Math.cos((angle + 30) * Math.PI / 180)} ${50 + 40 * Math.sin((angle + 30) * Math.PI / 180)} Z`}
                        fill={isDark ? '#c4b5fd' : '#7c3aed'}
                      />
                    ))}
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