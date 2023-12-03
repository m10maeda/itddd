import { type Metadata } from 'next';
import Link from 'next/link';

import { getUser } from './getUser';
import { User } from './User';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  return (
    <>
      <User userId={id} />

      <p>
        <Link href="/users">Back to user list page</Link>
      </p>
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const { name } = await getUser(id);

  return {
    title: name,
    description: `${name}'s information.`,
  };
}
