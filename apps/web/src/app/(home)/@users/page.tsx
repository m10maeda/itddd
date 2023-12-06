import Link from 'next/link';

import { UserListContainer } from '../../users/UserListContainer';

export default async function Page() {
  return (
    <>
      <h2>User list</h2>

      <Link href="/users/new">Register new user</Link>

      <UserListContainer />
    </>
  );
}
