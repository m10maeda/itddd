'use server';

import { redirect } from 'next/navigation';

import { client } from '../../../../../data-access/circles';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type State = {
  error?: boolean;
};

export async function removeMember(
  circleId: string,
  memberId: string,
  prevState: State,
): Promise<State> {
  const { error } = await client.DELETE('/{id}/members/{memberId}', {
    params: { path: { id: circleId, memberId } },
  });

  if (error) {
    if (error.status !== 404)
      return {
        ...prevState,
        error: true,
      };
  }

  redirect(`/circles/${circleId}`);
}
