import { FC, ComponentPropsWithoutRef } from 'react';

import UserDeleteForm from './UserDeleteForm';
import useUserDeleteForm from './useUserDeleteForm';

type Props = Omit<
  ComponentPropsWithoutRef<typeof UserDeleteForm>,
  'onSubmit'
> & { id: string };

const UserDeleteFormContainer: FC<Props> = ({ id }) => {
  const { handleSubmit } = useUserDeleteForm(id);

  return <UserDeleteForm onSubmit={handleSubmit} />;
};

export default UserDeleteFormContainer;
