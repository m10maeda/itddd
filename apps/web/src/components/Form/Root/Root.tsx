import { Slot } from '@radix-ui/react-slot';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

type Props = ComponentPropsWithoutRef<'form'> & {
  asChild?: boolean;
};

export const Root = forwardRef<ElementRef<'form'>, Props>(
  ({ asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'form';

    return <Component {...props} ref={ref} />;
  },
);
