import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  useId,
  useEffect,
} from 'react';

import styles from './ErrorMessage.module.scss';
import { useSetErrorMessageIdContext } from '../Field';

type Props = ComponentPropsWithoutRef<'div'> & {
  asChild?: boolean;
};

export const ErrorMessage = forwardRef<ElementRef<'div'>, Props>(
  ({ asChild = false, className, ...props }, ref) => {
    const { set, unset } = useSetErrorMessageIdContext();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const id = props.id ?? useId();

    useEffect(() => {
      set(id);

      return () => {
        unset();
      };
    }, [id, set, unset]);

    const Component = asChild ? Slot : 'div';

    return (
      <Component
        role="alert"
        className={classNames(styles.ErrorMessage, className)}
        id={id}
        {...props}
        ref={ref}
      />
    );
  },
);
