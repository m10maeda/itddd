import { type PropsWithChildren } from 'react';

import styles from './Header.module.scss';

export function Header({ children }: PropsWithChildren) {
  return <header className={styles.Header}>{children}</header>;
}
