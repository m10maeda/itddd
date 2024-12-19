'use client';

import PersonAddAlt1 from '@mui/icons-material/PersonAddAlt1';
import IconButton from '@mui/material/IconButton';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { addMember } from './actions';

type Props = {
  circleId: string;
  memberId: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <IconButton aria-label="Delete" type="submit" disabled={pending} edge="end">
      <PersonAddAlt1 />
    </IconButton>
  );
}

export function AddMemberForm({ circleId, memberId }: Props) {
  const addMemberWithId = addMember.bind(null, circleId, memberId);

  const [, formAction] = useActionState(addMemberWithId, {});

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}
