import styles from './LinkList.module.scss';

export function LinkList() {
  return (
    <ul className={styles.LinkList}>
      <li className={styles.LinkList__item}>
        <a href="https://github.com/m10maeda/itddd">GitHub</a>
      </li>
    </ul>
  );
}
