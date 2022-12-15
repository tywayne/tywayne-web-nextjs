import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getAllPublishedPosts } from '../../lib/api';
import { Layout } from '../../components';
import ReadingType from '../../types/reading';

type Props = {
  posts: ReadingType[];
};

export const ReadingContent = ({ posts }: Props) => {
  return (
    <>
      <p className="measure-wide">
        Several years ago I re-invigorated my love of reading, and began setting yearly goals and
        tracking the books I chose to read. Here is that list of books I&lsquo;ve read, grouped by
        year.
      </p>
      <div className="measure-wide">
        <ul className="list list--inline">
          {posts.map((post) => {
            return (
              <li key={post.slug}>
                <Link href={`reading/${post.slug}`}>{post.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

const Reading: NextPage<Props> = ({ posts }: Props) => {
  const title = `Ty Carlson | Reading List`;
  const description = `List of books I&lsquo;ve read, grouped by year.`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <Layout>
        <h1 className="h2">reading list</h1>
        <ReadingContent posts={posts} />
        <Link href="/" className="take-me-back">
          &larr; home
        </Link>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const posts = getAllPublishedPosts('reading', [
    'title',
    'date',
    'slug',
    'author',
    'published',
    'excerpt',
    'book_count',
    'goal',
  ]);

  return {
    props: { posts },
  };
}

export default Reading;
