'use client';

import Button from '@mui/material/Button';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { deleteCircle } from './actions';

type Props = {
  circleId: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant="contained" size="large">
      Delete
    </Button>
  );
}

export function DeleteForm({ circleId }: Props) {
  const deleteCircleWithId = deleteCircle.bind(null, circleId);

  const [, formAction] = useActionState(deleteCircleWithId, {});

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}
