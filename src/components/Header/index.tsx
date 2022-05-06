import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Header.module.css';

interface NavLink {
  url: string;
  label: string;
}

const mainNavLinks: NavLink[] = [
  {
    url: '/blog',
    label: 'Blog',
  },

  {
    url: '/reading',
    label: 'Reading',
  },

  {
    url: '/photography',
    label: 'Photo',
  },
];

export default function Header() {
  const router = useRouter();
  return (
    <nav className={classNames('container--fluid', styles.siteNav)}>
      <ul>
        <li>
          <Link href="/">
            <a
              className={classNames(styles.siteNavLink, {
                [styles.selected]: router.pathname === '/',
              })}
            >
              {'//'}
            </a>
          </Link>
        </li>
        {mainNavLinks.map((link) => {
          return (
            <li key={link.url}>
              <Link href={link.url}>
                <a
                  className={classNames(styles.siteNavLink, {
                    [styles.selected]: router.pathname === link.url,
                  })}
                >
                  {link.label}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
