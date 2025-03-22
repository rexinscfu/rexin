// Blog category interface
export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
}

// Define all blog categories
export const blogCategories: BlogCategory[] = [
  {
    name: 'Firmware Dev',
    slug: 'firmware-dev',
    description: 'Articles about firmware development, embedded systems, and low-level programming.'
  },
  {
    name: 'Hardware',
    slug: 'hardware',
    description: 'Posts about hardware design, PCB layout, and electronic components.'
  },
  {
    name: 'Programming',
    slug: 'programming',
    description: 'General programming topics, algorithms, and software development.'
  },
  { 
    name: 'Firmware Hacking',
    slug: 'firmware-hacking',
    description: 'Techniques for analyzing, modifying, and exploiting existing firmware.'
  },
  { 
    name: 'Firmware Extract',
    slug: 'firmware-extract',
    description: 'Methods for extracting and unpacking device firmware for analysis.'
  },
  { 
    name: 'Hardware Design',
    slug: 'hardware-design',
    description: 'Electronics design, circuit analysis, and hardware development.'
  },
  { 
    name: 'Schematic Design',
    slug: 'schematic-design',
    description: 'Creating and understanding electronic circuit schematics and PCB layouts.'
  },
  { 
    name: 'C Programming',
    slug: 'c-programming',
    description: 'Tips, tricks, and tutorials for programming in the C language.'
  },
  { 
    name: 'C++ Programming',
    slug: 'cpp-programming',
    description: 'Object-oriented programming and advanced techniques in C++.'
  },
  { 
    name: 'Rust Programming',
    slug: 'rust-programming',
    description: 'Memory-safe systems programming with Rust language.'
  },
  { 
    name: 'JavaScript',
    slug: 'javascript',
    description: 'Web development and scripting with JavaScript.'
  },
  { 
    name: 'TypeScript',
    slug: 'typescript',
    description: 'Strongly-typed JavaScript development with TypeScript.'
  },
  { 
    name: 'Ada Programming',
    slug: 'ada-programming',
    description: 'Reliable and secure programming with the Ada language.'
  },
  { 
    name: 'Assembly',
    slug: 'assembly',
    description: 'Low-level programming with assembly language for various architectures.'
  }
];

// Helper to get a category by its slug
export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find(category => category.slug === slug);
}

// Default image paths
export const defaultCoverImage = '/images/blog/default-cover.jpg';
export const defaultAuthorImage = '/images/author-default.jpg';

// Reading time calculation settings
export const readingTimeConfig = {
  wordsPerMinute: 200,
  statStyle: 'context'
} as const; 