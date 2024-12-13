'use client';

import Button from '@mui/material/Button';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { deleteUser } from './actions';

type Props = {
  userId: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant="contained" size="large">
      Delete
    </Button>
  );
}

export function DeleteForm({ userId }: Props) {
  const deleteUserWithId = deleteUser.bind(null, userId);

  const [, formAction] = useActionState(deleteUserWithId, {});

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}
