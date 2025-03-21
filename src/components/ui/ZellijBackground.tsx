'use client';

import { useTheme } from '@/utils/ThemeProvider';
import { motion } from 'framer-motion';

export function ZellijBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden pointer-events-none">
      {/* Base pattern layer */}
      <svg width="100%" height="100%" className="opacity-[0.15]">
        <defs>
          <pattern id="zellijPattern" patternUnits="userSpaceOnUse" width="120" height="120">
            <rect width="120" height="120" fill={isDark ? '#1e293b' : '#f8fafc'} />
            
            {/* Moroccan Star */}
            <path 
              d="M60 10 L72 40 L110 60 L72 80 L60 110 L48 80 L10 60 L48 40 Z" 
              fill="none"
              stroke={isDark ? '#3b82f6' : '#1e40af'} 
              strokeWidth="2" 
            />
            
            {/* Center Circle */}
            <circle 
              cx="60" 
              cy="60" 
              r="15" 
              fill="none" 
              stroke={isDark ? '#38bdf8' : '#0284c7'} 
              strokeWidth="2" 
            />
            
            {/* Geometric Flower */}
            <g transform="translate(60, 60)">
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <path 
                  key={i}
                  d={`M0 0 L${20 * Math.cos(angle * Math.PI / 180)} ${20 * Math.sin(angle * Math.PI / 180)} L${30 * Math.cos((angle + 30) * Math.PI / 180)} ${30 * Math.sin((angle + 30) * Math.PI / 180)} L${20 * Math.cos((angle + 60) * Math.PI / 180)} ${20 * Math.sin((angle + 60) * Math.PI / 180)} Z`}
                  fill="none"
                  stroke={isDark ? '#8b5cf6' : '#4338ca'} 
                  strokeWidth="1.5"
                />
              ))}
            </g>
            
            {/* Corner Decorations */}
            {[
              [0, 0], [120, 0], [0, 120], [120, 120]
            ].map(([x, y], i) => (
              <g key={i} transform={`translate(${x}, ${y})`}>
                <circle 
                  cx="0" 
                  cy="0" 
                  r="10" 
                  fill="none" 
                  stroke={isDark ? '#22d3ee' : '#0891b2'} 
                  strokeWidth="1.5" 
                />
                <circle 
                  cx="0" 
                  cy="0" 
                  r="5" 
                  fill="none" 
                  stroke={isDark ? '#a855f7' : '#6d28d9'} 
                  strokeWidth="1.2" 
                />
              </g>
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#zellijPattern)" />
      </svg>
      
      {/* Colored background gradient to enhance pattern visibility */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/[0.03] to-purple-500/[0.03] dark:from-transparent dark:via-blue-800/[0.05] dark:to-purple-800/[0.05]"
      />
      
      {/* Additional floating geometric shapes */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, index) => {
          const size = Math.random() * 80 + 40;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 25 + 15;
          
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
                y: [0, -15, 0],
                x: [0, 8, 0],
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
                className={isDark ? "opacity-[0.08]" : "opacity-[0.05]"}
              >
                {index % 3 === 0 ? (
                  // Star
                  <path
                    d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z"
                    fill={isDark ? '#60a5fa' : '#2563eb'}
                    stroke={isDark ? '#93c5fd' : '#3b82f6'}
                    strokeWidth="1"
                  />
                ) : index % 3 === 1 ? (
                  // Octagon
                  <polygon
                    points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30"
                    fill={isDark ? '#a5b4fc' : '#4f46e5'}
                    stroke={isDark ? '#c7d2fe' : '#6366f1'}
                    strokeWidth="1"
                  />
                ) : (
                  // Flower
                  <g>
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <path
                        key={i}
                        d={`M50 50 L${50 + 40 * Math.cos(angle * Math.PI / 180)} ${50 + 40 * Math.sin(angle * Math.PI / 180)} L${50 + 40 * Math.cos((angle + 30) * Math.PI / 180)} ${50 + 40 * Math.sin((angle + 30) * Math.PI / 180)} Z`}
                        fill={isDark ? '#c4b5fd' : '#7c3aed'}
                        stroke={isDark ? '#ddd6fe' : '#8b5cf6'}
                        strokeWidth="0.8"
                      />
                    ))}
                    <circle
                      cx="50"
                      cy="50"
                      r="5"
                      fill={isDark ? '#f9a8d4' : '#ec4899'}
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