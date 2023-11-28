import classNames from 'classnames';
import Link from 'next/link';

import styles from './Brand.module.scss';

type Props = {
  className?: string;
};

export function Brand({ className }: Props) {
  return (
    <Link href="/" className={classNames(styles.Brand, className)}>
      Introduction to Domain Driven Design
    </Link>
  );
}
