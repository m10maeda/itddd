import { type Metadata } from 'next';
import Link from 'next/link';

import * as Alert from '../../../components/Alert';

export default function Page() {
  return (
    <Alert.Root>
      <Alert.Title>User not found</Alert.Title>

      <Alert.Body>
        <p>
          We couldn&apos;t find that user.
          <br />
          Go to <Link href="/">home</Link> or{' '}
          <Link href="/users">user list</Link>.
        </p>
      </Alert.Body>
    </Alert.Root>
  );
}

export const metadata: Metadata = {
  title: 'User not found',
};
