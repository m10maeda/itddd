'use server';

import { redirect } from 'next/navigation';

import { client } from '../../../../data-access/circles';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type State = {
  error?: boolean;
};

export async function deleteCircle(
  id: string,
  prevState: State,
): Promise<State> {
  const { error } = await client.DELETE('/{id}', {
    params: { path: { id } },
  });

  if (error) {
    if (error.status !== 404)
      return {
        ...prevState,
        error: true,
      };
  }

  redirect('/circles');
}
