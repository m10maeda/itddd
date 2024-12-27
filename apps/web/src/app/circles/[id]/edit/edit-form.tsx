'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { useActionState, useId } from 'react';
import { useFormStatus } from 'react-dom';

import { editCircle, type State } from './actions';

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
  circleId: string;
  defaultValues: {
    name: string;
  };
};

export function EditForm({ circleId, defaultValues }: Props) {
  const id = useId();
  const nameId = `${id}-name`;
  const nameErrorMessageId = `${id}-name-errormessage`;
  const nameDescriptionId = `${id}-name-description`;
  const editCircleWithId = editCircle.bind(null, circleId);

  const [state, formAction] = useActionState(editCircleWithId, {
    ...initialState,
    values: defaultValues,
  });

  return (
    <Stack spacing={2} component="form" mt={4} noValidate action={formAction}>
      <FormControl required error={state.errors?.name !== undefined} fullWidth>
        <InputLabel htmlFor={nameId}>Name</InputLabel>

        <OutlinedInput
          id={nameId}
          name="name"
          defaultValue={state.values?.name}
          aria-describedby={nameDescriptionId}
          aria-errormessage={nameErrorMessageId}
          label="Name"
        />

        {state.errors?.name ? (
          <FormHelperText id={nameErrorMessageId}>
            {state.errors.name}
          </FormHelperText>
        ) : null}

        <FormHelperText id={nameDescriptionId} error={false}>
          Name must be 20 characters or less.
        </FormHelperText>
      </FormControl>

      <Box>
        <SubmitButton />
      </Box>
    </Stack>
  );
}
