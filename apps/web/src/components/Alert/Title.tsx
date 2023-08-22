import { Slot } from '@radix-ui/react-slot';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

type Props = ComponentPropsWithoutRef<'h2'> & {
  asChild?: boolean;
};

export const Title = forwardRef<ElementRef<'h2'>, Props>(
  ({ asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'h2';

    return <Component {...props} ref={ref} />;
  },
);
