import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';

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
  image: '/images/author-default.jpg'
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
export function getAllPostSlugs() {
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
    console.error('Error getting all post slugs:', error);
    return [];
  }
}

// Get all posts with metadata
export function getAllPosts(): PostMeta[] {
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
}

// Get featured posts
export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter(post => post.featured);
}

// Get posts filtered by category
export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    post => post.category.toLowerCase().replace(/ /g, '-') === category
  );
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    
    // Check if MDX file exists
    if (!fs.existsSync(fullPath)) {
      // Try MD file if MDX doesn't exist
      const mdPath = path.join(postsDirectory, `${slug}.md`);
      if (!fs.existsSync(mdPath)) {
        return null;
      }
      
      // Use MD file instead
      const fileContents = fs.readFileSync(mdPath, 'utf8');
      const matterResult = matter(fileContents);
      const stats = readingTime(matterResult.content);
      
      // Convert markdown to HTML
      const processedContent = await remark()
        .use(html, { sanitize: false })
        .process(matterResult.content);
        
      const contentHtml = processedContent.toString();
      
      // Format date
      const date = matterResult.data.date;
      const formattedDate = formatDate(date);
      
      // Get or use default author
      const author = matterResult.data.author || defaultAuthor;
      
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
        readingTime: `${Math.ceil(stats.minutes)} min read`,
        content: contentHtml
      };
    }
    
    // Use MDX file
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const stats = readingTime(matterResult.content);
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content);
      
    const contentHtml = processedContent.toString();
    
    // Format date
    const date = matterResult.data.date;
    const formattedDate = formatDate(date);
    
    // Get or use default author
    const author = matterResult.data.author || defaultAuthor;
    
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
      readingTime: `${Math.ceil(stats.minutes)} min read`,
      content: contentHtml
    };
  } catch (error) {
    console.error(`Error getting post by slug (${slug}):`, error);
    return null;
  }
} 