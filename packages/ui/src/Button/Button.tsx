'use client';

import classNames from 'classnames';

import styles from './Button.module.scss';

import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'>;

export function Button({ className, ...props }: Props) {
  return (
    <button
      className={classNames(styles.Button, className)}
      type="button"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
