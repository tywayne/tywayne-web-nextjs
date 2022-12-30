import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import sizeOf from 'image-size';
import { ImageResult } from '../types/photos';

type Path = keyof typeof directories;

const directories = {
  posts: join(process.cwd(), 'src/_posts'),
  reading: join(process.cwd(), 'src/_reading'),
  photography: join(process.cwd(), 'src/_photography'),
  code: join(process.cwd(), 'src/_code'),
};

export function getPostSlugs(path: Path = 'posts') {
  return fs.readdirSync(directories[path]);
}

export function getPostBySlug(path: Path, slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(directories[path], `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(path: Path = 'posts', fields: string[] = []) {
  const slugs = getPostSlugs(path);
  const posts = slugs
    .map((slug) => getPostBySlug(path, slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllPublishedPosts(path: Path = 'posts', fields: string[] = []) {
  const slugs = getPostSlugs(path);
  const posts = slugs
    .map((slug) => getPostBySlug(path, slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    .filter((post) => post.published);
  return posts;
}

export function getImagesByDirectory(path = ''): ImageResult[] {
  const imagesDir = join(process.cwd(), `public/${path}`);

  return fs.readdirSync(imagesDir).map((filename) => {
    const filePath = `public/${path}${filename}`;
    const dimensions = sizeOf(filePath);
    return {
      src: `${path}${filename}`,
      dimensions,
      blurDataURL:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkkAQAAB8AG7jymN8AAAAASUVORK5CYII=',
    };
  });
}
