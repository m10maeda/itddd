import classNames from 'classnames';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import styles from './Radio.module.scss';

type Props = ComponentPropsWithoutRef<'input'> & {
  asChild?: boolean;
  plain?: boolean;
};

export const RadioGroup = forwardRef<ElementRef<'input'>, Props>(
  ({ children, className, ...props }, ref) => (
      <div
        className={classNames(styles.RadioGroup, className)}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    ),
);
