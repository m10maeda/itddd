'use server';

import { redirect } from 'next/navigation';

import { client as profileApiClient } from '../../../data-access/profiles';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type State = {
  error?: boolean;
};

export async function deleteUser(id: string, prevState: State): Promise<State> {
  const { error } = await profileApiClient.DELETE('/{id}', {
    params: { path: { id } },
  });

  if (error) {
    if (error.status !== 404)
      return {
        ...prevState,
        error: true,
      };
  }

  redirect('/users');
}
