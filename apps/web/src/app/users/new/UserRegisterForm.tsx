'use client';

import Link from 'next/link';
import { useId } from 'react';
import { useFormStatus } from 'react-dom';

import { useRegisterForm } from './useRegisterForm';
import * as Alert from '../../../components/Alert';
import { Button } from '../../../components/Button';
import * as Form from '../../../components/Form';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Register
    </Button>
  );
}

export function UserRegisterForm() {
  const id = useId();
  const formTitleId = `${id}-form-title`;

  const { state, dispatch } = useRegisterForm();

  return (
    <Form.Root noValidate action={dispatch} aria-labelledby={formTitleId}>
      <h1 id={formTitleId}>User Registration</h1>

      {!state.result ? (
        <>
          <Form.Field>
            <Form.Label>Name</Form.Label>

            <Form.Control
              name="name"
              required
              aria-invalid={state.errors.name !== undefined}
            />

            <Form.Description>1-20 characters long.</Form.Description>

            {state.errors.name
              ? state.errors.name.map((error) => (
                  <Form.ErrorMessage>{error}</Form.ErrorMessage>
                ))
              : null}
          </Form.Field>

          <SubmitButton />
        </>
      ) : (
        <Alert.Root variant="success">
          <Alert.Title>The new user registered successfully!</Alert.Title>

          <Alert.Body>
            <p>
              Go to{' '}
              <Link href={`/users/${state.result.id}`}>
                {state.result.name}&apos;s page
              </Link>
              .
            </p>
          </Alert.Body>
        </Alert.Root>
      )}
    </Form.Root>
  );
}
