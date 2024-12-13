import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { type Metadata } from 'next';
import NextLink from 'next/link';

import { RegisterForm } from './register-form';

export const metadata: Metadata = {
  title: 'Register User Form',
};

export default function RegisterUser() {
  return (
    <main>
      <Typography variant="h4" gutterBottom component="h1">
        Register User Form
      </Typography>

      <RegisterForm />

      <Box mt={4}>
        <Link href="/users" component={NextLink}>
          Back
        </Link>
      </Box>
    </main>
  );
}
