'use server';

import { redirect } from 'next/navigation';

import { client } from '../../../data-access/circles';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type State = {
  errors?: {
    name?: string;
    owner?: string;
  };
  values?: {
    name: string;
  };
};

export async function registerCircle(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const name = formData.get('name')?.toString();
  const owner = formData.get('owner')?.toString();

  if (!name || !owner)
    return {
      ...prevState,
      errors: {
        ...prevState.errors,
        name: !name ? 'Name is required.' : prevState.errors?.name,
        owner: !owner ? 'Owner is required.' : prevState.errors?.owner,
      },
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

  const { error, response } = await client.POST('/', {
    body: { name, owner },
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

  redirect(id ? `/circles/${id}` : '/circles');
}
