import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getAllPublishedPosts } from '../../lib/api';
import { Layout } from '../../components';
import ReadingType from '../../types/reading';

type Props = {
  allPosts: ReadingType[];
};

const Reading: NextPage<Props> = ({ allPosts }: Props) => {
  return (
    <>
      <Head>
        <title>Ty Carlson | Reading List</title>
        <meta name="description" content="List of books I&lsquo;ve read, grouped by year." />
        <meta property="og:title" content="Ty Carlson | Reading List" />
        <meta property="og:description" content="List of books I&lsquo;ve read, grouped by year." />
      </Head>

      <Layout>
        <h1 className="h2">reading list</h1>
        <p className="measure-wide">List of books I&lsquo;ve read, grouped by year.</p>
        <div className="measure-wide">
          <ul className="list list--inline">
            {allPosts.map((post) => {
              return (
                <li key={post.slug}>
                  <Link href={`reading/${post.slug}`}>
                    <a>{post.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Link href="/">
          <a className="take-me-back">&larr; home</a>
        </Link>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const allPosts = getAllPublishedPosts('reading', [
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
    props: { allPosts },
  };
}

export default Reading;
