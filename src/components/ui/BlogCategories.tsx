import Link from 'next/link';
import { blogCategories } from '@/config/blog';

interface BlogCategoriesProps {
  currentCategory?: string;
}

export default function BlogCategories({ currentCategory }: BlogCategoriesProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-2 py-2">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full transition-colors ${
          !currentCategory
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
        }`}
      >
        All Posts
      </Link>
      
      {blogCategories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/category/${category.slug}`}
          className={`px-4 py-2 rounded-full transition-colors ${
            currentCategory === category.slug
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
} 