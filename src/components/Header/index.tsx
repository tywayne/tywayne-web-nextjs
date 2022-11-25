import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Header.module.css';

interface NavLink {
  url: string;
  label: string;
}

const mainNavLinks: NavLink[] = [
  // {
  //   url: '/blog',
  //   label: 'blog',
  // },
  {
    url: '/reading',
    label: 'reading',
  },
  {
    url: '/photography',
    label: 'photography',
  },
];

export default function Header() {
  const router = useRouter();
  return (
    <nav className={cn('container--fluid', styles.siteNav)}>
      <ul>
        <li>
          <Link
            href="/"
            className={cn(styles.siteNavLink, {
              [styles.selected]: router.pathname === '/',
            })}
          >
            {'//'}
          </Link>
        </li>
        {mainNavLinks.map((link) => {
          return (
            <li key={link.url}>
              <Link
                href={link.url}
                className={cn(styles.siteNavLink, {
                  [styles.selected]: router.pathname.includes(link.url),
                })}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
