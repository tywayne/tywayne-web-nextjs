import type { NextPage } from 'next';
import Head from 'next/head';

import { generateFeed } from '../lib/generateFeed';
import { Layout } from '../components';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ty Carlson</title>
      </Head>

      <Layout>
        <h2>Hello, my name is Ty Carlson</h2>
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
          Occasionally I enjoy taking on freelance projects. If you&lsquo;re looking for that sort
          of thing, feel free to <a href="mailto:tywayne@fastmail.com">email me</a>.
        </p>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  await generateFeed();
  return { props: {} };
}

export default Home;
