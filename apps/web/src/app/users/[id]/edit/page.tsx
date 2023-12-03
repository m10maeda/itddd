import Link from 'next/link';

import { UserUpdateForm } from './UserUpdateForm';
import { getUser } from '../getUser';

import type { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const user = await getUser(params.id);

  return (
    <>
      <UserUpdateForm userId={user.id} userName={user.name} />

      <p>
        <Link href="/users">Back to user list page</Link>
      </p>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Update user information',
};
