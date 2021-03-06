import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../../styles/Rowengartner.module.css';

const Parts = [
  ['Rulen', 'Raven', 'Rosen', 'Roven', 'Roger', 'Rowen', 'Runna', 'Rollin'],
  ['verter', 'boozer', 'gagger', 'grueter', 'grooten', 'gardener', 'gartner', 'mucker', 'fruiter'],
];

function getRandom(arr: string[]) {
  return Math.floor(Math.random() * arr.length);
}

type Props = {
  part1: string;
  part2: string;
};

const Rowengartner: NextPage<Props> = ({ part1, part2 }) => {
  const [partOne, setPartOne] = useState(part1);
  const [partTwo, setPartTwo] = useState(part2);

  useEffect(() => {
    const interval = setInterval(() => {
      setPartOne(Parts[0][getRandom(Parts[0])]);
      setPartTwo(Parts[1][getRandom(Parts[1])]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>
          Henry {partOne}
          {partTwo}
        </title>
        <meta name="description" content={`Henry ${partOne}${partTwo}`} />
        <meta property="og:title" content={`Henry ${partOne}${partTwo}`} />
        <meta property="og:description" content={`Henry ${partOne}${partTwo}`} />
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
            Henry <span id="part_one">{partOne}</span>
            <span id="part_two">{partTwo}</span>
          </h1>
        </div>
      </article>
    </>
  );
};

export async function getServerSideProps() {
  const part1 = Parts[0][getRandom(Parts[0])];
  const part2 = Parts[1][getRandom(Parts[1])];

  return { props: { part1, part2 } };
}

export default Rowengartner;
