'use client';

import React from 'react';
import { AnimatedGreeting } from './AnimatedGreeting';
import { FloatingIcons } from './FloatingIcons';

interface MDXContentProps {
  content: string;
}

// Map of custom components available for MDX
const components = {
  AnimatedGreeting,
  FloatingIcons,
};

const MDXContent: React.FC<MDXContentProps> = ({ content }) => {
  return (
    <div
      className="mdx-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default MDXContent; 