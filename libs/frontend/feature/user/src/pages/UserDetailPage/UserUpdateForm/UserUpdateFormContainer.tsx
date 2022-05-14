import { FC, ComponentPropsWithoutRef } from 'react';

import UserUpdateForm from './UserUpdateForm';
import useUserUpdateForm from './useUserUpdateForm';

type Props = Omit<
  ComponentPropsWithoutRef<typeof UserUpdateForm>,
  'onSubmit' | 'onChangeName' | 'errors'
>;

const UserUpdateFormContainer: FC<Props> = ({ id, name }) => {
  const { handleSubmit, handleChangeName, errors } = useUserUpdateForm(
    id,
    name,
  );

  return (
    <UserUpdateForm
      id={id}
      name={name}
      errors={errors}
      onSubmit={handleSubmit}
      onChangeName={handleChangeName}
    />
  );
};

export default UserUpdateFormContainer;
