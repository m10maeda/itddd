import classNames from 'classnames';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import styles from './Radio.module.scss';
import { useDescriptionIdsContext } from '../Field';

type Props = ComponentPropsWithoutRef<'input'> & {
  asChild?: boolean;
  plain?: boolean;
};

export const Radio = forwardRef<ElementRef<'input'>, Props>(
  ({ className, children, ...props }, ref) => {
    const describedIds = useDescriptionIdsContext();

    return (
      <label className={classNames(styles.Radio, className)}>
        <input
          type="radio"
          className={styles.Radio__button}
          aria-describedby={describedIds?.join(' ')}
          {...props}
          ref={ref}
        />
        {children}
      </label>
    );
  },
);
