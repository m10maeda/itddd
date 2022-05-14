import Head from 'next/head';
import type { NextPage } from 'next';
import { UserListPage } from '@itddd/frontend/feature/user';

const UserList: NextPage = () => (
  <>
    <Head>
      <title>User List</title>
    </Head>

    <UserListPage />
  </>
);

export default UserList;
