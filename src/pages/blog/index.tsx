import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';

import { getAllPublishedPosts } from '../../lib/api';
import { Layout } from '../../components';
import PostType from '../../types/post';

type Props = {
  allPosts: PostType[];
};

const Blog: NextPage<Props> = ({ allPosts }) => {
  return (
    <>
      <Head>
        <title>Ty Carlson | Blog</title>
        <meta
          name="description"
          content="I don&lsquo;t blog much, but I want to change that. Expect to see ramblings about hobbies,
          fatherhood, design, and development."
        />
        <meta property="og:title" content="Ty Carlson | Blog" />
        <meta
          property="og:description"
          content="I don&lsquo;t blog much, but I want to change that. Expect to see ramblings about hobbies,
          fatherhood, design, and development."
        />
      </Head>

      <Layout>
        <h1 className="h2">blog</h1>
        <p className="measure-wide">
          I don&lsquo;t blog much, but I want to change that. Expect to see ramblings about hobbies,
          fatherhood, design, and development.
        </p>
        <div className="measure-wide">
          <ul className="list">
            {allPosts.map((post) => {
              return (
                <li key={post.slug}>
                  <Link href={`blog/${post.slug}`}>
                    <a>{post.title}</a>
                  </Link>
                  <p>
                    <small>{format(new Date(post.date), 'MMM d, Y')}</small>
                  </p>
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
  const allPosts = getAllPublishedPosts('posts', ['title', 'date', 'slug', 'author', 'published']);

  return {
    props: { allPosts },
  };
}

export default Blog;
