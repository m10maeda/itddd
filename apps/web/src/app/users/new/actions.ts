'use server';

import { redirect } from 'next/navigation';

import { client as profileApiClient } from '../../../data-access/profiles';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type State = {
  errors?: {
    name?: string;
  };
  values?: {
    name: string;
  };
};

export async function registerUser(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const name = formData.get('name')?.toString();

  if (!name)
    return {
      ...prevState,
      errors: { ...prevState.errors, name: 'Name is required.' },
      values: { name: '' },
    };

  if (name.length < 3)
    return {
      ...prevState,
      errors: {
        ...prevState.errors,
        name: 'Name must be at least 3 characters long.',
      },
    };

  if (name.length > 20)
    return {
      ...prevState,
      errors: {
        ...prevState.errors,
        name: 'Name must be 20 characters or less.',
      },
    };

  const { error, response } = await profileApiClient.POST('/', {
    body: { name },
  });

  if (error?.status === 400)
    return {
      ...prevState,
      errors: { ...prevState.errors, name: 'Name is invalid.' },
      values: { ...prevState.values, name },
    };

  if (error?.status === 409)
    return {
      ...prevState,
      errors: {
        ...prevState.errors,
        name: 'This name is already registered.',
      },
      values: { ...prevState.values, name },
    };

  const id = response.headers.get('location')?.split('/')[1];

  redirect(id ? `/users/${id}` : '/users');
}
