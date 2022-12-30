import fs from 'fs';

import { Feed } from 'feed';

import { getAllPublishedPosts } from './api';

export const generateFeed = async () => {
  const fields = ['title', 'date', 'slug', 'layout', 'excerpt', 'published'];
  const readingPosts = await getAllPublishedPosts('reading', fields);
  const photoPosts = getAllPublishedPosts('photography', fields);
  const codePosts = getAllPublishedPosts('code', fields);

  const allPosts = [...readingPosts, ...photoPosts, ...codePosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const siteURL = 'https://tywayne.com';
  const date = new Date();
  const author = {
    name: 'Ty Carlson',
    email: 'tywayne@fastmail.com',
    link: 'https://tywayne.com',
  };

  const feed = new Feed({
    title: 'Ty Carlson',
    description: '',
    id: siteURL as string,
    link: siteURL,
    favicon: `${siteURL}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Ty Carlson`,
    updated: date,
    feedLinks: {
      rss2: `${siteURL}/rss.xml`,
    },
    author,
  });

  allPosts.forEach((post) => {
    const url = `${siteURL}/${post.layout}/${post.slug}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.excerpt,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    });
  });

  fs.writeFileSync('./public/rss.xml', feed.rss2());
};
