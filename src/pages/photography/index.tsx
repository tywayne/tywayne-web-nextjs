import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getAllPublishedPosts } from '../../lib/api';
import { Layout } from '../../components';
import PhotosType from '../../types/photos';

type Props = {
  allPosts: PhotosType[];
};

const Photos: NextPage<Props> = ({ allPosts }: Props) => {
  return (
    <>
      <Head>
        <title>Ty Carlson | Photography</title>
        <meta
          name="description"
          content="Be forewarned, I&lsquo;m an amateur photographer at best."
        />
        <meta property="og:title" content="Ty Carlson | Photography" />
        <meta
          property="og:description"
          content="Be forewarned, I&lsquo;m an amateur photographer at best."
        />
      </Head>

      <Layout>
        <h1 className="h2">photography</h1>
        <p>
          Be forewarned, I&lsquo;m an amateur photographer at best. I bought an old{' '}
          <a href="http://camera-wiki.org/wiki/Yashica_FX-2" target="_blank" rel="noreferrer">
            Yashica FX-2
          </a>{' '}
          on eBay to try out film, and quickly learned how expensive it is to process. The DIYer in
          me figured out how to process and scan the film myself. I still don&lsquo;t{' '}
          <em>actually</em> know what I&lsquo;m doing, but it&lsquo;s enjoyable nonetheless.
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

        <div className="measure-wide">
          <ul className="list">
            {allPosts.map((post) => {
              return (
                <li key={post.slug}>
                  <Link href={`photography/${post.slug}`}>
                    <a>{post.title}</a>
                  </Link>
                  <p>
                    <small>{post.meta}</small>
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
  const allPosts = getAllPublishedPosts('photography', [
    'title',
    'date',
    'slug',
    'author',
    'published',
    'meta',
  ]);

  return {
    props: { allPosts },
  };
}

export default Photos;
