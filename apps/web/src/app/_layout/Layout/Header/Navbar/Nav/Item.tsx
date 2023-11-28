import classNames from 'classnames';
import Link from 'next/link';
import { type PropsWithChildren, type ComponentProps } from 'react';

import styles from './Item.module.scss';

type Props = PropsWithChildren<{
  href: ComponentProps<typeof Link>['href'];
  className?: string;
}>;

export function Item({ children, className, href }: Props) {
  return (
    <li className={styles.Item}>
      <Link className={classNames(styles.Item__link, className)} href={href}>
        {children}
      </Link>
    </li>
  );
}
