import Link from 'next/link';

import { getUser } from './getUser';
import { UserDeleteForm } from './UserDeleteForm';

type Props = {
  userId: string;
};

export async function User({ userId }: Props) {
  const user = await getUser(userId);

  return (
    <>
      <h1>{user.name}</h1>

      <div>
        <Link href={`/users/${user.id}/edit`}>Edit</Link>

        <UserDeleteForm userId={user.id} />
      </div>

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
