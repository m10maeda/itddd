'use client';

import { redirect } from 'next/navigation';
import { useId } from 'react';
import { useFormStatus } from 'react-dom';

import { useUpdateForm } from './useUpdateForm';
import { Button } from '../../../../components/Button';
import * as Form from '../../../../components/Form';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Update
    </Button>
  );
}

type Props = {
  userId: string;
  userName: string;
};

export function UserUpdateForm({ userId, userName }: Props) {
  const id = useId();
  const formTitleId = `${id}-form-title`;

  const { state, dispatch } = useUpdateForm();

  if (state.isSubmitSuccessful) {
    redirect(`/users/${userId}`);
  }

  return (
    <Form.Root noValidate action={dispatch} aria-labelledby={formTitleId}>
      <h1 id={formTitleId}>User Update</h1>

      <input type="hidden" name="id" value={userId} />

      <Form.Field>
        <Form.Label>Name</Form.Label>

        <Form.Control
          name="name"
          required
          aria-invalid={state.errors.name !== undefined}
          defaultValue={userName}
        />

        <Form.Description>1-20 characters long.</Form.Description>

        {state.errors.name
          ? state.errors.name.map((error) => (
              <Form.ErrorMessage>{error}</Form.ErrorMessage>
            ))
          : null}
      </Form.Field>

      <SubmitButton />
    </Form.Root>
  );
}
