import { Slot } from '@radix-ui/react-slot';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

type Props = ComponentPropsWithoutRef<'div'> & {
  asChild?: boolean;
};

export const Body = forwardRef<ElementRef<'div'>, Props>(
  ({ asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'div';

    return <Component {...props} ref={ref} />;
  },
);
