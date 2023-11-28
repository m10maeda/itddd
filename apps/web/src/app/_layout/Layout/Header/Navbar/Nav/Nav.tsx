import classNames from 'classnames';
import { type PropsWithChildren } from 'react';

import styles from './Nav.module.scss';

type Props = PropsWithChildren<{ className: string }>;

export function Nav({ children, className }: Props) {
  return <ul className={classNames(styles.Nav, className)}>{children}</ul>;
}
