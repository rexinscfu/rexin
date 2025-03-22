import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';
import { cache } from 'react';
import Prism from 'prismjs';

// Load Prism languages
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-css');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-tsx');
require('prismjs/components/prism-c');
require('prismjs/components/prism-cpp');
require('prismjs/components/prism-rust');
require('prismjs/components/prism-json');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-markdown');
require('prismjs/components/prism-yaml');

// Define the blog content directory
const postsDirectory = path.join(process.cwd(), 'content/blog');

// Define blog author interface
export interface Author {
  name: string;
  image: string;
}

// Define blog post metadata interface
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  coverImage: string;
  excerpt: string;
  category: string;
  featured: boolean;
  author: Author;
  readingTime: string;
}

// Define full blog post interface (metadata + content)
export interface Post extends PostMeta {
  content: string;
}

// Default author if none specified
const defaultAuthor: Author = {
  name: 'Rexin',
  image: 'https://avatars.githubusercontent.com/u/184462342?s=400&u=a2f83a4a245ecae91d6b862aa8e876e6a5659801&v=4'
};

// Parse date to readable format (Oct 12, 2023)
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Get all post slugs for static generation
export const getAllPostSlugs = cache(async () => {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .map(fileName => ({
        params: {
          slug: fileName.replace(/\.mdx?$/, '')
        }
      }));
  } catch (error) {
    console.error('Error getting post slugs:', error);
    return [];
  }
});

// Get all posts with metadata
export const getAllPosts = cache(async (): Promise<PostMeta[]> => {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .map(fileName => {
        // Remove ".md" or ".mdx" from file name to get slug
        const slug = fileName.replace(/\.mdx?$/, '');
        
        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);
        const stats = readingTime(matterResult.content);
        
        // Format date
        const date = matterResult.data.date;
        const formattedDate = formatDate(date);
        
        // Get or use default author
        const author = matterResult.data.author || defaultAuthor;
        
        // Create post metadata object
        return {
          slug,
          title: matterResult.data.title,
          date,
          formattedDate,
          coverImage: matterResult.data.coverImage || '/images/blog-default-cover.jpg',
          excerpt: matterResult.data.excerpt || '',
          category: matterResult.data.category || 'Uncategorized',
          featured: matterResult.data.featured || false,
          author,
          readingTime: `${Math.ceil(stats.minutes)} min read`
        };
      });
      
    // Sort posts by date in descending order
    return allPostsData.sort(({ date: a }, { date: b }) => {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        return 0;
      }
    });
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
});

// Get featured posts
export function getFeaturedPosts(): Promise<PostMeta[]> {
  return getAllPosts().then(posts => posts.filter(post => post.featured));
}

// Get posts by category
export function getPostsByCategory(category: string): Promise<PostMeta[]> {
  return getAllPosts().then(posts => 
    posts.filter(post => post.category.toLowerCase().replace(/ /g, '-') === category.toLowerCase())
  );
}

// Get a single post by slug
export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  try {
    const mdPath = path.join(postsDirectory, `${slug}.md`);
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    let fullPath: string;

    if (fs.existsSync(mdxPath)) {
      fullPath = mdxPath;
    } else if (fs.existsSync(mdPath)) {
      fullPath = mdPath;
    } else {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    // Process markdown content with enhanced HTML options
    const processedContent = await remark()
      .use(html, { 
        sanitize: false,
        xhtmlOut: true,
        breaks: true
      })
      .process(content);

    let contentHtml = processedContent.toString();

    // Apply Prism.js syntax highlighting
    contentHtml = contentHtml.replace(
      /<pre><code class="language-([^"]+)">([\s\S]*?)<\/code><\/pre>/g,
      (match, language, code) => {
        try {
          const highlighted = Prism.highlight(
            code,
            Prism.languages[language] || Prism.languages.javascript,
            language
          );
          return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
        } catch (error) {
          console.error(`Error highlighting ${language} code:`, error);
          return match;
        }
      }
    );

    const author = data.author || defaultAuthor;
    const formattedDate = formatDate(data.date);

    return {
      slug,
      content: contentHtml,
      title: data.title,
      date: data.date,
      formattedDate,
      coverImage: data.coverImage || '/images/blog-default-cover.jpg',
      excerpt: data.excerpt || '',
      category: data.category || 'Uncategorized',
      featured: data.featured || false,
      author,
      readingTime: `${Math.ceil(stats.minutes)} min read`
    };
  } catch (error) {
    console.error('Error getting post by slug:', error);
    return null;
  }
}); 