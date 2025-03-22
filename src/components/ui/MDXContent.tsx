'use client';

import React, { useEffect } from 'react';
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
import ReactDOM from 'react-dom';

// Define all available MDX components
export const mdxComponents = {
  AnimatedGreeting,
  FloatingIcons,
};

interface MDXContentProps {
  content: string;
}

// Function to inject custom components
function injectCustomComponents(htmlContent: string): string {
  let processedContent = htmlContent;
  
  // Replace AnimatedGreeting tags
  if (processedContent.includes('<AnimatedGreeting')) {
    const AnimatedGreetingComponent = React.createElement(AnimatedGreeting);
    const renderedComponent = document.createElement('div');
    renderedComponent.className = 'animated-greeting-wrapper';
    renderedComponent.innerHTML = '<div id="animated-greeting-placeholder"></div>';
    
    // Use a placeholder div that will be replaced after rendering
    processedContent = processedContent.replace(
      /<AnimatedGreeting[^>]*><\/AnimatedGreeting>/g, 
      renderedComponent.outerHTML
    );
  }
  
  // Replace FloatingIcons tags
  if (processedContent.includes('<FloatingIcons')) {
    const FloatingIconsComponent = React.createElement(FloatingIcons);
    const renderedComponent = document.createElement('div');
    renderedComponent.className = 'floating-icons-wrapper';
    renderedComponent.innerHTML = '<div id="floating-icons-placeholder"></div>';
    
    // Use a placeholder div that will be replaced after rendering
    processedContent = processedContent.replace(
      /<FloatingIcons[^>]*><\/FloatingIcons>/g, 
      renderedComponent.outerHTML
    );
  }
  
  return processedContent;
}

export const MDXContent: React.FC<MDXContentProps> = ({ content }) => {
  useEffect(() => {
    // Highlight all code blocks
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
      
      // Replace placeholders with actual components
      const animatedGreetingPlaceholder = document.getElementById('animated-greeting-placeholder');
      if (animatedGreetingPlaceholder) {
        const container = animatedGreetingPlaceholder.parentElement;
        if (container) {
          // Clear the container and render the component
          container.innerHTML = '';
          const root = document.createElement('div');
          container.appendChild(root);
          const greeting = React.createElement(AnimatedGreeting);
          // @ts-ignore - Using DOM rendering for simplicity
          ReactDOM.render(greeting, root);
        }
      }
      
      const floatingIconsPlaceholder = document.getElementById('floating-icons-placeholder');
      if (floatingIconsPlaceholder) {
        const container = floatingIconsPlaceholder.parentElement;
        if (container) {
          // Clear the container and render the component
          container.innerHTML = '';
          const root = document.createElement('div');
          container.appendChild(root);
          const icons = React.createElement(FloatingIcons);
          // @ts-ignore - Using DOM rendering for simplicity
          ReactDOM.render(icons, root);
        }
      }
    }
  }, [content]);

  // Process the content to handle custom components
  const processedContent = injectCustomComponents(content);

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <div 
        dangerouslySetInnerHTML={{ __html: processedContent }} 
        suppressHydrationWarning={true}
      />
    </div>
  );
};

export default MDXContent; 