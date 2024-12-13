import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';

import { DeleteForm } from './delete-form';
import { client as profileApiClient } from '../../../data-access/profiles';

export const fetchCache = 'default-no-store';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const { data, error } = await profileApiClient.GET('/{id}', {
    params: { path: { id } },
  });

  if (error?.status === 404 || data === undefined) return notFound();

  return {
    title: `${data.name}'s Profile`,
  };
}

export default async function User({ params }: Props) {
  const id = (await params).id;

  const { data, error } = await profileApiClient.GET('/{id}', {
    params: { path: { id } },
  });

  if (error?.status === 404 || data === undefined) return notFound();

  return (
    <main>
      <Typography variant="h4" gutterBottom component="h1">
        {data.name}
      </Typography>

      <Stack my={2} direction="row" spacing={2}>
        <Button
          variant="contained"
          LinkComponent={Link}
          href={`/users/${id}/edit`}
        >
          Edit
        </Button>

        <DeleteForm userId={id} />
      </Stack>

      <Box mt={4}>
        <Link href={`/users`} component={NextLink}>
          Back
        </Link>
      </Box>
    </main>
  );
}
