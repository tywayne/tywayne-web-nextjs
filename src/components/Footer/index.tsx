import { useState, useCallback, useEffect, useRef, MouseEvent } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';
import Link from 'next/link';

import {
  InstagramIcon,
  GithubIcon,
  EmailIcon,
  BaseballIcon,
  RssIcon,
  BlueSkyIcon,
} from '../../assets';
import styles from './Footer.module.css';

export const DARK_MODE_KEY = 'DARK_MODE';

export default function Footer() {
  const darkModePref = useRef<MediaQueryList | null>(null);

  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const setDarkMode = useCallback((on: boolean, skipStorage: boolean = false) => {
    const styleObj = document.documentElement.style;

    styleObj.setProperty('--body-foreground', on ? '#e4dbcd' : '#33403d');
    styleObj.setProperty('--body-background', on ? '#33403d' : '#e4dbcd');
    styleObj.setProperty('--body-background-alt', on ? '#56625e' : '#bbb5aa');

    if (!skipStorage) localStorage.setItem(DARK_MODE_KEY, JSON.stringify(on));
  }, []);

  useEffect(() => {
    darkModePref.current = window.matchMedia('(prefers-color-scheme: dark)');
  }, []);

  const handleColorSchemeChange = useCallback(
    (e: MediaQueryListEvent) => {
      setDarkMode(e.matches, true);
      setDarkModeEnabled(e.matches);
    },
    [setDarkMode],
  );

  useEffect(() => {
    const storedPref = localStorage.getItem(DARK_MODE_KEY);
    const currentPref = darkModePref.current as MediaQueryList;

    currentPref.addEventListener('change', (e) => {
      if (storedPref !== null) return;
      handleColorSchemeChange(e);
    });

    return () => currentPref.removeEventListener('change', handleColorSchemeChange);
  }, [handleColorSchemeChange]);

  const toggleDarkMode = useCallback(
    (on: boolean) => {
      setDarkMode(on);
      setDarkModeEnabled(on);
    },
    [setDarkMode, setDarkModeEnabled],
  );

  const handleClickToggle = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      toggleDarkMode(!darkModeEnabled);
    },
    [toggleDarkMode, darkModeEnabled],
  );

  useEffect(() => {
    let storedValue: string | null;
    let matchMediaValue: boolean;

    if (typeof window !== 'undefined') {
      storedValue = localStorage.getItem(DARK_MODE_KEY);
      matchMediaValue = (darkModePref.current as MediaQueryList).matches;
    } else {
      storedValue = null;
      matchMediaValue = false;
    }

    const enabled = storedValue !== null ? JSON.parse(storedValue) : matchMediaValue;
    setDarkModeEnabled(enabled);
    setDarkMode(enabled, storedValue === null);
  }, [setDarkMode]);

  return (
    <footer className={cn(styles.footer, 'container--fluid')}>
      <div className={styles.footerCopy}>
        <p>&copy; {format(Date.now(), 'Y')} &mdash; Ty Carlson</p>
        <p>
          <button className={styles.darkModeToggle} onClick={handleClickToggle}>
            Turn the lights {darkModeEnabled ? 'ON' : 'OFF'}
          </button>
        </p>
      </div>
      <ul className={styles.footerNav}>
        <li>
          <a href="https://instagram.com/tywayne" title="Instagram">
            <span className="visually-hidden">View me on Instagram</span>
            <InstagramIcon />
          </a>
        </li>
        <li>
          <a href="https://bsky.app/profile/tywayne.com" title="BlueSkey">
            <span className="visually-hidden">View me on BlueSky</span>
            <BlueSkyIcon />
          </a>
        </li>
        <li>
          <a href="https://github.com/tywayne" title="Github">
            <span className="visually-hidden">View me on Github</span>
            <GithubIcon />
          </a>
        </li>
        <li>
          <a href="mailto:tywayne@fastmail.com" title="Email">
            <span className="visually-hidden">Send an Email</span>
            <EmailIcon />
          </a>
        </li>
        <li>
          <a href="/rss.xml" title="RSS Feed">
            <span className="visually-hidden">Subscribe to RSS Feed</span>
            <RssIcon />
          </a>
        </li>
        <li>
          <Link href="/rowengartner">
            <span className="visually-hidden">Rowengartner</span>
            <BaseballIcon />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
