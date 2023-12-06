'use client';

import { useFormStatus } from 'react-dom';

import { useDeleteForm } from './useDeleteForm';
import * as Alert from '../../../components/Alert';
import { Button } from '../../../components/Button';
import * as Form from '../../../components/Form';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant="link">
      Delete
    </Button>
  );
}

type Props = {
  userId: string;
};

export function UserDeleteForm({ userId }: Props) {
  const { state, dispatch } = useDeleteForm();

  return (
    <Form.Root action={dispatch}>
      {state.message ? (
        <Alert.Root>
          <Alert.Body>{state.message}</Alert.Body>
        </Alert.Root>
      ) : null}

      <input type="hidden" name="id" value={userId} />

      <SubmitButton />
    </Form.Root>
  );
}
