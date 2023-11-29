import { type ComponentPropsWithoutRef } from 'react';

import { NoUsers } from './NoUsers';
import { User } from './User';

type Props = {
  users: ComponentPropsWithoutRef<typeof User>[];
};

export function UserList({ users }: Props) {
  if (users.length === 0) return <NoUsers />;

  return (
    <table>
      <colgroup>
        <col style={{ width: '4em' }} />
        <col />
        <col />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
        </tr>
      </thead>

      <tbody>
        {users.map(({ id, name, type }) => (
          <User key={id} id={id} name={name} type={type} />
        ))}
      </tbody>
    </table>
  );
}
