import type { NextPage } from 'next';
import Head from 'next/head';

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
          I am a designer and developer with a decade of experience in building websites, products,
          and systems in a variety of industries. I am currently a Developer at{' '}
          <a href="https://midfirst.com/" target="_blank" rel="noreferrer nofollow">
            MidFirst Bank
          </a>
          , building next generation digital banking experiences.
        </p>

        <p>I live in Oklahoma City, OK with my wife (Lauren), son (Liam), and daughter (Remi).</p>

        <p>
          I occasionally take on freelance design or development projects. If you&lsquo;re looking
          for that sort of thing, feel free to <a href="mailto:tywayne@fastmail.com">email me</a>.
        </p>
      </Layout>
    </>
  );
};

export default Home;
