import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { type Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';

import { DeleteForm } from './_delete-form';
import { MemberList } from './_member-list';
import { client as circleClient } from '../../../data-access/circles';
import { client as profileClient } from '../../../data-access/profiles';

export const fetchCache = 'default-no-store';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const { data } = await circleClient.GET('/{id}', {
    params: { path: { id } },
  });

  return {
    title: data ? data.name : 'Unknown',
  };
}

export default async function Circle({ params }: Props) {
  const id = (await params).id;

  const { data: circle, error: circleError } = await circleClient.GET('/{id}', {
    params: { path: { id } },
  });
  if (circleError?.status === 404) return notFound();

  if (circleError) return <p>Error</p>;

  const { data: owner } = await profileClient.GET('/{id}', {
    params: { path: { id: circle.owner } },
  });

  return (
    <main>
      <Typography variant="h4" gutterBottom component="h1">
        {circle.name}
      </Typography>

      <Stack my={2} direction="row" spacing={2}>
        <Button
          variant="contained"
          LinkComponent={Link}
          href={`/circles/${id}/edit`}
        >
          Edit
        </Button>

        <DeleteForm circleId={id} />
      </Stack>

      <Stack my={2} component="section">
        <Box>
          <Typography variant="h5" gutterBottom component="h2">
            Owner
          </Typography>

          <p>
            {owner !== undefined ? (
              <Link href={`/users/${owner.id}`} component={NextLink}>
                {owner.name}
              </Link>
            ) : (
              <>Unknown</>
            )}
          </p>
        </Box>

        <MemberList circleId={id} memberIds={circle.members} />
      </Stack>

      <Box mt={4}>
        <Link href={`/circles`} component={NextLink}>
          Back
        </Link>
      </Box>
    </main>
  );
}
