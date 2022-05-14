import { FC, ComponentPropsWithoutRef } from 'react';

import UserRegisterForm from './UserRegisterForm';
import useUserRegisterForm from './useUserRegisterForm';

type Props = Omit<
  ComponentPropsWithoutRef<typeof UserRegisterForm>,
  'onSubmit' | 'onChangeName' | 'errors'
>;

const UserRegisterFormContainer: FC<Props> = () => {
  const { handleSubmit, handleChangeName, errors } = useUserRegisterForm();

  return (
    <UserRegisterForm
      errors={errors}
      onSubmit={handleSubmit}
      onChangeName={handleChangeName}
    />
  );
};

export default UserRegisterFormContainer;
