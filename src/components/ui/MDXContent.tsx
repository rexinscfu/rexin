'use client';

import React, { useEffect, useState, useRef } from 'react';
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

// Check for component tags in content
function hasComponentTags(content: string) {
  return {
    hasAnimatedGreeting: content.includes('<AnimatedGreeting') || content.includes('&lt;AnimatedGreeting'),
    hasFloatingIcons: content.includes('<FloatingIcons') || content.includes('&lt;FloatingIcons')
  };
}

export const MDXContent: React.FC<MDXContentProps> = ({ content }) => {
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { hasAnimatedGreeting, hasFloatingIcons } = hasComponentTags(content);
  
  useEffect(() => {
    setMounted(true);
    
    // Apply code styling to pre and code blocks
    if (contentRef.current) {
      const preBlocks = contentRef.current.querySelectorAll('pre');
      
      preBlocks.forEach(pre => {
        // Add language class if not already present
        if (!pre.className.includes('language-')) {
          const codeElement = pre.querySelector('code');
          
          if (codeElement) {
            // Try to detect language from first line
            const content = codeElement.textContent || '';
            const lines = content.split('\n');
            const firstLine = lines[0].trim();
            
            let language = 'plaintext';
            
            // Explicit detection for fenced code blocks that specify language
            const fencedCodeMatch = firstLine.match(/^```(\w+)/);
            if (fencedCodeMatch && fencedCodeMatch[1]) {
              language = fencedCodeMatch[1].toLowerCase();
              // Update content to remove language marker if it's still in the code
              if (firstLine.startsWith('```')) {
                codeElement.textContent = lines.slice(1).join('\n');
              }
            } 
            // Better detection based on file content and patterns
            else if (content.includes('fn main()') && content.includes('println!')) {
              language = 'rust';
            } else if (content.includes('printf') && (content.includes('#include') || content.includes('int main'))) {
              language = 'c';
            } else if (content.includes('const') && content.includes(': ') && content.includes('=>')) {
              language = 'typescript';
            } else if (content.includes('console.log')) {
              language = 'javascript';
            } else if (content.includes('body {') || content.includes('@media')) {
              language = 'css';
            }
            
            // Apply special case detection for hello example
            if (content.includes('Hello, 2025!') && content.includes('#include')) {
              language = 'c';
            } else if (content.includes('Hello, 2025!') && content.includes('fn main()')) {
              language = 'rust';
            } else if (content.includes('greeting()') && content.includes('const year: number')) {
              language = 'typescript';
            }
            
            pre.className = `language-${language}`;
            codeElement.className = `language-${language}`;
            
            // Add language badge as an element instead of using pseudo-element
            const badge = document.createElement('span');
            badge.className = 'language-badge';
            badge.textContent = language;
            pre.appendChild(badge);
          }
        } else {
          // For pre blocks that already have a language class
          const languageClass = Array.from(pre.classList).find(cls => cls.startsWith('language-'));
          if (languageClass) {
            const language = languageClass.replace('language-', '');
            // Add language badge
            const badge = document.createElement('span');
            badge.className = 'language-badge';
            badge.textContent = language;
            pre.appendChild(badge);
          }
        }
      });
      
      // Highlight code blocks
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [content, mounted]);

  // Remove component tags from content for display
  let displayContent = content;
  if (hasAnimatedGreeting) {
    // Handle both raw tags and escaped HTML entities
    displayContent = displayContent.replace(/<AnimatedGreeting[^>]*><\/AnimatedGreeting>/g, '');
    displayContent = displayContent.replace(/&lt;AnimatedGreeting[^&]*&gt;&lt;\/AnimatedGreeting&gt;/g, '');
  }
  if (hasFloatingIcons) {
    // Handle both raw tags and escaped HTML entities
    displayContent = displayContent.replace(/<FloatingIcons[^>]*><\/FloatingIcons>/g, '');
    displayContent = displayContent.replace(/&lt;FloatingIcons[^&]*&gt;&lt;\/FloatingIcons&gt;/g, '');
  }

  // Function to extract custom title from AnimatedGreeting component tag
  const getCustomTitle = () => {
    try {
      const titleMatch = content.match(/<AnimatedGreeting\s+text=["']([^"']+)["']/);
      const entityTitleMatch = content.match(/&lt;AnimatedGreeting\s+text=["']([^"']+)["']/);
      
      if (titleMatch && titleMatch[1]) {
        return titleMatch[1];
      } else if (entityTitleMatch && entityTitleMatch[1]) {
        return entityTitleMatch[1];
      }
      
      return null;
    } catch (error) {
      console.error('Error extracting title:', error);
      return null;
    }
  };

  if (!mounted) {
    // Return fallback version without components
    return (
      <div className="blog-content">
        <div dangerouslySetInnerHTML={{ __html: displayContent }} />
      </div>
    );
  }

  return (
    <div className="blog-content">
      {/* Title Animation */}
      {hasAnimatedGreeting && (
        <div className="my-8 text-center">
          <AnimatedGreeting text={getCustomTitle() || "Hello World!"} />
        </div>
      )}
      
      {/* Main Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert my-8">
        <div 
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: displayContent }} 
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