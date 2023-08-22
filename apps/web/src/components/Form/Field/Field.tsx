import { Slot } from '@radix-ui/react-slot';
import classNames from 'classnames';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  useId,
} from 'react';

import { ControlIdProvider } from './ControlIdProvider';
import { DescriptionIdsProvider } from './DescriptionIdsProvider';
import { ErrorMessageIdProvider } from './ErrorMessageIdProvider';
import styles from './Field.module.scss';
import { FieldProvider } from './FieldProvider';

type Props = ComponentPropsWithoutRef<'div'> & {
  asChild?: boolean;
  fieldset?: boolean;
};

export const Field = forwardRef<ElementRef<'div'>, Props>(
  (
    { id, children, className, asChild = false, fieldset = false, ...props },
    ref,
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const controlId = id ?? useId();
    const Wrapper = fieldset ? 'fieldset' : 'div';
    const Component = asChild ? Slot : Wrapper;

    return (
      <FieldProvider fieldset={fieldset}>
        <ErrorMessageIdProvider>
          <DescriptionIdsProvider>
            <ControlIdProvider controlId={controlId}>
              <Slot
                className={classNames(styles.Field, className)}
                {...props}
                ref={ref}
              >
                <Component>{children}</Component>
              </Slot>
            </ControlIdProvider>
          </DescriptionIdsProvider>
        </ErrorMessageIdProvider>
      </FieldProvider>
    );
  },
);
