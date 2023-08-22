import { Slot } from '@radix-ui/react-slot';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import classNames from 'classnames';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import styles from './Spinner.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  asChild?: boolean;
};

export const Spinner = forwardRef<ElementRef<'div'>, Props>(
  ({ asChild = false, className, ...props }, ref) => {
    const Component = asChild ? Slot : 'div';

    return (
      <Component
        role="status"
        className={classNames(styles.Spinner, className)}
        {...props}
        ref={ref}
      >
        <VisuallyHidden>Loading...</VisuallyHidden>
      </Component>
    );
  },
);
