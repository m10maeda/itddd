'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { useActionState, useId } from 'react';
import { useFormStatus } from 'react-dom';

import { registerCircle, type State } from './actions';

const initialState: State = {
  errors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant="contained" size="large">
      Register
    </Button>
  );
}

type Props = {
  ownerCandidates: {
    id: string;
    name: string;
  }[];
};

export function RegisterForm({ ownerCandidates }: Props) {
  const id = useId();
  const nameId = `${id}-name`;
  const nameErrorMessageId = `${id}-name-errormessage`;
  const nameDescriptionId = `${id}-name-description`;
  const ownerLabelId = `${id}-owner-label`;
  const ownerControlId = `${id}-owner-control`;
  const ownerErrorMessageId = `${id}-owner-errormessage`;

  const [state, formAction] = useActionState(registerCircle, initialState);

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
          Name must be at least 3 characters long and 20 characters or less.
        </FormHelperText>
      </FormControl>

      <FormControl required error={state.errors?.owner !== undefined} fullWidth>
        <InputLabel id={ownerLabelId}>Owner</InputLabel>

        <Select
          name="owner"
          id={ownerControlId}
          labelId={ownerLabelId}
          aria-errormessage={ownerErrorMessageId}
          defaultValue=""
          label="Owner"
        >
          {ownerCandidates.map((ownerCandidate) => (
            <MenuItem key={ownerCandidate.id} value={ownerCandidate.id}>
              {ownerCandidate.name}
            </MenuItem>
          ))}
        </Select>

        {state.errors?.owner ? (
          <FormHelperText id={ownerErrorMessageId}>
            {state.errors.owner}
          </FormHelperText>
        ) : null}
      </FormControl>

      <Box>
        <SubmitButton />
      </Box>
    </Stack>
  );
}
