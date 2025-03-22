/**
 * Slugify a string for use in URLs
 * Converts string to lowercase, replaces spaces with hyphens, and removes special characters
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/&/g, '-and-')    // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')  // Remove all non-word characters
    .replace(/\-\-+/g, '-');   // Replace multiple hyphens with single hyphen
} 