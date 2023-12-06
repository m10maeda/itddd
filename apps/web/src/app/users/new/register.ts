'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { graphql } from '../../../lib/api-client/__generated__/gql';
import { getClient } from '../../../lib/api-client/client';

const RegisterUserMutationDocument = graphql(`
  mutation registerUser($registerUserData: RegisterUserInput!) {
    registerUser(registerUserData: $registerUserData) {
      ... on User {
        __typename
        id
        name
        type
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
  result?: {
    id: string;
    name: string;
  };
};

const schema = z.object({
  name: z
    .string({ invalid_type_error: 'Please enter a name.' })
    .min(1, { message: 'Name must be between 1 and 20 characters.' })
    .max(20, { message: 'Name must be between 1 and 20 characters.' }),
});

export async function register(
  prevState: State,
  data: FormData,
): Promise<State> {
  const validatedFields = schema.safeParse({
    name: data.get('name'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'There are items that require your attention.',
    };
  }

  try {
    cookies();

    const { name } = validatedFields.data;
    const { data: result } = await getClient().mutate({
      mutation: RegisterUserMutationDocument,
      variables: {
        registerUserData: {
          name,
        },
      },
      fetchPolicy: 'no-cache',
    });

    if (!result) {
      return {
        ...prevState,
        message: 'error',
      };
    }

    // eslint-disable-next-line no-underscore-dangle
    if (result.registerUser.__typename === 'CanNotRegisterUserError')
      return {
        ...prevState,
        errors: {
          name: ['Name is duplicated.'],
        },
      };

    revalidatePath('/users');

    return {
      ...prevState,
      errors: {
        name: undefined,
      },
      isSubmitSuccessful: true,
      result: {
        id: result.registerUser.id,
        name: result.registerUser.name,
      },
    };
  } catch (error) {
    return {
      ...prevState,
      message: 'Oops... something went wrong.',
    };
  }
}
