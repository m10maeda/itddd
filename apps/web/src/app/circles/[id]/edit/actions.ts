'use server';

import { redirect } from 'next/navigation';

import { client } from '../../../../data-access/circles';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type State = {
  errors?: {
    name?: string;
  };
  values?: {
    name: string;
  };
};

export async function editCircle(
  id: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const name = formData.get('name')?.toString();

  if (!name)
    return {
      ...prevState,
      errors: {
        ...prevState.errors,
        name: !name ? 'Name is required.' : prevState.errors?.name,
      },
      values: {
        ...prevState,
        name: '',
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

  const { error } = await client.PUT('/{id}', {
    params: { path: { id } },
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

  redirect(`/circles/${id}`);
}
