import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getAllPublishedPosts } from '../../lib/api';
import { Layout } from '../../components';
import CodeType from '../../types/code';

type Props = {
  posts: CodeType[];
};

const codeIntroText = `I write code for a living. From time to time I get the hankering to put something out into the world as open source, available to anyone who might want to use it. Here are a couple of those projects.`;

export const CodeContent = ({ posts }: Props) => {
  return (
    <>
      <p className="measure-wide">{codeIntroText}</p>
      <div className="measure-wide">
        <ul className="list list--inline">
          {posts.map((post) => {
            return (
              <li key={post.slug}>
                {post.archived ? (
                  <span className="strikethrough">
                    <Link href={`code/${post.slug}`}>{post.title}</Link>
                  </span>
                ) : (
                  <Link href={`code/${post.slug}`}>{post.title}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

const Code: NextPage<Props> = ({ posts }: Props) => {
  const title = `Ty Carlson | Code`;
  const description = codeIntroText;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <Layout>
        <h1 className="h2">code</h1>
        <CodeContent posts={posts} />
        <Link href="/" className="take-me-back">
          &larr; home
        </Link>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const posts = getAllPublishedPosts('code', [
    'title',
    'date',
    'slug',
    'author',
    'published',
    'archived',
    'excerpt',
    'link',
  ]);

  return {
    props: { posts },
  };
}

export default Code;
