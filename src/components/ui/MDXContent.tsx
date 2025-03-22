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

// Process markdown content to enhance code blocks with language detection
function processCodeBlocks(content: string): string {
  // Regular expression to find code blocks
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  
  // Replace code blocks with enhanced versions that include language data attribute
  return content.replace(codeBlockRegex, (match, language, code) => {
    const lang = language || 'plaintext';
    
    return `<pre class="language-${lang}" data-language="${lang}"><code class="language-${lang}">${code}</code></pre>`;
  });
}

// Parse the content and extract custom component tags
function parseContent(content: string) {
  const hasAnimatedGreeting = content.includes('<AnimatedGreeting');
  const hasFloatingIcons = content.includes('<FloatingIcons');
  
  // Clean the content by removing the component tags
  let cleanedContent = content;
  if (hasAnimatedGreeting) {
    cleanedContent = cleanedContent.replace(/<AnimatedGreeting[^>]*><\/AnimatedGreeting>/g, '');
  }
  if (hasFloatingIcons) {
    cleanedContent = cleanedContent.replace(/<FloatingIcons[^>]*><\/FloatingIcons>/g, '');
  }
  
  // Process code blocks for syntax highlighting
  cleanedContent = processCodeBlocks(cleanedContent);
  
  return {
    hasAnimatedGreeting,
    hasFloatingIcons,
    cleanedContent
  };
}

export const MDXContent: React.FC<MDXContentProps> = ({ content }) => {
  const [mounted, setMounted] = useState(false);
  const { hasAnimatedGreeting, hasFloatingIcons, cleanedContent } = parseContent(content);
  
  useEffect(() => {
    setMounted(true);
    
    // Wait for DOM to be fully rendered before highlighting
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        // Initialize Prism for syntax highlighting
        Prism.highlightAll();
        
        // Add language labels to code blocks
        document.querySelectorAll('pre[class*="language-"]').forEach((pre) => {
          const lang = pre.className.match(/language-(\w+)/)?.[1] || '';
          if (lang) {
            pre.setAttribute('data-language', lang);
          }
        });
      }
    }, 100);
  }, [content]);

  if (!mounted) {
    // Return fallback version without components
    return (
      <div className="blog-content prose prose-lg max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />
      </div>
    );
  }

  return (
    <div className="blog-content">
      {/* Title Animation */}
      {hasAnimatedGreeting && (
        <div className="my-8 text-center">
          <AnimatedGreeting text="Hello World!" />
        </div>
      )}
      
      {/* Main Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert my-8">
        <div 
          dangerouslySetInnerHTML={{ __html: cleanedContent }} 
          suppressHydrationWarning={true}
        />
      </div>
      
      {/* Floating Icons */}
      {hasFloatingIcons && (
        <div className="my-12">
          <FloatingIcons />
        </div>
      )}
    </div>
  );
};

export default MDXContent; 