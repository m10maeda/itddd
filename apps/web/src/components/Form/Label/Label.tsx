import { Slot } from '@radix-ui/react-slot';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { useControlIdContext, useFieldContext } from '../Field';

type Props = ComponentPropsWithoutRef<'label'>;

export const Label = forwardRef<ElementRef<'label'>, Props>(
  ({ children, ...props }, ref) => {
    const fieldset = useFieldContext();
    const controlId = useControlIdContext();

    return (
      <div>
        <Slot {...props} ref={ref}>
          {fieldset ? (
            <legend>{children}</legend>
          ) : (
            <label htmlFor={controlId}>{children}</label>
          )}
        </Slot>
      </div>
    );
  },
);
