'use client';

import { motion } from 'framer-motion';

export function CircuitSvg() {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }}
      className="w-full h-full"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Circle */}
        <circle cx="100" cy="100" r="95" fill="#1E293B" />
        <circle cx="100" cy="100" r="95" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
        
        {/* CPU Chip */}
        <motion.rect
          x="70"
          y="70"
          width="60"
          height="60"
          rx="6"
          fill="#1E40AF"
          stroke="#60A5FA"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
        
        {/* Binary pattern background on CPU */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.5, delay: 1.7 }}
        >
          <rect x="75" y="75" width="50" height="50" fill="url(#binary-pattern)" />
        </motion.g>
        <defs>
          <pattern id="binary-pattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale(0.5)">
            <rect width="20" height="20" fill="#1E40AF"/>
            <text x="2" y="10" fill="#DBEAFE" fontFamily="monospace" fontSize="8">01</text>
            <text x="12" y="10" fill="#DBEAFE" fontFamily="monospace" fontSize="8">10</text>
            <text x="2" y="18" fill="#DBEAFE" fontFamily="monospace" fontSize="8">10</text>
            <text x="12" y="18" fill="#DBEAFE" fontFamily="monospace" fontSize="8">01</text>
          </pattern>
        </defs>
        
        {/* Animated Circuit Paths */}
        <motion.path
          d="M100 25 V70 M100 130 V175 M25 100 H70 M130 100 H175"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Diagonal Traces */}
        <motion.path
          d="M35 35 L70 70 M165 35 L130 70 M35 165 L70 130 M165 165 L130 130"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
        />
        
        {/* Pin connections */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <rect x="65" y="78" width="5" height="2" fill="#DBEAFE" />
          <rect x="65" y="88" width="5" height="2" fill="#DBEAFE" />
          <rect x="65" y="98" width="5" height="2" fill="#DBEAFE" />
          <rect x="65" y="108" width="5" height="2" fill="#DBEAFE" />
          <rect x="130" y="78" width="5" height="2" fill="#DBEAFE" />
          <rect x="130" y="88" width="5" height="2" fill="#DBEAFE" />
          <rect x="130" y="98" width="5" height="2" fill="#DBEAFE" />
          <rect x="130" y="108" width="5" height="2" fill="#DBEAFE" />
          <rect x="78" y="65" width="2" height="5" fill="#DBEAFE" />
          <rect x="88" y="65" width="2" height="5" fill="#DBEAFE" />
          <rect x="98" y="65" width="2" height="5" fill="#DBEAFE" />
          <rect x="108" y="65" width="2" height="5" fill="#DBEAFE" />
          <rect x="78" y="130" width="2" height="5" fill="#DBEAFE" />
          <rect x="88" y="130" width="2" height="5" fill="#DBEAFE" />
          <rect x="98" y="130" width="2" height="5" fill="#DBEAFE" />
          <rect x="108" y="130" width="2" height="5" fill="#DBEAFE" />
        </motion.g>
        
        {/* Pulsing LED */}
        <motion.circle
          cx="100"
          cy="40"
          r="6"
          fill="#EC4899"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Glowing dots */}
        <motion.g>
          <motion.circle
            cx="40"
            cy="100"
            r="6"
            fill="#10B981"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle
            cx="160"
            cy="100"
            r="6"
            fill="#3B82F6"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.circle
            cx="100"
            cy="160"
            r="6"
            fill="#8B5CF6"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />
        </motion.g>
      </svg>
    </motion.div>
  );
} 