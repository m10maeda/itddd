import { type PropsWithChildren } from 'react';

import { Brand } from './Brand';
import { Nav } from './Nav';
import styles from './Navbar.module.scss';

export function Root({ children }: PropsWithChildren) {
  return (
    <nav className={styles.Navbar}>
      <Brand />

      {children ? <Nav>{children}</Nav> : null}
    </nav>
  );
}
