import { type PropsWithChildren } from 'react';

import { RootLayout as Layout } from './_layout';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
