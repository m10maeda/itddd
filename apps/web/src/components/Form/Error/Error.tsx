import { forwardRef, type ComponentPropsWithRef, type ElementRef } from 'react';

import * as Alert from '../../Alert';

type Props = ComponentPropsWithRef<typeof Alert.Root>;

export const Error = forwardRef<ElementRef<typeof Alert.Root>, Props>(
  ({ children }, ref) => (
    <Alert.Root ref={ref}>
      <Alert.Body>{children}</Alert.Body>
    </Alert.Root>
  ),
);
