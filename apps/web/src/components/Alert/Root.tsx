import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import styles from './Alert.module.scss';

type Variant = 'danger' | 'success';

type Props = ComponentPropsWithoutRef<'div'> & {
  asChild?: boolean;
  variant?: Variant;
};

export const Root = forwardRef<ElementRef<'div'>, Props>(
  ({ asChild = false, variant = 'danger', className, ...props }, ref) => {
    const Component = asChild ? Slot : 'div';

    return (
      <Component
        role="alert"
        className={classNames(
          styles.Alert,
          styles[`Alert--${variant}`],
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);
