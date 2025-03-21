'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useTheme } from '@/utils/ThemeProvider';
import { ZellijBackground } from '@/components/ui/ZellijBackground';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-white/90 dark:bg-zinc-950/95 text-zinc-800 dark:text-zinc-50 flex flex-col transition-colors duration-500 relative">
      {/* Moroccan Zellij Background Pattern */}
      <ZellijBackground />
      
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key="main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="container mx-auto px-4 py-8 flex-grow mt-16 relative z-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
} 