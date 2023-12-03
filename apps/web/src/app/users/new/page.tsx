import Link from 'next/link';

import { UserRegisterForm } from './UserRegisterForm';

import type { Metadata } from 'next';

export default function Page() {
  return (
    <>
      <UserRegisterForm />

      <p>
        <Link href="/users">Back to user list page</Link>
      </p>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Register new user',
};
