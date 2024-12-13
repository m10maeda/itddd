import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { type Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';

import { EditForm } from './edit-form';
import { client as profileApiClient } from '../../../../data-access/profiles';

export const fetchCache = 'default-no-store';

export const metadata: Metadata = {
  title: 'Edit User Form',
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditUser({ params }: Props) {
  const id = (await params).id;

  const { data, error } = await profileApiClient.GET('/{id}', {
    params: { path: { id } },
  });

  if (error?.status === 404 || data === undefined) return notFound();

  return (
    <main>
      <Typography variant="h4" gutterBottom component="h1">
        Edit User From
      </Typography>

      <EditForm defaultValues={{ name: data.name }} userId={id}></EditForm>

      <Box mt={4}>
        <Link href={`/users/${id}`} component={NextLink}>
          Back
        </Link>
      </Box>
    </main>
  );
}
