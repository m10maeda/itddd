import type { ReactNode, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  users: ReactNode;
};

export default function Layout({ children, users }: Props) {
  return (
    <>
      {children}

      {users}
    </>
  );
}
