import type { FC } from 'react';
import { useGetAllUsersQuery } from '../../../lib/generated';
import User from './User';

const UserList: FC = () => {
  const { loading, error, data } = useGetAllUsersQuery();

  if (loading) return <p>Loading...</p>;
  if (error || data === undefined) return <p>Error :(</p>;

  // data?.users;

  return (
    <>
      {data.users.map((user) => (
        <User key={user.id} id={user.id} name={user.name} />
      ))}
    </>
  );
};

export default UserList;
