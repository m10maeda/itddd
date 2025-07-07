import { Button as HeadlessButton } from '@headlessui/react';
import clsx from 'clsx';

import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<typeof HeadlessButton> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'link';
};

export function Button({
  children,
  className,
  variant = 'primary',
  ...props
}: Props) {
  return (
    <HeadlessButton
      type="button"
      className={clsx(
        'py-2.5 px-5 font-medium rounded-lg focus:ring-4 focus:outline-none',
        variant === 'primary' &&
          'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
        variant === 'secondary' &&
          'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700',
        variant === 'danger' &&
          'bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
        variant === 'link' &&
          'text-blue-700 hover:text-blue-800 focus:ring-blue-300 dark:text-blue-500 dark:hover:text-blue-600 dark:focus:ring-blue-800',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        className,
      )}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
}
