import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useUpdateUserMutation } from '../../../lib/generated';

type Errors = {
  name: string | undefined;
};

const useErrors = (): [
  Errors,
  (key: string, error: string | undefined) => void,
] => {
  const [errors, setErrors] = useState<Errors>({
    name: undefined,
  });

  const updateError = (key: string, error: string | undefined): void => {
    setErrors({
      ...errors,
      [key]: error,
    });
  };

  return [errors, updateError];
};

const validateName = (name: string): string | undefined => {
  if (name === '') return 'Required.';
  if (name.length > 30) return 'Must be 30 characters or less.';

  return undefined;
};

const useUserUpdateForm = (id: string, initialName: string) => {
  const [errors, updateError] = useErrors();

  const [name, updateName] = useState<string>(initialName);

  const handleChangeName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      updateName(value);
      updateError('name', validateName(value));
    },
    [updateError],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updateUser, { data, loading, error }] = useUpdateUserMutation({
    variables: { id, name },
  });

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await updateUser();
    },
    [updateUser],
  );

  return {
    errors,
    handleChangeName,
    handleSubmit,
  };
};

export default useUserUpdateForm;
