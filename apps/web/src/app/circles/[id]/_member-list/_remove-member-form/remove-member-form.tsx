'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { removeMember } from './actions';

type Props = {
  circleId: string;
  memberId: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <IconButton aria-label="Delete" type="submit" disabled={pending} edge="end">
      <DeleteIcon />
    </IconButton>
  );
}

export function RemoveMemberForm({ circleId, memberId }: Props) {
  const removeMemberWithId = removeMember.bind(null, circleId, memberId);

  const [, formAction] = useActionState(removeMemberWithId, {});

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}
