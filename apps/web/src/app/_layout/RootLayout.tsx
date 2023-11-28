import { type PropsWithChildren } from 'react';

import * as Layout from './Layout';
import * as Navbar from './Layout/Header/Navbar';

export function RootLayout({ children }: PropsWithChildren) {
  return (
    <Layout.Root>
      <Layout.Header>
        <Navbar.Root>
          <Navbar.Link href="/users">Users</Navbar.Link>
        </Navbar.Root>
      </Layout.Header>

      <Layout.Content>{children}</Layout.Content>

      <Layout.Footer />
    </Layout.Root>
  );
}
