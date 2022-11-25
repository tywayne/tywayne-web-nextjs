import { useState, useCallback, useEffect } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';
import Link from 'next/link';

import { InstagramIcon, TwitterIcon, GithubIcon, EmailIcon, BaseballIcon } from '../../assets';
import styles from './Footer.module.css';

export const DARK_MODE_KEY = 'DARK_MODE';
export const BLURB_ARRAY = [
  'Sorry about my thighs',
  'Eat the rich',
  'Men of quality fight for gender equality',
  'Public verdict not a boast',
  'Assume best intentions',
  'Pray for us, sinners now and at the hour of our death',
  'Meat is not masculine',
];

export default function Footer() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [blurbText, setBlurbText] = useState('');

  const setDarkMode = useCallback((on: boolean) => {
    const styleObj = document.documentElement.style;
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(on));

    styleObj.setProperty('--body-foreground', on ? '#fff' : '#242424');
    styleObj.setProperty('--body-background', on ? '#242424' : '#fff');
    styleObj.setProperty('--body-background-alt', on ? '#404040' : '#f7f7f7');
  }, []);

  const handleSetDarkMode = () => {
    setDarkMode(!darkModeEnabled);
    setDarkModeEnabled(!darkModeEnabled);
  };

  useEffect(() => {
    let storedValue: string | null;
    let matchMediaValue: boolean;

    if (typeof window !== 'undefined') {
      storedValue = localStorage.getItem(DARK_MODE_KEY);
      matchMediaValue = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      storedValue = null;
      matchMediaValue = false;
    }

    const enabled = storedValue !== null ? JSON.parse(storedValue) : matchMediaValue;
    setDarkModeEnabled(enabled);
    setDarkMode(enabled);
  }, [setDarkMode]);

  useEffect(() => {
    setBlurbText(BLURB_ARRAY[Math.floor(Math.random() * Math.floor(BLURB_ARRAY.length))]);
  }, [setBlurbText]);

  return (
    <footer className={cn(styles.footer, 'container--fluid')}>
      <div className={styles.footerCopy}>
        <p>&copy; {format(Date.now(), 'Y')} &mdash; Ty Carlson</p>
        <p>
          <button className={styles.darkModeToggle} onClick={() => handleSetDarkMode()}>
            Turn the lights {darkModeEnabled ? 'ON' : 'OFF'}
          </button>
        </p>
        <p>
          <em>
            <small className={styles.footerBlurb}>{blurbText}</small>
          </em>
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
          <a href="https://twitter.com/tywayne" title="Twitter">
            <span className="visually-hidden">View me on Twitter</span>
            <TwitterIcon />
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
          <Link href="/rowengartner">
            <span className="visually-hidden">Rowengartner</span>
            <BaseballIcon />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
