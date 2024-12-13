'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useActionState, useId } from 'react';
import { useFormStatus } from 'react-dom';

import { updateUser, type State } from './actions';

const initialState: State = {
  errors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant="contained" size="large">
      Update
    </Button>
  );
}

type Props = {
  defaultValues: { name: string };
  userId: string;
};

export function EditForm({ defaultValues, userId }: Props) {
  const id = useId();
  const errorMessageId = `${id}-errormessage`;
  const errorDescriptionId = `${id}-description`;
  const updateUserWithId = updateUser.bind(null, userId);
  const [state, formAction] = useActionState(updateUserWithId, {
    ...initialState,
    values: defaultValues,
  });

  return (
    <Box component="form" mt={4} noValidate action={formAction}>
      <Box mb={2}>
        <FormControl required error={state.errors?.name !== undefined}>
          <InputLabel htmlFor={id}>Name</InputLabel>
          <OutlinedInput
            id={id}
            name="name"
            defaultValue={state.values?.name}
            aria-describedby={errorDescriptionId}
            aria-errormessage={errorMessageId}
            label="Name"
          />
          {state.errors?.name ? (
            <FormHelperText id={errorMessageId}>
              {state.errors.name}
            </FormHelperText>
          ) : null}
          <FormHelperText id={errorDescriptionId} error={false}>
            Name must be at least 3 characters long and 20 characters or less.
          </FormHelperText>
        </FormControl>
      </Box>

      <Box>
        <SubmitButton />
      </Box>
    </Box>
  );
}
