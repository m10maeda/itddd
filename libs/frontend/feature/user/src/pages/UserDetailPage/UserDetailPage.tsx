import type { FC } from 'react';
import UserDeleteForm from './UserDeleteForm';
import UserUpdateForm from './UserUpdateForm';

type Props = {
  user: {
    id: string;
    name: string;
  };
};

const UserDetailPage: FC<Props> = ({ user }) => (
  <>
    <h1>{user.name}</h1>

    <UserUpdateForm id={user.id} name={user.name} />

    <UserDeleteForm id={user.id} />
  </>
);

export default UserDetailPage;
