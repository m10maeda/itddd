'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { graphql } from '../../../lib/api-client/__generated__/gql';
import { getClient } from '../../../lib/api-client/client';

const DeleteUserMutationDocument = graphql(`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      __typename

      ... on UserDelete {
        __typename
        id
        result
      }

      __typename
      ... on UserNotFoundError {
        __typename
        id
        message
      }
    }
  }
`);

export type State = {
  message?: string;
};

// eslint-disable-next-line consistent-return
export async function deleteAction(prevState: State, data: FormData) {
  const id = data.get('id');

  if (!id) {
    return {
      ...prevState,
      message: 'System error',
    };
  }

  try {
    cookies();

    const { data: result } = await getClient().mutate({
      mutation: DeleteUserMutationDocument,
      variables: { id: id.toString() },
      fetchPolicy: 'no-cache',
    });

    if (!result) {
      return {
        ...prevState,
        message: 'Oops... something went wrong.',
      };
    }

    // eslint-disable-next-line no-underscore-dangle
    if (result.deleteUser.__typename === 'UserNotFoundError') {
      return {
        ...prevState,
        message: `User("id: ${id.toString()}") is not found.`,
      };
    }
  } catch (error) {
    return {
      ...prevState,
      message: 'Oops... something went wrong.',
    };
  }

  revalidatePath('/users');
  redirect(`/users`);
}
