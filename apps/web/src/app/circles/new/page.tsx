import Typography from '@mui/material/Typography';
import { type Metadata } from 'next';

import { RegisterForm } from './register-form';
import { client } from '../../../data-access/profiles';

export const fetchCache = 'default-no-store';

export const metadata: Metadata = {
  title: 'Register Circle Form',
};

export default async function RegisterCircle() {
  const { data, error } = await client.GET('/');

  if (error) return <p>Can not register circle.</p>;

  return (
    <main>
      <Typography variant="h4" gutterBottom component="h1">
        Register Circle Form
      </Typography>

      <RegisterForm ownerCandidates={data} />
    </main>
  );
}
