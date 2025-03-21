'use client';

import { motion } from 'framer-motion';

export function CircuitSvg() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Background */}
      <rect width="400" height="400" fill="#1F2937" rx="8" />

      {/* Main circuit board paths */}
      <motion.path
        d="M50 200 H150 M250 200 H350 M200 50 V150 M200 250 V350"
        stroke="#3B82F6"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Circuit traces */}
      <motion.path
        d="M50 100 H150 V50 M350 100 H250 V50 M50 300 H150 V350 M350 300 H250 V350"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
      />

      {/* Connecting traces */}
      <motion.path
        d="M100 100 V150 H150 M300 100 V150 H250 M100 300 V250 H150 M300 300 V250 H250"
        stroke="#60A5FA"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
      />

      {/* CPU/Microcontroller */}
      <motion.rect
        x="175"
        y="175"
        width="50"
        height="50"
        rx="5"
        fill="#1E40AF"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      />

      {/* Pin connections */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <rect x="170" y="180" width="5" height="2" fill="#DBEAFE" />
        <rect x="170" y="190" width="5" height="2" fill="#DBEAFE" />
        <rect x="170" y="200" width="5" height="2" fill="#DBEAFE" />
        <rect x="170" y="210" width="5" height="2" fill="#DBEAFE" />
        <rect x="225" y="180" width="5" height="2" fill="#DBEAFE" />
        <rect x="225" y="190" width="5" height="2" fill="#DBEAFE" />
        <rect x="225" y="200" width="5" height="2" fill="#DBEAFE" />
        <rect x="225" y="210" width="5" height="2" fill="#DBEAFE" />
        <rect x="180" y="170" width="2" height="5" fill="#DBEAFE" />
        <rect x="190" y="170" width="2" height="5" fill="#DBEAFE" />
        <rect x="200" y="170" width="2" height="5" fill="#DBEAFE" />
        <rect x="210" y="170" width="2" height="5" fill="#DBEAFE" />
        <rect x="180" y="225" width="2" height="5" fill="#DBEAFE" />
        <rect x="190" y="225" width="2" height="5" fill="#DBEAFE" />
        <rect x="200" y="225" width="2" height="5" fill="#DBEAFE" />
        <rect x="210" y="225" width="2" height="5" fill="#DBEAFE" />
      </motion.g>

      {/* Electronic components */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.2 }}
      >
        {/* Resistors */}
        <rect x="80" y="180" width="20" height="10" rx="2" fill="#6366F1" />
        <rect x="300" y="180" width="20" height="10" rx="2" fill="#6366F1" />
        
        {/* Capacitors */}
        <rect x="190" y="80" width="8" height="20" rx="1" fill="#8B5CF6" />
        <rect x="210" y="80" width="8" height="20" rx="1" fill="#8B5CF6" />
        <rect x="190" y="300" width="8" height="20" rx="1" fill="#8B5CF6" />
        <rect x="210" y="300" width="8" height="20" rx="1" fill="#8B5CF6" />
        
        {/* LEDs */}
        <circle cx="100" cy="250" r="5" fill="#EC4899" />
        <circle cx="300" cy="250" r="5" fill="#10B981" />
      </motion.g>

      {/* Binary code */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.5 }}
      >
        <text x="185" y="200" fill="#DBEAFE" fontFamily="monospace" fontSize="8">01</text>
        <text x="185" y="210" fill="#DBEAFE" fontFamily="monospace" fontSize="8">10</text>
      </motion.g>

      {/* Small decorative dots */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.8 }}
      >
        <circle cx="50" cy="50" r="3" fill="#60A5FA" />
        <circle cx="350" cy="50" r="3" fill="#60A5FA" />
        <circle cx="50" cy="350" r="3" fill="#60A5FA" />
        <circle cx="350" cy="350" r="3" fill="#60A5FA" />
        
        <circle cx="80" cy="80" r="2" fill="#93C5FD" />
        <circle cx="320" cy="80" r="2" fill="#93C5FD" />
        <circle cx="80" cy="320" r="2" fill="#93C5FD" />
        <circle cx="320" cy="320" r="2" fill="#93C5FD" />
      </motion.g>
    </svg>
  );
} 