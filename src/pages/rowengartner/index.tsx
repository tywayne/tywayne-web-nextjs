import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import styles from './styles.module.css';

const Parts = [
  new Set(['Rulen', 'Raven', 'Rosen', 'Roven', 'Roger', 'Rowen', 'Runna', 'Rollin']),
  new Set([
    'verter',
    'boozer',
    'gagger',
    'grueter',
    'grooten',
    'gardener',
    'gartner',
    'mucker',
    'fruiter',
  ]),
];

function getRandomItem(set: Set<string>) {
  const items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
}

type Props = {
  part1: string;
  part2: string;
};

const Rowengartner: NextPage<Props> = ({ part1, part2 }) => {
  const [lastName, setLastName] = useState(`${part1}${part2}`);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastName(`${getRandomItem(Parts[0])}${getRandomItem(Parts[1])}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const title = `Henry ${lastName}`;

  return (
    <>
      <Head>
        <title>Henry {lastName}</title>
        <meta name="description" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={title} />
      </Head>

      <article
        className={styles.wrapper}
        style={{
          background: "url( '/images/henry.jpg' ) top center no-repeat",
          backgroundSize: 'cover',
        }}
      >
        <div>
          <h1 className={styles.title}>
            Henry <span>{lastName}</span>
          </h1>
        </div>
      </article>
    </>
  );
};

export async function getServerSideProps() {
  const part1 = getRandomItem(Parts[0]);
  const part2 = getRandomItem(Parts[1]);

  return { props: { part1, part2 } };
}

export default Rowengartner;
