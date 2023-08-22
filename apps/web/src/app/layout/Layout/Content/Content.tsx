import { type PropsWithChildren } from 'react';

import styles from './Content.module.scss';

export function Content({ children }: PropsWithChildren) {
  return <main className={styles.Content}>{children}</main>;
}
