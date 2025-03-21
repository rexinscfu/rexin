'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled
          ? 'bg-zinc-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            REXIN
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Link
                href={link.href}
                className="text-zinc-300 hover:text-white hover:underline decoration-blue-500 decoration-2 underline-offset-4 transition-all duration-200"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="md:hidden text-zinc-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-zinc-900 shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 * index }}
                >
                  <Link
                    href={link.href}
                    className="block py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg px-3 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
} 