import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { type Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';

import { EditForm } from './edit-form';
import { client } from '../../../../data-access/circles';

export const fetchCache = 'default-no-store';

export const metadata: Metadata = {
  title: 'Edit Circle Form',
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCircle({ params }: Props) {
  const id = (await params).id;

  const { data, error } = await client.GET('/{id}', {
    params: { path: { id } },
  });

  if (error?.status === 404 || data === undefined) return notFound();

  return (
    <main>
      <Typography variant="h4" gutterBottom component="h1">
        Edit Circle From
      </Typography>

      <EditForm defaultValues={{ name: data.name }} circleId={id} />

      <Box mt={4}>
        <Link href={`/circles/${id}`} component={NextLink}>
          Back
        </Link>
      </Box>
    </main>
  );
}
