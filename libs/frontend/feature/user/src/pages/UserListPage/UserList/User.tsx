import Link from 'next/link';
import type { FC } from 'react';

type Props = {
  id: string;
  name: string;
};

const User: FC<Props> = ({ id, name }) => (
  <li>
    <Link href={`/users/${id}`}>{name}</Link>
  </li>
);

export default User;
