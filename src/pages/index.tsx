import type { NextPage } from 'next';
import Head from 'next/head';

import { getAllPublishedPosts } from '../lib/api';
import { generateFeed } from '../lib/generateFeed';
import { Layout } from '../components';
import { ReadingContent } from './reading';
import { PhotographyContent } from './photography';
import { CodeContent } from './code';
import ReadingType from '../types/reading';
import PhotosType from '../types/photos';
import CodeType from '../types/code';

type Props = {
  readingPosts: ReadingType[];
  photosPosts: PhotosType[];
  codePosts: CodeType[];
};

export const HomeContent = () => {
  return (
    <>
      <h1>hello, my name is ty carlson</h1>
      <p>
        I have been building websites, web apps, mobile apps, design systems, and most anything in
        between for over a decade. I am currently a Senior Frontend Engineer at{' '}
        <a href="https://midfirst.com/" target="_blank" rel="noreferrer nofollow">
          MidFirst Bank
        </a>
        , building next generation digital banking tools.
      </p>

      <p>I live in Oklahoma City, OK with my wife (Lauren), son (Liam), and daughter (Remi).</p>

      <p>
        Occasionally I enjoy taking on freelance projects. If you&lsquo;re looking for that sort of
        thing, feel free to <a href="mailto:tywayne@fastmail.com">email me</a>.
      </p>
    </>
  );
};

const Home: NextPage<Props> = ({ readingPosts, photosPosts, codePosts }: Props) => {
  return (
    <>
      <Head>
        <title>Ty Carlson</title>
      </Head>

      <Layout>
        <HomeContent />

        <hr />
        <h2>reading</h2>
        <ReadingContent posts={readingPosts} />

        <hr />
        <h2>photography</h2>
        <PhotographyContent posts={photosPosts} />

        <hr />
        <h2>code</h2>
        <CodeContent posts={codePosts} />
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  await generateFeed();

  const readingPosts = getAllPublishedPosts('reading', [
    'title',
    'date',
    'slug',
    'author',
    'published',
    'excerpt',
    'book_count',
    'goal',
  ]);

  const photosPosts = getAllPublishedPosts('photography', [
    'title',
    'date',
    'slug',
    'author',
    'published',
    'excerpt',
  ]);

  const codePosts = getAllPublishedPosts('code', [
    'title',
    'date',
    'slug',
    'author',
    'published',
    'excerpt',
    'link',
  ]);

  return {
    props: { readingPosts, photosPosts, codePosts },
  };
}

export default Home;
