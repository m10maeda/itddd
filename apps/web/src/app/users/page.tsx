import { type Metadata } from 'next';
import Link from 'next/link';

import { UserListContainer } from './UserListContainer';

export default async function Page() {
  return (
    <>
      <h1>User List</h1>

      <p>
        <Link href="/users/new">Register new user</Link>
      </p>

      <UserListContainer />
    </>
  );
}

export const metadata: Metadata = {
  title: 'User list',
  description: 'List of users.',
};
