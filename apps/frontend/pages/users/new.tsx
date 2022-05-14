import Head from 'next/head';
import type { NextPage } from 'next';
import { UserRegisterPage } from '@itddd/frontend/feature/user';

const UserRegister: NextPage = () => (
  <>
    <Head>
      <title>User Register</title>
    </Head>

    <UserRegisterPage />
  </>
);

export default UserRegister;
