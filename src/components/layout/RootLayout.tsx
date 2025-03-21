import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="container mx-auto px-4 py-8"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
} 