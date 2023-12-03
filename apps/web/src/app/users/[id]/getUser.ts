import { notFound } from 'next/navigation';

import { graphql } from '../../../lib/api-client/__generated__/gql';
import { getClient } from '../../../lib/api-client/client';

const GetUserQueryDocument = graphql(`
  query getUser($id: ID!) {
    user(id: $id) {
      ... on User {
        __typename
        id
        name
        type
      }

      ... on UserNotFoundError {
        __typename
        id
        message
      }
    }
  }
`);

export async function getUser(id: string) {
  const { data } = await getClient().query({
    query: GetUserQueryDocument,
    variables: { id },
    fetchPolicy: 'no-cache',
  });

  const { user } = data;

  // eslint-disable-next-line no-underscore-dangle
  if (user.__typename === 'UserNotFoundError') {
    notFound();
  }

  return user;
}
