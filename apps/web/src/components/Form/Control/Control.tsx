import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import styles from './Control.module.scss';
import {
  useControlIdContext,
  useDescriptionIdsContext,
  useErrorMessageIdContext,
} from '../Field';

type Props = ComponentPropsWithoutRef<'input'> & {
  asChild?: boolean;
  plain?: boolean;
};

export const Control = forwardRef<ElementRef<'input'>, Props>(
  (
    {
      asChild = false,
      className,
      plain = false,
      readOnly: propsReadOnly,
      ...props
    },
    ref,
  ) => {
    const controlId = useControlIdContext();
    const errorMessageId = useErrorMessageIdContext();
    const describedIds = useDescriptionIdsContext();
    const Component = asChild ? Slot : 'input';
    const readOnly = plain ? true : propsReadOnly;

    return (
      <Component
        type="text"
        id={controlId}
        className={classNames(
          styles.Control,
          { [styles['Control--plain']]: plain },
          className,
        )}
        aria-errormessage={errorMessageId}
        aria-describedby={describedIds?.join(' ')}
        readOnly={readOnly}
        {...props}
        ref={ref}
      />
    );
  },
);
