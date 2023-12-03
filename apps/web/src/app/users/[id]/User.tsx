import Link from 'next/link';

import { getUser } from './getUser';

type Props = {
  userId: string;
};

export async function User({ userId }: Props) {
  const user = await getUser(userId);

  return (
    <>
      <h1>{user.name}</h1>

      <p>
        <Link href={`/users/${user.id}/edit`}>Edit</Link>
      </p>

      <table>
        <colgroup>
          <col style={{ width: '20%' }} />
          <col />
        </colgroup>

        <tbody>
          <tr>
            <th scope="col">id</th>
            <td>{user.id}</td>
          </tr>

          <tr>
            <th scope="col">type</th>
            <td>{user.type}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
