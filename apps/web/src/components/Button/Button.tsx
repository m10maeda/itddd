import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import styles from './Button.module.scss';

type Variant = 'primary' | 'link';

type Props = ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
  variant?: Variant;
};

export const Button = forwardRef<ElementRef<'button'>, Props>(
  ({ className, asChild = false, variant = 'primary', ...props }, ref) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        className={classNames(
          styles.Button,
          styles[`Button--${variant}`],
          className,
        )}
        type="button"
        {...props}
        ref={ref}
      />
    );
  },
);
