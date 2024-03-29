import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getAllPublishedPosts } from '../../lib/api';
import { Layout } from '../../components';
import PhotosType from '../../types/photos';

type Props = {
  posts: PhotosType[];
};

export const PhotographyContent = ({ posts }: Props) => {
  return (
    <>
      <p>
        Be forewarned, I&lsquo;m an amateur photographer at best. I bought an old{' '}
        <a href="http://camera-wiki.org/wiki/Yashica_FX-2" target="_blank" rel="noreferrer">
          Yashica FX-2
        </a>{' '}
        on eBay to try out film, and quickly learned how expensive it is to process. The DIYer in me
        figured out how to process and scan the film myself. I still don&lsquo;t <em>actually</em>{' '}
        know what I&lsquo;m doing, but it&lsquo;s enjoyable nonetheless.
      </p>
      <p>
        In 2021, I upgraded my equipment to shoot medium format with a{' '}
        <a
          href="http://camera-wiki.org/wiki/Mamiya_M645_Super,_Pro,_Pro_TL_and_E"
          target="_blank"
          rel="noreferrer"
        >
          Mamiya 645 Super
        </a>{' '}
        and am really loving the format so far. Fingers crossed &#x1F91E; I don&lsquo;t burn too
        much more money on this hobby!
      </p>

      <div>
        <ul className="list list--columns">
          {posts.map((post) => {
            return (
              <li key={post.slug}>
                <Link href={`photography/${post.slug}`}>{post.title}</Link>
                <p>
                  <small>{post.excerpt}</small>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

const Photos: NextPage<Props> = ({ posts }: Props) => {
  const title = `Ty Carlson | Photography`;
  const description = `Be forewarned, I&lsquo;m an amateur photographer at best.`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <Layout>
        <h1 className="h2">photography</h1>
        <PhotographyContent posts={posts} />
        <Link href="/" className="take-me-back">
          &larr; home
        </Link>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const posts = getAllPublishedPosts('photography', [
    'title',
    'date',
    'slug',
    'author',
    'published',
    'excerpt',
  ]);

  return {
    props: { posts },
  };
}

export default Photos;
