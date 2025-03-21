'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 max-w-lg mx-auto px-4"
      >
        <h2 className="text-3xl font-bold text-red-500">Something went wrong!</h2>
        <p className="text-zinc-400">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 