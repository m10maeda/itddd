import { FormEvent, useCallback } from 'react';
import { useDeleteUserMutation } from '../../../lib/generated';

const useUserDeleteForm = (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
    variables: { id },
  });
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      await deleteUserMutation();
    },
    [deleteUserMutation],
  );

  return {
    handleSubmit,
  };
};

export default useUserDeleteForm;
