import styles from './Footer.module.scss';
import { LinkList } from './LinkList';

export function Footer() {
  return (
    <footer className={styles.Footer}>
      <LinkList />
    </footer>
  );
}
