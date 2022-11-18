import { Analytics } from '@vercel/analytics/react';

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="My wife Lauren and I are raising my son Liam and daughter Remi in Oklahoma City, OK &mdash; where the wind comes sweepin&lsquo; down the plain, and the wavin&lsquo; wheat can sure smell sweet, when the wind comes right behind the rain."
        />
        <link rel="icon" href="/favicon.png" />

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ty Carlson" />
        <meta property="og:description" content="" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
