import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  useId,
  useEffect,
} from 'react';

import styles from './Description.module.scss';
import { useSetDescriptionIdsContext } from '../Field';

type Props = ComponentPropsWithoutRef<'div'> & {
  asChild?: boolean;
};

export const Description = forwardRef<ElementRef<'div'>, Props>(
  ({ asChild = false, className, ...props }, ref) => {
    const { addId, removeId } = useSetDescriptionIdsContext();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const id = props.id ?? useId();

    useEffect(() => {
      addId(id);

      return () => {
        removeId(id);
      };
    }, [id, addId, removeId]);

    const Component = asChild ? Slot : 'div';

    return (
      <Component
        className={classNames(styles.Description, className)}
        id={id}
        {...props}
        ref={ref}
      />
    );
  },
);
