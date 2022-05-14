import Head from 'next/head';
import type { NextPage, GetServerSideProps } from 'next';
import {
  GetUserQuery,
  GetUserDocument,
  UserDetailPage,
} from '@itddd/frontend/feature/user';
import type { ComponentPropsWithoutRef } from 'react';

import { createApplloClient } from '../../libs';

type Props = ComponentPropsWithoutRef<typeof UserDetailPage>;

const User: NextPage<Props> = ({ user }) => (
  <>
    <Head>
      <title>User</title>
    </Head>

    <UserDetailPage user={user} />
  </>
);

const client = createApplloClient();

type Query = { id: string };

export const getServerSideProps: GetServerSideProps<Props, Query> = async (
  context,
) => {
  const { id } = context.params;
  const { data } = await client.query<GetUserQuery>({
    query: GetUserDocument,
    variables: { id },
    fetchPolicy: 'no-cache',
  });

  const { user } = data;

  // eslint-disable-next-line no-underscore-dangle
  if (user.__typename === 'UserNotFoundError') {
    return { notFound: true };
  }

  return {
    props: {
      user: {
        id: user.id,
        name: user.name,
      },
    },
  };
};

export default User;
