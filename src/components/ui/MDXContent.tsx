'use client';

import React, { useEffect, useState } from 'react';
import { AnimatedGreeting } from './AnimatedGreeting';
import { FloatingIcons } from './FloatingIcons';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';

// Define all available MDX components
export const mdxComponents = {
  AnimatedGreeting,
  FloatingIcons,
};

interface MDXContentProps {
  content: string;
}

// Parse the content and extract custom component tags
function parseContent(content: string) {
  const hasAnimatedGreeting = content.includes('<AnimatedGreeting');
  const hasFloatingIcons = content.includes('<FloatingIcons');
  
  return {
    hasAnimatedGreeting,
    hasFloatingIcons
  };
}

export const MDXContent: React.FC<MDXContentProps> = ({ content }) => {
  const [mounted, setMounted] = useState(false);
  const { hasAnimatedGreeting, hasFloatingIcons } = parseContent(content);
  
  useEffect(() => {
    setMounted(true);
    
    // Highlight all code blocks
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [content]);

  if (!mounted) {
    // Return fallback version without components
    return (
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {/* Render custom components if they exist in the content */}
      {hasAnimatedGreeting && (
        <div className="my-8">
          <AnimatedGreeting text="Hello World!" />
        </div>
      )}
      
      <div dangerouslySetInnerHTML={{ __html: content.replace(/<AnimatedGreeting[^>]*><\/AnimatedGreeting>/g, '') }} />
      
      {hasFloatingIcons && (
        <div className="my-8">
          <FloatingIcons />
        </div>
      )}
    </div>
  );
};

export default MDXContent; 