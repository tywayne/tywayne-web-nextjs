import Header from '../Header';
import Footer from '../Footer';
import cn from 'classnames';

import styles from './Layout.module.css';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={cn(styles.siteContent, 'container')}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
