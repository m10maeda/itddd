'use server';

import { redirect } from 'next/navigation';

import { client } from '../../../../../data-access/circles';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type State = {
  error?: boolean;
};

export async function addMember(
  circleId: string,
  memberId: string,
  prevState: State,
): Promise<State> {
  const { error } = await client.POST('/{id}/members', {
    params: { path: { id: circleId } },
    body: { memberId },
  });

  if (error)
    return {
      ...prevState,
      error: true,
    };

  redirect(`/circles/${circleId}/add-member`);
}
