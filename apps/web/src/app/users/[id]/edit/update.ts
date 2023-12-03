'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { graphql } from '../../../../lib/api-client/__generated__/gql';
import { getClient } from '../../../../lib/api-client/client';

const UpdateUserMutationDocument = graphql(`
  mutation updateUser($id: ID!, $updateUserData: UpdateUserInput!) {
    updateUser(id: $id, updateUserData: $updateUserData) {
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

      ... on CanNotRegisterUserError {
        __typename
        name
        message
      }
    }
  }
`);

export type State = {
  message?: string;
  isSubmitSuccessful: boolean;
  errors: {
    name?: string[];
  };
};

const schema = z.object({
  id: z.string().min(1),
  name: z
    .string({ invalid_type_error: 'Please enter a name.' })
    .min(1, { message: 'Name must be between 1 and 20 characters.' })
    .max(20, { message: 'Name must be between 1 and 20 characters.' }),
});

export async function update(prevState: State, data: FormData) {
  const validatedFields = schema.safeParse({
    id: data.get('id'),
    name: data.get('name'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'There are items that require your attention.',
    };
  }

  const { id, name } = validatedFields.data;

  try {
    cookies();

    const { data: result } = await getClient().mutate({
      mutation: UpdateUserMutationDocument,
      variables: {
        id,
        updateUserData: {
          name,
        },
      },
      fetchPolicy: 'no-cache',
    });

    if (!result) {
      return {
        ...prevState,
        message: 'Oops... something went wrong.',
      };
    }

    // eslint-disable-next-line no-underscore-dangle
    if (result.updateUser.__typename === 'UserNotFoundError')
      return {
        ...prevState,
        errors: {
          name: ['User is not found.'],
        },
      };

    // eslint-disable-next-line no-underscore-dangle
    if (result.updateUser.__typename === 'CanNotRegisterUserError')
      return {
        ...prevState,
        errors: {
          name: ['Name is duplicated.'],
        },
      };

    revalidatePath(`/users/${id}`);

    return {
      ...prevState,
      isSubmitSuccessful: true,
    };
  } catch (error) {
    return {
      ...prevState,
      message: 'Oops... something went wrong.',
    };
  }
}
